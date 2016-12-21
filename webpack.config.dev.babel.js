import path from 'path';
import webpack from 'webpack';
// import LiveReloadPlugin from 'webpack-livereload-plugin';
import cssImport from 'postcss-import';
import cssNested from 'postcss-nested';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const outputPath = path.join(__dirname, 'app', 'dist');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

export default [
  {
    target: 'web',
    devtool: isProd ? '' : 'source-map',
    entry: {
      renderer: [
        './src/renderer/index.js',
        'webpack-dev-server/client?http://0.0.0.0:4010',
        'webpack/hot/only-dev-server',
      ],
    },
    output: {
      filename: '[name].js',
      publicPath: '/',
    },
    devServer: {
      host: '0.0.0.0',
      port: '4010',
      contentBase: './src/renderer',
      historyApiFallback: true,
      stats: {
        chunks: false,
      },
      proxy: {
        '/api/*': 'http://107.170.52.153:4007/',
      },
    },
    externals(context, request, callback) {
      let isExternal = false;
      const load = [
        'electron',
      ];
      if (load.includes(request)) {
        isExternal = `require("${request}")`;
      }
      callback(null, isExternal);
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!postcss-loader',
          ),
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!postcss-loader',
          ),
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader?limit=10000',
        },
      ],
    },
    postcss() {
      return [
        cssImport,
        cssNested,
      ];
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { // eslint-disable-line quote-props
          NODE_ENV: JSON.stringify(nodeEnv),
        },
        $dirname: '__dirname',
      }),
      new ExtractTextPlugin('[name].css', {
        disable: false,
        allChunks: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      // new LiveReloadPlugin(),
    ],
  },
];

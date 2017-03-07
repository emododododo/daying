# Electron DaYing (大鹰)

> 此项目是一个信息聚合类的桌面应用, mac windows linux多平台兼容。

> 主要基于 [electron](https://github.com/electron/electron)、[dva-boilerplate-electron](https://github.com/sorrycc/dva-boilerplate-electron)、react 等技术开发。

> 安装包下载地址 [mac](https://github.com/emododododo/daying/releases/download/0.0.1/daying-mac.zip) [windows](https://github.com/emododododo/daying/releases/download/0.0.1/daying-windows.zip)

# 声明

> 此应用开发源码及数据仅供学习，所有数据并未获得官方授权。内容涉及掘金、知乎等。虽然最终都会跳转到原文地址，但获取与共享的行为或有侵犯知识权益的嫌疑。若被告知停止使用与共享，本人将及时删除相关内容。所有 API 以及源码 **仅供学习交流使用，请勿用作商业用途**。请您知悉相关情况，遵守相关协议。

---
## 界面
> 界面以及操作大概如下图。可以扫描二维码将文章分享至微信，也可以在浏览器中打开。

<div align="center">
  ![leancloud](http://7xkj1z.com1.z0.glb.clouddn.com/daying_display.gif)
</div>

> 在设置里面可以添加订阅源。

<div align="center">
  ![leancloud](http://7xkj1z.com1.z0.glb.clouddn.com/daying_config.gif)
</div>
## 开发

> 开发环境

克隆代码至本地，并安装相应的包
```bash
$ npm install
```

启动 webpack

```bash
$ npm run dev
```

开启另一个终端窗口，运行

```bash
$ npm start
```

> 打包

开发完成，打包应用

```bash
$ npm run pack
```

> 后台源码地址

[daying-backend](https://github.com/emododododo/daying-backend)
## 开发计划
- [x] 远程热更新订阅源；
- [x] ；
- [ ] UI 优化；
- [ ] 添加更多可用订阅源;
- [ ] 应用的自动更新；
- [ ] Webpack 2.0；

**欢迎PR**

## License

MIT

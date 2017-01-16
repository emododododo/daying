import is from 'electron-is';
import { join } from 'path';
import { BrowserWindow } from 'electron';

let count = 0;

export function create(opts) {
  count += 1;

  const options = opts;
  const title = options.title;

  delete options.title;
  let win = new BrowserWindow(options);
  win.on('close', () => {
    count -= 1;
    win = null;
  });
  win.webContents.on('did-finish-load', () => {
    win.setTitle(title);
  });
  return win;
}

export function getCount() {
  return count;
}

export function getPath() {
  let path = `file://${join($dirname, '..', 'pages')}/main.html`;
  if (is.dev()) {
    const { serverIp, serverPort } = require('../../../webpack.config.dev.babel.js'); // eslint-disable-line global-require
    path = `http://${serverIp}:${serverPort}/main-dev.html`;
  }
  return path;
}

import { create, getPath } from './window';

export function init() {
  const win = create({
    width: 1024,
    height: 768,
    title: '大鹰',
    webSecurity: true,
  });
  win.loadURL(getPath());
  return win;
}

export function editPage() {
  const win = create({
    width: 693,
    height: 468,
    title: '配置',
    hasShadow: true,
    fullscreenable: false,
    resizable: false,
    alwaysOnTop: true,
    minimizable: false,
    maximizable: false,
    fullscreen: false,
  });
  win.loadURL(`${getPath()}#/editPage`);
  return win;
}

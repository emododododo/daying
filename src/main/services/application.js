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
    width: 800,
    height: 600,
    title: '配置',
    frame: false,
    hasShadow: true,
    resizable: false,
  });
  win.loadURL(`${getPath()}#/editPage`);
  return win;
}

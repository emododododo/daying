import { create, getPath } from './window';

export function init() {
  const win = create({
    width: 1024,
    height: 768,
    title: '打烊',
  });
  win.loadURL(getPath());
}

import { join } from 'path';
import { create } from './window';

export function init() {
  const win = create({ width: 800, height: 600 });
  win.loadURL(`http://0.0.0.0:4010/index.html`);
  // win.loadURL(`file://${join($dirname, '..', 'pages')}/main.html`);
}

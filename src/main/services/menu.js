import { Menu } from 'electron';
import log from 'electron-log';
import * as application from './application';

let editPageWin = '';
let editPageTogle = false;
function getTemplate() {
  return [
    {
      label: 'MyApp',
      submenu: [
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: '配置',
      submenu: [
        {
          label: '配置',
          click: () => {
            // 开关配置页面
            if (editPageTogle) {
              editPageWin.close();
            } else {
              editPageWin = application.editPage();
            }
            editPageTogle = !editPageTogle;
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    },
  ];
}

export function init() {
  log.info('(menu) init');
  const menu = Menu.buildFromTemplate(getTemplate());
  Menu.setApplicationMenu(menu);
}

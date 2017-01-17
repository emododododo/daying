import { Menu } from 'electron';
import is from 'electron-is';
import log from 'electron-log';
import * as application from './application';

let editPageWin = '';
let editPageTogle = false;
function getTemplate() {
  const config = [
    {
      label: 'MyApp',
      submenu: [
        { label: '隐藏大鹰', role: 'hide' },
        { label: '隐藏其它', role: 'hideothers' },
        { label: '展示所有', role: 'unhide' },
        { type: 'separator' },
        { label: '关闭窗口', role: 'close' },
        { label: '重新加载', role: 'reload' },
        { label: '全屏显示', role: 'togglefullscreen' },
        { type: 'separator' },
        { label: '退出程序', accelerator: 'CmdOrCtrl+Q', role: 'quit' },
      ],
    },
    {
      label: '操作',
      submenu: [
        { label: '剪切', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: '复制', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: '粘贴', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: '全选', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      ],
    },
    {
      label: '设置',
      submenu: [
        {
          label: '设置',
          click: () => {
            // 开关配置页面
            if (editPageTogle) {
              editPageWin.close();
            } else {
              editPageWin = application.editPage();
              editPageWin.on('closed', () => {
                editPageTogle = false;
                editPageWin = null;
              });
            }
            editPageTogle = !editPageTogle;
          },
        },
      ],
    },
  ];

  if (is.dev()) {
    config.push({
      label: 'DEV',
      submenu: [
        { role: 'toggledevtools' },
      ],
    });
  }

  return config;
}

export function init() {
  log.info('(menu) init');
  const menu = Menu.buildFromTemplate(getTemplate());
  Menu.setApplicationMenu(menu);
}

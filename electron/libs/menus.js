const { Menu, MenuItem, shell } = require('electron');

const name = 'socket-browser';

const extractTemplate = [
  new MenuItem({
    label: '操作',
    submenu: [{
      label: '刷新',
      role: 'reload',
      accelerator: 'CommandOrControl+R',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.webContents.session.clearCache(() => {
            focusedWindow.reload();
            window.reload();
          });
        }
      }
    }]
  })
];

const template = [
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        role: 'undo'
      },
      {
        label: '重做',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: '剪切',
        role: 'cut'
      },
      {
        label: '复制',
        role: 'copy'
      },
      {
        label: '粘帖',
        role: 'paste'
      },
      {
        label: '粘帖并匹配样式',
        role: 'pasteandmatchstyle'
      },
      {
        label: '删除',
        role: 'delete'
      },
      {
        label: '选择所有',
        role: 'selectall'
      }
    ]
  },
  {
    label: '视图',
    submenu: [
      {
        label: '实际大小',
        role: 'resetzoom'
      },
      {
        label: '放大',
        role: 'zoomin'
      },
      {
        label: '缩小',
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        label: '切换全屏',
        role: 'togglefullscreen'
      }
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '切换全屏',
        role: 'togglefullscreen'
      },
      {
        label: '最小化',
        role: 'minimize'
      },
      {
        label: '关闭',
        role: 'close'
      }
    ]
  },
  {
    label: '关于',
    role: 'help',
    submenu: [
      {
        label: '了解更多',
        click: () => {
          shell.openExternal('https://sb.yeliex.com');
        }
      },
      {
        type: 'separator'
      },
      {
        label: `关于${name}`,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: `退出${name}`,
        role: 'quit'
      }
    ]
  }
];

const generateNewMenu = () => {
  if (process.platform === 'darwin') {
    template.unshift({
      label: name,
      submenu: [
        {
          label: `关于${name}`,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: '服务',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: `隐藏${name}`,
          role: 'hide'
        },
        {
          label: '隐藏其他应用',
          role: 'hideothers'
        },
        {
          label: '显示全部',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: `退出${name}`,
          role: 'quit'
        }
      ]
    });
    // Edit menu.
    template[1].submenu.push(
      {
        type: 'separator'
      },
      {
        label: '语音',
        submenu: [
          {
            label: '开始讲话',
            role: 'startspeaking'
          },
          {
            label: '停止讲话',
            role: 'stopspeaking'
          }
        ]
      }
    );
    // Window menu.
    template[3].submenu = [
      {
        label: `关闭${name}`,
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '缩放',
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: '前置全部窗口',
        role: 'front'
      }
    ];
  }
  if (process.env.NODE_ENV === 'development') {
    template[2].submenu.push({
      type: 'separator'
    });
    template[2].submenu.push({
      label: '开发者工具',
      role: 'toggledevtools'
    });
  }

  return Menu.buildFromTemplate(template);
};

const setUpMenu = () => {
  const menu = generateNewMenu();
  extractTemplate.forEach((item, index) => {
    menu.insert(index + 1, item);
  });
  Menu.setApplicationMenu(menu);
};

module.exports = setUpMenu;

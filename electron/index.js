const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');
const menu = require('./libs/menus');
const loadDevtool = require('./libs/devtools');

if (require('electron-squirrel-startup')) return;

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

let window = null;

const createWindow = (width = 800, height = 600) => {
  return function create() {
    window = new BrowserWindow({ width, height, show: true, center: true });

    const url = env === 'production' ? join('file://', __dirname, './dist/index.html') : 'http://localhost:18430';

    window.loadURL(url);

    menu();

    loadDevtool();

    // window.maximize();
    window.on('closed', () => {
      window = null;
    });
  };
};

app.on('ready', createWindow(1440, 900));

app.on('window-all-closed', () => {
  app.quit();
});

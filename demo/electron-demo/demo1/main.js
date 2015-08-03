var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// To set your custom dock menu,
// you can use the app.dock.setMenu API, which is only available on OS X:
// var app = require('app');
// var Menu = require('menu');
// var dockMenu = Menu.buildFromTemplate([
//   { label: 'New Window', click: function() { console.log('New Window'); } },
//   { label: 'New Window with Settings', submenu: [
//     { label: 'Basic' },
//     { label: 'Pro'}
//   ]},
//   { label: 'New Command...'}
// ]);
// app.dock.setMenu(dockMenu);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // To set the represented file of window,
  // you can use the BrowserWindow.setRepresentedFilename and BrowserWindow.setDocumentEdited APIs:
  // mainWindow.setRepresentedFilename('/etc/passwd');
  // mainWindow.setDocumentEdited(true);

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

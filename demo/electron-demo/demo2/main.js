var app = require('app');
var BrowserWindow = require('browser-window');
var onlineStatusWindow;

app.on('ready', function() {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false });
  onlineStatusWindow.loadUrl('file://' + __dirname + '/online-status.html');
});

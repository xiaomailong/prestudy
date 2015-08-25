var log4js = require('log4js');

log4js.configure({
	"appenders": [{
		"type": "console"
	}, {
		"type": "file",
		"filename": "logs/app.log",
		"maxLogSize": 204800,
		"backups": 10,
		"category": "app"
	}],
	"replaceConsole": true,
	"levels": {
		"app": "ALL"
	}
});

var logger = log4js.getLogger('app');

app.use(log4js.connectLogger(logger, {
	format: ':remote-addr :method :url :status :response-time ms'
}));

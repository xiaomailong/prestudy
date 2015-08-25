var log4js = require('log4js');

log4js.configure({
	appenders: [{
		type: 'console'
	}, {
		type: 'dateFile',
		filename: 'logs/app',
		pattern: '-yyyy-MM-dd.log',
		alwaysIncludePattern: true,
		category: 'app'
	}],
	replaceConsole: true
});
var logger = log4js.getLogger('app');

app.use(log4js.connectLogger(logger, {
	level: 'ALL',
	format: ':remote-addr :method :url :status :response-time ms'
}));

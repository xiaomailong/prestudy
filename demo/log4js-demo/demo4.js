log4js.configure({
	"appenders": [{
		"type": "console"
	}, {
		"type": "file",
		"filename": "logs/app1.log",
		"maxLogSize": 204800,
		"backups": 10,
		"category": "app1"
	}, {
		"type": "file",
		"filename": "logs/app2.log",
		"maxLogSize": 204800,
		"backups": 10,
		"category": "app2"
	}, {
		"type": "file",
		"filename": "logs/app3.log",
		"maxLogSize": 204800,
		"backups": 10,
		"category": "app3"
	}],
	"replaceConsole": true,
	"levels": {
		"app1": "ALL", //等级可以设置ALL,AUTO,INFO,WARN,ERROR
		"app2": "ALL",
		"app3": "ALL"
	}
});

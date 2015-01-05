var schedule = require('node-schedule');

/*方式一：
指定某一个时间执行任务
*/
var schedule = require('node-schedule');
var date = new Date(2015, 1, 5, 16, 1, 0);

var i = schedule.scheduleJob(date, function(){
	console.log('2015 will soon come.');
});

/*方式二：
在每个小时的多少分钟执行
*/
var rule = new schedule.RecurrenceRule();
rule.minute = 10;
var j = schedule.scheduleJob(rule, function(){
	console.log('I\'m very happy now!');
});

/*方式三：
类似crontab
*/
var k = schedule.scheduleJob('1 * * * *', function(){
	console.log('It\'s time to 下午茶!');
});

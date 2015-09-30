var request = require('request');
var JSONStream = require('JSONStream');

// request({
//     url: 'http://isaacs.couchone.com/registry/_all_docs'
//   })
//   .pipe(JSONStream.parse('rows.*'))
//   .pipe(es.mapSync(function(data) {
//     console.log(data);
//   }));
//   var request = require('request');

// 上海证交所股票行情
request('http://hq.sinajs.cn/list=sh600382', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage.
  }
});

// 深圳证交所股票行情
request('http://hq.sinajs.cn/list=sz000039', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage.
  }
});

// 上证指数
// request('http://hq.sinajs.cn/list=s_sh000001', function(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body); // Show the HTML for the Google homepage.
//   }
// });

// 深证指数
// request('http://hq.sinajs.cn/list=s_sz399001', function(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body); // Show the HTML for the Google homepage.
//   }
// });

// 日K线：http://image.sinajs.cn/newchart/daily/n/sh600382.gif
// 分时线：http://image.sinajs.cn/newchart/min/n/sh000001.gif
// 周K线：http://image.sinajs.cn/newchart/weekly/n/sh000001.gif
// 月K线：http://image.sinajs.cn/newchart/monthly/n/sh000001.gif
// request('http://image.sinajs.cn/newchart/daily/n/sh600382.gif', function(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body); // Show the HTML for the Google homepage.
//   }
// });

// 深证指数
// request('http://hq.sinajs.cn/list=s_sz399001', function(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body); // Show the HTML for the Google homepage.
//   }
// });

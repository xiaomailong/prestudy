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

// 获取股票最新数据的接口，后接股票代码，每个股票用逗号隔开;
// op开盘价np最新价hp最高价lp最低价tm成交额cat量比tr换手率name股票名称lcp昨收ape市盈率
var UrlStock = "http://q.jrjimg.cn/?q=cn|s&n=stockHQ&c=op,np,hp,lp,tm,cat,tr,name,lcp,ape&i=";
// 获取股票基金最新数据的接口用法如http://hq.sinajs.cn/list=sz000002,sh601116,sz150195,sh511880
var UrlStockFund = "http://hq.sinajs.cn/list=";
// 获取分级对应的持仓股票
var UrlGradingStocks = "http://fund.eastmoney.com/f10/FundArchivesDatas.aspx?type=jjcc&topline=10&code=";
// 获取分级估算涨幅
var UrlGrading = "http://fundgz.1234567.com.cn/js/{0}.js"
//  获取东方财富行业资金流向
var UrlIndustry = "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C._BKHY&sty=DCFFPBFM&st=(BalFlowMain)&sr=-1&ps=999&token=894050c76af8597a853f5b408b759f5d";
// 获取东方财富概念资金流向
var UrlConcept = "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C._BKGN&sty=DCFFPBFM&st=(BalFlowMain)&sr=-1&ps=10000&token=894050c76af8597a853f5b408b759f5d";
// 获取东方财富三大指数
var Url = "http://nufm2.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=0000011,3990012,3990062&sty=E1FD&st=z&token=afb2abbc6e10eb3682146dfec6a6d74c"
     
//获取同花顺推荐的股票
var RecommendUrl = "http://comment.10jqka.com.cn/znxg/formula_stocks_pc.json";
//获取同花顺行业资金流向
IndustryCommand = "http://q.10jqka.com.cn/thshy/index/field/zjjlr/order/desc/page/1/ajax/1/";
           

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

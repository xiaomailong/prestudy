// Javascript引用类型之时间Date
// Date类型:使用自UTC（国际协调时间）1970年1月1日0点开始经过的毫秒数来保存日期。
// Date类型保存的日期能够精确到1970年1月1日之前或之后的285616年

// [1]创建对象
// 　　[1.1]在调用Date构造函数而不传递参数的情况下，新创建的对象自动获得当前日期和时间
var now = new Date();　　
console.log(now); // Thu Aug 27 2015 16:31:29 GMT+0800 (CST)
// [1.2]根据特定日期和时间创建日期对象，必须传入表示该日期的毫秒数(从UTC时间到该日期止经过的毫秒数)
// 　 [1.2.1]Date.parse():接收一个表示日期的字符串参数，根据这个字符串返回相应日期的毫秒数
// 　　　　[支持的字符串格式]
// 　　　　[a]月/日/年 ,如6/13/2004;
// 　　　　[b]月 日,年，如January 12,2004或Jan 12,2004
// 　　　　[c]星期 月 日 年 时:分:秒 时区，如Tue May 25 2004 00:00:00 GMT-0700
// 　　　　[d]YYYY-MM-DDTHH:mm:ss:sssZ,如2004-05-25T00:00:00(ECMAScript5支持)
// 　　　　[注意1]如果传入Date.parse()方法的字符串不能表示日期，IE8-返回NaN,IE9+返回Invalid Date
// 　　　　[注意2]如果直接将表示日期的字符串传递给Date构造函数，也会有后台调用Date.parse()
// 　　　　new Date('10/1/2015') 相当于 new Date(Date.parse('10/1/2015'));
// 　　　　[注意3]如果日期对象超出范围，浏览器会自动将日期计算成范围内的值
var now = new Date('6/13/2004');
console.log(now); // Sun Jun 13 2004 00:00:00 GMT+0800 (CST)
var now = new Date('Jan 12,2004');
console.log(now); // Mon Jan 12 2004 00:00:00 GMT+0800 (CST)
var now = new Date('Tue May 25 2004 00:00:00 GMT-0700');
console.log(now); // Tue May 25 2004 15:00:00 GMT+0800 (CST)
var now = new Date('2004-05-25T00:00:00');
console.log(now); // Tue May 25 2004 08:00:00 GMT+0800 (CST)
var now = new Date(Date.parse('avd'));
console.log(now); // Invalid Date
// 　 [1.2.2]Date.UTC():返回表示日期的毫秒数，参数分别是年份、基于0的月份(0-11)、月中的哪一天(1-31)、
//           小时数(0-23)、分钟、秒以及毫秒数。在这些参数中只有前两项是必须的。
// 　　　　[注意1]Date.UTC()与Date.parse()的区别在于Date.UTC()里的参数不是字符串，而是用逗号分隔的数字
var y2000 = new Date(Date.UTC(2000, 0));　　　　
console.log(y2000); // Sat Jan 01 2000 08:00:00 GMT+0800 (CST)　　　
var now = new Date(Date.UTC(2015, 7, 26, 18, 27, 20, 40));
console.log(now); // Thu Aug 27 2015 02:27:20 GMT+0800 (CST)　
// 　　　　//该时间是GMT的时间，中国是东8区，显示的时候小时会加8
// 　　　　[注意2]如果直接将表示日期的参数传递给Date构造函数，也会有后台调用Date.UTC(),但二者并不相同　　　　
new Date(Date.UTC(2015, 7, 26, 18, 27, 20, 40)); // 是相对于GMT时间即国际标准时间创建的
// Sat Jan 01 2000 08:00:00 GMT+0800 (CST)　　　　
new Date(2015, 7, 26, 18, 27, 20, 40); // 是相对于系统设置的本地时区的时间创建的
// Thu Aug 27 2015 02:27:20 GMT+0800 (CST)

// [2]获取时间
// 　　[2.1]Date.now()(ECMAScript5):返回表示调用这个方法的日期和时间的毫秒数
console.log(Date.now());
console.log(Date.now(2000, 1, 1)); // 1440585932600,由此可以看出Date.now不支持传递参数
// 　　[2.2]用+操作符把Date对象转换成字符串，返回毫秒数
console.log(+new Date());
console.log(+new Date(2000, 1, 1)); // 949334400000

// [3]继承的方法(在各个浏览器中有差异)
var now = new Date();
// 　　[3.1]toString():Wed Aug 26 2015 19:40:44 GMT+0800以完整格式时间
console.log(now.toString());
// 　　[3.2]toLocaleString():以2015/8/26 下午7:40:44格式显示时间
console.log(now.toLocaleString());
// 　　[3.3]valueOf():显示日期的毫秒数(当用于比较日期)
console.log(now.valueOf());
// 　　[tips]可以使用比较操作符来比较日期值　　
var date1 = new Date(2007, 0, 1);　　
var date2 = new Date(2007, 1, 1);　　
console.log(date1 > date2); // false
console.log(new Date());
// Wed Aug 26 2015 19:40:44 GMT+0800 (中国标准时间)(chrome)
// 2015-08-26T11:40:44.359Z(firefox)
// Wed Aug 26 2015 19:40:44 GMT+0800 (中国标准时间)(IE)
console.log(new Date().toString());
// Wed Aug 26 2015 19:40:44 GMT+0800 (中国标准时间)(chrome)
// Wed Aug 26 2015 19:40:44 GMT+0800(firefox)
// Wed Aug 26 2015 19:44:44 GMT+0800 (中国标准时间)(IE)
console.log(new Date().toLocaleString());
// 2015/8/26 下午7:40:44(chrome)
// 2015/8/26 下午7:40:44(firefox)
// ‎2015‎年‎8‎月‎26‎日‎ ‎19‎:‎44‎:‎44(IE)
console.log(new Date().valueOf());
// 1440589244934    (chrome/firefox/IE)

// [4]日期格式化方法:专门将日期格式化为字符串的方法(在不同浏览器中显示有差异)
// 　　[4.1]toDateString():以特定于实现的格式显示星期几、月、日和年
// 　　[4.2]toTimeString():以特定于实现的格式显示时、分、秒和时区
// 　　[4.3]toLocaleDateString():以特定于地区的格式显示星期几、月、日和年
// 　　[4.4]toLocaleTimeString():以特定于地区的格式显示时、分、秒和时区
// 　　[4.5]toUTCString():以特定于实现的格式显示完整的UTC日期
console.log(new Date().toDateString());
// Wed Aug 26 2015(chrome/firefox/IE)
console.log(new Date().toTimeString());
// 20:31:53 GMT+0800 (中国标准时间)(chrome/firefox/IE)
console.log(new Date().toLocaleDateString());
// 2015/8/26(chrome/firefox)
// 2015‎年‎8‎月‎26‎日(IE)
console.log(new Date().toLocaleTimeString());
// 下午8:31:53(chrome/firefox)
// 20:31:53(IE)
console.log(new Date().toUTCString());
// Wed, 26 Aug 2015 12:31:53 GMT(chrome/firefox/IE)

// [5]日期和时间组件方法
// getTime()	返回表示日期的毫数
// setTime()	以毫秒数设置日期，会改变整个日期
// ***********
// getFullYear() 取得4位数的年份
// getUTCFullYear() 返回UTC日期的4位数年份
// setFullYear()	设置日期的年份
// setUTCFullYear()	设置UTC日期的年份
// ************
// getMonth()	返回日期中的月份
// getUTCMonth()	返回UTC日期中的月份
// setMonth()	设置日期的月份
// setUTCMonth()	设置UTC日期的月份
// ******************
// getDate()	返回日期中的天数
// getUTCDate()	返回UTC日期中的天数
// setDate()	设置日期的天数
// setUTCDate()	设置UTC日期的天数
// ******************
// getDay()	返回日期中的星期几
// getUTCDay()	返回UTC日期中的星期几
// ******************
// getHours()	返回日期中的小时数
// getUTCHours()	返回UTC日期中的小时数
// setHours()	设置日期的小时数
// setUTCHours()	设置UTC日期的小时数
// ******************
// getMinutes()	返回日期中的分钟数
// getUTCMinutes()	返回UTC日期中的分钟数
// setMinutes()	设置日期的分钟数
// setUTCMinutes()	设置UTC日期的分钟数
// ******************
// getSeconds()	返回日期中的秒数
// getUTCSeconds()	返回UTC日期中的秒数
// setSeconds()	设置日期的秒数
// setUTCSeconds()	设置UTC日期的秒数
// ******************
// getMilliseconds()	返回日期中的毫秒数
// getUTCMilliseconds()	返回UTC日期中的毫秒数
// setMilliseconds()	设置日期的毫秒数
// setUTCMilliseconds()	设置UTC日期的毫秒数
// ******************
// getTimeZoneOffset()	返回本地时间与UTC时间相差的分钟数

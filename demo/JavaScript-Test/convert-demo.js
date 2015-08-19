var querystring = require('querystring');

// stringify函数的作用就是序列化对象，也就是说将对象类型转换成一个字符串类型
// （默认的分割符（"&"）和分配符（"="））
console.log(querystring.stringify({foo:'bar',cool:['xux', 'yys']}));
// querystring.stringify("对象"，"分隔符"，"分配符")
console.log(querystring.stringify({foo:'bar',cool:['xux', 'yys']},'*','$'));

// parse函数的作用就是反序列化字符串（默认是由"="、"&"拼接而成）
console.log(querystring.parse('foo=bar&cool=xux&cool=yys'));
// parse函数可以根据用户所自定义的分割符、分配符来反序列化字符串，从而得到相应的对象结果
console.log(querystring.parse('foo@bar$cool@xux$cool@yys','@','$'));

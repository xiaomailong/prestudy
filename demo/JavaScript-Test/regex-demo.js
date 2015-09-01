// javascript中的正则表达式

// [1]定义:正则又叫规则或模式，是一个强大的字符串匹配工具，在javascript中是一个对象

// [2]特性：
// 	　　[2.1]贪婪性,匹配最长的
// 	　　[2.2]懒惰性,不设置/g,则只匹配第1个

// [3]两种写法:
// 	　　[3.1]perl写法(使用字面量形式): var expression = /pattern/flags;
var pattern = /a/i; // 匹配字符串中所有'a'的实例
// 	　　　　[3.1.1]三个标志flags
// 	　　　　　　[a]g:表示全局模式(global)
// 	　　　　　　[b]i:表示不区分大小写(ignoreCase)
// 	　　　　　　[c]m:表示多行模式(multiline)
// 	　　[3.2]js写法(使用RegExp构造函数):两个参数:要匹配的字符串模式、标志字符串(可选)
var pattern = new RegExp('[bc]at', 'i');
// 	　　　　[注意]RegExp构造函数的两个参数都是字符串
// 	　　[3.3]构造函数与字面量的区别
// 	　　[注意]可以使用字面量形式定义的任何表达式，都可以使用构造函数来定义
// 	　　　　[3.3.1]字面量写法不支持变量,只能用构造函数的形式来写
// 	　　　　[tips]获取class元素(因为classname是变量,只能使用构造函数的形式)
function getByClass(obj, classname) {
  var elements = obj.getElementsByTagName('*');
  var result = [];
  var pattern = new RegExp('^|\\s' + classname + '\\s|$');
  for (var i = 0; i < elements.length; i++) {
    if (pattern.test(elements[i].className)) {
      result.push(elements[i]);
    }
  }
}

// 　　　　[3.3.2]在ECMAScript3中,正则表达式字面量始终会共享同一个RegExp实例,而使用构造函数创建的每一个新RegExp实例都是一个新实例
var re = null;
var i;
for (i = 0; i < 10; i++) {
  re = /cat/g;
  re.test('catastrophe');
}
for (i = 0; i < 10; i++) {
  re = new RegExp('cat', 'g');
  re.test('catastrophe');
}

// 　　　　[3.3.3]ECMAScript5中规定,使用正则表达式字面量必须像直接调用RegExp构造函数一样，每次都创建新的RegExp实例

// [4]语法
// 	　　[重要事项]正则表达式中不能出现多余空格

// 	　　[4.0]元字符(14个)：() [] {} \ ^ $ | ? * + .
// 	　　　　[注意]元字符必须转义,即用\ 加转义字符,用new RegExp写的正则必须双重转义

// 	　　[4.1]转义字符
// 	　　　　[4.1.0].号代表除了换行符\n之外的任意字符
// 	　　　　[4.1.1]\d 数字 \D 非数字
// 	　　　　[4.1.2]\w 字母、数字、下划线 \W 非字母、数字、下划线
// 	　　　　　　[注意]汉字不属于\w
// 	　　　　[4.1.3]\s 空格 \S 非空格
// 	　　　　[4.1.4]\b 边界符，\w的左侧或右侧不是\w，则会出现一个边界符 \B非边界符
// 	　　　　[4.1.5]\1 表示和前面相同的一个字符
// 	　　　　[tips]找出重复项最多的字符和个数
var str = 'aaaaabbbbbdddddaaaaaaaaaaaffffffffffffffffffgggggcccccce';
var pattern = /(\w)\1+/g;
var maxLength = 0;
var maxValue = '';
var result = str.replace(pattern, function(match, match1, pos, originalText) {
  if (match.length > maxLength) {
    maxLength = match.length;
    maxValue = match1;
  }
})
console.log(maxLength, maxValue); // 18 "f"
// 　　　　[4.1.6](\w)(\d)\1\2 :\1代表\w当时所代表的值，\2代表\d当时所代表的值
// 　　　　　　[注意]正则表达式中的子项必须是用小括号括起来的，并且顺序以小括号的前括号出现的顺序为准
// 　　　　[4.1.7]\t 制表符
// 　　　　[4.1.8]\v 垂直制表符
// 　　　　[4.1.9]\uxxxx 查找以十六进制xxxx规定的Unicode字符
// 　　　　　　[注意1][\u4e00-\u9fa5]代表中文
// 　　　　　　[注意2]alert()和console.log()里面的字符是系统转义字符
// 　　　　　　　　[a]\r return 回车
// 　　　　　　　　[b]\n newline 换行
// 　　　　　　　　[c]\t table 制表符
// 　　　　　　　　[d]\b backspace 退格
// 　　　　　　[tips]alert里的换行不能用<br>或<br\>,而应该用\n。alert里面相当于是系统解析的,而不是浏览器
// 　　　　　　　　e.g.alert('http://www.baidu.com\n\t你好')
// 　　　　　　[注意3]由于RegExp构造函数的参数是字符串,所以某些情况下,需要对字符进行双重转义。
//                  所有元字符必须双重转义，已经转义过的字符也必须双重转义
//字面量模式    ->             等价的字符串
// /\[bc\]at/ 　　　　　　      "\\[bc\\]at"
// /\.at/ 　　　　　　    　　   "\\.at"
// /name\/age/ 　　    　　    "name\\/age"
// /\d.\d{1,2}/    　　　　    "\\d.\\d{1,2}"
// /\w\\hello\\123/           "\\w\\\\hello\\\\123"

// 　　[4.2]量词
// 　　　　[4.2.1]{n}:匹配n次
// 　　　　[4.2.2]{n,m}:匹配至少n次，最多m次
// 　　　　[4.2.3]{n,}:匹配至少n次
// 　　　　[4.2.4]?:相当于{0,1}
// 　　　　[4.2.5]*:相当于{0,}
// 　　　　[4.2.6]+:相当于{1,}

// 　　[4.3]位置符号
// 　　　　[4.3.1]^起始符号
// 　　　　[4.3.2]结束符号为美元符号
// 　　　　[4.3.3]?=肯定正向环视
// 　　　　[4.3.4]?!否定正向环视

// 　　[4.4]控制符号([]:候选 |:或 ^:非 -:到)
// 　　　　[4.4.1](red|blue|green) 查找任何指定的选项
// 　　　　[4.4.2][abc] 查找方括号之间的任何字符
// 　　　　[4.4.3][^abc] 查找任何不在方括号之间的字符
// 　　　　[4.4.4][0-9] 查找任何从0到9的数字
// 　　　　[4.4.5][a-z] 查找任何从小写a到小写z的字符
// 　　　　[4.4.6][A-Z] 查找任何从大写A到大写Z的字符
// 　　　　[4.4.7][A-z] 查找任何从大写A到小写z的字符
// 　　　　[4.4.8][adgk] 查找给定集合内的任何字符
// 　　　　[4.4.9][^adgk] 查找给定集合外的任何字符

// 　　[4.5]美元符号
//$$ 　　$
//$& 　　匹配整个模式的子字符串(与RegExp.lastMatch的值相同)
//$`    匹配子字符串之前的子字符串(与RegExp.leftContext的值相同)
//$'    匹配子字符串之后的子字符串(与RegExp.rightContext的值相同)
//$n 　  匹配第n个捕获组子字符串,其中n等于0-9。$1表示匹配第一个捕获组的子字符串(从第1个算起)
//$nn 　 匹配第nn个捕获组的子字符串，其中nn等于01-99
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, '$0')); // $0,$0,$0,$0
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, '$1')); // ca,ba,sa,fa
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, '$2')); // t,t,t,t
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, '$3')); // $3,$3,$3,$3
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, '$$')); // $,$,$,$
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, '$&')); // cat,bat,sat,fat
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, '$`')); // ,cat,,cat,bat,,cat,bat,sat,
console.log('cat,bat,sat,fat'.replace(/(.a)(t)/g, "$'")); // ,bat,sat,fat,,sat,fat,,fat,

// [5]实例属性:通过实例属性可以获知一个正则表达式的各方面信息,但却没有多大用处，因为这些信息全都包含在模式声明中
// 	　　[5.1]global:布尔值，表示是否设置了g标志
// 	　　[5.2]ignoreCase: 布尔值，表示是否设置了i标志
// 	　　[5.3]lastIndex: 整数，表示开始搜索下一个匹配项的字符位置，从0算起
// 	　　[5.4]multiline: 布尔值，表示是否设置了标志m
// 	　　[5.5]source: 正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回
var pattern = new RegExp('\\[bc\\]at', 'i');
console.log(pattern.global); // false
console.log(pattern.ignoreCase); // true
console.log(pattern.multiline); // false
console.log(pattern.lastIndex); // 0
console.log(pattern.source); // '\[bc\]at'

// [6]构造函数属性(静态属性):
//    适用于作用域中的所有正则表达式，并且基于所执行的最近一次正则表达式操作而变化。
//    关于这些属性的独特之处在于可以通过两种方式访问它们，即长属性名和短属性名。
//    短属性名大都不是有效的ECMAScript标识符，所以必须通过方括号语法来访问它们

// 	　　[6.1]使用这些属性,可以从exec()方法或text()方法执行的操作中提取出更具体的信息
//长属性名　　    　　    　　 短属性名    　　    　　说明
//input 　　　　　　　        $_    　　　　　　　   最近一次要匹配的字符串
//lastMatch    　　　　      $&    　　　　　　     最近一次的匹配项
//lastParen    　　　　      $+    　　　　　　   　最近一次匹配的捕获组
//leftContext    　　　　    $`    　　　　　　  　 input字符串中lastMatch之前的文本
//multiline    　　　　　　   $*    　　　　　　　　 布尔值，表示是否所有表达式都使用多行模式
//rightContext    　　　　   $'    　　　　　　　　  input字符串中lastMarch之后的文本
// 　　　 　[注意1]opera不支持短属性名
// 	　　　　[注意2]opera不支持input\lastMatch\lastParen\multiline
// 	　　　　[注意3]IE不支持multiline
var text = 'this has been a short summer';
var pattern = /(.)hort/g;
if (pattern.test(text)) {
  console.log(RegExp.input); // 'this has been a short summer'
  console.log(RegExp.leftContext); // 'this has been a '
  console.log(RegExp.rightContext); // ' summer'
  console.log(RegExp.lastMatch); // 'short'
  console.log(RegExp.lastParen); // 's'
  console.log(RegExp.multiline); // false
  console.log(RegExp['$_']); // 'this has been a short summer'
  console.log(RegExp['$`']); // 'this has been a '
  console.log(RegExp["$'"]); // ' summer'
  console.log(RegExp['$&']); // 'short'
  console.log(RegExp['$+']); // 's'
  console.log(RegExp['$*']); // false
}

// 　　[6.2]还有多达9个用于存储捕获组的构造函数属性
// RegExp.$1\RegExp.$2\RegExp.$3……到RegExp.$9分别用于存储第一、第二……第九个匹配的捕获组。
// 在调用exec()或test()方法时，这些属性会被自动填充
var text = 'this has been a short summer';
var pattern = /(..)or(.)/g;
if (pattern.test(text)) {
  console.log(RegExp.$1); // sh
  console.log(RegExp.$2); // t
}

// [7]实例方法:
// 	　　[7.1]exec():专门为捕获组而设计,接受一个参数,即要应用模式的字符串。
//          然后返回包含第一个匹配项信息的数组。在没有匹配项的情况下返回null。
//          返回的数组包含两个额外的属性：index和input。index表示匹配项在字符串的位置，input表示应用正则表达式的字符串。
//          在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串，
//          如果模式中没有捕获组，则该数组只包含一项
var text = 'mom and dad and baby and others';
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
console.log(pattern, matches);
//pattern.lastIndex:20
//matches[0]:'mom and dad and baby'
//matches[1]:' and dad and baby'
//matches[2]:' and baby'
//matches.index:0
//matches.input:'mom and dad and baby and others'

// 　 　[注意1]对于exec()方法而言,即使在模式中设置了全局标志(g),它每次也只会返回一个匹配项
// 	　　[注意2]在不设置全局标志的情况下,在同一个字符串上多次调用exec(),将始终返回第一个匹配项的信息
// 	　　[注意3]在设置全局标志的情况下,每次调用exec()都会在字符串中继续查找新匹配项
// 	　　[注意4]IE8-的js实现在lastIndex属性上存在偏差,即使在非全局模式下,lastIndex属性每次也会变化
var text = 'cat,bat,sat,fat';
var pattern1 = /.at/;
var matches = pattern1.exec(text);
console.log(pattern1, matches);
//pattern1.lastIndex:0
//matches[0]:'cat'
//matches.index:0
//matches.input:'cat,bat,sat,fat'

matches = pattern1.exec(text);
console.log(pattern1, matches);
//pattern1.lastIndex:0
//matches[0]:'cat'
//matches.index:0
//matches.input:'cat,bat,sat,fat'

var text = 'cat,bat,sat,fat';
var pattern2 = /.at/g;
var matches = pattern2.exec(text);
console.log(pattern2, matches);
//pattern2.lastIndex:3
//matches[0]:'cat'
//matches.index:0
//matches.input:'cat,bat,sat,fat'

matches = pattern2.exec(text);
console.log(pattern2, matches);
//pattern2.lastIndex:7
//matches[0]:'bat'
//matches.index:4
//matches.input:'cat,bat,sat,fat'

// 　　[tips]用exec()方法找出匹配的所有位置和所有值
var string = 'j1h342jg24g234j 3g24j1';
var pattern = /\d/g;
var valueArray = []; //值
var indexArray = []; //位置
var temp = pattern.exec(string);
while (temp != null) {
  valueArray.push(temp[0]);
  indexArray.push(temp.index);
  temp = pattern.exec(string);
}
console.log(valueArray, indexArray);

// [7.2]test():接受一个字符串参数，在模式与该参数匹配的情况下返回true,否则返回false
// 	　　[注意]常用于只想知道目标字符串与某个模式是否匹配，但不需要知道其文本内容的情况,经常用在if语句中
var text = '000-00-000';
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)) {
  console.log('The pattern was matched');
}

// [8]模式匹配方法
// 	　　[8.1]match():只接受一个参数,正则或字符串,把匹配的内容保存到一个数组中返回
// 	　　[注意]加上全局标记时,match()方法返回值中没有index和input属性
// 	　　　　[a]不加/g
var string = 'cat,bat,sat,fat';
var pattern = /.at/;
var matches = string.match(pattern);
console.log(matches, matches.index, matches.input); //['cat'] 0 'cat,bat,sat,fat'
// 　　　　[b]加/g
var string = 'cat,bat,sat,fat';
var pattern = /.at/g;
var matches = string.match(pattern);
console.log(matches, matches.index, matches.input); //['cat','bat','sat','fat'] undefined undefined
// 　　　　[c]字符串
var string = 'cat,bat,sat,fat';
var pattern = 'at';
var matches = string.match(pattern);
console.log(matches, matches.index, matches.input); //['at'] 1 'cat,bat,sat,fat'

// 　　[8.2]search():只接受一个参数,正则或字符串,返回匹配的内容在字符串中首次出现的位置,类似于不能设置起始位置的indexOf,找不到返回-1
// 	　　　　[a]正则(加/g和不加/g效果一样)
var string = 'cat,bat,sat,fat';
var pattern = /.at/;
var pos = string.search(pattern);
console.log(pos); //0
// 　　　　[b]字符串
var string = 'cat,bat,sat,fat';
var pattern = 'at';
var pos = string.search(pattern);
console.log(pos); // 1

// 　　　　[tips]找出匹配的所有位置
function fnAllSearch(str, pattern) {
  var pos = str.search(pattern);
  var length = str.match(pattern)[0].length;
  var index = pos + length;
  var result = [];
  var last = index;
  result.push(pos);
  while (true) {
    str = str.substr(index);
    pos = str.search(pattern);
    if (pos === -1) {
      break;
    }
    length = str.match(pattern)[0].length;
    index = pos + length;
    result.push(last + pos);
    last += index;
  }
  return result;
}
console.log(fnAllSearch('cat23fbat246565sa3dftf44at', /\d+/)); //[3,9,17,22]

// 　　[8.3]replace():接收两个参数:第一个参数为正则表达式或字符串(待查找的内容)、第二个参数为字符串或函数(替换的内容)
// 	　　　　[a]字符串替换
var string = 'cat,bat,sat,fat';
var result = string.replace('at', 'ond');
console.log(result); //'cond,bat,sat,fat'
// 　　　　[b]正则无/g替换
var string = 'cat,bat,sat,fat';
var result = string.replace(/at/, 'ond');
console.log(result); //'cond,bat,sat,fat'
// 　　　　[c]正则有/g替换
var string = 'cat,bat,sat,fat';
var result = string.replace(/at/g, 'ond');
console.log(result); //'cond,bond,sond,fond'
// 　　　　[d]函数替换:在只有一个匹配项(即与模式匹配的字符串的情况下,会向这个函数传递3个参数:模式的匹配项、
//                   模式匹配项在字符串中的位置、原始字符串。在正则表达式定义了多个捕获组的情况下,
//                   传递给函数的参数依次是模式的匹配项、第一个捕获组的匹配项、第二个捕获组的匹配项……第N个捕获组的匹配项,
//                   但最后两个参数仍然分别是模式的匹配项在字符串中的位置和原始字符串,这个函数返回一个字符串。

// 　　　　[tips]防止跨站脚本攻击xss(css)

function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function(match, pos, originalText) {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\"':
        return '&quot;';
    }
  });
}
console.log(htmlEscape('<p class=\"greeting\">Hello world!</p>'));
//&lt;p class=&quot; greeting&quot;&gt;Hello world!&lt;/p&gt;
console.log(htmlEscape('<p class="greeting">Hello world!</p>'));

// [9]继承的方法:都返回正则表达式字面量,与创建正则表达式的方式无关。
//    要注意的是toString()和toLocaleString()返回的正则表达式的字符串表示，而valueOf返回的是正则表达式对象本身
// 	　　[9.1]toString()
// 	　　[9.2]toLocaleString()
// 	　　[9.3]valueOf()

var pattern = new RegExp('\\[bc\\]at', 'gi');
console.log(pattern.toString()); // '/\[bc\]at/gi'
console.log(pattern.toLocaleString()); // '/\[bc\]at/gi'
console.log(pattern.valueOf()); // /\[bc\]at/gi

// [10]局限性:下列为ECMAScript正则表达式不支持的特性
// 	　　[10.1]匹配字符串开始的结尾的\A和\Z锚(但支持以^和$来匹配字符串的开始的结尾)
// 	　　[10.2]向后查找(但支持向前查找)
// 	　　[10.3]并集和交集类
// 	　　[10.4]原子组
// 	　　[10.5]Unicode支持(单个字符除外)
// 	　　[10.6]命名的捕获组(但支持编号的捕获组)
// 	　　[10.7]s(single单行)和x(free-spacing无间隔)匹配模式
// 	　　[10.8]条件匹配
// 	　　[10.9]正则表达式注释

// [11]常见实例
// 　　[11.1]两种方法找出字符串中所有的数字
// 　　　　[11.1.1]用传统字符串操作
var str1 = 'j1h342jg24g234j 3g24j1';
var array = [];
var temp = '';
for (var i = 0; i < str1.length; i++) {
  var value = parseInt(str1.charAt(i)); // 如果用number将无法排除空格
  if (!isNaN(value)) {
    temp += str1.charAt(i);
  } else {
    if (temp != '') {
      array.push(temp);
      temp = '';
    }
  }
}
if (temp != '') {
  array.push(temp);
  temp = '';
}
console.log(array);

// 　　　　[11.1.2]用正则表达式完成
var str1 = 'j1h342jg24g234j 3g24j1';
array = str1.match(/\d+/g);
console.log(array);

// 　　[11.2]敏感词过滤(replace回调函数的应用)
var string = 'FLG是邪教';
var pattern = /FLG|邪教/g;
var result = string.replace(pattern, function($0) {
  var s = '';
  for (var i = 0; i < $0.length; i++) {
    s += '*';
  }
  return s;
})
console.log(result);

// 　　[11.3]日期格式化
var array = ['2015.7.28', '2015-7-28', '2015/7/28', '2015.7-28', '2015-7.28', '2015/7---28'];

function formatDate(date) {
  return date.replace(/(\d+)\D+(\d+)\D+(\d+)/, '$1' + '年' + '$2' + '月' + '$3' + '日')
}
var result = [];
for (var i = 0; i < array.length; i++) {
  result.push(formatDate(array[i]));
}
console.log(result);

// 　　[11.4]获取网页中的文本内容
var str = '<p>refds</p><p>fasdf</p>'
var pattern = /<[^<>]+>/g;
console.log(str.replace(pattern, ''));

// 　　[11.5]去除首尾空格的trim()兼容写法
var string = ' my name is littlematch ';
console.log(string.replace(/^\s+|\s+$/, ''));

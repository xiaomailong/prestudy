// ECMAScript 6 中的 String 新特性
import 'core-js/shim';

// Unicode 代码点转义 ------------
// Unicode 字符(代码点/code point）21位长。JavaScript 字符串(大约)16位字符序列，编码为utf-16。
// 因此，超出第一个16位代码点范围（基本的多语种窗格，BMP）的代码点是由两个JavaScript字符表示。
// 直到现在，如果你想通过数字指定这样的代码点，你需要两个所谓的Unicode转义。
// 作为一个例子，下面的语句在大部分控制台输出一个rocket(代码点0x1f680):
console.log('\uD83D\uDE80'); // 🚀
// 在ECMAScript 6中，有一种新的Unicode转义，允许您指定任何代码点:
console.log('\u{1F680}'); // 🚀

// 模板字符串 ----------------
// 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
// 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
// 模板字符串中嵌入变量，需要将变量名写在${}之中。
// 大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
// 模板字符串之中还能调用函数。
// 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
// 如果模板字符串中的变量没有声明，将报错。
// 由于模板字符串的大括号内部，就是执行JavaScript代码，因此如果大括号内部是一个字符串，将会原样输出。

// 模板字符串有三个有趣的特性。字符串插值，多行字符串和原始字符串字面值
// 首先，模板字符串支持字符串插值:
let first = 'Jane';
let last = 'Doe';
console.log(`Hello ${first} ${last}!`); // Hello Jane Doe!
// 第二，模板字符串可以包含多行:
let multiLine = `
This is
a string
with multiple
lines`;
console.log(multiLine);
// 第三，如果你用 String.raw 标记字符串前缀，则模板字符串是“原始“的，反斜杠将不是特殊字符，转义符比如 n并不被解释:
let raw = String.raw `Not a newline: \n`;
console.log(raw === 'Not a newline: \\n'); // true
console.log(raw); // Not a newline: \n

// 遍历字符串 ---------------
// 字符串可以迭代，这意味着您可以使用for-of来迭代他们:
for (let ch of 'abc') {
  console.log(ch); // a b c
}
// 您可以使用 spread 操作符 (…) 将字符串转化为数组:
let chars = [...
  'abc'
];
console.log(chars); // ['a'， 'b'， 'c']

// 处理Unicode代码点 ----------
// 字符串迭代器从代码点的边界分割字符串，这意味着它返回的字符串包含一个或两个字符:
for (let ch of 'x\uD83D\uDE80y') {
  console.log(ch, ch.length); // x 1 🚀 2 y 1
}
// 下面是一个快速计算一个字符串的 Unicode 代码点长度的方法:
console.log([...
  'x\uD83D\uDE80y\u{1F680}'
].length); // 4

// 它还帮助反转包含 non-BMP 代码点的字符串:
let str = 'x\uD83D\uDE80y';
// ES5: \uD83D\uDE80 are (incorrectly) reversed
console.log(str.split('').reverse().join('')); // y��x
// ES6: order of \uD83D\uDE80 is preserved
console.log([...str].reverse().join('')); // y🚀x

// 新方法 codePointAt() 返回 [字符串给定索引的代码点的数值]：代码点的数值
console.log(str.codePointAt(0).toString(16)); // 78
console.log(str.codePointAt(1).toString(16)); // 1f680
console.log(str.codePointAt(3).toString(16)); // 79
// 该方法在迭代字符串时工作得很好:
for (let ch of 'x\uD83D\uDE80y') {
  console.log(ch.codePointAt(0).toString(16));
}

// codePointAt() 的反方法是 String.fromCodePoint()：
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'); // true

// 检查包含和重复字符串 -------------
// includes(), startsWith(), endsWith()
// 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
// 这三个方法都支持第二个参数，表示开始搜索的位置。

// 检查一个字符串是否在另一个字符串中存在，有 3 种方法：
console.log('hello'.startsWith('hell')); // true
console.log('hello'.endsWith('ello')); // true
console.log('hello'.includes('ell')); // true
// 每一个方法都有一个可选的第二个参数，它指定搜索字符串的开始或者结束位置:
console.log('hello'.startsWith('ello', 1)); // true
console.log('hello'.endsWith('hell', 4)); // true
console.log('hello'.includes('ell', 1)); // true
console.log('hello'.includes('ell', 2)); // false

// repeat()
// repeat方法返回一个新字符串，表示将原字符串重复n次。
// 参数如果是小数，会被取整。
// 如果repeat的参数是负数或者Infinity，会报错。
// 但是，如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于-0，repeat视同为0。
// 参数NaN等同于0。
// 如果repeat的参数是字符串，则会先转换成数字。
// repeat()方法重复字符串:
console.log('doo '.repeat(3)); // doo doo doo

// 所有的新方法
// 模板字符串:
//    模板字符串标记为“raw”的内容(反斜杠不转义)。
// Unicode 和代码点:
//    将表示Unicode代码点的数值转化为一个字符串。
//    返回开始位置为pos的代码点的数值(包括一个或两个JavaScript“字符”)。
//    代码点的不同的组合可能看起来是一样的。 Unicode normalization 把它们都转换成相同的值，即所谓的标准表示（canonical representation）。
//                                    帮助比较与搜索字符串。‘NFC’格式被推荐用于普通文本。
// 查找字符串:
//    字符串以searchString开始吗 position参数允许您指定的字符串检查的开始位置。
//    字符串以searchString结束吗 endPosition参数允许您指定的字符串检查的结束位置。
//    字符串包含searchString吗 position允许您指定字符串搜索的开始位置。
// 重复字符串:
//    返回重复count次后的字符串。

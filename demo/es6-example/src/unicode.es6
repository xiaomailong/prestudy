// ECMAScript 6 中的 String 新特性
import 'core-js/shim';

// ECMAScript 6（简称ES6），大幅增强了Unicode支持。

(function () {
  // 1. 字符的Unicode表示法
  // JavaScript允许采用\uxxxx形式表示一个字符，其中“xxxx”表示字符的码点。
  // 但是，这种表示法只限于\u0000——\uFFFF之间的字符。
  // 超出这个范围的字符，必须用两个双字节的形式表达。
  console.log('🚀' === '\uD83D\uDE80', '\u1F680' === '🚀', '\u1F680' === '\uD83D\uDE80'); // true false false
  // ES6修正了这个问题，只要将码点放在大括号内，就能正确识别。
  console.log('\u{1F680}' === '\uD83D\uDE80', '\u{1F680}' === '🚀'); // true false

  // 这样JavaScript共有6种方法可以表示一个字符。
  console.log(
    '\z' === 'z',
    // '\172' === 'z', // Error Octal literal in strict mode
    '\x7A' === 'z',
    '\u007A' === 'z',
    '\u{7A}' === 'z');
  // true true true true

  // length 识别
  let str = '\u{1F680}\u{1D306}';
  // 但是，为了保持兼容，length属性还是原来的行为方式。
  // 为了得到字符串的正确长度，可以用下面的方式。
  console.log(str.length, Array.from(str).length); //  4 2


  // 2）码点表示法
  // JavaScript允许直接用码点表示Unicode字符，写法是"反斜杠+u+码点"。
  console.log('好' === '\u597D'); // true
  // 但是，这种表示法对4字节的码点无效。ES6修正了这个问题，只要将码点放在大括号内，就能正确识别。
  console.log('𝌆' === '\u1D306'); // false
  console.log('𝌆' === '\u{1D306}'); // true

  // 2. 字符串处理函数
  // JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。
  // 对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
  // ES6新增了几个专门处理4字节码点的函数。
  // String.fromCodePoint()：从Unicode码点返回对应字符
  // String.prototype.codePointAt()：从字符返回对应的码点
  // String.prototype.at()：返回字符串给定位置的字符

  // ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别辅助平面的字符（编号大于0xFFFF）。
  console.log(String.fromCharCode(0x1F680), String.fromCharCode(0x1D306)); //  팆
  // ES6提供了String.fromCodePoint方法，可以识别0xFFFF的字符，弥补了String.fromCharCode方法的不足。
  console.log(String.fromCodePoint(0x1F680), String.fromCodePoint(0x1D306)); // 🚀 𝌆
  // 注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

  // JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。
  // 对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
  // 对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，
  // 而且charAt方法无法读取字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。
  console.log(str.charAt(0), str.charAt(1), str.charAt(2), str.charAt(3)); // � � � �
  console.log(str.charCodeAt(0).toString(16),
    str.charCodeAt(1).toString(16),
    str.charCodeAt(2).toString(16),
    str.charCodeAt(3).toString(16)); // d83d de80 d834 df06

  // ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
  console.log(str.codePointAt(0).toString(16),
    str.codePointAt(1).toString(16),
    str.codePointAt(2).toString(16),
    str.codePointAt(3).toString(16)); // 1f680 de80 1d306 df06
  console.log(str.at(0), str.at(1), str.at(2), str.at(3)); // 🚀 � 𝌆 �
  // codePointAt方法的参数，是字符在字符串中的位置（从0开始）。
  // 上面代码中，JavaScript将“🚀𝌆”视为四个字符，codePointAt方法在第一个字符上，正确地识别了“🚀”，返回了它的十六进制的1f680。
  // 在第二个字符（即“🚀”的后两个字节），codePointAt方法的结果与charCodeAt方法相同。

  // 总之，codePointAt方法会正确返回四字节的UTF-16字符的码点。
  // 对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。

  // codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
  function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
  }

  console.log(is32Bit("𠮷"), is32Bit("a")); // true false

  // （4）正则表达式
  // ES6提供了u修饰符，对正则表达式添加4字节码点的支持。
  console.log(/^.$/.test('𝌆')); // false
  console.log(/^.$/u.test('𝌆')); // true

  // （5）Unicode正规化
  // 有些字符除了字母以外，还有附加符号。
  // 比如，汉语拼音的Ǒ，字母上面的声调就是附加符号。
  // 对于许多欧洲语言来说，声调符号是非常重要的。

  // Unicode提供了两种表示方法。
  // 一种是带附加符号的单个字符，即一个码点表示一个字符，比如Ǒ的码点是U+01D1；
  // 另一种是将附加符号单独作为一个码点，与主体字符复合显示，即两个码点表示一个字符，比如Ǒ可以写成O（U+004F） + ˇ（U+030C）。
  // 方法一
  console.log('\u01D1'); // 'Ǒ'
  // 方法二
  console.log('\u004F\u030C'); // 'Ǒ'
  // 这两种表示方法，视觉和语义都完全一样，理应作为等同情况处理。但是，JavaScript无法辨别。
  console.log('\u01D1' === '\u004F\u030C'); // false

  // ES6提供了normalize方法，允许"Unicode正规化"，即将两种方法转为同样的序列。
  console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize()); // true
})();

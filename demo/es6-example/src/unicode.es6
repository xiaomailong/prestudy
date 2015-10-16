// ECMAScript 6 中的 String 新特性
import 'core-js/shim';

// ECMAScript 6（简称ES6），大幅增强了Unicode支持。

(function () {
  // （1）正确识别字符
  let str = '\u{1F680}\u{1D306}';
  // 但是，为了保持兼容，length属性还是原来的行为方式。
  // 为了得到字符串的正确长度，可以用下面的方式。
  console.log(str.length, Array.from(str).length); //  4 2
  // ES6可以自动识别4字节的码点。因此，遍历字符串就简单多了。
  for (let s of str) {
    console.log(s);
  }
  for (let s in str) {
    console.log(s, str[s]);
  }

  // 2）码点表示法
  // JavaScript允许直接用码点表示Unicode字符，写法是"反斜杠+u+码点"。
  console.log('好' === '\u597D'); // true
  // 但是，这种表示法对4字节的码点无效。ES6修正了这个问题，只要将码点放在大括号内，就能正确识别。
  console.log('𝌆' === '\u1D306'); // false
  console.log('𝌆' === '\u{1D306}'); // true

  // （3）字符串处理函数
  // ES6新增了几个专门处理4字节码点的函数。
  // String.fromCodePoint()：从Unicode码点返回对应字符
  // String.prototype.codePointAt()：从字符返回对应的码点
  // String.prototype.at()：返回字符串给定位置的字符
  console.log(String.fromCodePoint(0x1D306));
  console.log(str.codePointAt(0).toString(16), str.codePointAt(2).toString(16));
  console.log(str.at(0), str.at(2));

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

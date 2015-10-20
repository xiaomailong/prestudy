import 'core-js/shim';
require('babel/polyfill');

// 数组的扩展

// 1. Array.from() -----------
// Array.from方法用于将两类对象转为真正的数组：
// 类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
console.log(Array.from('hello')); // ['h', 'e', 'l', 'l', 'o']
console.log(Array.from([1, 2, 3])); // [1, 2, 3]
const namesSet = new Set(['a', 'b']);
console.log(Array.from(namesSet)); // ['a', 'b']
// let ps = document.querySelectorAll('p');
// Array.from(ps).forEach(function (p) {
//   console.log(p);
// });
// 上面代码中，querySelectorAll方法返回的是一个类似数组的对象，只有将这个对象转为真正的数组，才能使用forEach方法。

// Array.from方法可以将函数的arguments对象，转为数组。
function foo1() {
  const args = Array.from(arguments);
  console.log(args);
}
foo1('a', 'b', 'c');
// 值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。

// arguments对象
function foo2() {
  const args = [...arguments];
  console.log(args);
}
foo2('a', 'b', 'c');
// NodeList对象
// [...document.querySelectorAll('div')];
// 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
// Array.from方法就不存在这个问题，比如下面的这个例子，扩展运算符就无法转换。

// 任何有length属性的对象，都可以通过Array.from方法转为数组。
console.log(Array.from({
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
})); // [ 'a', 'b' , 'c' ]

// 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
console.log(toArray({
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
})); // [ 'a', 'b' , 'c' ]
// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理。
// Array.from(arrayLike, x => x * x);
// 等同于
// Array.from(arrayLike).map(x => x * x);

console.log(Array.from([1, 2, 3], (xx) => xx * xx)); // [1, 4, 9]

// 下面的例子将数组中布尔值为false的成员转为0。
console.log(Array.from([1, , 2, , 3], (nn) => nn || 0)); // [1, 0, 2, 0, 3]

// 另一个例子是返回各种数据的类型。
function typesOf() {
  return Array.from(arguments, value => typeof value);
}
console.log(typesOf(null, [], NaN)); // ['object', 'object', 'number']

// 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

// Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，你可以在数组里造出任何想要的值。

console.log(Array.from({
  length: 2,
}, () => 'jack')); // ['jack', 'jack']
// 上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

// Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。
// 因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
function countSymbols(string) {
  return Array.from(string).length;
}
console.log(countSymbols('䷀䷁䷂䷃䷄䷅䷆䷇䷈䷉䷊䷋䷌䷍䷎䷏䷐䷑䷒䷓䷔䷕䷖䷗䷘䷙䷚䷛䷜䷝䷞䷟䷠䷡䷢䷣䷤䷥䷦䷧䷨䷩䷪䷫䷬䷭䷮䷯䷰䷱䷲䷳䷴䷵䷶䷷䷸䷹䷺䷻䷼䷽䷾䷿'));


// 2. Array.of() ----------
// Array.of方法用于将一组值，转换为数组。
console.log(Array.of(3, 11, 8)); // [3,11,8]
console.log(Array.of(3)); // [3]
console.log(Array.of(3).length); // 1
// 这个方法的主要目的，是弥补数组构造函数Array()的不足。
// 因为参数个数的不同，会导致Array()的行为有差异。

console.log(Array()); // []
console.log(Array(3)); // [, , ]
console.log(Array(3, 11, 8)); // [3, 11, 8]
// 上面代码说明，只有当参数个数不少于2个，Array()才会返回由参数组成的新数组。

// Array.of基本上可以用来替代new Array()，并且不存在new Array(length)导致的重载。它的行为非常统一。
console.log(Array.of()); // []
console.log(Array.of(undefined)); // [undefined]
console.log(Array.of(1)); // [1]
console.log(Array.of(1, 2)); // [1, 2]

// Array.of方法可以用下面的代码模拟实现。
function arrayOf() {
  return [].slice.call(arguments);
}
console.log(arrayOf()); // []
console.log(arrayOf(undefined)); // [undefined]
console.log(arrayOf(1)); // [1]
console.log(arrayOf(1, 2)); // [1, 2]

// 3. 数组实例的copyWithin() ----------
// 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
// 也就是说，使用这个方法，会修改当前数组。

// Array.prototype.copyWithin(target, start = 0, end = this.length)
// 它接受三个参数。
// target（必需）：从该位置开始替换数据。
// start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
// 这三个参数都应该是数值，如果不是，会自动转为数值。
console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]
// 上面代码表示将从3号位直到数组结束的成员（4和5），复制到从0号位开始的位置，结果覆盖了原来的1和2。

// 将3号位复制到0号位
console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
console.log([1, 2, 3, 4, 5].copyWithin(0, -2, -1)); // [4, 2, 3, 4, 5]

// 将3号位复制到0号位
console.log([].copyWithin.call({
  length: 5,
  3: 1
}, 0, 3)); // {0: 1, 3: 1, length: 5}
console.log(Array.from({
  length: 5,
  3: 1
}).copyWithin(0, 3));
// 将2号位到数组结束，复制到0号位
const i32a = new Int32Array([1, 2, 3, 4, 5]);
console.log(i32a.copyWithin(0, 2)); // Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
console.log([].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4)); // Int32Array [4, 2, 3, 4, 5]

// 4. 数组实例的find()和findIndex() ----------
// 数组实例的find方法，用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
// 如果没有符合条件的成员，则返回undefined。
console.log([1, 4, -5, 10].find((n) => n < 0)); // -5
// 上面代码找出数组中第一个小于0的成员。

console.log([1, 5, 10, 15].find(function (value, index, arr) {
  return value > 9;
})); // 10
// 上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
console.log([1, 5, 10, 15].findIndex(function (value, index, arr) {
  return value > 9;
})); // 2
// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

// 另外，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。
console.log([NaN].indexOf(NaN)); // -1
console.log([NaN].findIndex(y => Object.is(NaN, y))); // 0
// 上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

// 5. 数组实例的fill() ----------
// fill方法使用给定值，填充一个数组。
console.log(['a', 'b', 'c'].fill(7)); // [7, 7, 7]

console.log(new Array(3).fill(7)); // [7, 7, 7]
// 上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
console.log(['a', 'b', 'c'].fill(7, 1, 2)); // ['a', 7, 'c']

// 6. 数组实例的entries()，keys()和values() ----------
// ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。
// 它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，
// 唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

for (const index of['a', 'b'].keys()) {
  console.log(index); // 0  1
}

for (const elem of['a', 'b'].values()) {
  console.log(elem); // 'a' 'b'
}

for (const [index, elem] of['a', 'b'].entries()) {
  console.log(index, elem); // 0 'a'  1 'b'
}

// 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
const letter = ['a', 'b', 'c'];
const entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

// 7.数组实例的includes() ----------
// Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
// 该方法属于ES7，但Babel转码器已经支持。
console.log([1, 2, 3].includes(2));     // true
console.log([1, 2, 3].includes(4));     // false
console.log([1, 2, NaN].includes(NaN)); // true

// 该方法的第二个参数表示搜索的起始位置，默认为0。
// 如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
console.log([1, 2, 3].includes(3, 3));  // false
console.log([1, 2, 3].includes(3, -1)); // true
// 没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。

// if (arr.indexOf(el) !== -1) {
//   // ...
// }
// indexOf方法有两个缺点，
// 一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。
// 二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。
console.log([NaN].indexOf(NaN)); // -1
// includes使用的是不一样的判断算法，就没有这个问题。
console.log([NaN].includes(NaN)); // true

// 下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
// 另外，Map和Set数据结构有一个has方法，需要注意与includes区分。

// Map结构的has方法，是用来查找键名的，
// 比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
// Set结构的has方法，是用来查找值的，
// 比如Set.prototype.has(value)、WeakSet.prototype.has(value)。

// 数组的空位 ----------
// 数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。

console.log(Array(3)); // [, , ,]
// 上面代码中，Array(3)返回一个具有3个空位的数组。

// 注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。
// 空位是没有任何值，in运算符可以说明这一点。

console.log(0 in [undefined, undefined, undefined]); // true
console.log(0 in [, , , ]); // false
// 上面代码说明，第一个数组的0号位置是有值的，第二个数组的0号位置没有值。

// ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。
// forEach(), filter(), every() 和some()都会跳过空位。
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
// forEach方法
[, 'a'].forEach((x, i) => console.log(i)); // 1
// filter方法
console.log(['a', , 'b'].filter(() => true)); // ['a','b']
// every方法
console.log([, 'a'].every(x => x === 'a')); // true
// some方法
console.log([, 'a'].some(x => x !== 'a')); // false
// map方法
console.log([, 'a'].map(() => 1)); // [,1]
// join方法
console.log([, 'a', undefined, null].join('#')); // '#a##'
// toString方法
console.log([, 'a', undefined, null].toString()); // ',a,,'

// ES6则是明确将空位转为undefined。
// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
console.log(Array.from(['a', , 'b'])); // [ 'a', undefined, 'b' ]
// 扩展运算符（...）也会将空位转为undefined。
console.log([...['a', , 'b']]); // [ 'a', undefined, 'b' ]

// copyWithin()会连空位一起拷贝。
console.log([, 'a', 'b', , ].copyWithin(2, 0)); // [,'a',,'a']

// fill()会将空位视为正常的数组位置。
console.log(new Array(3).fill('a')); // ['a','a','a']

// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
// entries()
console.log([...[, 'a'].entries()]); // [[0,undefined], [1,'a']]
// keys()
console.log([...[, 'a'].keys()]); // [0,1]
// values()
console.log([...[, 'a'].values()]); // [undefined,'a']
// find()
console.log([1, 'a'].find(() => true)); // undefined
// findIndex()
console.log([, 'a'].findIndex(() => true)); // 0
// 由于空位的处理规则非常不统一，所以建议避免出现空位。

// 9. 数组推导
// 数组推导（array comprehension）提供简洁写法，允许直接通过现有数组生成新数组。
// 这项功能本来是要放入ES6的，但是TC39委员会想继续完善这项功能，
// 让其支持所有数据结构（内部调用iterator对象），不像现在只支持数组，所以就把它推迟到了ES7。
// Babel转码器已经支持这个功能。

var a1 = [1, 2, 3, 4];
var a2 = [for (i of a1) i * 2];
console.log(a2); // [2, 4, 6, 8]
// 上面代码表示，通过for...of结构，数组a2直接在a1的基础上生成。

// 注意，数组推导中，for...of结构总是写在最前面，返回的表达式写在最后面。
// for...of后面还可以附加if语句，用来设定循环的限制条件。

var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ];

console.log([for (year of years) if (year > 2000) year]); // [ 2006, 2010, 2014 ]

// console.log([for (year of years) if (year > 2000) if (year < 2010) year ]); // [ 2006]

console.log([for (year of years) if (year > 2000 && year < 2010) year]); // [ 2006]
// 上面代码表明，if语句写在for...of与返回的表达式之间，可以使用多个if语句。

// 数组推导可以替代map和filter方法。
console.log([for (i of [1, 2, 3]) i * i]);
// 等价于
console.log([1, 2, 3].map(function (i) { return i * i }));

console.log([for (i of [1, 4, 2, 3, -8]) if (i < 3) i]);
// 等价于
console.log([1, 4, 2, 3, -8].filter(function(i) { return i < 3 }));
// 上面代码说明，模拟map功能只要单纯的for...of循环就行了，模拟filter功能除了for...of循环，还必须加上if语句。

// 在一个数组推导中，还可以使用多个for...of结构，构成多重循环。
const a11 = ['x1', 'y1'];
const a22 = ['x2', 'y2'];
const a33 = ['x3', 'y3'];
console.log([for (s of a11) for (w of a22) for (r of a33) s + w + r]);
// x1x2x3
// x1x2y3
// x1y2x3
// x1y2y3
// y1x2x3
// y1x2y3
// y1y2x3
// y1y2y3
// 上面代码在一个数组推导之中，使用了三个for...of结构。

// 需要注意的是，数组推导的方括号构成了一个单独的作用域，在这个方括号中声明的变量类似于使用let语句声明的变量。

// 由于字符串可以视为数组，因此字符串也可以直接用于数组推导。
console.log([for (c of 'abcde') if (/[aeiou]/.test(c)) c].join('')); // 'ae'
console.log([for (c of 'abcde') c + '0'].join('')); // 'a0b0c0d0e0'
// 上面代码使用了数组推导，对字符串进行处理。

// 数组推导需要注意的地方是，新数组会立即在内存中生成。这时，如果原数组是一个很大的数组，将会非常耗费内存。
// 推导的用法不限于数组，还可以直接使用。
// const results = (
//   for (c of customers)
//     if (c.city === 'Seattle')
//       { name: c.name, age: c.age }
// )

// 10. Array.observe()，Array.unobserve()
// 这两个方法用于监听（取消监听）数组的变化，指定回调函数。

// 它们的用法与Object.observe和Object.unobserve方法完全一致，也属于ES7的一部分，请参阅《对象的扩展》一章。

// 唯一的区别是，对象可监听的变化一共有六种，而数组只有四种：add、update、delete、splice（数组的length属性发生变化）。

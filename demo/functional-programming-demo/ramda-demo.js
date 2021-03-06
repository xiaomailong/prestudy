// JavaScript函数编程-Ramdajs
// http://www.cnblogs.com/whitewolf/p/javascript-functional-programming-Ramdajs.html

// 在JavaScript语言世界，函数是第一等公民。
// JavaScript函数是继承自Function的对象,函数能作另一个函数的参数或者返回值使用，
// 这便形成了我们常说的高阶函数（或称函数对象）。这就构成函数编程的第一要素。
// 在JavaScript世界中有很多的函数式编程库能辅助我们的JavaScript函数式体验，
// 在它们之中最为成功的要数Underscore或lodash。

// 函数式思想展现的是一种纯粹的数学思维。
// 函数并不代表任何物质（对象，相对于面向对象思想而言），而它仅仅代表一种针对数据的转换行为。
// 一个函数可以是原子的算法子（函数），也可以是多个原子算法子组成的组合算法子。
// 它们是对行为的最高抽象，具有非凡的抽象能力和表现力。

// 虽然Underscore或lodash也提供了.compose（或.flowRight）函数来实现函数组合的能力，但ramdajs具有更强的组合力。

// ramdajs是一个更具有函数式代表的JavaScript库，可以在这里了解更多关于它的信息http://ramdajs.com/0.17/。
// 它的这种能力主要来自它自有的两大能力：自动柯里化和函数参数优先于数据。

// 自动柯里化 -------------------
// 在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，
// 并且返回接受余下的参数且返回结果的新函数的技术。
// 这个技术由 Christopher Strachey 以逻辑学家 Haskell Curry 命名的，
// 尽管它是 Moses Schnfinkel 和 Gottlob Frege 发明的。

// 在理论计算机科学中，柯里化提供了在简单的理论模型中比如只接受一个单一参数的lambda 演算中研究带有多个参数的函数的方式。

// ramdajs利用这一技术，默认所有API函数都支持自动柯里化。
// 这为它提供了可以将另一个函数组合的先决条件。
// 如常用的map操作需要接受两个参数，在ramdajs中可以如下两种方式实现：

var R = require('ramda');

var v1 = R.map(function(item) {
	return item * 2;
}, [2, 3, 5]);
console.log(v1); // [4, 6, 10]

var map = R.map(function(item) {
	return item * 2;
});
var v2 = map([1, 4, 7]);
console.log(v2); // [2, 8, 14]
// 如果我们传入2个完备的参数，则R.map函数将会直接执行。否则，它将返回另一个函数，等待参数完备时才执行。

// 函数参数优先于数据 ------------------
// 在UnderScore和lodash这类库中，都要求首先传入数据，然后才是转换函数。
// 而在ramdajs却是颠覆性的改变。在它的规约中数据参数是最后一个参数，而转换函数和配置参数则优于数据参数，排在前面。

// 将转换函数放置在前面，再加上函数的自动柯里化，
// 就可以在不触及数据的情况下，将一个函数算法子包装进另一个算法子中，实现两个独立转换功能的组合。

// 假设，我们拥有如下两个基础算法子:
// 1: R.multiply(a, b)：实现 a *b；
// 2：R.map(func, data)：实现集合 a –> b的map。
// 因为可以自动柯里化，所以有
console.log(R.multiply(10, 2)); // 20
console.log(R.multiply(10)(2)); // 20
// 所以上面对数组map的例子则可以转为如下形式：
var v3 = R.map(R.multiply(2))([2, 5, 10, 80]);
console.log(v3); // [4, 10, 20, 160]

// R.map(R.multiply(2))的返回值也是一个函数，它是一个组合转换函数。
// 它组合了map和multiply行为。
// 它利用R.map组合封装了R.multiply(2)返回的柯里化函数，它等待map函数传入对应的被乘数。

// ramdajs的组合
// 有了上面的两个条件，再加上ramdajs为我们提供的R.compose方法，我们就能很容易的实现更多算法子的组合。
// R.compose是从右向左执行的数据流向。

// 用ramdajs的组合来实现开篇lodash一样的用户名拼接的例子，则我们可以分为2个算法子的组合：
// R.pluck(prop)：选择对象固定属性；
// R.join(data)：对数组的字符串拼接。
// 则代码如下所示：
var users = [{
	'user': 'barney',
	'age': 36
}, {
	'user': 'fred',
	'age': 40
}, {
	'user': 'pebbles',
	'age': 18
}];
var joinUserName = R.compose(R.join(", "), R.pluck("user"));
console.log(joinUserName(users)); // barney , fred , pebbles
// 如果我们希望join用户的年龄，则如下：
var joinUserAge = R.compose(R.join(", "), R.pluck("age"));
console.log(joinUserAge(users)); // 36 , 40 , 18
// 假设我们希望输出的不是用户年龄，而是用户生日，则我们可以轻易组合上一个减法的算法子：
// R.subtract(a, b)：实现 a – b 数学算法。
var joinUserBrithDay = R.compose(R.join(", "), R.map(R.subtract(new Date().getFullYear())), R.pluck("age"));
console.log(joinUserBrithDay(users)); // 1979, 1975, 1997
// 我们希望获取最年轻的用户：
// 可以组合获取第一个元素的R.head算法子和排序算法子R.sortBy：
var youngestUser = R.compose(R.head, R.sortBy(R.prop("age")));
console.log(youngestUser(users)); // Object {user: "pebbles", age: 18}
// 比如我们希望获取年长的用户，则只需再组合一个反序排列的算法子R.reverse：
var olderUser = R.compose(R.head, R.reverse, R.sortBy(R.prop("age")));
console.log(olderUser(users)); // Object {user: "fred", age: 40}

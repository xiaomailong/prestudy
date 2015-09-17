// 给 ES6 标准库一个”腻子”

// Babel 作为一个源到源的编译器不可能呈现所有 ES6 标准库中的新特性，
// 例如 Map 和 Set 构造器和 Array 下的一些新方法。
// 要使用这些我们需要一个”腻子”来填补这些不足。
// 现在有很多 ES6 的腻子比如 core-js，它适用与 Node, io.js 和浏览器。

// 译者注: 本节原始标题为 Polyfilling the standard library，术语 polyfill 来自于一个家装产品Polyfilla:

// Polyfilla 是一个英国产品，在美国称之为 Spackling Paste (刮墙的,在中国称为腻子)。
// 记住这一点就行: 把旧的浏览器想象成为一面有了裂缝的墙.这些 polyfill
// 会帮助我们把这面墙的裂缝抹平,还我们一个更好的光滑的墙壁 (浏览器)

import 'core-js/shim';

export default class Person {

	constructor(name) {
		this.name = name;
	}

	sayHello() {
		return `Hello ${ this.name }!`;
	}

	sayHelloThreeTimes() {
		let hello = this.sayHello();
		return `${ hello } `.repeat(3);
	}
}

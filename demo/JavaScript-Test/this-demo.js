// JavaScript中知而不全的this

// 都说 JavaScript 是一种很灵活的语言，这其实也可以说它是一个混乱的语言。
// 它把函数式编程和面向对象编程糅合一起，再加上动态语言特性，简直强大无比（其实是不能和C++比的，^_^ ）。

// this 本身原本很简单，总是指向类的当前实例，this 不能赋值。
// 这前提是说 this 不能脱离 类/对象 来说，也就是说 this 是面向对象语言里常见的一个关键字。
// 说的极端点，如果你编写的 JS 采用函数式写法，而不是面向对象式，你所有的代码里 this 会少很多，甚至没有。
// 记住这一点，当你使用 this 时，你应该是在使用对象/类 方式开发，否则 this 只是函数调用时的副作用。

// JS 里的 this
// * 在 function 内部被创建
// * 指向调用时所在函数所绑定的对象（拗口）
// * this 不能被赋值，但可以被 call/apply  改变

// 以前用 this 时经常担心，不踏实，你不知道它到底指向谁？ 这里把它所有用到的地方列出
// 1. this 和构造器
// 2. this 和对象
// 3. this 和函数
// 4. 全局环境的 this
// 5. this 和 DOM/事件
// 6. this 可以被 call/apply 改变
// 7. ES5 中新增的 bind 和 this
// 8. ES6 箭头函数(arrow function) 和 this


// 1. this 和构造器
// this 本身就是类定义时构造器里需要用到的，和构造器在一起再自然不过。

/**
 * 页签
 *
 * @class Tab
 * @param nav {string} 页签标题的class
 * @param content {string} 页面内容的class
 *
 */
function Tab(nav, content) {
	this.nav = nav
	this.content = content
}
Tab.prototype.getNav = function() {
	return this.nav;
};
Tab.prototype.setNav = function(nav) {
	this.nav = nav;
};
Tab.prototype.add = function() {};
// 按照 JavaScript 的习惯， this 应该挂属性/字段，方法都应该放在原型上。

// 2. this 和对象
// JS 中的对象不用类也可以创建，有人可能奇怪，类是对象的模板，对象都是从模板里 copy 出来的，没有类怎么创建对象？
// JS 的确可以，并且你完全可以写上万行功能代码而不用写一个类。
// 话说 OOP 里说的是面向对象编程，也没说面向类编程，是吧 ^_^ 。
var tab = {
	nav: '',
	content: '',
	getNav: function() {
		return this.nav;
	},
	setNav: function(n) {
		this.nav = n;
	}
}

// 3. this 和函数
// 首先，this 和独立的函数放在一起是没有意义的，前面也提到过 this 应该是和面向对象相关的。
// 纯粹的函数只是一个低级别的抽象，封装和复用。如下
function showMsg() {
	console.log(this.message);
}
showMsg(); // undefined
// 定义 showMsg，然后以函数方式调用，this.message 是 undefined。
// 因此坚决杜绝在 纯函数内使用 this，但有时候会这么写，调用方式使用 call/apply
function showMsg() {
	console.log(this.message);
}
var m1 = {
	message: '您输入的电话号码不正确'
}
var m2 = {
	message: '您输入的身份证号不正确'
}
showMsg.call(m1); // '输入的电话号码不正确'
showMsg.call(m2); // '输入的身份证号不正确'
// 用这种方式可以节省一些代码量，比如当两个 类/对象 有一共相似的方法时，不必写两份，只要定义一个，然后将其绑定在各自的原型和对象上。
// 这时候其实你还是在使用对象或类（方式1/2），只是间接使用罢了。

// 4. 全局环境的 this

// 前面提到 this 是 “指向调用时所在函数所绑定的对象”， 这句话拗口但绝对正确，没有一个多余的字。
// 全局环境中有不同的宿主对象，浏览器环境中是 window， node 环境中是 global。这里重点说下浏览器环境中的 this。

// 浏览器环境中非函数内 this 指向 window
// alert(window=== this) // true
// 因此你会看很很多开源 JS lib 这么写
// (function() {
//     // ...
//
// })(this);

// (function() {
//     // ...
//
// }).call(this);
// 比如 underscore 和 requirejs，大意是把全局变量 window 传入匿名函数内缓存起来，避免直接访问。
// 至于为啥要缓存，这跟 JS 作用域链有关系，读取越外层的标识符性能会越差。请自行查阅相关知识，再说就扯远了。

// 浏览器中比较坑人，非函数内直接使用 var 声明的变量默认为全局变量，且默认挂在 window 上作为属性。
// var andy = '刘德华'
// alert(andy === window.andy) // true
// alert(andy === this.andy) // true
// alert(window.andy === this.andy) // true

// 因为这个特性，有些笔试题如
// var x = 10;
// function func() {
//     alert(this.x)
// }
// var obj = {
//     x: 20,
//     fn: function() {
//         alert(this.x)
//     }
// }
// var fn = obj.fn
// func() // 10
// fn() // 10
// 没错，最终输出的都是全局的 10。永远记住这一点：判断 this 指向谁，看执行时而非定义时，
// 只要函数(function)没有绑定在对象上调用，它的 this 就是 window。

// 5. this 和 DOM/事件
// W3C 把 DOM 实现成了各种节点，节点嵌套一起形成 DOM tree。
// 节点有不同类型，如文本节点，元素节点等10多种。
// 元素节点又分成了很多，对写HTML的人来说便是很熟悉的标签（Tag），如 div，ul，label 等。
// 看 W3C 的 API 文档，会发现它完全是按照面向对象方式实现的各种 API，有 interface，extends 等。
// 前面说过 this 是指向当前类的实例对象，对于这些 tag 类来说，不看其源码也知它们的很多方法内部用到的 this 是指向自己的。
// 有了这个结论，写HTML和JS时， this 就清晰了很多。
// <!-- this 指向 div -->
// <div onclick="alert(this)"></div>
// <div id="nav"></div>
// <script>
//     nav.onclick = function() {
//         alert(this) // 指向div#nav
//     }
// </script>
// $('#nav').on('click', function() {
//     alert(this) // 指向 nav
// })

// 以上三个示例可以看到，在给元素节点添加事件的时候，其响应函数（handler）执行时的 this 都指向 Element 节点自身。
// jQuery 也保持了和标准一致，但却让人迷惑，按 “this 指向调用时所在函数所绑定的对象” 这个定义，
// jQuery 事件 handler 里的 this，应该指向 jQuery 对象，而非 DOM 节点。
// 因此你会发现在用 jQuery 时，经常需要把事件 handler 里的 element 在用 $ 包裹下变成 jQuery 对象后再去操作。比如
// $('#nav').on('click', function() {
//     var $el = $(this) // 再次转为 jQuery 对象，如果 this 直接为 jQuery 对象更好
//     $el.attr('data-x', x)
//     $el.attr('data-x', x)
// })

// 有人可能有如下的疑问
// <div id="nav" onclick="getId()">ddd</div>
// <script>
//     function getId() {
//         alert(this.id)
//     }
// </script>
// 点击 div 后，为什么 id 是 undefined，不说是指向的 当前元素 div 吗？
// 如果记住了前面提到的一句话，就很清楚为啥是 undefined，把这句话再贴出来。

// 判断 this 指向谁，看执行时而非定义时，只要函数(function)没有绑定在对象上调用，它的 this 就是 window

// 这里函数 getId 调用时没有绑定在任何对象上，可以理解成这种结构
// div.onclick = function() {
//     getId()
// }
// getId 所处匿名函数里的 this 是 div，但 getId 自身内的 this 则不是了。 当然 ES5 严格模式下还是有个坑。

// 6. this 可以被 call/apply 改变

// call/apply 是函数调用的另外两种方式，两者的第一个参数都可以改变函数的上下文 this。
// call/apply 是 JS 里动态语言特性的表征。动态语言通俗的定义

// 程序在运行时可以改变其结构，新的函数可以被引进，已有的函数可以被删除，即程序在运行时可以发生结构上的变化

// 通常有以下几点特征表示它为动态语言
// * 动态的数据类型
// * 动态的函数执行
// * 动态的方法重写

// 动态语言多从世界第二门语言 LISP 发展而来，如死去的 SmallTalk，VB，
// 目前还活着的 Perl，Python， 以及还流行的 Ruby，JavaScript。
// JS 里动态数据类型的体现便是弱类型，执行的时候才去分析标识符的类型。
// 函数动态执行体现为 eval，call/aply。方法重写则体现在原型重写。

// 不扯远，这里重点说下 call/apply 对 this 的影响。
var m1 = {
    message: 'This is A'
}
var m2 = {
    message: 'This is B'
}
function showMsg() {
    console.log(this.message);
}

showMsg(); // undefined
showMsg.call(m1); // 'This is A'
showMsg.call(m2); // 'This is B'
// 可以看到单独调用 showMsg 返回的是 undefined，只有将它绑定到具有 message 属性的对象上执行时才有意义。
// 再延伸下，如果把一些通用函数写好，可以任意绑定在多个类的原型上，这样动态的给类添加了一些方法，还节省了代码。
// 这是一种强大的功能，也是动态语言的强表现力的体现。

// 经常会听到转向 Ruby 或 Python 的人提到“编程的乐趣”，
// 这种乐趣是源自动态语言更接近人的思维（而不是机器思维），更符合业务流程而不是项目实现流程。
// 同样一个功能，动态语言可以用更小的代码量来实现。
// 动态语言对程序员生产力的提高，是其大行其道的主要原因。

// 性能方面，动态语言没有太大的优势，但动态语言的理念是：优化人的时间而不是机器的时间。
// 提高开发者的生产力，宁肯牺牲部分的程序性能或者购买更高配置的硬件。
// 随着IT业的不断发展和摩尔定律的作用，硬件相对于人件一直在贬值，这个理念便有了合理的现实基础。

// JS 里的 call/apply 在任何一个流行的 lib 里都会用到，但几乎就是两个作用
// 配合写类工具实现OOP，如 mootools, ClassJS, class.js,
// 修复DOM事件里的 this，如 jQuery, events.js

// 关于 call 和 apply 复用：利用apply和arguments复用方法
// 关于 call 和 apply 的性能问题参考： 冗余换性能-从Backbone的triggerEvents说开了去

// 7. ES5 中新增的 bind 和 this
// 上面 6 里提到 call/apply 在 JS 里体现动态语言特性及动态语言的流行原因，其在 JS 用途如此广泛。
// ES5发布时将其采纳，提起了一个更高级的方法 bind。
var modal = {
    message: 'This is A'
}
function showMsg() {
    console.log(this.message);
}
var otherShowMsg = showMsg.bind(modal)
otherShowMsg(); // 'This is A'
// 因为是ES5才加的，低版本的IE不支持，可以修复下Function.prototype。
// bind 只是 call/apply 的高级版，其它没什么特殊的。

// 8. ES6 箭头函数(arrow function) 和 this
// ES6 在今年的 6月18日 正式发布（恰京东店庆日同一天，^_^），它带来的另一种类型的函数 - 箭头函数。
// 箭头函数的一个重要特征就是颠覆了上面的一句话，再贴一次

// 判断 this 指向谁，看执行时而非定义时，只要函数(function)没有绑定在对象上调用，它的 this 就是 window

// 是的，前面一直用这句话来判断 this 的指向，在箭头函数里前面半句就失效了。
// 箭头函数的特征就是，定义在哪，this 就指向那。
// 即箭头函数定义在一个对象里，那箭头函数里的 this 就指向该对象。如下
// var book = {
//     author: 'John Resig',
//     init:  function() {
//         document.onclick = ev => {
//             console.log(this.author) ; // 这里的 this 不是 document 了
//         }
//     }
// };
// book.init();
// 对象 book 里有一个属性 author， 有一个 init 方法， 给 document 添加了一个点击事件，
// 如果是传统的函数，我们知道 this 指向应该是 document，但箭头函数会指向当前对象 book。

// 箭头函数让 JS 回归自然和简单，函数定义在哪它 this 就指向哪，
// 定义在对象里它指向该对象，定义在类的原型上，指向该类的实例，这样更容易理解。


// 总结：
// 函数的上下文 this 是 JS 里不太好理解的。
// 在于 JS 函数自身有多种用途，目的是实现各种语言范型（面向对象，函数式，动态）。
// this 本质是和面向对象联系的，和写类，对象关联一起的， 和“函数式”没有关系的。
// 如果你采用过程式函数式开发，完全不会用到一个 this。
// 但在浏览器端开放时却无可避免的会用到 this，这是因为浏览器对象模型（DOM）本身采用面向对象方式开发，
// Tag 实现为一个个的类，类的方法自然会引用类的其它方法，引用方式必然是用 this。
// 当你给DOM对象添加事件时，回调函数里引用该对象就只能用 this 了。

// 8. ES6 箭头函数(arrow function) 和 this
// ES6 在今年的 6月18日 正式发布（恰京东店庆日同一天，^_^），它带来的另一种类型的函数 - 箭头函数。
// 箭头函数的一个重要特征就是颠覆了上面的一句话，再贴一次

// 判断 this 指向谁，看执行时而非定义时，只要函数(function)没有绑定在对象上调用，它的 this 就是 window

// 是的，前面一直用这句话来判断 this 的指向，在箭头函数里前面半句就失效了。
// 箭头函数的特征就是，定义在哪，this 就指向那。
// 即箭头函数定义在一个对象里，那箭头函数里的 this 就指向该对象。如下
var book = {
    author: 'John Resig',
    init:  function() {
        document.onclick = ev => {
            console.log(this.author) ; // 这里的 this 不是 document 了
        }
    }
};
book.init();
// 对象 book 里有一个属性 author， 有一个 init 方法， 给 document 添加了一个点击事件，
// 如果是传统的函数，我们知道 this 指向应该是 document，但箭头函数会指向当前对象 book。

// 箭头函数让 JS 回归自然和简单，函数定义在哪它 this 就指向哪，
// 定义在对象里它指向该对象，定义在类的原型上，指向该类的实例，这样更容易理解。

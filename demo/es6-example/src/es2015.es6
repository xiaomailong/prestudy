
// 最基本的：let和const ------
let a = 1;
const A = 2;

// 模板字符串 ------
const name = 'Jarvis';
const template = `My name is ${name}`;
const tmpl = `text line 1,
    text line 2,
    textline 3`;

// 箭头函数 ------
// 箭头函数通常比匿名函数还要简洁，几乎可以取代所有使用function的地方，不过用起来别太嗨了，下面有这个坑还是值得注意。
const fn1 = () => {
    console.log('hello world');
};
// 箭头函数最大的特点在于this关键字在声明或者定义箭头函数的时候就已经被绑定好了，而且不会改变，
// 这个特性用来解决setTimeout等一些异步函数this会改变的问题很爽，但下面这个却是个大问题：
$('#selector').on('tap', () => {
    $(this).addClass('new');
});
// 这时候的this指向的全局变量，并非我们期望中的那个dom元素。
// 这时候就不适合用箭头函数了，除非你明确知道this指向的谁或者根本用不上this。

// …args ------
function fn2(...args) {
    console.log(args);
};
// 这里的args是个真正的数组了，使用到arguments的地方推荐都换成…args吧，还能避免一些意想不到的坑，比如下面这个。
const fn3 = () => {
    console.log(arguments);
};
// 这时候的arguments映射的是外层函数的arguments，如果使用…args就不会有这个问题。

// 默认参数 ------
// 默认函数参数我想用处非常大了，从此再也不用写一大堆参数判断的代码了。
function fn(params = {}, options = {}, callback = () => {}) {
    // TODO
}
// 再也不用去费力判断哪一个参数才是callback了。 Babel已经完全支持默认参数一些强大的语法，如
function f([x, y] = [1, 2], {z: z} = {z: 3}) {
    return x + y + z;
}

// 对象属性缩写 ------
const url = 'http://www.alloyteam.com';
const type = 'GET';
const timeout = 10000;
$.ajax({
    url, type, timeout
});
// 属性缩写还可与解构赋值搭配使用
const options = {url1: url, type1: type, timeout1: timeout}
const {url1, type1} = options;
const opt = {url1, type1};
// 这样轻松就能让opt成为options的一个子集了，在做字段过滤和参数白名单过滤的时候很有用。

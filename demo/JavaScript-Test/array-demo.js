// JavaScript Array

// 1、常用方法
// 数组构造
var a = new Array(20);  // 长度为20的数组
var b = new Array('red', 'blue', 'white');
var c = ['red', 'blue', 'white']; // 推荐
var d = [];


// length 不是只读，能改变数组长度
var e = [1, 2, 3];
e.length = 1;
console.log(e); // [1]


// 转换方法
var f = ['red', 'blue', 'white'];
console.log(f.toString()); // "red,blue,white"
console.log(f.valueOf()); // ["red", "blue", "white"]
console.log(f.join('|')); // "red|blue|white"

// 栈、队列
var a = [];
var count = a.push(1, 2); // 2 在数组最后推入2项
var b = a.pop();  // 2 取得最后一项并删除其在数组中的位置

var c = a.shift();  // 1 取得第一项并删除其在数组中的位置
var count = a.unshift(1, 2, 3); // 3 在数组开头推入3项

// 排序、翻转
var a = [1, 2, 3, 4, 5];
a.reverse();
console.log(a); // [5, 4, 3, 2, 1]
/* sort方法会调用每个数组项的toString()转型方法，
然后比较得到的字符串，确定如何排序，如果要排序数字，
需要手写比较函数*/
a.sort();
console.log(a); // [1, 2, 3, 4, 5]

// concat
var a = [1, 2, 3];
var b = a.concat(); // 生成副本（可以用来返回数组的深度复制），该数组与a无关 [1, 2, 3]
var c = a.concat([4, 5, 6]);  // [1, 2, 3, 4, 5, 6]
var d = a.concat(4, [5, 6]);  // [1, 2, 3, 4, 5, 6]

// 获取子数组 slice & splice
var a = [1, 2, 3, 4, 5];
var b = a.slice(2); // [3, 4, 5]
var c = a.slice(2, 3); // [3] 开始位置 & 结束位置之前一位 （可以是负数）

// 删除 & 插入
var a = [1, 2, 3, 4, 5];
/* 删除a数组从index=1开始的两项，同时加入'red'、'black'字符串到该位置
返回被删除的项目 */
var b = a.splice(1, 2, 'red', 'black');
console.log(a, b); // [1, "red", "black", 4, 5] [2, 3]

// 位置方法
var a = [1, 2, 3, 4, 5, 4, 3, 2, 1];
/* 查找index=2开始的第一次出现3的位置，如没有，返回-1 */
var b = a.indexOf(3, 2); // 2
/* 反向查找index=7开始的第一次出现1的位置，如没有，返回-1 */
var c = a.lastIndexOf(1, 7);  // 0

// 如果要在一个数组前后添加另外一个数组的元素，可以使用apply()方法：
var a = [1, 2, 3];
var b = [4, 5];
// 同样的适用于unshift()
Array.prototype.push.apply(a, b);
console.log(a); // [1, 2, 3, 4, 5]

// 另外因为数组也是特殊的对象，所以for in、Object.keys()等方法它也是可以用的（虽然效率上不敢保证）：
var a = [1, 2, 3, 4];
console.log(Object.keys(a)); // ["0", "1", "2", "3"]
for (var i in a) {
  console.log(i);
}

// 2、迭代方法
// ECMAScript5为数组定义了5个迭代方法。每个方法都接收两个参数：
// 要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响this的值。
// 传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。
// every()： 对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true。
// some()： 对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true。
// filter()： 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。
// forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。
// map()： 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

var nums = [1, 2, 3, 4, 5, 6, 7];

// false 每一项都要满足
var a = nums.every(function(item, index, array) {
  return item > 2;
});
console.log(a);

// true 一项满足即可
var b = nums.some(function(item, index, array) {
  return item > 2;
});
console.log(b);

// [1, 3, 5, 7]  根据某条件筛选数组
var c = nums.filter(function(item, index, array) {
  return item & 1;
});
console.log(c);

// [1, 0, 1, 0, 1, 0, 1]
var d = nums.map(function(item, index, array) {
  return item & 1;
});
console.log(d);

// 跟for类似，会遍历所有数组元素（忽略return）
nums.forEach(function(item, index, array) {
	console.log(item, index, array);
})

// 3、归并方法
// ECMAScript5还新增了两个归并数组的方法：reduce()和reduceRight()。
// 这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。
// 其中，reduce()方法从前往后，reduceRight()从后往前。

// 这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。
// 传给reduce()和reduceRight()的函数接收4个参数：前一个值、当前值、项的索引和数组对象。
// 这个函数返回的任何值都会作为第一个参数自动传给下一项。
// 如果reduce()方法接受了第二个参数，则第一次迭代发生在数组的第一项，这时的pre值就是第二个参数值；
// 如果没有第二个参数，则第一次迭代发生在数组的第二项，这时的pre则是数组第一项值。

var nums = [1, 2, 3, 4, 5];
var add = 0;
// sum === 15
var sum = nums.reduce(function(pre, item, index, array) {
  return pre + item;
}, add);
console.log(sum);
// 利用reduce()函数可以求数组最大值（尽管我们知道用Math.max.apply更加方便）：

var a = [3, 1, 4, 2, 5];
var maxn = a.reduce(function(pre, item) {
  return Math.max(pre, item);
});
console.log(maxn); // 5

// 求value的最大值
var b = {a:3, b:1, c:4, d:2, e:5};
var _maxn = Object.keys(b).reduce(function(pre, item) {
  return Math.max(pre, b[item]);
}, -Number.MAX_VALUE);
console.log(_maxn); // 5

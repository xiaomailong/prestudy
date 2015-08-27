// JavaScript Array
// Array:数组中的每一项可以保存任何类型的数据，且数组的大小是动态调整的(最多可包含4294967295项，大约43亿项)

// [1.1]数组创建:

// [1.1.1]使用Array构造函数(在使用Array构造函数时，也可以省略New操作符)
var colors = new Array();
console.log(colors);
var colors = new Array(20);
console.log(colors);
var colors = new Array('red', 'blue', 'green');
console.log(colors);
var colors = Array(3);
console.log(colors);
// [注意]若传递的是数值，则会按照该数值创建包含给定项数的数组；
// 如果传递的是其他类型的参数，则会创建包含那个值的只有一项的数组
var colors = new Array(3); // 包含三项的数组
console.log(colors);
var colors = new Array('Greg'); // 包含一项，且该项为"Greg"的数组
console.log(colors);

// [1.1.2]使用数组字面量表示法(用该方法不会调用Array构造函数)
var colors = ['red', 'blue', 'green'];
console.log(colors);
var colors = [];
console.log(colors);
// var colors = [1,2,]; // [不可用]
//在IE8及以前中会包含一个三个项目,且每个项目为1、2和undefined的数组。在其他浏览器中为只包含1和2的数组
// var colors = [,,,]; // [不可用]
//在IE8及以前会创建4项的数组,而在其他浏览器中会创建3项的数组

// [1.2]数组读写

// [1.2.1]在读取和设置数组的值时，要使用方括号并提供相应值的基于0的数字索引，
//        数组的项数保存在其length属性中，这个属性始终会返回0或更大的值

// [1.2.2]数组的length属性可读可写，通过设置数组的Length属性，可以从数组的末尾移除项或向数组中添加新项
var colors = ['red', 'blue', 'green'];　　
colors.length = 2;　　
console.log(colors[2]); //undefined
colors.length = 4;　　
console.log(colors[3]); //undefined

// [1.2.3]利用length属性可以方便地在数组末尾添加新项
console.log(colors.length);
colors[colors.length] = 'black';
console.log(colors.length);
console.log(colors);

// [1.2.4]当把一个值放在超出数组大小的位置上时，数组就会重新计算其长度值，即长度值等于最后一项的索引加1
var colors = ['red', 'blue', 'green'];
colors[99] = 'black';
console.log(colors.length); // 100

// [1.3]数组检测

// [1.3.1]if(value instanceof Array){}:
//        问题在于它假定只有一个全局执行环境，如果网页中包含多个框架，
//        那实际上就存在两个以上不同的全局环境，从而存在两个以上不同版本的Array构造函数。
//        如果从一个框架向另一个框架传入一个数组，
//        那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

// [1.3.2]ECMAScript5新增了Array.isArray()方法:
//        if(Array.isArray(value)){}。
//        该方法的目的是最终确定某个值到底是不是数组，而不管它在哪个全局环境中创建的

// [1.4]数组转换
// [注意]如果数组中的某一项的值是null或者undefined，
//      那么该值在join()、toLocaleString()、toString()和valueOf()方法返回的结果中以空字符串表示

// [1.4.1]toString():返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串
// [1.4.2]valueof():返回的还是数组
var colors = ['red', 'blue', 'green'];
console.log(colors.valueOf()); // ['red','blue','green']
console.log(colors.toString()); //'red,blue,green'
console.log(colors); // ['red','blue','green']
//  [注意]由于alert()要接收字符串参数，它会在后台调用toString()方法，会得到与toString()方法相同的结果

// [1.4.3]toLocaleString():它会创建一个数组值以逗号分隔的字符串，而每一项的值调用的是toLocaleString()方法
console.log(colors.toLocaleString()); // 'red,blue,green'
var person1 = {
	toLocaleString: function() {
		return 'Nikolaos';
	},
	toString: function() {
		return 'Nicholas';
	}
};
var person2 = {
	toLocaleString: function() {
		return 'Grigorios';
	},
	toString: function() {
		return 'Greg';
	}
};
var people = [person1, person2];
console.log(people); // Nicholas,Greg
console.log(people.toString()); // Nicholas,Greg
console.log(people.toLocaleString()); // Nikolaos,Grigorios

// [1.4.4]join:可以使用不同的分隔符来构建这个字符串,join只接收一个字符，
//        用作分隔符的字符串，然后返回包含所有数组项的字符串
var colors = ['red', 'green', 'blue'];
console.log(colors.join(',')); // 'red,green,blue'
console.log(colors.join('||')); // 'red||green||blue'
console.log(colors.join()); // 'red,green,blue'
console.log(colors.join(undefined)); // 'red,green,blue'[注意]在IE7及以前会使用undefined作为分隔符

// [1.5]数组方法

// [1.5.1]栈方法:栈是一种LIFO(last-in-first-out)后进先出的数据结构,也就是最新添加的项最早被移除。
//        栈中项的插入(叫做推入)和移除(叫做弹出)只发生在栈的顶部。
// [1.5.1.1]push()方法:可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。
// [1.5.1.2]pop()方法:从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。

// [1.5.2]队列方法:队列是一种FIFO(first-in-first-out)先进先出的数据结构，
//        队列在列表的末端添加项，从列表的前端移除项。
// [1.5.2.1]shift():移除数组中的第一个项并返回该项,同时数组的长度减1(结合使用shift()和push()可以模拟队列)
// [1.5.2.2]unshift():在数组前端添加任意个项并返回新数组长度(结合使用unshift()和pop()从相反方向模拟队列)
// [注意]IE7及以下unshift()方法返回的总是undefined

// [1.5.3]排序方法:
// [1.5.3.1]reverse():反转数组的顺序,返回经过排序之后的数组
// [1.5.3.2]sort():按升序排列数组项,sort方法会调用每个数组项的toString()方法，
//          然后比较得到的字符串排序,返回经过排序之后的数组
// [注意]sort()方法可以接受一个比较函数作为参数，以便指定哪个值在哪个值的前面。
//      比较函数接收两个参数，如果第一个参数应该位于第二个参数之前则返回一个负数，如果两个参数相等则返回0，
//      如果第一个参数应该位于第二个参数之后则返回一个正数
// [比较函数] (使用：e.g. array1.sort(compare);)
function compare(value1, value2) {
	if (value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
	} else {
		return 0;
	}
}
// 对于数值类型或valueOf()方法会返回数值类型的对象类型，比较函数可以简化为：
function compare(value1, value2) {
	return value2 - value1;
}
// [tips]:常用以下方法来创建一个随机数组
function compare() {
	return Math.random() - 0.5;
}

// [1.5.4]操作方法(切开、连接、插入、删除、替换):
// [1.5.4.1]concat():基于当前数组中的所有项创建一个新数组, 先创建当前数组一个副本,
//          然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组(concat()不影响原数组)
// [注意1]没有给concat()方法传递参数时，它只是复制当前的数组
// [注意2]如果参数是一个或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中
// [注意3]如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾
var numbers = [1, 2];
console.log(numbers.concat()); // [1,2]
console.log(numbers.concat([5, 4, 3], [3, 4, 5], 1, 2)); //[1,2,5,4,3,3,4,5,1,2];

// [1.5.4.2]slice():基于当前数组中的一个或多个项创建一个新数组,接受一个或两个参数,
//          即要返回项的起始和结束位置，最后返回新数组(slice()不影响原数组)
// [注意1]没有参数时，返回原数组
// [注意2]只有一个参数时，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项
// [注意3]两个参数时，该方法返回起始位置和结束位置之间的项，但不包括结束位置的项
// [注意4]若参数为负数时，则用数组长度加负数作为参数
// [注意5]若结束位置小于开始位置，则返回空数组
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.slice()); // [1,2,3,4,5]
console.log(numbers.slice(2)); // [3,4,5]
console.log(numbers.slice(2, 3)); // [3]
console.log(numbers.slice(-3)); // -3+5=2 -> [3,4,5]
console.log(numbers.slice(2, 1)); // []

// [1.5.4.3]splice():原数组变为修改后的数组，而splice()返回从原数组中删除的项组成的数组,若无删除项则返回空数组
// [a]删除:两个参数为要删除的第一项的位置、要删除的项数
// [b]插入:三个参数为起始位置、0(要删除的基数)、要插入的项
// [c]替换:三个参数为起始位置、要删除的项数、要插入的项
// [注意1]若第一个参数为负数时，则用数组长度加负数作为参数
// [注意2]若第二个参数为负数时，则用0作为参数
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.splice(0, 2), numbers); // [1,2] [3,4,5]
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.splice(1, 0, 11, 12), numbers); // [] [1,11,12,2,3,4,5]
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.splice(1, 3, 11, 12), numbers); // [2,3,4] [1,11,12,5]
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.splice(-4, 3, 11, 12), numbers); // -4+5=1 -> [2,3,4] [1,11,12,5]
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.splice(-4, -3, 11, 12), numbers); // -4+5=1 -> [] [1,11,12,2,3,4,5]

// [1.5.5]位置方法(ECMAScript5):两个参数：要查找的项、表示查找起点位置的索引(可选)。
//        返回第一个满足条件的查找项在数组中的位置，如果没有找到则返回-1(位置方法不会影响原数组)
// [注意]在比较时，使用全等操作符
// [1.5.5.1]indexOf()
// [1.5.5.2]lastIndexOf()
var person = {
	name: 'Nicholas'
};
var people = [{
	name: 'Nicholas'
}];
var morePeople = [person];
console.log(people.indexOf(person)); // -1,因为person和people[0]虽然值相同，但是是两个引用
console.log(morePeople.indexOf(person)); // 0，因为person和morepeople[0]是同一个引用
console.log(morePeople.indexOf({
	name: 'Nicholas'
})); // -1,因为不是同一个引用
// [tips]若返回满足条件的项的所有索引值
function allIndexOf(array, value) {
	var result = [];
	var pos = array.indexOf(value);
	if (pos === -1) {
		return -1;
	}
	while (pos > -1) {
		result.push(pos);
		pos = array.indexOf(value, pos + 1);
	}
	return result;
}
var array = [1, 2, 3, 3, 2, 1];
console.log(allIndexOf(array, 1)); // [0,5]
console.log(allIndexOf(array, 2)); // [1,4]
console.log(allIndexOf(array, 3)); // [2,3]

// [1.5.6]迭代方法(ECMAScript5):两个参数：要在每一项上运行的函数、运行该函数作用域对象——影响this的值(可选)。
//        传入这些方法中的函数会接收三个参数:数组项的值、该项在数组中的位置、数组对象本身(迭代方法不会影响原数组)
// [1.5.6.1]every():对数组中的每一项运行给定函数，如果该函数对每一项都返回true,则返回true
// [1.5.6.2]filter():对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组(常用于查询符合条件的所有数组项)
// [1.5.6.3]forEach():对数组中的每一项运行给定函数，这个方法没有返回值(相当于for循环)
// [1.5.6.4]map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组(常用于创建包含项与另一个数组一一对应的数组)
// [1.5.6.5]some():对数组中的每一项运行给定函数，如果该函数对任一项返回true,则返回true
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var sum = 0;
var everyResult = numbers.every(function(item, index, array) {
	return (item > 2);
});
console.log(everyResult); // false
var filterResult = numbers.filter(function(item, index, array) {
	return (item > 2)
});
console.log(filterResult); // [3,4,5,6,7,8,9]
var forEachResult = numbers.forEach(function(item, index, array) {
	sum += item;
	return (item > 2)
});
console.log(forEachResult, sum); // undefined    45
var mapResult = numbers.map(function(item, index, array) {
	return (item * 2)
});
console.log(mapResult); // [2,4,6,8,10,12,14,16,18,0]
var someResult = numbers.some(function(item, index, array) {
	return (item > 2)
});
console.log(someResult); // true
// [tips]
function logArray(value, index, array) {
	console.log(value);
}
[2, 5, , , , , 9].forEach(logArray); // 2 5 9

// [1.5.7]归并方法(ECMAScript5):迭代数组的所有项，构建一个最终返回的值。
//        接收两个参数:一个在每一项上调用的函数、作为归并基础的初始值(可选)。
//        传给reduce()和reduceRight()的函数接受4个参数:前一个值、当前值、项的索引和数组对象。
//        这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上。
//        因此，第一个参数是数组第一项，第二个参数是数组第二项(归并方法不会影响原数组)
// [1.5.7.1]reduce()
// [1.5.7.2]reduceRight()
var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var sum1 = values.reduce(function(prev, cur, index, array) {
	return prev + cur;
})
var sum2 = values.reduce(function(prev, cur, index, array) {
	return prev + cur;
}, 1000)
console.log(sum1, sum2); // 55 1055






// 1、常用方法
// 数组构造
var a = new Array(20); // 长度为20的数组
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
var b = a.pop(); // 2 取得最后一项并删除其在数组中的位置

var c = a.shift(); // 1 取得第一项并删除其在数组中的位置
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
var c = a.concat([4, 5, 6]); // [1, 2, 3, 4, 5, 6]
var d = a.concat(4, [5, 6]); // [1, 2, 3, 4, 5, 6]

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
var c = a.lastIndexOf(1, 7); // 0

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
var b = {
	a: 3,
	b: 1,
	c: 4,
	d: 2,
	e: 5
};
var _maxn = Object.keys(b).reduce(function(pre, item) {
	return Math.max(pre, b[item]);
}, -Number.MAX_VALUE);
console.log(_maxn); // 5

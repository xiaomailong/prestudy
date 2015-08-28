// Javascript原生对象之单体内置对象(Global、Math)
// [1]Global
// [1.1]定义:Global对象是一个终极的“兜底儿对象”,不属性于任何其他对象的属性和方法,最终都是它的属性和方法
// [注意]所有在全局作用域中定义的属性和函数都是Global对象的属性。
//      诸如isNaN()、isFinite()、parseInt()、parseFloat()等实际上都是Global对象的方法
//
// [1.2]编码方法
// 　　[1.2.1]encodeURI():对整个URI进行编码,用特殊的UTF-8替换所有无效的字符
// 　　　　[注意1]encodeURI()的不编码字符有82个:! # $ & ' ( ) * + , - . / : ; = ? @ _ ~ 0-9 a-z A-Z
// 　　[1.2.2]encodeURIComponent():对URI的某一段进行编码(常用于GET方法传递参数),用特殊的UTF-8替换所有无效的字符
// 　　　　[注意1]encodeURIComponent()的不编码字符有71个:! ' ( ) * - . _ ~ 0-9 a-z A-Z
// 　　　　[注意2]一般来说,使用encodeURIComponent()比encodeURI()要多,因为在实践中更常见的是查询字符串参数而不是对基础URI编码
// 　　[1.2.3]decodeURI():解码encodeURI()
// 　　[1.2.4]decodeURIComponent():解码encodeURIComponent()
var uri = "http://www.wrox.com/illegal value.htm#start";
console.log(encodeURI(uri)); // http://www.wrox.com/illegal%20value.htm#start
console.log(encodeURIComponent(uri)); // http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start
var uri = 'http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start';
console.log(decodeURI(uri)); // http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start
console.log(decodeURIComponent(uri)); // http://www.wrox.com/illegal value.htm#start

// 　　[1.2.5]escape:对字符串进行编码,将字符的unicode编码转化为16进制序列
// 　　　　[注意1]escape()的不编码字符有69个:* + - . / @ _ 0-9 a-z A-Z
// 　　　　[注意2]ECMAScript3中反对escape()的使用,并建议用encodeURI和encodeURIComponent代替,不过escape()依然被广泛的用于cookie的编码,因为escape()恰好编码了cookie中的非法字符并且对路径中常出现的“/”不进行编码。
// 　　[1.2.6]unescape():解码escape()

// [1.3]eval():像一个完整的ECMAScript解析器,只接受一个参数,即要执行的JavaScript字符串。当解析器发现代码中调用eval()方法时,它会将传入的参数当作实际的ECMAScript语句来解析,然后把执行结果插入到原位置
// 　　[注意]在严格模式下,外部访问不到eval()中创建的任何变量或函数,为eval赋值也会导致错误
// 　　[tips]能够解释字符串的能力非常强大,但也非常危险。当用它执行用户输入数据时,可能会有恶意用户输入威胁站点或应用程序字符的代码,就是所谓的代码注入

// [1.4]Global的所有属性(共18个)
// undefined NaN Infinity Object Array Function Boolean String Number Date RegExp Error EvalError RangeError ReferenceError SyntaxError TypeError URIError
// 　　[tips]禁止给undefined、NaN和Infinity赋值
// console.log(Global);

// [1.5]window对象:Web浏览器将Global全局对象作为window对象的一部分加以实现。因此,在全局作用域中声明的所有变量和函数都成为了window对象的属性
// var color = 'red';
// function sayColor(){
//     console.log(window.color);
// }
// window.sayColor(); // red

// [2]Math
// console.log(Math);
// [2.1]属性
// Math.E 　　　　	　　	自然对数的底数，即常量e的值
// Math.LN10 　　	　　  10的自然对数
// Math.LN2　　　 　　  2的自然对数
// Math.LOG2E 　 　　   以2为底e的对数
// Math.LOG10E   　　   以10为底e的对数
// Math.PI 　　　  　　  派的值
// Math.SQRT1_2　　    1/2的平方根，即2的平方根的倒数
// Math.SQRT2 　　       2的平方根
console.log(Math.E); //2.718281828459045
console.log(Math.LN10); //2.302585092994046
console.log(Math.LN2); //0.6931471805599453
console.log(Math.LOG2E); //1.4426950408889634
console.log(Math.LOG10E); //0.4342944819032518
console.log(Math.PI); //3.141592653589793
console.log(Math.SQRT1_2); //0.7071067811865476
console.log(Math.SQRT2); //1.4142135623730951

// [2.2]方法
// Math.min() 　　　　　 　　 返回一组数字中的最小值
// Math.max() 　　　　  	　　	返回一组数字中的最大值
// Math.ceil(num) 　　   	　　  向上舍入为整数
// Math.floor(num) 　　  　　  向下舍入为整数
// Math.round(num)　　 　　  四舍五入为整数
// Math.random() 　　    　　  返回大于等于0小于1的一个随机数
// Math.abs(num)	　　　 　　 返回num的绝对值
// Math.exp(num)	　　  	　　  返回Math.E的num次幂
// Math.log(num)	　　   　　   返回num的自然对数
// Math.pow(num,power)	　    返回num的power次幂
// Math.sqrt(num)	　　　　　  返回num的平方根
// Math.acos(x)	　　　　　　  	返回x的反余弦值
// Math.asin(x)	　　　　　　   	返回x的反正弦值
// Math.atan(x) 　　　　　　  	返回x的反正切值
// Math.atan2(y,x)　　　　　   返回y/x的反正切值
// Math.cos(x)	　　　　　　    	返回x的余弦值
// Math.sin(x)	　　　　　　　   返回x的正弦值
// Math.tan(x) 　　　　　　     返回x的正切值
console.log(Math.min(1, 2, 3)); // 1
console.log(Math.max(1, 2, 3)); // 3
console.log(Math.ceil(12.6)); // 13
console.log(Math.floor(12.6)); // 12
console.log(Math.round(12.6)); // 13
console.log(Math.random()); // 0.741887615993619
console.log(Math.abs(-10)); // 10
console.log(Math.exp(0)); // 1
console.log(Math.log(10)); // 2.302585092994046
console.log(Math.pow(10, 2)); // 100
console.log(Math.sqrt(100)); // 10
console.log(Math.acos(1) * 180 / Math.PI); // 0
console.log(Math.asin(1) * 180 / Math.PI); // 90
console.log(Math.atan(1) * 180 / Math.PI); // 45
console.log(Math.atan2(1, 1) * 180 / Math.PI); // 45
console.log(Math.cos(60 * Math.PI / 180)); // 0.5000000000000001
console.log(Math.sin(30 * Math.PI / 180)); // 0.49999999999999994
console.log(Math.tan(45 * Math.PI / 180)); // 0.9999999999999999

// [注意]最大值和最小值方法常用于避免多余的循环和在if语句中确定一组数的最大值
// 　　[tips1]找到数组中的最大或最小值
var values = [1, 2, 3, 4, 5, 6, 7, 8];
var max = Math.max.apply(Math, values); // 8
// 　　[tips2]从某个整数范围内随机选择一个值
// 　　value = Math.floor(Math.random()*可能值的总数 + 第一个可能的值)
// 　　[tips3]通过最小值和最大值随机选择一个值
function selectFrom(lowerValue, upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}
var num = selectFrom(2, 10);
console.log(num);

// Javascript类型系统之基本数据类型
// [0]6种数据类型：
//     [0.1]基本数据类型：Undefined、Null、Boolean、Number、String
//         [0.1.1]基本类型值是指简单的数据段，5种基本类型是按值访问的，因为可以操作保存在变量中的实际值
//         [0.1.2]基本类型的值在内存中占据固定大小的空间，被保存在栈内存中。
//                从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本。
//         [0.1.3]不能给基本类型的值添加属性
//
//     [0.2]引用数据类型：Object
//         [0.2.1]引用类型值是指那些可以由多个值构成的对象。js不允许直接访问内存中的位置，也就是不能直接访问操作对象的内存空间。
//                在操作对象时，实际上是在操作对象的引用而不是实际的对象。
//         [0.2.2]引用类型的值是对象，保存在堆内存中，包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针。
//                从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象。
//         [0.2.3]对于引用类型的值，可以为其添加属性和方法，也可以改变和删除其属性和方法


// [1]Undefined
//     [1.1]Undefined类型只有一个值，就是undefined
//     [1.2]var a <=> var a = undefined;
var a;
var b = undefined;
//     [1.3]对于尚未声明过的变量，只能执行一项操作，就是使用typeof操作符检测其数据类型【但在严格模式下会导致错误】
//     [1.4]出现场景：
//         [1.4.1]已声明未赋值的变量
//         [1.4.2]获取对象不存在的属性
//         [1.4.3]无返回值的函数的执行结果
//         [1.4.4]函数的参数没有传入
//         [1.4.5]void(expression)
console.log(undefined === void(0)); // false
//     [1.5]类型转换
console.log(Boolean(undefined)); // false
console.log(Number(undefined)); // NaN
console.log(String(undefined)); // undefined

// [2]Null
//     [2.1]Null类型只有一个值，就是null,逻辑角度看，null值表示一个空对象指针
//     [2.2]如果定义的变量将用于保存对象，最好将该变量初始化为null
//     [2.3]实际上undefined值是派生自null值的，所以undefined == null
console.log(undefined == null); // true
console.log(undefined === null); // false
//     [2.4]出现场景：对象不存在时
//     [2.5]类型转换
console.log(Boolean(null)); // false
console.log(Number(null)); // 0
console.log(String(null)); // null
//     [注意1]null是空对象指针，而[]是空数组，{}是空对象，三者不相同
//     [注意2]null不能添加自定义属性

// [3]Boolean
//     [3.1]Boolean类型只有两个值：true 和 false
//     [3.2]出现场景：
//         [3.2.1]条件语句导致系统执行的隐士类型转换
//         [3.2.2]字面量或变量定义
//     [3.3]类型转换
console.log(Number(true)); // 1
console.log(Number(false)); // 0;
console.log(String(true)); // true
console.log(String(false)); // false
//     [3.4]Boolean()
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
//        Boolean(非空对象包括空数组[]和空对象{}):true
console.log(Boolean([1])); // true
console.log(Boolean([])); // true
console.log(Boolean({
	name: "Tom"
})); // true
console.log(Boolean({})); // true
//        Boolean(非0): true || Boolean(0和NaN):false
console.log(Boolean(123)); // true
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
//        Boolean(非空包括空格字符串):true || Boolean(''):false
console.log(Boolean('123')); // true
console.log(Boolean('')); // false
console.log(Boolean("")); // false
//     [注意]true不一定等于1,false也不一定等于0

// [4]Number
//     [4.1]Number类型使用IEEE754格式来表示整数和浮点数值
//     [注意]可以用一个值-0来将其转换成一个数字

// 	  [4.2]三种字面量格式是十进制、八进制、十六进制
//         [4.2.1]八进制字面值的第一位必须是0，然后是八进制数字序列(0-7),
//                如果字面值中的数值超出了范围，那么前导0将被忽略，后面的数值被当作十进制数解析
//         [4.2.2]八进制字面量在严格模式下是无效的，会导致js抛出错误
//         [4.2.3]十六进制字面值的前两位必须是0x,后跟十六进制数字序列，字母可大写可小写
//         [4.2.4]十六进制中字面值中的数值走出范围，如出现g,h等会报错
//         [4.2.5]在进行算术计算时，所有以八进制和十六进制表示的数值最终都将被转换成十进制数值

//     [4.3]数值表示：
//         [4.3.1]js中可以保存正0和负0，且被认为相等
//         [4.3.2]浮点数值：该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字。
//             [4.3.2.1]由于浮点型数值需要的内存空间是保存整数值的两倍，因此js会不失时机地将浮点数值转换成整数值，
//                      若小数点后没有跟任何数字或者浮点值本身表示的就是一个整数，这个数值会作为整数值来保存。
//             [4.3.2.2]浮点数值的最高精度是17位小数
//             [4.3.2.3]对于极大或者极小的数，可以用科学计数法e来表示的浮点数值来表示
//             [4.3.2.4]默认情况下，js会将小数点后面带有6个0以上的浮点数值转换为以e表示法表示的数值
//             [4.3.2.5]基于IEEE754数值的浮点计算的通病是舍入误差的问题。如：0.1+0.2 === 0.3(15个0)4

//         [4.3.3]js中的数值范围是Number.MIN_VALUE(5e-324) —— Number.MAX_VALUE(1.7976931348623157e+308)
//             [4.3.3.1]如果超出正数范围，输出Infinity(正无穷大)，超出负数范围，输出-Infinity(负无穷大)
//             [4.3.3.2]+-Infinity不能参与数值计算
//             [4.3.3.3]Number.MAX_VALUE+1 != Infinity,因为计算机最多保存52位尾数位，
//                     保存不了1000多位，早就失去精度，即小数位全为0，所以相加不变
//             [4.3.3.4]Number.MIN_VALUE - 1 != -Infinity,也是同样的原因，所以结果为-1
//             [4.3.3.5]可以用isFinite()来确定一个数值是不是有穷的,包含着隐式类型转换Number()
//             [4.3.3.6]isFinite(NaN) //false

//         [4.3.4]NaN
//             [4.3.4.1]NaN与任何值都不相等，包括NaN本身
//             [4.3.4.2]任何涉及NaN的操作都会返回NaN
//             [4.3.4.3]isNaN()来判断这个数字是不是NaN,包含着隐式类型转换Number()

//     [4.4]数值转换:Number()可用于任何类型，parseInt()和parseFloat专门用于把字符串转换成数值
//     [注意1]Number()、parseInt()、parseFloat()可以接受各种进制的数字，但对于含数字的字符串并不适用
//     [注意2]Number()、parseInt()、parseFloat()中数字为1.2. 会报错，但字符串为'1.2.'则不会报错
//  　 [注意3]Number()、parseInt()、parseFloat()解析字符串时都能识别前置空格并去掉

//         [4.4.1]Number()
//             Number(true):1 || Number(false):0
//             Number(各种进制的数字)：运算后的十进制的数字，如1.0或1.或01会以1输出
//             Number(undefined):NaN
//             Number(null):0
//             Number(字符串)：
//                 Number(只包含数字的十进制和十六进制的字符串)：运算后的十进制的数字
//                 [注意]字符串中不识别八进制，按照十进制数字处理
//                 Number(''和' '):0
//                 Number(其他情况的字符串):NaN
//             Number(对象)：
//                 Number([]和[0]和[-0]):0
//                 Number([数字])：运算后的数字
//                 Number([1,2]和{}和其他对象):NaN

//         [4.4.2]parseInt()：在转换字符串时，会忽略字符串前面的空格，直到找到第一个非空格字符。
//               如果第一个字符不是数字字符或者负号，parseInt()就会返回NaN。
//               如果是，则继续解析，直到解析完成或者遇到非数字字符。
//             [4.4.2.1]parseInt()可以识别出各种进制的整数,但在解析八进制字面量的字符串，
//                      ECMAScript3会解析八进制，但ECMAScript5没有解析八进制的能力
//             [4.4.2.2]parseInt()函数提供第二个参数，表示多少进制，如：parseInt('123',16或10或2)
//             [4.4.2.3]parseInt(各种进制的数字)：运算后的十进制的数字，如1.0或1.或01会以1输出
//             [4.4.2.4]因为parseInt()是专门用来处理字符串转换数字的，所以parseInt(其他类型包括'')//NaN

//         [4.4.3]parseFloat():类似于parseInt()，会忽略字符串前面的空格，直到找到第一个非空格字符
//             [4.4.3.1]parseFloat()只能解析十进制字符串
//             [4.4.3.2]parseFloat(各种进制的数字)：运算后的十进制的数字，如1.0或1.或01会以1输出
//

// [5]String:由单引号或双引号括起来的字符序列,任何字符串的长度都可以通过访问length属性获得
//     [5.1]字符字面量，也叫转义序列
//         \n 换行
//         \t 制表
//         \b 空格
//         \r 回车
//         \f 进纸
//         \\ 斜杠
//         \' 单引号
//         \" 双引号
//         \xnn 以十六进制nn表示一个字符(n为0-f)，如\x41表示'A'
//         \unnnn 以十六进制nnnn表示一个Unicode字符(n为0-f)，如\u03a3表示希腊字符ε
//
//     [5.2]ECMAScript中的字符串是不可变的
//
//     [5.3]字符串连接需要先创建一个新字符串，然后在新字符串中填充两个需要拼接的字符串，最后再销毁原来的字符串。
//          这个过程在后台发生，也是在某些旧版本浏览器(IE6)拼接字符串速度慢的原因，但后来已经解决了这个低效率问题
//
//     [5.4]字符串转换
//         [5.4.1]toString()
//             Null和Undefined没有该方法
//             Boolean、Object、String有该方法
//             Number使用该方法可以传递基数2、8、10、16,如var num = 10;num.toString(2);//1010
//             但10.toString(2)会报错,因为数字后面不能跟标识符
//
//         [5.4.2]String()
//             有toString()方法，使用toString()方法
//             String(null);//'null'
//             String(undefined);//'undefined'
//
//         [5.4.3]要把某个值转换为字符串，可以使用加号操作符把它与一个空字符串''加在一起
//
// 　　     [5.4.4]如果数组中的某一项的值是null或者undefined，那么该值在join()、toLocaleString()、
//                 toString()和valueOf()方法返回的结果中以空字符串表示

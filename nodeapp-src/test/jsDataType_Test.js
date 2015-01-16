
exports.JavaScriptDateType_Test = function(test) {
  // JavaScript中有5种简单数据类型（也称为基本数据类型）：
  // Undefined、Null、Boolean、Number和String。
  // 还有1种复杂数据类型——Object，Object本质上是由一组无序的名值对组成的。

  // JavaScript是松散类型的，因此需要通过typeof来检测给定变量的数据类型
  var a;
  test.equal(typeof a, "undefined");
  a = true;
  test.equal(typeof a, "boolean");
  a = 123;
  test.equal(typeof a, "number");
  a = "string";
  test.equal(typeof a, "string");
  a = new Object();
  test.equal(typeof a, "object");
  a = function(){};
  test.equal(typeof a, "function");

  // 借用 Object.prototype.toString() 方法可以得到一个表示对象的类型的字符串：
  // 使用该方法可以有效判断数组、函数、日期、正则表达式等对象类型(引用类型)。
  // 在 ECMAScript 5 中还可以用这个方法来判断 null 和 undefined：
  var toString = Object.prototype.toString;
  test.equal(toString.call('abc'), "[object String]")
  test.equal(toString.call(true), "[object Boolean]")
  test.equal(toString.call([]), "[object Array]")
  test.equal(toString.call({}), "[object Object]")
  test.equal(toString.call(/./), "[object RegExp]")
  test.equal(toString.call(new Date), "[object Date]")
  test.equal(toString.call(Math), "[object Math]")
  test.equal(toString.call(null), "[object Null]")
  test.equal(toString.call(undefined), "[object Undefined]")

  // Undefined类型 ----------------------------------------------------------------------------------
  // Undefined类型只有一个值，即特殊的undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined
  var u;
  test.equal(u, undefined);
  test.equal(typeof undefined, "undefined");
  // 在 ECMAScript 3 中 undefined 是可读写的，
  // 所以直接与 undefined 作比较返回的结果不一定是准确的，
  // 像这样 var undefined = 1 在有些实现中是可以改变其值的，
  // 此时再与之做比较得到的结果就有点出人意料了，
  // 通常情况下还是使用 typeof 运算符来判断：
  // 不过使用 typeof 运算符有一个不好的地方是不能区分未定义的变量和值为 undefined 的变量(两者还是有区别的)，
  // 另外一种方式是使用 void 运算符，因为它的运算结果总是返回 undefined：
  function isUndefined(obj) {
    return obj === void 0; // typeof obj === 'undefined'
  };
  var obj;
  test.ok(isUndefined(obj));
  test.ok(isUndefined(undefined));
  test.ok(isUndefined(void 0));
  test.ok(!isUndefined(123));

  // Null类型 ---------------------------------------------------------------------------------------
  // Null类型是第二个只有一个值的数据类型，这个特殊的值是null。
  // 从逻辑角度来看，null值表示一个空对象指针，而这也正是使用typeof操作符检测null时会返回"object"的原因
  test.equal(typeof null, "object");

  // 实际上，undefined值是派生自null值的，因此ECMA-262规定对它们的相等性测试要返回true。
  test.equal(null, undefined);
  // 尽管null和undefined有这样的关系，但它们的用途完全不同。
  // 无论在什么情况下都没有必要把一个变量的值显式地设置为undefined，可是同样的规则对null却不适用。
  // 换句话说，只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。
  // 这样做不仅可以体现null作为空对象指针的惯例，而且也有助于进一步区分null和undefined。
  function isNull(obj) {
    // 这里必须使用 ===，因为 undefined == null 也会返回 true。
    return obj === null;
  };
  test.ok(isNull(null));
  test.ok(!isNull(undefined));
  test.ok(!isNull(123));

  // Boolean类型 -----------------------------------------------------------------------------------
  // Boolean类型只有两个字面值：true和false。
  // 要将一个值转换为其对应的Boolean值，可以调用类型转换函数Boolean()
  // 数据类型                 转换为true值                 转换为false值
  // Boolean                true                        false
  // String                 任何非空字符串                 “”空字符串
  // Number                 任何非零数字值(包括无穷大)       0和NaN
  // Object                 任何对象                      null
  // Undefined              n/a(不适用)                   undefined
  var str1 = "", str2 = "test";
  test.ok(!Boolean(str1));
  test.ok(Boolean(str2));
  var n1 = 0, n2 = NaN, n3 = 1234, n4 = Infinity, n5 = -4321;
  test.ok(!Boolean(n1));
  test.ok(!Boolean(n2));
  test.ok(Boolean(n3));
  test.ok(Boolean(n4));
  test.ok(Boolean(n5));
  test.ok(Boolean(test));
  test.ok(Boolean(test.ok));
  test.ok(!Boolean(null));
  test.ok(!Boolean(undefined));
  // 布尔值不是 true 就是 false，可以使用 typeof 运算符，也可以像下面这样判断：
  function isBoolean(obj) {
    return obj === true || obj === false;
  };
  test.ok(isBoolean(true));
  test.ok(isBoolean(false));
  test.ok(isBoolean(1 != 1));
  test.ok(!isBoolean(str1));
  test.ok(!isBoolean(str2));
  test.ok(!isBoolean(n1));
  test.ok(!isBoolean(n2));
  test.ok(!isBoolean(n3));
  test.ok(!isBoolean(n4));
  test.ok(!isBoolean(n5));
  test.ok(!isBoolean(test));
  test.ok(!isBoolean(test.ok));
  test.ok(!isBoolean(null));
  test.ok(!isBoolean(undefined));

  // Number类型 ---------------------------------------------------------------------------------
  // 一种特殊的数值，即NaN（非数值 Not a Number）。
  // 这个数值用于表示一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误了）。
  // 在JavaScript中，任何数值除以0会返回NaN，因此不会影响其他代码的执行。
  // NaN本身有两个非同寻常的特点。
  // 首先，任何涉及NaN的操作（例如NaN/10）都会返回NaN，这个特点在多步计算中有可能导致问题。
  // 其次，NaN与任何值都不相等，包括NaN本身。
  test.notEqual(NaN, NaN);
  // JavaScript中有一个isNaN()函数，接受一个参数，帮我们确定这个参数是否“不是数值”。
  // isNaN()在接收一个值之后，会尝试将这个值转换为数值。
  // 某些不是数值的值会直接转换为数值，例如字符串”10“或Boolean值。
  // 而任何不能被转换为数值的值都会导致这个函数返回true。
  test.ok(isNaN(NaN));
  test.ok(isNaN(0/0));
  test.ok(isNaN("NaN"));
  test.ok(isNaN("Test"));
  test.ok(isNaN([1, 2]));
  test.ok(isNaN(undefined));
  test.ok(!isNaN([1]));  // 单值数组可以隐式转换为数字 1
  test.equal([123], 123);
  test.ok(!isNaN([]));   // 空数组可以隐式转换为数字 0
  test.equal([], 0);
  test.ok(!isNaN(Infinity));
  test.ok(!isNaN(10));
  test.ok(!isNaN("10"));
  test.ok(!isNaN(true));
  test.ok(!isNaN(false));
  // 字符串 'abc' 和 undefined 都不能隐式转换为一个数字，所以被判断为是一个 NaN。
  // NaN 是一个特殊数值，它不等于任何值，甚至不等于它自己，
  // 因此判断一个值为 NaN 的最好方式是判断它是一个数字类型同时不等于自身：
  // ECMAScript 6 增加的 Number.isNaN() 方法更好地解决了这个问题，
  // 只有值为 NaN 的时候才会返回 true：
  function isNumberNaN(obj) {
    return typeof obj === 'number' && obj != +obj;
  };
  test.ok(isNumberNaN(NaN));
  test.ok(isNumberNaN(Number.NaN));
  test.ok(isNumberNaN(0/0));
  test.ok(!isNumberNaN([1, 2]));
  test.ok(!isNumberNaN('abc'));
  test.ok(!isNumberNaN(undefined));
  test.ok(Number.isNaN(NaN));
  test.ok(Number.isNaN(Number.NaN));
  test.ok(Number.isNaN(0/0));
  test.ok(!Number.isNaN([1, 2]));
  test.ok(!Number.isNaN('abc'));
  test.ok(!Number.isNaN(undefined));

  // 使用 typeof 运算符可以判断任意数字、NaN 或者 Infinity：
  test.equal(typeof NaN, "number");
  test.equal(typeof Infinity, "number");
  // 如果要排除 NaN 和 Infinity 可以使用 isFinite() 方法，
  // 不过 isFinite() 方法试图将一些非数字类型转换为数字，因此需要双重保险：
  // ECMAScript 6 增加的 Number.isFinite() 方法有同样效果。
  function isNumber(obj) {
    return typeof obj === 'number' && isFinite(obj);
  };
  test.ok(isFinite("1234"));
  test.ok(isFinite("-12.34"));
  test.ok(!isFinite("12.34.56"));
  test.ok(isFinite([123]));
  test.ok(isFinite([]));
  test.ok(!isFinite([12, 3]));
  test.ok(isNumber(1234));
  test.ok(isNumber(-12.34));
  test.ok(!isNumber("1234"));
  test.ok(!isNumber(NaN));
  test.ok(!isNumber(Infinity));
  test.ok(Number.isFinite(1234));
  test.ok(Number.isFinite(-12.34));
  test.ok(!Number.isFinite([123]));
  test.ok(!Number.isFinite("1234"));
  test.ok(!Number.isFinite(NaN));
  test.ok(!Number.isFinite(Infinity));

  // 判断一个数是整数并且在安全范围内，利用整数取整后还是与自身相等的特点：
  function isInteger(obj) {
    return typeof obj === 'number' && isFinite(obj)
    && obj > -9007199254740992
    && obj < 9007199254740992
    && Math.floor(obj) === obj;
  };
  test.ok(isInteger(1234));
  test.ok(!isInteger(-12.34));
  test.ok(!isInteger("1234"));
  test.ok(!isInteger(NaN));
  test.ok(!isInteger(Infinity));
  test.equal(Number.MIN_VALUE, 5e-324);
  test.equal(Number.MAX_VALUE, 1.7976931348623157e+308);
  test.equal(Number.POSITIVE_INFINITY, Infinity);
  test.equal(Number.NEGATIVE_INFINITY, -Infinity);
  test.ok(Number.isInteger(1));
  test.ok(!Number.isInteger("1"));
  test.ok(!Number.isInteger("A"));
  // toExponential(value) ：将一个数字转为指数类型，参数表示小数点后的位数
  test.equal((123456789).toExponential(2), "1.23e+8");
  test.equal((123456789).toExponential(5), "1.23457e+8");
  test.equal((123456789).toExponential(10), "1.2345678900e+8");
  // toFixed(value) ：将一个数字转换为指定小数位数的字符串。不传入参数，就是没小数位。返回值为四舍五入
  test.equal((1.23456789).toFixed(), "1");
  test.equal((1.23456789).toFixed(5), "1.23457");
  test.equal((1).toFixed(2), "1.00");
  // toString() ：使用指定的进制，将一个数字转换为字符串。不传入参数，默认为十进制。
  test.equal((10).toString(), "10");
  test.equal((10).toString(2), "1010");
  test.equal((10).toString(8), "12");
  test.equal((10).toString(10), "10");
  test.equal((10).toString(16), "a");
  test.equal(Infinity, Number.MAX_VALUE + 0.0000000000000001e+308);
  // Js中的2个浮点数进行加减乘除运算，会返回异常的数值，如：0.2 + 0.7，返回0.899999999999。可以使用toFixed()方法，指定小数位。
  test.equal(0.2 + 0.7, 0.8999999999999999);
  test.equal(0.7 - 0.2, 0.49999999999999994);
  test.equal(3.03 * 10, 30.299999999999997);
  test.equal((0.2 + 0.7).toFixed(1), 0.9);
  test.equal((0.7 - 0.2).toFixed(2), 0.50);
  test.equal((3.03 * 10).toFixed(2), 30.30);
  // Number()函数的转换规则如下：--------------------------
  // ● 如果是Boolean值，true和false将分别被替换为1和0
  // ● 如果是数字值，只是简单的传入和返回
  // ● 如果是null值，返回0
  // ● 如果是undefined，返回NaN
  // ● 如果是字符串，遵循下列规则：
  //     ○ 如果字符串中只包含数字，则将其转换为十进制数值，即”123“会变成123，而”011“会变成11（前导的0被忽略）
  //     ○ 如果字符串中包含有效的浮点格式，如”1.1“，则将其转换为对应的浮点数（同样，也会忽略前导0）
  //     ○ 如果字符串中包含有效的十六进制格式，例如”0xf“，则将其转换为相同大小的十进制整数值
  //     ○ 如果字符串是空的，则将其转换为0
  //     ○ 如果字符串中包含除了上述格式之外的字符，则将其转换为NaN
  // ● 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。
  //   如果转换的结果是NaN，则调用对象的toString()方法，然后再依次按照前面的规则转换返回的字符串值。
  test.ok(isNaN(Number(undefined)));
  test.equal(Number(true), 1);
  test.equal(Number(false), 0);
  test.equal(Number(1234), 1234);
  test.equal(Number(1234.123), 1234.123);
  test.equal(Number(null), 0);
  test.equal(Number("123"), 123);
  test.ok(isNaN(Number("123Test")));
  test.ok(isNaN(Number("12.34.56")));
  test.equal(Number("-123"), -123);
  test.equal(Number("011"), 11);
  test.equal(Number("1.123"), 1.123);
  test.equal(Number("011.12"), 11.12);
  test.equal(Number("-011.12"), -11.12);
  test.equal(Number("    123   "), 123);
  test.ok(isNaN(Number("    1 23   ")));
  test.equal(Number("Infinity"), Infinity);
  test.equal(Number(Infinity), Infinity);
  test.equal(Number(-Infinity), -Infinity);
  test.equal(Number("-Infinity"), -Infinity);
  test.notEqual(Number(Infinity), -Infinity);
  test.notEqual(Number("-Infinity"), Infinity);
  test.ok(isNaN(Number(Infinity/Infinity)));
  test.ok(isNaN(Number(Infinity-Infinity)));
  test.ok(isNaN(Number(-Infinity+Infinity)));
  test.equal(Number(Infinity+Infinity), Infinity);
  test.equal(Number(Infinity+1000), Infinity);
  test.equal(Number(Infinity-1000), Infinity);
  test.equal(Number(1000-Infinity), -Infinity);
  test.equal(Number(-Infinity-1000), -Infinity);
  test.equal(Number(-Infinity+1000), -Infinity);
  test.equal(Number(-Infinity-Infinity), -Infinity);
  test.equal(Number(Infinity*Infinity), Infinity);
  test.equal(Number(Infinity*1000), Infinity);
  test.equal(Number(Infinity/1000), Infinity);
  test.equal(Number(1000/Infinity), 0);
  test.equal(Number(-Infinity*Infinity), -Infinity);
  test.equal(Number(-Infinity*-Infinity), Infinity);
  test.equal(Number(-Infinity*-1000), Infinity);
  test.equal(Number(-Infinity*1000), -Infinity);
  test.equal(Number(-Infinity/-1000), Infinity);
  test.equal(Number(-Infinity*1000), -Infinity);
  test.equal(Number(-1000/Infinity), 0);
  test.equal(Number("0xff"), 255);
  test.equal(Number("0xffffffff"), 4294967295);
  test.equal(Number("0xffffffffffffffff"), 18446744073709552000);
  test.equal(Number("0xfffffffffffffffffffffff"), 4.951760157141521e+27);
  test.equal(Number("0xefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
  1.6853373139334212e+308);
  test.ok(isNaN(Number("-0x123")));
  test.ok(isNaN(Number("true")));
  test.ok(isNaN(Number(NaN)));
  test.ok(isNaN(Number(test)));
  test.equal(Number(true), 1);

  // parseInt()函数在转换字符串时，更多的是看其是否符合数值模式。-------------------
  // 它会忽略字符串前面的空格，直至找到第一个非空格字符。
  // 如果第一个字符串不是数字字符或者负号，parseInt()会返回NaN；也就是说，用parseInt()转换空字符串会返回NaN。
  // 如果第一个字符是数字字符，praseInt()会继续解析第二个字符，知道解析完所有后续字符或者遇到了一个非数字字符。
  // 例如，"1234blue"会被转换为1234，”22.5“会被转换为22，因为小数点并不是有效的数字字符。
  // 如果字符串中的第一个字符是数字字符，parseInt()也能够识别出各种整数格式（即十进制、八进制、十六进制）。
  test.ok(isNaN(parseInt(null)));
  test.ok(isNaN(parseInt("AF")));
  test.ok(isNaN(parseInt("xFF")));
  test.ok(isNaN(parseInt("- 1234")));
  test.ok(isNaN(parseInt("0", 1)));
  test.ok(isNaN(parseInt("1", 37)));
  test.equal(parseInt(" 1234 blue"), 1234);
  test.equal(parseInt("-1234"), -1234);
  test.equal(parseInt("12 34"), 12);
  test.equal(parseInt(" 12.34 blue"), 12);
  test.equal(parseInt("0xFF"), 255);
  test.equal(parseInt("070"), 70);
  test.equal(parseInt("70"), 70);
  test.equal(parseInt("11", 2), 3);
  test.equal(parseInt("17", 8), 15);
  test.equal(parseInt("19", 10), 19);
  test.equal(parseInt("1F", 16), 31);
  test.equal(parseInt("1V", 32), 63);
  test.equal(parseInt("1Z", 36), 71);

  // parseFloat()也是从第一个字符（位置0）开始解析每个字符。------------------------
  // 而且也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。
  // 也就是说，字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略。
  // parseFloat()和parseInt()的第二个区别在于它始终都会忽略前导的零。
  // 由于parseFloat()值解析十进制值，因此它没有用第二个参数指定基数的用法。
  test.equal(parseFloat(" 1234 blue"), 1234);
  test.equal(parseFloat("12.34.56"), 12.34);
  test.equal(parseFloat("0xAF"), 0);
  test.equal(parseFloat("0908.123"), 908.123);
  test.equal(parseFloat("9234.567890123456789"), 9234.567890123457);

  // String类型 ---------------------------------------------------------------------------------
  // String类型用于表示由零或多个16位Unicode字符组成的字符序列，即字符串。
  // 字符串可以由单引号(')或双引号(")表示。
  // 任何字符串的长度都可以通过访问其length属性取得
  var str1 = "123456789.1234567890", str2 = "";
  test.equal(str1.length, 20);
  test.equal(str2.length, 0);
  // 数值、布尔值、对象和字符串值都有toString()方法。但null和undefined值没有这个方法。
  var num = 10;
  test.equal(num.toString(), "10");
  test.equal(num.toString(2), "1010");
  test.equal(num.toString(4), "22");
  test.equal(num.toString(8), "12");
  test.equal(num.toString(10), "10");
  test.equal(num.toString(16), "a");
  test.equal(num.toString(32), "a");
  test.equal(num.toString(36), "a");
  var b1 = true, b2 = false;
  test.equal(b1.toString(8), "true");
  test.equal(b2.toString(8), "false");
  // String()函数遵循下列转换规则：
  //   ● 如果值有toString()方法，则调用该方法（没有参数）并返回相应的结果
  //   ● 如果值是null，则返回"null"
  //   ● 如果值是undefined，则返回”undefined“
  var v1 = 10, v2 = true, v3 = null, v4;
  test.equal(String(v1), "10");
  test.equal(String(v2), "true");
  test.equal(String(v3), "null");
  test.equal(String(v4), "undefined");

  // Object类型 ---------------------------------------------------------------------------------
  // 对象其实就是一组数据和功能的集合。
  // 对象可以通过执行new操作符后跟要创建的对象类型的名称来创建。
  // 而创建Object类型的实例并为其添加属性和（或）方法，就可以创建自定义对象。
  var o = new Object();
  test.equal(typeof o, "object");
  // Object的每个实例都具有下列属性和方法：
  // ● constructor——保存着用于创建当前对象的函数
  // ● hasOwnProperty(propertyName)——用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。
  //   其中，作为参数的属性名(propertyName)必须以字符串形式指定（例如：o.hasOwnProperty("name")）
  // ● isPrototypeOf(object)——用于检查传入的对象是否是另一个对象的原型
  // ● propertyIsEnumerable(propertyName)——用于检查给定的属性是否能够使用for-in语句来枚举
  // ● toString()——返回对象的字符串表示
  // ● valueOf()——返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值相同。

  // 判断数据类型可以使用 typeof 运算符，
  // 返回值是一个代表数据类型的字符串(注意是字符串，而且是小写的)：
  test.equal(typeof o.constructor, "function");
  test.equal(typeof o.hasOwnProperty, "function");
  test.equal(typeof o.isPrototypeOf, "function");
  test.equal(typeof o.propertyIsEnumerable, "function");
  test.equal(typeof o.toString, "function");
  test.equal(typeof o.valueOf, "function");
  test.equal(typeof o.testfunction, "undefined");

  // 存在判断
  // 对值为 null 或 undefined 的变量读取属性时会引发错误，因此有时候需要做存在判断
  function isExist(obj) {
    // 因为 undefined == null
    return obj != null;
    // return typeof obj !== 'undefined' && obj !== null;
  };
  var o = new Object();
  test.ok(isExist(o));
  test.ok(isExist([]));
  test.ok(isExist(isExist));
  test.ok(isExist(123));
  test.ok(isExist("123"));
  test.ok(!isExist(null));
  test.ok(!isExist(undefined));

  // 对象判断
  // 要区别 null 和其它对象可以像下面这样判断，因为 null 值可以隐式转换为 false：
  // 这样判断就可以把 null 给排除掉，变量 obj 是对象或者数组或者其它对象(不包括函数)。
  function isObjectNotFunction(obj) {
    return obj && typeof obj === 'object'
  };
  test.ok(isObjectNotFunction(o));
  test.ok(isObjectNotFunction(test));
  test.ok(isObjectNotFunction([]));
  test.ok(!isObjectNotFunction(isExist));
  test.ok(!isObjectNotFunction(123));
  test.ok(!isObjectNotFunction("123"));
  test.ok(!isObjectNotFunction(null));
  test.ok(!isObjectNotFunction(undefined));
  // 使用 Object() 方法如果传入的参数不是对象将会被转换为对象，
  // 否则，只是简单地将传入的参数返回。该方法可以判断所有对象，包括函数。
  function isObject(obj) {
    return obj === Object(obj);
  };
  var o = new Object();
  test.ok(isObject(o));
  test.ok(isObject(test));
  test.ok(isObject([]));
  test.ok(isObject(isExist));
  test.ok(!isObject(123));
  test.ok(!isObject("123"));
  test.ok(!isObject(null));
  test.ok(!isObject(undefined));

  // 创建Object实例的方式有两种，第一种是使用new操作符后跟Object构造函数。
  var person1 = new Object();
  person1.name = "tt";
  person1.age = 12;
  // 另一种方式是使用对象字面量表示法。
  var person2 = {
    name : 'tt',
    age : 12
  };
  // 另外，使用对象字面量语法时，如果留空其花括号，则可以定义值包含默认属性和方法的对象。
  var person3 = {};            //与new Object()相同
  person3.name = "tt";
  person3.age = 12;

  test.equal(person1.name, person2.name);
  test.equal(person1.age, person2.age);
  test.notEqual(person1, person2);
  test.equal(person2.name, person3.name);
  test.equal(person2.age, person3.age);
  test.notEqual(person2, person3);
  test.equal(person3.name, "tt");
  test.equal(person3["name"], "tt");

  // Array类型 ---------------------------------------------------------------------------------
  // JavaScript中的数组与其他多数语言中的数组有着相当大的区别。
  // 虽然JavaScript数组与其他语言中的数组都是数据的有序列表，
  // 但与其他语言不同的是，JavaScript数组的每一项可以保持任何类型的数据。
  // 也就是说，可以用数组的第一个位置来保存字符串，用第二个位置来保存数值，用第三个位置来保存对象。
  // 而且，JavaScript数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。
  // 数组判断
  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
  // ECMAScript 5 增加了数组检测的原生方法：Array.isArray(obj)
  test.ok(isArray([]));
  test.ok(isArray([1]));
  test.ok(isArray([1, 2]));
  test.ok(isArray(new Array()));
  test.ok(isArray(new Array(20)));
  test.ok(!isArray(123));
  test.ok(Array.isArray([]));
  test.ok(Array.isArray([1]));
  test.ok(Array.isArray([1, 2]));
  test.ok(Array.isArray(new Array()));
  test.ok(Array.isArray(new Array(20)));
  test.ok(!Array.isArray(123));

  // 创建数组的基本方式有两种。第一种是使用Array构造函数。
  var colors1 = new Array();
  var colors2 = new Array(20);
  var colors3 = new Array('red','blue','yellow');
  //创建数组的第二种基本方式是使用数组字面量表示法。
  var colors4 = [];
  var colors5 = ['red','blue','yellow'];
  // 在读取和设置数组的值时，要使用方括号并提供相应值的基于0的数字索引。
  test.equal(colors5[0], "red")
  test.equal(colors5[1], "blue")
  colors5[2] = 'green';
  test.equal(colors5[2], "green")
  test.equal(colors5.length, 3);
  colors5[3] = 'black';
  test.equal(colors5.length, 4);
  test.equal(colors5[3], "black")
  // 数组的长度保存在其length属性中，这个属性始终会返回0或更大的值。
  test.equal(colors1.length, 0);
  test.equal(colors2.length, 20);
  test.equal(colors3.length, 3);
  test.equal(colors4.length, 0);
  test.equal(colors5.length, 4);
  // 数组的length属性很有特点——它不是只读的。
  // 因此，通过设置这个属性，可以从数组的末尾移除项或想数组中添加新项。
  test.equal(colors5[3], "black");
  colors5.length = 3;
  test.equal(colors5[3], undefined);
  // 利用length属性也可以方便地在数组末尾添加新项
  colors5[colors5.length] = 'green';
  test.equal(colors5[3], 'green');
  colors5[colors5.length] = 'black';
  test.equal(colors5[4], 'black');

  // 转换方法------------------------------------------------
  // 所有对象都具有toLocaleString()、toString()和valueOf()方法。
  // 其中，调用数组的toString()和valueOf()方法会返回相同的值，即由数组中每个值的字符串形成拼接而成的一个以逗号分隔的字符串。
  // 实际上，为了创建这个字符串会调用数组每一项的toString()方法。
  test.equal(colors3.toString(), "red,blue,yellow");
  test.equal(colors3.valueOf(), "red,blue,yellow");
  test.equal(colors3, "red,blue,yellow");
  // toLocaleString()方法经常也会返回与toString()和valueOf()方法相同的值，但也不总是如此。
  // 当调用数组的toLocaleString()方法时，它也会创建一个数组值的以逗号分隔的字符串。
  // 而与前两个方法唯一的不同之处在于，这一次为了取得每一项的值，调用的是每一项的toLocaleString()方法，而不是toString()方法。
  test.equal(colors3.toLocaleString(), "red,blue,yellow");
  var person1 = {
    toLocaleString : function(){
      return "person1 : toLocaleString";
    },
    toString : function(){
      return "person1 : toString";
    }
  };
  var person2 = {
    toLocaleString : function(){
      return "person2 : toLocaleString";
    },
    toString : function(){
      return "person2 : toString";
    }
  };
  var peoples = [person1,person2];
  test.equal(peoples, "person1 : toString,person2 : toString");
  test.equal(peoples.valueOf(), "person1 : toString,person2 : toString");
  test.equal(peoples.toString(), "person1 : toString,person2 : toString");
  test.equal(peoples.toLocaleString(), "person1 : toLocaleString,person2 : toLocaleString");
  // 数组继承的toLocaleString()、toString()和valueOf()方法，在默认情况下都会以逗号分隔的字符串的形式返回数组项。
  // 而如果使用join()方法，则可以使用不同的分隔符来构建这个字符串。
  test.equal(colors3.join(','), "red,blue,yellow");
  test.equal(colors3.join(' '), "red blue yellow");
  test.equal(colors3.join('|'), "red|blue|yellow");
  // 注意：如果数组中的某一项的值是null或者undefined，
  // 那么该值在join()、toString()、toLocaleString()和valueOf()方法返回的结果中以空字符串表示。
  colors3[1] = null;
  test.equal(colors3, "red,,yellow");
  test.equal(colors3.join(' '), "red  yellow");

  // 栈方法 ------------------------------------------------------
  // JavScript数组也提供了一种让数组的行为类似于其他数据结构的方法。
  // 具体来说，数组可以表现得就像栈一样，后者是一种可以限制插入和删除项的数据结构。
  // 栈是一种后进先出后进先出的数据结构。
  // 而栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部。
  // JavaScript提供了push()和pop()方法，以便实现类似的栈行为。
  var colors = new Array();
  var count = colors.push('red','blue');
  test.equal(count, 2);
  count = colors.push('yellow');
  test.equal(count, 3);
  var item = colors.pop();
  test.equal(item, "yellow");
  test.equal(colors.length, 2);

  // 队列方法 -----------------------------------------------------
  // 队列数据结构的访问规则是先进先出。队列在列表的末端添加项，从列表的前端移除项。
  // 由于push()是向数组末端添加项的方法，因此要模拟队列只需一个从数组前端取得项的方法。
  // 实现这一操作的数组方法就是shift()，它能够移除数组中的第一个项并返回该项，同时将数组长度减1。
  // 结合使用shift()和push()方法，可以像使用队列一样使用数组：
  var colors = new Array();
  var count = colors.push('red','blue');
  test.equal(count, 2);
  count = colors.push('yellow');
  test.equal(count, 3);
  var item = colors.shift();
  test.equal(item, "red");
  test.equal(colors.length, 2);
  // JavaScript还为数组提供了一个unshift()方法。
  // 顾名思义，unshift()与shift()的用途相反：它能在数组前端添加任意个项并返回新数组的长度。
  // 因此，同时使用unshift()和pop()方法，可以从反方向来模拟队列，即在数组的前端添加项，从数组的末端移除项
  var colors = new Array();
  var count = colors.unshift('red','blue');
  test.equal(count, 2);
  count = colors.unshift('yellow');
  test.equal(count, 3);
  var item = colors.pop();
  test.equal(item, "blue");     //  ● ● ●注意 多项添加顺序
  test.equal(colors.length, 2);
  // 逐项添加
  var colors = new Array();
  var count = colors.unshift('red');
  test.equal(count, 1);
  count = colors.unshift('blue');
  test.equal(count, 2);
  count = colors.unshift('yellow');
  test.equal(count, 3);
  var item = colors.pop();
  test.equal(item, "red");     //  ● ● ●注意多项添加顺序
  test.equal(colors.length, 2);
  //  ● ● ●注意 ● ● ●：IE对JavaScript的实现中存在一个偏差，其unshift()方法总是返回undefined而不是数组的新长度。

  // 重排序方法 -----------------------------------------------
  // 数组中已经存在两个可以直接用来重排序的方法：reverse()和sort()，reverse()方法会反转数组项的顺序。
  var values = [1,2,3,4,5];
  values.reverse();
  test.equal(values, "5,4,3,2,1");
  values.sort();
  test.equal(values, "1,2,3,4,5");
  // 在默认情况下，sort()方法按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。
  // 为了实现排序，sort()方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序。
  // 即使数组中的每一项都是数值，sort()方法比较的也是字符串，如下所示：
  var values = [0,1,5,10,15];
  values.sort();
  test.equal(values, "0,1,10,15,5");
  // 可见，即使例子中值的顺序没有问题，但sort()方法也会根据测试字符串的结果改变原来的顺序。
  // 因为数值5虽然小于10，但在进行字符串比较时，“10”则位于“5”的前面。
  // 因此sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。
  function compare(value1,value2){
    if(value1 < value2){
      return 1;
    } else if(value1 > value2){
      return -1;
    } else{
      return 0;
    }
  };
  var values = [0,1,5,10,15];
  values.sort(compare);
  test.equal(values, "15,10,5,1,0");               //15,10,5,1,0
  // 对于数值类型或者其valueOf()方法会返回数值类型的对象类型，可以使用一个更简单的比较函数。
  // 这个函数主要用第二个值减第一个值即可。
  function compare(value1,value2){
    return value2 - value1;
  };
  var values = [0,1,5,10,15];
  values.sort(compare);
  test.equal(values, "15,10,5,1,0");               //15,10,5,1,0

  // 操作方法 -----------------------------------------
  // JavaScript对操作数组提供了很多方法。
  // 其中，concat()方法可以基于当前数组中的所有项创建一个新数组，
  // 如果传递给concat()方法的是一或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中。
  // 如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾。
  var colors = ['red','green','blue'];
  var colors2 = colors.concat('yellow',['black', 'brown']);
  test.equal(colors, "red,green,blue");
  test.equal(colors2, "red,green,blue,yellow,black,brown");
  // slice()方法能够基于当前数组中的一或多个项创建一个新数组。
  // slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。
  // 在只有一个参数的情况下，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。
  // 如果有两个参数，该方法返回起始和结束位置之前的项——但不包括结束位置的项。
  var colors = ['red','green','blue','yellow','black','brown'];
  var colors2 = colors.slice(1);
  var colors3 = colors.slice(1,4);
  test.equal(colors2, "green,blue,yellow,black,brown");
  test.equal(colors3, "green,blue,yellow");
  // 下面我们来介绍splice()方法，这个方法恐怕要算是最强大的数组方法了，
  // splice()主要用途是向数组的中部插入项，但使用这种方法的方式则有如下3种。
  // ● 删除——可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。
  // ● 插入——可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0（要删除的项数）、要插入的项。
  //   如果要插入多个项，可以再传入第四、第五，以致任意多个项。
  // ● 替换——可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：
  //   起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。
  var colors = ['red','green','blue'];
  var removed = colors.splice(0,1);                 //删除第一项
  test.equal(colors, "green,blue");
  test.equal(removed, "red");
  removed = colors.splice(1,0,'yellow','black');    //从位置1开始插入两项
  test.equal(colors, "green,yellow,black,blue");
  test.equal(removed, "");
  removed = colors.splice(1,1,'red','brown');       //插入两项，删除一项
  test.equal(colors, "green,red,brown,black,blue");
  test.equal(removed, "yellow");

  // Date类型 ----------------------------------------------------------------------------------
  // JavaScript中的Date类型是在早期Java中的java.util.Date类基础上构建的。
  // 为此，Date类型使用自UTC 1970年1月1日零时开始经过的毫秒数来保存日期。
  // 在使用这种数据存储格式的条件下，Date类型保存的日期能够精确到1970年1月1日之前或之后的285 616年。
  // 要创建一个日期对象，使用new操作符和Date构造函数即可。
  var now = new Date();
  // 在调用Date构造函数而不传递参数的情况下，新创建的对象自动获得当前日期和时间。
  // 如果想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数。
  // 为了简化这一计算过程，JavaScript提供了两个方法：Date.parse()和Date.UTC()。
  // 如果传入Date.parse()方法的字符串不能表示日期，那么它会返回NaN。
  var someDate1 = new Date(Date.parse("May 25, 2004"));
  var someDate2 = new Date('May 25, 2004');
  test.equal(someDate1.toString(), someDate2.toString());
  test.equal(someDate1.toString(), "Tue May 25 2004 00:00:00 GMT+0800 (CST)");
  // Date.UTC()方法同样也返回表示日期的毫秒数，但它与Date.parse()在构建值时使用不同的信息。
  // Date.UTC()的参数分别是年份、基于0的月份（一月是0，二月是1，以此类推）。
  // 月中的哪一天（1到31）、小时数（0到23）、分钟、秒以及毫秒数。
  // 在这些参数中，只有前两个参数（年和月）是必需的。
  // 如果没有提供月中的天数，则假设天数为1；如果省略其他参数，则统统假设为0。
  //GMT时间2000年1月1日零时
  var y2k1 = new Date(Date.UTC(2000, 0));
  //GMT时间2005年5月5日下午5:55:55
  var allFives1 = new Date(Date.UTC(2005,4,5,17,55,55));
  //本地时间2000年1月1日零时
  var y2k2 = new Date(2000,0);
  //本地时间2005年5月5日下午5:55:55
  var allFives2 = new Date(2005,4,5,17,55,55);
  //  test.equal(y2k1.toString(), y2k2.toString());
  test.equal(y2k1.toString(), "Sat Jan 01 2000 08:00:00 GMT+0800 (CST)");
  // test.equal(allFives1.toString(), allFives2.toString());
  test.equal(allFives1.toString(), "Fri May 06 2005 01:55:55 GMT+0800 (CST)");
  // Date类型还有一些专门用于将日期格式化为字符串的方法，这些方法如下：
  // ● toDateString()——以特定于实现的格式显示星期几、月、日和年
  // ● toTimeString()——以特定于实现的格式显示时、分、秒和时区
  // ● toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年
  // ● toLocaleTimeString()——以特定于实现的格式显示时、分、秒
  // ● toUTCString()——以特定于实现的格式完整的UTC日期
  // 以上这些字符串格式方法的输出也是因浏览器而异的，因此没有哪一个方法能够用来在用户界面中显示一致的日期信息。
  // 以下是Date类型的所有方法：
  // 方法	描述
  // Date()	返回当日的日期和时间。
  // getDate()	从 Date 对象返回一个月中的某一天 (1 ~ 31)。
  // getDay()	从 Date 对象返回一周中的某一天 (0 ~ 6)。
  // getMonth()	从 Date 对象返回月份 (0 ~ 11)。
  // getFullYear()	从 Date 对象以四位数字返回年份。
  // getYear()	请使用 getFullYear() 方法代替。
  // getHours()	返回 Date 对象的小时 (0 ~ 23)。
  // getMinutes()	返回 Date 对象的分钟 (0 ~ 59)。
  // getSeconds()	返回 Date 对象的秒数 (0 ~ 59)。
  // getMilliseconds()	返回 Date 对象的毫秒(0 ~ 999)。
  // getTime()	返回 1970 年 1 月 1 日至今的毫秒数。
  // getTimezoneOffset()	返回本地时间与格林威治标准时间 (GMT) 的分钟差。
  // getUTCDate()	根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。
  // getUTCDay()	根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
  // getUTCMonth()	根据世界时从 Date 对象返回月份 (0 ~ 11)。
  // getUTCFullYear()	根据世界时从 Date 对象返回四位数的年份。
  // getUTCHours()	根据世界时返回 Date 对象的小时 (0 ~ 23)。
  // getUTCMinutes()	根据世界时返回 Date 对象的分钟 (0 ~ 59)。
  // getUTCSeconds()	根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
  // getUTCMilliseconds()	根据世界时返回 Date 对象的毫秒(0 ~ 999)。
  // parse()	返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
  // setDate()	设置 Date 对象中月的某一天 (1 ~ 31)。
  // setMonth()	设置 Date 对象中月份 (0 ~ 11)。
  // setFullYear()	设置 Date 对象中的年份（四位数字）。
  // setYear()	请使用 setFullYear() 方法代替。
  // setHours()	设置 Date 对象中的小时 (0 ~ 23)。
  // setMinutes()	设置 Date 对象中的分钟 (0 ~ 59)。
  // setSeconds()	设置 Date 对象中的秒钟 (0 ~ 59)。
  // setMilliseconds()	设置 Date 对象中的毫秒 (0 ~ 999)。
  // setTime()	以毫秒设置 Date 对象。
  // setUTCDate()	根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
  // setUTCMonth()	根据世界时设置 Date 对象中的月份 (0 ~ 11)。
  // setUTCFullYear()	根据世界时设置 Date 对象中的年份（四位数字）。
  // setUTCHours()	根据世界时设置 Date 对象中的小时 (0 ~ 23)。
  // setUTCMinutes()	根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
  // setUTCSeconds()	根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。
  // setUTCMilliseconds()	根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
  // toSource()	返回该对象的源代码。
  // toString()	把 Date 对象转换为字符串。
  // toTimeString()	把 Date 对象的时间部分转换为字符串。
  // toDateString()	把 Date 对象的日期部分转换为字符串。
  // toGMTString()	请使用 toUTCString() 方法代替。
  // toUTCString()	根据世界时，把 Date 对象转换为字符串。
  // toLocaleString()	根据本地时间格式，把 Date 对象转换为字符串。
  // toLocaleTimeString()	根据本地时间格式，把 Date 对象的时间部分转换为字符串。
  // toLocaleDateString()	根据本地时间格式，把 Date 对象的日期部分转换为字符串。
  // UTC()	根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
  // valueOf()	返回 Date 对象的原始值。

  // Function类型 ----------------------------------------------------------------------------------------
  // JavaScript中什么最有意思，我想那莫过于函数了——而有意思的根源，则在于函数实际上时对象。
  // 每个函数都是Function类型的实例，而且都与其他引用类型一样具有属性和方法。
  // 由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。

  // 虽然 typeof 运算符将函数特别对待了，
  // 但是使用 typeof 运算符在有些实现中不是函数的也会返回 'function'，
  // 因此还是使用如下方法来判断函数：
  function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };
  test.ok(isFunction(isFunction));
  test.ok(isFunction(test.ok));
  test.ok(!isFunction(test));
  test.ok(!isFunction(123));

  // 函数通常是使用函数声明语法定义的，如下面例子所示：
  function sum(num1, num2) {
    return num1 + num2;
  };
  // 这与下面使用函数表达式定义函数的方式几乎相差无几：
  var sun = function(num1, num2) {
    return num1 + num2;
  };
  var n1 = 1, n2 = 2;
  test.equal(sum(n1, n2), sun(n1, n2));
  // 最后一种定义函数的方式是使用Function构造函数。
  // Function构造函数可以接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数。
  var sum2 = Function('num1','num2','return num1 + num2');        //不推荐使用此种方式
  test.equal(sum(n1, n2), sum2(n1, n2));
  // 注意：使用不带括号的函数名是访问函数指针，而非调用函数。
  var sum3 = sum;
  test.equal(sum(n1, n2), sum3(n1, n2));
  // 函数声明与函数表达式
  // 目前为止，我们一直没有对函数声明和函数表达式加以区别。
  // 而实际上， 解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。
  // 解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；
  // 至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。
  test.equal(sum4(10, 10), 20);
  function sum4(num1, num2) {
    return num1 + num2;
  };
  // 以上代码完全可以正常运行。因为在代码开始执行之前，解析器就已经读取函数声明并将其添加到执行环境中了。
  // 如果像下面例子所示，把上面的函数声明改为变量初始化方式，就会在执行期间导致错误。
  // test.throws(sum5(10,10), [error]);
  var sum5 = function(num1, num2) {
    return num1 + num2;
  };
  // 作为值的函数 --------------------------------------
  // 因为JavaScript中的函数名本身就是变量，所以函数也可以作为值来使用。
  // 也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。
  function callSomeFunction(someFunction, someArgument) {
    return someFunction(someArgument);
  };
  // 这个函数接受两个参数，第一个参数应该是一个函数，第二个参数应该是要传递给该函数的一个值。然后，就可以像下面的例子一样传递函数了：
  function add(num) {
    return num + 10;
  };
  var result = callSomeFunction(add,10);
  test.equal(result, 20);
  // 当然，可以从一个函数中返回另一个函数，而且这也是极为有用的一种技术。
  function createSumFunction() {
    return function(num1,num2) {
      return num1 + num2;
    };
  };
  var sumFunction = createSumFunction();
  test.equal(sumFunction(10,10), 20);
  // 函数内部属性 -------------------------------------
  // 在函数内部，有两个特殊的对象：arguments和this。
  // 其中，arguments是一个类数组对象，包含着传入函数中的所有参数，而且可以使用length属性来确定传递进来多少个参数。
  function sayHi() {
    test.equal(arguments.length, 2);
    test.equal(arguments[0] + ',' + arguments[1], "hello,world");
  };
  sayHi('hello','world');
  // 虽然arguments的主要用途是保存函数参数，但这个对象还有一个名叫callee的属性，
  // 该属性是一个指针，指向拥有这个arguments对象的函数。
  // 看下面这个非常经典的阶乘函数：
  function factorial(num) {
    if(num <= 1){
      return 1;
    } else {
      return num * factorial(num-1);
    }
  };
  test.equal(factorial(10), 3628800)
  // 定义阶乘函数一般都要用到递归算法；如上面的代码，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。
  // 但问题是这个函数的执行与函数名factorial紧紧耦合在一起。为了消除这种紧密耦合的现象，可以像下面这样使用arguments.callee
  function factorial(num) {
    if(num <= 1){
      return 1;
    } else {
      return num * arguments.callee(num-1);
    }
  };
  test.equal(factorial(10), 3628800)
  // 在这个重写后的factorial()函数的函数体内，没有再引用函数名factorial。
  // 这样，无论引用函数时使用是什么名字，都可以保证正常完成递归调用。例如：
  var trueFactorial = factorial;
  factorial = function(){
    return 0;
  };
  test.equal(trueFactorial(10), 3628800);
  test.equal(factorial(5), 0);
  // 函数内部的另一个特殊对象是this，this引用的是函数据以执行操作的对象——或者也可以说，
  // this是函数在执行时所处的作用域（当在网页的全局作用域中调用函数时，this对象引用的就是window）。
  var window = new Object();
  window.color = 'red';
  var o = { color:'blue' };
  function sayColor(v) {
    return v.color;
  };
  test.equal(sayColor(window), "red")
  test.equal(sayColor(o), "blue")
  // 函数属性和方法 -----------------------------------
  // 因为JavScript中的函数是对象，因此函数也有属性和方法。
  // 每个函数都包含两个属性：length和prototype。
  // 其中，length属性表示函数希望接收的命名参数的个数。
  function sayFullName(firstname, lastname) {
    return firstname + lastname;
  };
  function sayHi() {
    return 'hi';
  };
  test.equal(sayFullName.length, 2);    　　
  test.equal(sayHi.length, 0);
  // 在JavaScript中最耐人寻味的就要数prototype属性了。
  // 对于引用类型而言，prototype是保存它们所有实例方法的真正所在。
  // 诸如toString()和valueOf()等方法实际上都是保存在prototype名下，只不过是通过各自对象的实例访问罢了。
  // 在创建自定义引用类型以及实现继承时，prototype属性的作用是极为重要的
  function sum(num1, num2) {
    return num1 + num2;
  };
  function callSum1(num1, num2) {
    return sum.apply(this, arguments);
  };
  function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
  };
  test.equal(sum(10, 10), 20);
  test.equal(callSum1(10, 10), 20);
  test.equal(callSum2(10, 10), 20);
  // call()方法与apply()方法的作用相同，它们的区别仅在于接收参数的方式不同。
  // 对于call()方法而言，第一个参数是作用域没有变化，变化的只是其余的参数都是直接传递给函数的。
  function callSum3(num1, num2) {
    return sum.call(this, num1, num2);
  };
  test.equal(callSum3(10, 10), 20);
  // 事实上，传递参数并非apply()和call()真正的用武之地；
  // 它们真正强大的地方是能够扩充函数赖以运行的作用域。看下面的例子：
  window.color = 'red';
  var o = {color:'blue'};
  function sayColor(v) {
    return v.color;
  };
  test.equal(sayColor(window), "red");
  // test.equal(sayColor.call(window), "red");
  // test.equal(sayColor.call(o), "blue");
  // 注意：每个函数都有一个非标准的caller属性，该属性指向调用当前函数的函数。
  // 一般是在一个函数的内部，通过arguments.callee.caller来实现对调用栈的追溯。
  // 目前，IE、FireFox、Chrome都支持该属性，但建议将该属性用于调试目的。

  // 内置对象
  // JavaScript中有两个内置对象：Global和Math。

  // Global对象 -----------------------------------------------------------------------------------------------
  // Global（全局）对象可以说是JavaScript中最特别的一个对象了，因为不管你从什么角度上看，这个对象都是不存在的。
  // JavaScript中的Global对象在某种意义上是作为一个终极的“兜底儿对象”来定义的。
  // 换句话说，不属于任何其他对象的属性和方法，最终都是它的属性和方法。
  // 事实上，没有全局变量或全局函数；所有在全局作用域定义的属性和函数，都是Global对象的属性。
  // 诸如isNaN()、parseInt()以及parseFloat()，实际上全都是Global对象的方法，Global对象还包含其他一些方法。

  // URI编码方法 ----------------------------------------------------
  // Global对象的encodeURI()和encodeURIComponent()方法可以对URI进行编码，以便发送给浏览器。
  // 有效的URI中不能包含某些字符，例如空格。
  // 而这两个URI编码方法就可以对URI进行编码，它们用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解。
  // 其中，encodeURI()主要用于整个URI（例如：http://www.test.com/test value.html），
  // 而encodeURIComponent()主要用于对URI中的某一段（例如前面URI中的test value.html）进行编码。
  // 它们主要区别在于，encodeURI()不会对本身属于URI的特殊字符进行编码，
  // 例如冒号、正斜杠、问好和井号；而encodeURIComponent()则会对它发现的任何非标准字符进行编码。
  var uri = "http://www.test.com/test value.html#start";
  test.equal(encodeURI(uri), "http://www.test.com/test%20value.html#start");
  test.equal(encodeURIComponent(uri), "http%3A%2F%2Fwww.test.com%2Ftest%20value.html%23start");
  // 与encodeURI()和encodeURIComponent()方法对应的两个方法分别是decodeURI()和decodeURIComponent()。
  // 其中，decodeURI()只能对encodeURI()替换的字符进行解码，
  // 同样，decodeURIComponent()只能对encodeURIComponent()替换的字符进行解码。
  test.equal(decodeURI("http://www.test.com/test%20value.html#start"), uri);
  test.equal(decodeURIComponent("http%3A%2F%2Fwww.test.com%2Ftest%20value.html%23start"), uri);
  // eval()方法 -----------------------------------------------------
  // eval()方法大概是JavaScript中最强大的一个方法了，eval()方法就像是一个完整的JavaScript解析器，
  // 它只接受一个参数，即要执行的字符串。看下面的例子：
  eval("function sayHi(){ return 'hi'; };");
  test.equal(sayHi(), "hi");
  // 注意：能够解释代码字符串的能力非常强大，但也非常危险。
  // 因此在使用eval()时必须极为谨慎，特别是在用它执行用户输入数据的情况下。
  // 否则，可能会有恶意用户输入威胁你的站点或应用程序安全的代码（即所谓的代码注入）。

  // Math对象 -------------------------------
  // 与我们在JavaScript直接编写的计算功能相比，Math对象提供的计算功能执行起来要快得多。
  // Math对象还提供了辅助完成这些计算的属性。
  // 属性	描述
  // E	返回算术常量 e，即自然对数的底数（约等于2.718）。
  // LN2	返回 2 的自然对数（约等于0.693）。
  // LN10	返回 10 的自然对数（约等于2.302）。
  // LOG2E	返回以 2 为底的 e 的对数（约等于 1.414）。
  // LOG10E	返回以 10 为底的 e 的对数（约等于0.434）。
  // PI	返回圆周率（约等于3.14159）。
  // SQRT1_2	返回返回 2 的平方根的倒数（约等于 0.707）。
  // SQRT2	返回 2 的平方根（约等于 1.414）。
  // Math对象包含的方法如下：
  // 方法	描述
  // abs(x)	返回数的绝对值。
  // acos(x)	返回数的反余弦值。
  // asin(x)	返回数的反正弦值。
  // atan(x)	以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
  // atan2(y,x)	返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
  // ceil(x)	对数进行上舍入。
  // cos(x)	返回数的余弦。
  // exp(x)	返回 e 的指数。
  // floor(x)	对数进行下舍入。
  // log(x)	返回数的自然对数（底为e）。
  // max(x,y)	返回 x 和 y 中的最高值。
  // min(x,y)	返回 x 和 y 中的最低值。
  // pow(x,y)	返回 x 的 y 次幂。
  // random()	返回 0 ~ 1 之间的随机数。
  // round(x)	把数四舍五入为最接近的整数。
  // sin(x)	返回数的正弦。
  // sqrt(x)	返回数的平方根。
  // tan(x)	返回角的正切。
  {
    test.equal(Math.E, 2.718281828459045);
    test.equal(Math.LN2, 0.6931471805599453);
    test.equal(Math.LN10, 2.302585092994046);
    test.equal(Math.LOG2E, 1.4426950408889634);
    test.equal(Math.LOG10E, 0.4342944819032518);
    test.equal(Math.PI, 3.141592653589793);
    test.equal(Math.SQRT1_2, 0.7071067811865476);
    test.equal(Math.SQRT2, 1.4142135623730951);

    test.equal(Math.abs(-123.4567890123), 123.4567890123);
    test.equal(Math.acos(0), Math.PI/2);
    test.equal(Math.cos(Math.PI/2), 6.123233995736766e-17);  // 精度问题，实际应为0 // 6.123031769111886e-17
    test.equal(Math.cos(0), 1);
    test.equal(Math.acos(1), 0);
    test.equal(Math.asin(1), Math.PI/2);
    test.equal(Math.sin(Math.PI/2), 1);
    test.equal(Math.sin(0), 0);
    test.equal(Math.asin(0), 0);
    test.equal(Math.atan(1), Math.PI/4);
    test.equal(Math.tan(Math.PI/4), 0.9999999999999999);     // 精度问题， 实际为1
    test.equal(Math.atan2(-1, 1), -Math.PI/4);
    test.equal(Math.tan(-Math.PI/4), -0.9999999999999999);   // 精度问题， 实际为-1
    test.equal(Math.ceil(Math.PI), 4);
    test.equal(Math.floor(Math.PI), 3);
    test.equal(Math.round(Math.PI), 3);
    test.equal(Math.round(3.5), 4);
    test.equal(Math.round(3.49), 3);
    test.equal(Math.exp(0), 1);
    test.equal(Math.log(1), 0);
    test.equal(Math.exp(1), Math.E);
    test.equal(Math.log(Math.E), 1);
    test.equal(Math.exp(2), 7.3890560989306495);   // 7.38905609893065
    test.equal(Math.E * Math.E, 7.3890560989306495);
    test.equal(Math.exp(2), Math.E * Math.E);             // 精度问题导致
    test.equal(Math.log(7.38905609893065), 2);
    test.equal(Math.log(Math.E * Math.E), 2);
    test.equal(Math.log(7.3890560989306495), 2);
    test.equal(Math.max(1, 2), 2);
    test.equal(Math.min(1, 2), 1);
    test.equal(Math.pow(Math.E, 2), Math.E * Math.E);
    test.equal(Math.sqrt(Math.E*Math.E), Math.E);
    test.equal(Math.sqrt(Math.PI*Math.PI), Math.PI);
    test.ok(1 - Math.random() > 0);
    test.ok(Math.random() > 0);
  }
  // 正则表达式判断
  // 使用 typeof 运算符判断正则表达式，一般都会返回 'object'，
  // 不过也有一些实现会返回 'function'，
  // 所以，还是借用 Object.prototype.toString 方法来判断：
  function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  };
  test.ok(isRegExp(/./));

  // 一元操作符 ------------------------------------------
  // 1、自增自减操作符：分为前置型和后置型；
  // 前置型：++a;--a;
  // 后置型：a++;a--;
  {
    var a, b, i = 1, j = 1;
    a = i++; // 相当于a = i; i = i+1;
    b = ++j; // 相当于j = j+1; b = j;
    test.equal(a, 1);
    test.equal(i, 2);
    test.equal(b, 2);
    test.equal(j, 2);
  }
  // 2、一元加减操作符：a=+i;a=-i;
  {
    var a, b, i = 1, j = 1;
    a = +i;
    b = -j;
    test.equal(a, 1);
    test.equal(i, 1);
    test.equal(b, -1);
    test.equal(j, 1);
  }

  // 位操作符 --------------------------------------------
  // 1、按位非~ （NOT）
  // 非，即按二进制形式将所有数字取反。
  // 常见用法：位运算 NOT 实质上是对数字求负，然后减 1
  {
    test.equal(~Infinity, -1);
    test.equal(~-Infinity, -1);
    var a = Math.floor(Math.random() * (Math.pow(2, 31)));
    test.equal(~a, -a - 1);
    test.equal(~-a, a - 1);
  }
  // 2、按位或| （OR）
  // 或，即按二进制形式将所有的数字与目标数字按位进行或操作。
  // 常见用法：通常用于二进制数字的无条件赋值。例如：一个数字|1，相当于与获取与当前数字最接近的奇数。
  {
    test.equal(2 | 1, 3);
    test.equal(Infinity | 1, 1);
    test.equal(-Infinity | 1, 1);
  }
  // 3、按位与& （AND）
  // 与，即按二进制形式将所有的数字与目标数字按位进行与操作。
  // 常见用法：通常用于二进制的取位操作，例如：一个数字&1，如果结果为0则为偶数，如果为1则为奇数。
  {
    test.equal(7 & 1, 1);
    test.equal(7 & 2, 2);
    test.equal(Infinity & 1, 0);
    test.equal(-Infinity & 1, 0);
  }
  // 4、按位异或^ （XOR）
  // 异或，即按二进制形式将所有数字与目标数字对比，只有两个数字不相同即只有一个数位存放的是1的时候返回1，如两个数字相同返回0.
  // 常见用法：xor运算的逆运算是它本身，也就是说两次异或同一个数最后结果不变。可以用于简单的加密，或交互数值操作。
  {
    var a = Math.floor(Math.random() * Math.pow(2, 31));
    var b = Math.floor(Math.random() * Math.pow(2, 31));
    test.equal(a ^ b ^ b, a);
  }
  // 5、左移<<
  // 左移，即按二进制形式把所有的数字向左移动对应的位数，高位移出(舍弃)，低位的空位补零。左移不会影响符号位。
  // 数学意义：在数字没有溢出的前提下，对于正数和负数，左移一位都相当于乘以2的1次方，左移n位就相当于乘以2的n次方。
  {
    test.equal(1 << 2, 4);
    test.equal(-1 << 4, -16);
    var a = Math.floor(Math.random() * Math.pow(2, 30));
    test.equal(a << 1, a * 2);
  }
  // 6、右移
  // 6.1有符号的右移>>：即按二进制形式把所有的数值向右移动但是保留符号位。
  // 数学意义：在数字没有溢出的前提下，对于正数和负数，右移一位都相当于除以2的1次方，右移n位就相当于除以2的n次方。
  {
    test.equal(4 >> 2, 1);
    test.equal(1 >> 1, 0);
    test.equal(-16 >> 4, -1);
    var a = Math.floor(Math.random() * Math.pow(2, 31));
    test.equal(a >> 2, Math.floor(a / 4));
  }
  // 6.2无符号的右移>>>:即按二进制形式把所有的数值,包括符号位都向右移动。
  // 对于正数来说>>和>>>的结果是一样的；
  // 对负数来说，由于负数以其绝对值的补码形式表示，因此会导致无符号右移结果非常大。
  {
    var a = Math.floor(Math.random() * Math.pow(2, 31));
    test.equal(a >> 2, a >>> 2);
    test.equal(-1 >>> 1, 2147483647);
    test.equal(-1 >>> 8, 16777215);
    test.equal(-1 >>> 16, 65535);
    test.equal(-1 >>> 24, 255);
    test.equal(-1 >>> 31, 1);
    test.equal(-1 >>> 32, 4294967295);
    test.equal(-1 >>> 33, 2147483647);
    test.equal(a >>> 33, a >>> 1);
    test.equal(-a >>> 33, -a >>> 1);
  }

  // 布尔操作符 --------------------------------------------
  // 1、逻辑非!
  // 逻辑非用!表示，可以应用与ECMAScript的任何类型的值，逻辑非操作返回的是一个布尔值（true/false）。
  // 该操作符首先会将它的操作数转换为一个布尔值，然后再对其求反.
  // !!相当于Boolean()函数。
  {
    test.ok(!false);
    test.ok(!!true);
  }
  // 2、逻辑与&&
  // 逻辑与有两个操作数。
  // 逻辑与操作可以应用于任何类型的操作数，而不仅仅是布尔值。
  // 在有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值；此时，它遵循一下规则：
  // 1. 如果第一个操作数是对象，则返回第二个操作数；
  // 2. 如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象；
  // 3. 如果两个操作符都是对象，则返回第二个操作数； 遵循第一规则。
  // 4. 如果有一个操作数是null，则返回null；
  // 5. 如果有一个操作数是NaN，则返回NaN；
  // 6. 如果有一个操作数是undefined，则返回undefined。
  // 逻辑与操作属于短路操作，即如果第一操作数能够决定结果，那么就不会再对第二个操作数求值。
  // （可以理解为内部的两个return操作）。因此当4、5、6规则冲突时，遵循短路操作原则。
  {
    var a = undefined, b = NaN, c = null, d = true, e = false;
    test.equal(a && b, undefined);
    test.ok(Number.isNaN(b && a));
    test.equal(c && a, null);
    test.equal(e && a, false);
    test.equal(e && b, false);
    test.equal(e && c, false);
    test.equal(e && d, false);
    test.equal(d && a, undefined);
    test.ok(Number.isNaN(d && b));
    test.equal(d && c, null);
  }
  // 3、逻辑或||
  // 逻辑或有两个操作数。
  // 逻辑或与逻辑与相似，操作可以应用于任何类型的操作数，而不仅仅是布尔值。
  // 在有一个操作数不是布尔值的情况下，逻辑或操作就不一定返回布尔值；此时，它遵循一下规则：
  // 1. 如果第一个操作数是对象，则返回第一个操作数；
  // 2. 如果第一个操作数的结果是false，则返回第二个操作数；
  // 3. 如果两个操作符都是对象，则返回第一个操作数，遵循第一条规则。
  // 4. 如果两个操作数都是null，则返回null；
  // 5. 如果两个操作数都是NaN，则返回NaN；
  // 6. 如果两个操作数都是undefined，则返回undefined。
  // 逻辑或操作属于短路操作，即如果第一操作数结果为true，那么就不会再对第二个操作数求值。
  // 我们可以利用逻辑或的这个特性来避免为变量赋null或undefined的值
  // 例如：var myObject=firstObject||secondObject
  // 如果firstObject不是null，则firstObject被赋值给myObject,否则将secondObject的值赋给myObject.
  {
    var a = undefined, b = NaN, c = null, d = true, e = false;
    test.ok(Number.isNaN(a || b));
    test.ok(Number.isNaN(b || b));
    test.equal(b || a, null);
    test.equal(c || a, null);
    test.equal(e || a, undefined);
    test.ok(Number.isNaN(e || b));
    test.equal(e || c, null);
    test.equal(e || d, true);
    test.equal(d || a, true);
    test.equal(d || b, true);
    test.equal(d || c, true);
  }
  // 乘性操作符 -------------------------------------------------------------
  // 1、乘法：*
  // 乘法操作符的一些特殊规则：
  // 如果操作数都是数值，按照常规的乘法计算，如果乘积超过了ECMAscript数值的表示范围，则返回infinity或者-infinity
  // 如果有一个操作数是NaN，那返回结果就是NaN
  // 如果是infinity与0相乘，返回NaN
  // 如果infinity与非0数相乘，返回infinity或者-infinity
  // infinity与infinity相乘，返回infinity
  // 如果有一个操作数不是数值，后台会先调用number()将其转化为数值，再应用上面的规则
  {
    test.equal(5 * 6, 30);
    test.ok(Number.isNaN(5 * NaN));
    test.ok(Number.isNaN(Infinity * 0));
    test.equal(Infinity * 2, Infinity);
    test.equal(Infinity * Infinity, Infinity);
    test.equal(Infinity * -Infinity, -Infinity);
    test.equal(-Infinity * -Infinity, Infinity);
    test.equal(Infinity * -2, -Infinity);
    test.equal("5" * 5, 25);
    test.equal(true * 10, 10);
    test.equal(false * 10, 0);
  }
  // 2、除法：/
  // 除法操作符的一些特殊规则：
  // 如果操作数都是数值，按照常规的除法计算，如果商超过了ECMAscript数值的表示范围，则返回infinity或者-infinity
  // 如果有一个操作数是NaN，那返回结果就是NaN
  // 如果是infinity被infinity除，返回NaN
  // 如果是0被0除，返回NaN
  // 如果是非0的有限数被0除，返回infinity或者-infinity
  // 如果是infinity被非0的有限数除，返回infinity或者-infinity
  // 如果有一个操作数不是数值，后台会先调用number()将其转化为数值，再应用上面的规则
  {
    test.equal(5 / 5, 1);
    test.ok(Number.isNaN(5 / NaN));
    test.ok(Number.isNaN(Infinity / Infinity));
    test.ok(Number.isNaN(0 / 0));
    test.equal(5 / 0, Infinity);
    test.equal(-5 / 0, -Infinity);
    test.equal(1000 / Infinity, 0);
    test.equal(-1000 / Infinity, 0);
    test.equal(Infinity / 5, Infinity);
    test.equal(Infinity / -5, -Infinity);
    test.equal(-Infinity / -5, Infinity);
    test.equal("5" / 5, 1);
    test.equal(true / 10, 0.1);
    test.equal(false / 10, 0);
  }
  // 3、求模（余数）：%
  // 求模操作符的一些特殊规则：
  // 如果操作数都是数值，按照常规的除法计算，返回除得的余数
  // 如果被除数是无穷大，除数是有限数，那返回结果就是NaN
  // 如果被除数是有限大，除数是0，返回NaN
  // 如果是infinity被infinity除，返回NaN
  // 如果被除数是有限大而除数是无穷大，返回被除数
  // 如果被除数是0，返回0
  // 如果有一个操作数不是数值，后台会先调用number()将其转化为数值，再应用上面的规则
  {
    test.equal(26 % 5, 1);
    test.ok(Number.isNaN(Infinity % 3));
    test.ok(Number.isNaN(3 % 0));
    test.equal(5 % Infinity, 5);
    test.equal(0 % 10, 0);
    test.equal(true % 25, 1);
    test.ok(Number.isNaN(3 % false));
  }
  // 加性操作符 -----------------------------------------------
  // 1、加法操作符：+
  // 加法操作符：+
  // 如果操作数中有一个是字符串：
  // 如果两个操作数都是字符串，那么将第二个操作数拼接到第一个操作数后面。
  // 如果只有一个操作数是字符串，那么将另一个操作数转化为字符串后再执行上述规则
  {
    test.equal(5 + 5, 10);
    test.equal(5 + "5", "55");   //数字加字符串
  }
  // 减法操作符：-
  // 如果有一个操作数是字符串、布尔值、null或者undefined，则在后台先调用number()将其转化为数值，然后执行减法。
  {
    test.equal(5 - 5, 0);
    test.equal(5 - "5", 0);
  }
  // 关系操作符 ------------------------------------------------
  // 大于：>,小于：<,大于等于：>=,小于等于：<=
  // 关系操作符特殊规则：
  // 如果操作数是字符串，对比两个字符串相应的字符编码
  // 如果操作数一个是数值，则先将另一个操作数转化为数值，再进行比较
  // 任何数与NaN进行比较，结果都是false
  {
    test.ok(1 < 2);
    test.ok("2" > 1);
    test.ok("a" > "A");
    test.ok(!(1 > NaN));
  }
  // 相等操作符 --------------------------------------------
  // 1、相等和不相等：==和!=
  // 这两个操作符都会先将操作数转换为同一类型再进行比较
  // 转换时，相等和不相等操作符遵循如下规则：
  // 如果其中一个操作数的类型为 Boolean ，那么，首先将它转换为数字类型，false 转换为 0, true 将转换为 1。
  // 如果其中一个操作数的类型是字符串，另外一个为数字类型，那么，将字符串转换为数字进行比较。
  // 如果其中一个操作数是对象，另一个不是，则先调用操作数的valueof()方法，得到基本类型值之后再比较
  // 比较时的特殊规则：
  // null 和 undefined 是相等的。
  // null 和 undefined 不会转换为任何其他类型
  // 如果任何一个操作的结果为 NaN，那么相等比较返回 false，不相等比较返回 true。
  // 注意，即使两个操作数都为 NaN，返回结果一样是 false，也就是说，NaN 不等于 NaN。
  // 如果两个操作数都是对象，那么比较它们引用的值，如果引用同一个对象，那么，返回真，否则，返回假。
  {
    test.ok(null == undefined);
    test.ok(NaN != NaN);
    test.ok(12 == "12")
  }
  // 2、全等和不全等：==和===
  // ==会将操作数转换成同一类型比较；
  // ===不会转换类型，直接比较
  {
    test.ok(!(null === undefined));
    test.ok(!("1" === 1));
  }
  // 条件操作符 ---------------------------------------------
  // 变量=条件表达式？真值：假值
  // 首先会对条件表达式求值，如果结果是真，则把真值赋给变量，如果为假则把假值赋给变量。
  {
    var a = Math.random(), b = Math.random();
    test.equal(a > b ? a : b, Math.max(a, b));
  }
  // 赋值操作符 ---------------------------------------------
  // 1、简单赋值操作符：=
  // 2、复合赋值操作符：+=、-=、*=、/=、%=、>>=、<<=、>>>=
  {
    var a = 1, b = 2;
    test.equal(a += 1, 2);
    test.equal(b *= 2, 4);
  }
  // 逗号操作符 ----------------------------------------------
  // 逗号操作符可以在一条语句中执行多个操作
  // 用途：1、声明多个变量 2、赋值
  // 在用于赋值操作时，逗号操作符总是返回最后一个表达式的值。
  {
    var a = 1, b = 2;
    test.equal((a *= 10, b += 2, a + b), 14);
  }

  // Label: <语句组>
  {
    var num = 0;
    for (var i = 0 ; i < 10 ; i++) {
      for (var j = 0 ; j < 10 ; j++) {
        if (i == 5 && j == 5) {
          break;
        }
        num++;
      }
    }
    test.equal(num, 95);  // 未加lable：
  }
  {
    var num = 0;
    outPoint:
    for (var i = 0 ; i < 10 ; i++) {
      for (var j = 0 ; j < 10 ; j++) {
        if (i == 5 && j == 5) {
          break outPoint;
        }
        num++;
      }
    }
    test.equal(num, 55);  // 加入lable：是因为执行到break outpoint时，直接跳出到outPoint层
  }
  {
    var num = 0;
    for (var i = 0 ; i < 10 ; i++) {
      outPoint:
      for (var j = 0 ; j < 10 ; j++) {
        if (i == 5 && j == 5) {
          break  outPoint;
        }
        num++;
      }
    };
    test.equal(num, 95);
  }

  // break语句执行后跳出for()循环
  {
    var num = 0;
    for (var i = 1 ; i < 10 ; i++){
      if (i % 5 == 0){
        break;
      }
      num++;
    };
    test.equal(num, 4);
  }
  // continue语句执行后跳到for()循环，继续执行循环，直到循环条件不成立。
  {
    var num = 0;
    for (var i = 1 ; i < 10 ; i++){
      if(i % 5 == 0){
        continue;
      }
      num++;
    };
    test.equal(num, 8);
  }

  // switch语句在比较时使用的是全等操作符比较，因此不会发生类型转换。

  // ECMAscript函数参数的特点;
  // 不介意传递进来多少个参数
  // 不介意传递进来的参数的数据类型
  // 之所以有上述两个特点，是因为ECMAscript参数在内部是用一个数组表示的。函数接收到的始终是这个数组，而不关心数组中包含哪些参数，或者是否有参数。
  // 实际上，在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递给函数的每一个参数。
  {
    function howManyArgs() {
      for (var arg in arguments) {
        test.equal(Number.parseInt(arg) + 1, arguments[arg]);
      }
      return arguments.length;
    }
    test.equal(howManyArgs(1, 2, 3), 3);
  }
  // arguments还有一个属性：callee,它的作用是返回正在被执行的function
  // 在使用函数递归调用时推荐使用arguments.callee代替函数名本身。
  {
    function getcount(a) {
      if (a == 1) {
        return 1;
      }
      return a + arguments.callee(--a);
    }
    test.equal(getcount(2), 3);
    test.equal(getcount(5), 15);
  }
  // arguments.length返回的是传递给函数的参数个数，也叫实参
  // arguments.callee.length返回的是函数定义的参数，即形参。
  {
    function calleeLengthDemo(arg1, arg2) {
      test.equal(arguments.length, 4);
      test.equal(arguments.callee.length, 2);
    }
    calleeLengthDemo(1,2,3,4);
  }
  // ECMAscript函数不能实现重载，不能够定义同样的函数然后通过编译器去根据不同的参数执行不同的函数。
  // 只要函数名一致，ECMAscript就会认为是同一个东西，那么后定义的就会覆盖先定义的。
  // 对于ECMAscript函数来说，我自己本没有参数，你给我什么参数我就接受什么样的参数。

  // 变量分类：
  // 基本类型值：null、undefined、number、string、Boolean；
  // 引用类型值：保存在内存中的对象，如：Object / Array / Function / Date / RegExp / Error / Map / Set …
  {
    var person = new Object();
    var person2 = person;
    test.equal(person.name, undefined);
    person.name = "Nicholas";
    test.equal(person.name, "Nicholas");
    test.equal(person2.name, "Nicholas");
  }
  // String一个特殊的基本数据类型
  {
    var str1 = "test";
    var str2 = str1;
    str1 = "test2";
    test.equal(str1, "test2");
    test.equal(str2, "test");
  }
  // 在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反应在函数的外部。
  {
    function setName(obj) {
      obj.name = "Nicholas";
    }
    var person = new Object();
    setName(person);
    test.equal(person.name, "Nicholas");
  }
  {
    function setName(obj) {
      obj.name = "Nicholas";
      obj = new Object();
      obj.name = "jack";
      test.equal(obj.name, "jack");
    }
    var person = new Object();
    setName(person);
    test.equal(person.name, "Nicholas");
  }
  // 检测基本数据类型：typeof
  // 检测引用类型值：instanceof
  {
    var s =[1,2];
    var a = true;
    var i = new Object();
    test.ok(i instanceof Object);
    test.ok(!(a instanceof Object));
    test.ok(s instanceof Array);
  }

  // 执行环境：定义了变量或者函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有与之关联的变量对象。
  // 变量对象：保存着环境中定义的变量和函数。
  // 作用域链：保证对执行环境有权访问的所有变量和函数的有序访问。
  // 标识符解析：沿着作用域链一级一级地搜索标识符的过程。
  {
    var color = "blue";
    function changeColor(){
      var anotherColor = "red";
      function swapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        test.equal(color, "red");
      }
      test.equal(color, "blue");
      swapColors();
      test.equal(color, "red");
    }
    changeColor();
    test.equal(color, "red");
  }

  // Javscript没有块级作用域。看下面代码：
  // {
  //   function buildUrl() {
  //     var qs = "?debug=true";
  //     with(location){
  //       var url = href + qs;
  //     }
  //     return url;
  //   }
  //   var result = buildUrl();
  //   alert(result);
  // }
  
  // 垃圾收集原理：
  // 找出那些不再继续使用的变量，然后释放其中占用的内存。
  // 垃圾收集器会按照固定的时间间隔（或代码执行中预设的收集时间），周期性的执行这一操作。
  // 标记清除：当变量进入环境时标记“进入环境”，而当变量离开环境时，这将其 标记为“离开环境”。
  // 引用计数：引用计数的含义是跟踪记录每个值被引用的次数。当声明一个变量并将引用类型的值赋给该变量时，则这个值的引用次数就是1。
  // 如果同一个值又被赋给另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量又取得另外一个值，则这个值的引用次数减1.
  // 当这个值的引用次数变成0时，则说明没有办法访问这个值了，因此就可以将其占用的内存空间回收回来。
  // 这样当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存。
  {
    function countMethod(){
      var object1 = new Object(); // 声明变量，计数器由 0 变为 1
      var object2 = new Object(); // 声明变量，计数器由 0 变为 1
      object1.method1 = "This is object1";  // object1 计数器 -1，object1 读数变为0
      object2.method2 = "This is object2";  // object2 计数器 -1，object2 读数变为0
    }
  }
  {
    function countMethod(){
      var object1 = new Object(); // 声明变量，object1计数器由 0 变为 1
      var object2 = new Object(); // 声明变量，object2计数器由 0 变为 1
      object1.method1 = object2;  // object1 计数器 -1，object2 计数器 +1
      object2.method2 = object1;  // object1 计数器 +1，object2 计数器 -1
      object1.method1 = null;     // object2 计数器 -1
      object2.method2 = null;     // object1 计数器 -1
    }
  }
  // 解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收。
  {
    function createPerson (name) {
      var localPerson = new Object();
      localPerson.name = name;
      return localPerson;
    };
    var gllbalPerson = createPerson("Nicholas");
    // 手工解除globalPerson的引用
    globalPerson = null;
  }

  // 向函数传递大量可选参数时，建议使用字面量表示法：
  {
    function displayInfo(args) {
      var output = "";
      if (typeof args.name == "string"){
        output += "Name: " + args.name + "\n";
      }
      if (typeof args.age == "number") {
        output += "Age: " + args.age + "\n";
      }
      return output;
    }

    test.equal(displayInfo({
      name: "Nicholas",
      age: 29
    }), "Name: Nicholas\nAge: 29\n");

    test.equal(displayInfo({
      name: "Greg"
    }), "Name: Greg\n");
  }

  test.done();
};

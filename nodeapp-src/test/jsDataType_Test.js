

exports.testDateType = function(test) {
  // JavaScript中有5种简单数据类型（也称为基本数据类型）：
  // Undefined、Null、Boolean、Number和String。
  // 还有1种复杂数据类型——Object，Object本质上是由一组无序的名值对组成的。

  // JavaScript是松散类型的，因此需要通过typeof来检测给定变量的数据类型
  var a;
  test.equal(typeof a, "undefined");
  a = true;
  test.equal(typeof a, "boolean");
  a = "string";
  test.equal(typeof a, "string");
  a = 123;
  test.equal(typeof a, "number");
  a = test;
  test.equal(typeof a, "object");
  a = test.equal;
  test.equal(typeof a, "function");

  // Undefined类型只有一个值，即特殊的undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined
  var u;
  test.equal(u, undefined);
  test.equal(typeof undefined, "undefined");

  // Null类型是第二个只有一个值的数据类型，这个特殊的值是null。
  // 从逻辑角度来看，null值表示一个空对象指针，而这也正是使用typeof操作符检测null时会返回"object"的原因
  test.equal(typeof null, "object");

  // 实际上，undefined值是派生自null值的，因此ECMA-262规定对它们的相等性测试要返回true。
  test.equal(null, undefined);
  // 尽管null和undefined有这样的关系，但它们的用途完全不同。
  // 无论在什么情况下都没有必要把一个变量的值显式地设置为undefined，可是同样的规则对null却不适用。
  // 换句话说，只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。
  // 这样做不仅可以体现null作为空对象指针的惯例，而且也有助于进一步区分null和undefined。

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
  test.ok(isNaN("NaN"));
  test.ok(isNaN("Test"));
  test.ok(!isNaN(10));
  test.ok(!isNaN("10"));
  test.ok(!isNaN(true));
  test.ok(!isNaN(false));

  // Number()函数的转换规则如下：
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

  // parseInt()函数在转换字符串时，更多的是看其是否符合数值模式。
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

  // parseFloat()也是从第一个字符（位置0）开始解析每个字符。
  // 而且也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。
  // 也就是说，字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略。
  // parseFloat()和parseInt()的第二个区别在于它始终都会忽略前导的零。
  // 由于parseFloat()值解析十进制值，因此它没有用第二个参数指定基数的用法。
  test.equal(parseFloat(" 1234 blue"), 1234);
  test.equal(parseFloat("12.34.56"), 12.34);
  test.equal(parseFloat("0xAF"), 0);
  test.equal(parseFloat("0908.123"), 908.123);
  test.equal(parseFloat("9234.567890123456789"), 9234.567890123457);

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

  // Object类型
  // 对象其实就是一组数据和功能的集合。
  // 对象可以通过执行new操作符后跟要创建的对象类型的名称来创建。
  // 而创建Object类型的实例并为其添加属性和（或）方法，就可以创建自定义对象。
  var o = new Object();
  test.equal(typeof o, "object");
  // Object的每个实例都具有下列属性和方法：
  // ● constructor——保存着用于创建当前对象的函数
  // ● hasOwnProperty(propertyName)——用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其中，作为参数的属性名(propertyName)必须以字符串形式指定（例如：o.hasOwnProperty("name")）
  // ● isPrototypeOf(object)——用于检查传入的对象是否是另一个对象的原型
  // ● propertyIsEnumerable(propertyName)——用于检查给定的属性是否能够使用for-in语句来枚举
  // ● toString()——返回对象的字符串表示
  // ● valueOf()——返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值相同。
  test.equal(typeof o.constructor, "function");
  test.equal(typeof o.hasOwnProperty, "function");
  test.equal(typeof o.isPrototypeOf, "function");
  test.equal(typeof o.propertyIsEnumerable, "function");
  test.equal(typeof o.toString, "function");
  test.equal(typeof o.valueOf, "function");
  test.equal(typeof o.testfunction, "undefined");

  test.done();
};

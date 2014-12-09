

exports.testDateType = function(test) {
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

  // Undefined类型 ----------------------------------------------------------------------------------
  // Undefined类型只有一个值，即特殊的undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined
  var u;
  test.equal(u, undefined);
  test.equal(typeof undefined, "undefined");

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
  test.ok(isNaN("NaN"));
  test.ok(isNaN("Test"));
  test.ok(!isNaN(10));
  test.ok(!isNaN("10"));
  test.ok(!isNaN(true));
  test.ok(!isNaN(false));

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
  test.equal(typeof o.constructor, "function");
  test.equal(typeof o.hasOwnProperty, "function");
  test.equal(typeof o.isPrototypeOf, "function");
  test.equal(typeof o.propertyIsEnumerable, "function");
  test.equal(typeof o.toString, "function");
  test.equal(typeof o.valueOf, "function");
  test.equal(typeof o.testfunction, "undefined");

  // 创建Object实例的方式有两种，第一种是使用new操作符后跟Object构造函数。
  var person1 = new Object();
  person1.name = "tt";
  person1.age = 12;
  // 另一种方式是使用对象字面量表示法。
  var person2 = {
    name : 'tt',
    age : 12
  }
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
  // 数组的length属性很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移除项或想数组中添加新项。
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
  }
  var values = [0,1,5,10,15];
  values.sort(compare);
  test.equal(values, "15,10,5,1,0");               //15,10,5,1,0
  // 对于数值类型或者其valueOf()方法会返回数值类型的对象类型，可以使用一个更简单的比较函数。
  // 这个函数主要用第二个值减第一个值即可。
  function compare(value1,value2){
    return value2 - value1;
  }
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
  test.equal(y2k1.toString(), y2k2.toString());
  test.equal(y2k1.toString(), "Sat Jan 01 2000 08:00:00 GMT+0800 (CST)");
  test.equal(allFives1.toString(), allFives2.toString());
  test.equal(allFives1.toString(), "Fri May 06 2005 01:55:55 GMT+0800 (CST)");





  test.done();
};

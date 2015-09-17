(function() {
  console.log("\n---变量的作用域");

  var a = 1;
  console.log(a); // 1
  function hehe() {
    // 按照javascript作用域链的原理，当一个变量在当前作用域下找不到该变量的定义，
    // 那么javascript引擎就会沿着作用域链往上找直到在全局作用域里查找，
    // 按上面的代码所示，虽然函数内部重新定义了变量的值，但是内部定义之前函数使用了该变量，
    // 那么按照作用域链的原理在函数内部变量定义之前使用该变量，
    // javascript引擎应该会在全局作用域里找到变量定义，
    // 而实际情况却是变量未定义，这到底是怎么回事呢？
    console.log(a); // undefined
    var a = 2;
    console.log(a); // 2
  }
  hehe();
})();

(function() {
  "use strict";
  console.log("\n---变量的作用域");

  var a = 1;
  console.log(a); // 1
  function hehe() {
    // console.log(a); // ReferenceError: a is not defined
    let a = 2;
    console.log(a); // 2
  }
  hehe();
})();

(function() {
  console.log("\n---作为基本数据类型，我们没法为这个变量添加属性，当然方法也同样不可以");
  var str = "sharpxiajun";
  str.attr01 = "hello world";
  console.log(str); // sharpxiajun
  console.log(str.attr01); // undefined
  str.ftn = function() {
    console.log("str ftn");
  };
  // str.ftn(); // TypeError: str.ftn is not a function

  // Javascript里的基本变量是存放在栈区的（栈区指内存里的栈内存）
  // javascript里引用变量的存储就比基本类型存储要复杂多，引用类型的存储需要内存的栈区和堆区（堆区是指内存里的堆内存）共同完成
})();

// 在javascript里变量的存储包含三个部分：
// 部分一：栈区的变量标示符；
// 部分二：栈区变量的值；
// 部分三：堆区存储的对象。
// 变量不同的定义，这三个部分也会随之发生变化，下面我来列举一些典型的场景：
(function() {
  console.log("\n---变量被命名了，但是还未初始化，此时在变量存储的内存里只拥有栈区的变量标示符而没有栈区的变量值，当然更没有堆区存储的对象。");
  var qqq;
  console.log(qqq); // undefined
})();

(function() {
  console.log("\n---可以直接赋值给没有被var定义的变量，变量最终都是属于window对象(node为global)");
  // console.log(xxx); // ReferenceError: xxx is not defined

  sss = "outer sss";
  console.log(sss); // outer sss
  function testFtn() {
    var sss = "inner sss";
    console.log(sss); // inner sss
    console.log(this.sss); // outer sss
    console.log(this === global);
  }
  testFtn();
  console.log(sss); // outer sss
  console.log(global.sss); // outer sss
  console.log(this === global);

  var ooo = null;
  console.log(ooo); // null
  console.log(ooo == undefined); // true
  console.log(ooo == null); // true
  console.log(ooo === undefined); // false
  console.log(ooo === null); // true

  // undefined和null，从javascript变量存储的三部分角度思考，
  // 当变量的值为undefined时候，那么该变量只有栈区的标示符，
  // 如果我们对undefined的变量进行赋值操作，如果值是基本类型，那么栈区的值就有值了，
  // 如果栈区是对象那么堆区会有一个对象，而栈区的值则是堆区对象的地址，
  // 如果变量值是null的话，我们很自然认为这个变量是对象，而且是个空对象，
  // 按照我前面讲到的变量存储的三部分考虑：当变量为null时候，栈区的标示符和值都会有值，
  // 堆区应该也有，只不过堆区是个空对象，这么说来null其实比undefined更耗内存了

  // null居然可以和undefined相等，但是使用更加精确的三等号“===”，发现二者还是有点不同，
  // 其实javascript里undefined类型源自于null即null是undefined的父类，
  // 本质上null和undefined除了名字这个马甲不同，其他都是一样的，
  // 不过要让一个变量是null时候必须使用等号“=”进行赋值了。

  // 变量定义最好放在变量所述作用域的最前端，这么做也是保证代码健壮性的一个重要手段。

  var str;
  if (undefined != str && null != str && "" != str) {
    console.log("true");
  } else {
    console.log("false");
  }
  if (undefined != str && "" != str) {
    console.log("true");
  } else {
    console.log("false");
  }
  if (null != str && "" != str) {
    console.log("true");
  } else {
    console.log("false");
  }
  if (!!str) {
    console.log("true");
  } else {
    console.log("false");
  }
  str = "";
  if (!!str) {
    console.log("true");
  } else {
    console.log("false");
  }
  var num = 0;
  if (!!num) {
    console.log("true");
  } else {
    console.log("false");
  }
  var obj = null;
  if (!!obj) {
    console.log("true");
  } else {
    console.log("false");
  }
  var obj2 = {};
  if (!!obj2) {
    console.log("true");
  } else {
    console.log("false");
  }
  // 我们定义变量初始化值的时候，如果基本类型是string，我们赋值空字符串，
  // 如果基本类型是number我们赋值为0，这样使用if语句我们就可以判断该变量是否是被使用过了。
  // 所以在定义对象变量时候，初始化时候我们要给变量赋予null，这样if语句就可以判断变量是否初始化过。
})();


(function() {
  console.log("\n---复制变量的值和函数传递参数");

  var s1 = "sharpxiajun";
  var s2 = s1;
  console.log(s1); // sharpxiajun
  console.log(s2); // sharpxiajun
  s2 = "xtq";
  console.log(s1); // sharpxiajun
  console.log(s2); // xtq

  var obj1 = new Object();
  obj1.name = "obj1 name";
  console.log(obj1.name); // obj1 name
  var obj2 = obj1;
  console.log(obj2.name); // obj1 name
  obj1.name = "sharpxiajun";
  console.log(obj1.name); // sharpxiajun
  console.log(obj2.name); // sharpxiajun
  // 我们发现当复制的是对象，那么obj1和obj2两个对象被串联起来了，obj1变量里的属性被改变时候，obj2的属性也被修改。

  // 函数传递参数的本质就是外部的变量复制到函数参数的变量里，我们看看下面的代码：
  function testFtn(sNm, pObj) {
    console.log(sNm); // new Name
    console.log(pObj.oName); // new obj
    sNm = "change name";
    pObj.oName = "change obj";
  }
  var sNm = "new Name";
  var pObj = {
    oName: "new obj"
  };
  testFtn(sNm, pObj);
  console.log(sNm); // new Name
  console.log(pObj.oName); // change obj

  // 在javascript里传递参数是按值传递的。

  // 在javascript里变量的复制（函数传参也是变量赋值）本质是传值，这个值就是栈区的值，
  // 而基本类型的内容是存放在栈区的值里，所以复制基本变量后，两个变量是独立的互不影响，
  // 但是当复制的是引用类型时候，复制操作还是复制栈区的值，但是这个时候值是堆区对象的地址，
  // 因为javascript语言是不允许操作堆内存，因此堆内存的变量并没有被复制，
  // 所以复制引用对象复制的值就是堆内存的地址，而复制双方的两个变量使用的对象是相同的，
  // 因此复制的变量其中一个修改了对象，另一个变量也会受到影响。

  var ftn1 = function() {
    console.log("test:ftn1");
  };
  var ftn2 = function() {
    console.log("test:ftn2");
  };

  function ftn(f) {
    f(); // test:ftn1
    f = ftn2;
    f(); // test:ftn2
  }
  ftn(ftn1);
  ftn1(); // test:ftn1
  ftn2(); // test:ftn2
})();

// 作用域的定义：
// 作用域在许多程序设计语言中非常重要。 通常来说，一段程序代码中所用到的名字并不总是有效/可用的，
// 而限定这个名字的可用性的代码范围就是这个名字的作用域。
// 作用域的使用提高了程序逻辑的局部性，增强程序的可靠性，减少名字冲突。
(function() {
  console.log("\n---this === global");

  // 在javascript我们定义函数方式是通过function xxx(){}形式，那么这个函数不管定义在哪里，
  // 它都属于全局对象window(global)，所以他们的执行环境的外部的执行上下文都是指向window(global)。
  console.log(this === global); // true
  s1 = "sharpxiajun";

  function ftn() {
    var s2 = "xtq";
    console.log(this === global); // true
    console.log("s1:" + this.s1 + ";s2:" + this.s2); // s1:sharpxiajun;s2:undefined
    console.log("s1:" + this.s1 + ";s2:" + s2); // s1:sharpxiajun;s2:xtq
  }
  ftn();

  if (true) {
    var a = "aaaa";
  }
  console.log(a); // aaaa

  // 情况一：当页面加载时候在script标签下的javascript代码会按顺序执行，
  //       而这些能被执行的代码都是属于window(node 下为global对象)的变量或函数；
  // 情况二：当函数的名字后面加上小括号()，例如ftn()，这也是在执行，不过它执行的是函数。

  // 如此说来，javascript里的执行环境有两类一类是全局执行环境，
  // 即window代表的全局环境，一类是函数代表的函数执行环境，这也就是我们常说的局部作用域。

  // 全局执行环境的上下文变量是可以访问到的，它就是window对象，所以我们说window能代表全局作用域是有道理的，
  // 但是局部作用域即函数的执行环境里的上下文变量是代码不能访问到的，不过javascript引擎在处理数据时候会使用到它。

  // 在javascript语言里还有一个概念，它的名字叫做execution context stack，翻译成中文就是执行环境栈，
  // 每个要被执行的函数都会先把函数的执行环境压入到执行环境栈里，函数执行完毕后，这个函数的执行环境就会被执行环境栈弹出，
  // 例如上面的例子：函数执行时候函数的执行环境会被压入到执行环境栈里，函数执行完毕，执行环境栈会把这个环境弹出，
  // 执行环境栈的控制权就会交由全局环境，如果函数后面还有代码，那么代码就是接着执行。
  // 如果函数里嵌套了函数，那么嵌套函数执行完毕后，执行环境栈的控制权就交由了外部函数，然后依次类推，最后就是全局执行环境了。

  // 讲到这里我们大名鼎鼎的作用域链要登场了，函数的执行环境被压入到执行环境栈里后，函数就要执行了，
  // 函数执行的第一步不是执行函数里的第一行代码而是在上下文变量里构造一个作用域链，作用域链的英文名字叫做scope chain，
  // 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，这个概念里有两个关键意思：有权访问和有序，
  var b1 = "b1";

  function ftn1() {
    var b2 = "b2";
    var b1 = "bbb";

    function ftn2() {
      var b3 = "b3";
      b2 = b1;
      b1 = b3;
      console.log("b1:" + b1 + ";b2:" + b2 + ";b3:" + b3); // b1:b3;b2:bbb;b3:b3
    }
    console.log("b1:" + b1 + ";b2:" + b2); // b1:bbb;b2:b2
    ftn2();
    console.log("b1:" + b1 + ";b2:" + b2); // b1:b3;b2:bbb
  }
  ftn1();
  console.log(b1); // b1;
  // 有这个例子我们发现，ftn2函数可以访问变量b1，b2，这个体现了有权访问的概念，
  // 当ftn1作用域里改变了b1的值并且把b1变量重新定义为ftn1的局部变量，
  // 那么ftn2访问到的b1就是ftn1的，ftn2访问到b1后就不会在全局作用域里查找b1了，这个体现了有序性。
})();

(function() {
  "use strict";
  console.log("\n---strict 模式下this === undefined");

  console.log(this === global); // false
  console.log(this === undefined); // true
  s1 = "sharpxiajun";
  console.log("s1:" + global.s1);

  function ftn() {
    var s2 = "xtq";
    console.log(this === global); // false
    console.log("s1:" + global.s1 + ";s2:" + global.s2); // s1:sharpxiajun;s2:undefined
    console.log("s1:" + global.s1 + ";s2:" + s2); // s1:sharpxiajun;s2:xtq
  }
  ftn();

})();

(function() {
  console.log("\n---this与作用域");
  // 作用域链的相关问题，这个标题定义的含义是指作用域链是大名鼎鼎了，
  // 但是作用域链在广大程序员的理解里其实包含的意义已经超越了作用域链在javascript语言本身的定义。
  // 广大程序员对作用域链的理解有两块一块是作用域，而作用域在javascript语言里指的是执行环境execution context，
  // 执行环境在javascript引擎里是通过上下文变量体现的variable object，
  // javascript引擎里还有一个概念就是执行环境栈execution context stack，
  // 当某一个函数的执行环境压入到了执行环境栈里，这个时候就会在上下文变量里构造一个对象，
  // 这个对象就是作用域链scope chain，而这个作用域链就是广大程序员理解的第二块知识，
  // 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，
  // 作用域链的变量只能向上访问，变量访问到window对象即被终止，作用域链向下访问变量是不被允许的。

  // 很多人常常认为作用域链是理解this指针的关键，这个理解是不正确的的，this指针构造是和作用域链同时发生的，
  // 也就是说在上文变量构建作用域链的同时还会构造一个this对象，this对象也是属于上下文变量，
  // 而this变量的值就是当前执行环境外部的上下文变量的一份拷贝，这个拷贝里是没有作用域链变量的

  // 在javascript我们定义函数方式是通过function xxx(){}形式，那么这个函数不管定义在哪里，
  // 它都属于全局对象window(global)，所以他们的执行环境的外部的执行上下文都是指向window(global)。
  var obj = {
    name: "sharpxiajun",
    ftn: function() {
      console.log(this); // { name: 'sharpxiajun', ftn: [Function] }
      console.log(this.name); // sharpxiajun
    }
  };
  obj.ftn();

  var obj1 = new Object();
  obj1.name = "xtq";
  obj1.ftn = function() {
    console.log(this); // { name: 'xtq', ftn: [Function] }
    console.log(this.name); // xtq
  };
  obj1.ftn();

})();

(function() {
  console.log("\n---this作用域");

  // 其实javascript里的this指针逻辑上的概念也是实例化对象，
  // 这一点和java语言里的this指针是一致的，但是javascript里的this指针却比java里的this难以理解的多，
  // 究其根本原因我个人觉得有三个原因：

  // 原因一：javascript是一个函数编程语言，怪就怪在它也有this指针，说明这个函数编程语言也是面向对象的语言，
  // 说的具体点，javascript里的函数是一个高阶函数，编程语言里的高阶函数是可以作为对象传递的，
  // 同时javascript里的函数还有可以作为构造函数，这个构造函数可以创建实例化对象，
  // 结果导致方法执行时候this指针的指向会不断发生变化，很难控制。

  // 原因二：javascript里的全局作用域对this指针有很大的影响，
  // 由上面java的例子我们看到，this指针只有在使用new操作符后才会生效，
  // 但是javascript里的this在没有进行new操作也会生效，这时候this往往会指向全局对象window。

  // 原因三：javascript里call和apply操作符可以随意改变this指向，
  // 这看起来很灵活，但是这种不合常理的做法破坏了我们理解this指针的本意，同时也让写代码时候很难理解this的真正指向

  // 上面的三个原因都违反了传统this指针使用的方法，它们都拥有有别于传统this原理的理解思路，
  // 而在实际开发里三个原因又往往会交织在一起，这就更加让人迷惑不解了，
  // 今天我要为大家理清这个思路，其实javascript里的this指针有一套固有的逻辑，
  // 我们理解好这套逻辑就能准确的掌握好this指针的使用。
  this.a = "aaa";
  console.log(a); // aaa
  console.log(this.a); // aaa
  console.log(this == global); // true

  // 在script标签里我们可以直接使用this指针，this指针就是window对象，我们看到即使使用三等号它们也是相等的。
  // 全局作用域常常会干扰我们很好的理解javascript语言的特性，这种干扰的本质就是：

  // 在javascript语言里全局作用域可以理解为window对象，记住window是对象而不是类，也就是说window是被实例化的对象，
  // 这个实例化的过程是在页面加载时候由javascript引擎完成的，整个页面里的要素都被浓缩到这个window对象，
  // 因为程序员无法通过编程语言来控制和操作这个实例化过程，所以开发时候我们就没有构建这个this指针的感觉，
  // 常常会忽视它，这就是干扰我们在代码里理解this指针指向window的情形。

  // 干扰的本质还和function的使用有关，我们看看下面的代码：
  function ftn01() {
    console.log("I am ftn01!");
  }
  var ftn02 = function() {
    console.log("I am ftn02!");
  };
  // 上面是我们经常使用的两种定义函数的方式，第一种定义函数的方式在javascript语言称作声明函数，
  // 第二种定义函数的方式叫做函数表达式，这两种方式我们通常认为是等价的，但是它们其实是有区别的，
  // 而这个区别常常会让我们混淆this指针的使用，我们再看看下面的代码：
  console.log(ftn011); // ftn01()  注意：在firebug下这个打印结果是可以点击，点击后会显示函数的定义
  console.log(ftn021); // undefined
  function ftn011() {
    console.log("I am ftn01!");
  }
  var ftn021 = function() {
    console.log("I am ftn02!");
  };
  console.log(ftn021); // [Function]
  // 这又是一段没有按顺序执行的代码，先看看ftn02，打印结果是undefined，
  // undefined我在前文里讲到了，在内存的栈区已经有了变量的名称，但是没有栈区的变量值，同时堆区是没有具体的对象，
  // 这是javascript引擎在预处理扫描变量定义所致，
  // 但是ftn01的打印结果很令人意外，既然打印出完成的函数定义了，而且代码并没有按顺序执行，这只能说明一个问题：

  // 在javascript语言通过声明函数方式定义函数，javascript引擎在预处理过程里就把函数定义和赋值操作都完成了，
  // 在这里我补充下javascript里预处理的特性，其实预处理是和执行环境相关，在上篇文章里我讲到执行环境有两大类：
  // 全局执行环境和局部执行环境，执行环境是通过上下文变量体现的，其实这个过程都是在函数执行前完成，
  // 预处理就是构造执行环境的另一个说法，总而言之预处理和构造执行环境的主要目的就是明确变量定义，分清变量的边界，
  // 但是在全局作用域构造或者说全局变量预处理时候对于声明函数有些不同，声明函数会将变量定义和赋值操作同时完成，
  // 因此我们看到上面代码的运行结果。
  // 由于声明函数都会在全局作用域构造时候完成，因此声明函数都是window对象的属性，
  // 这就说明为什么我们不管在哪里声明函数，声明函数最终都是属于window对象的原因了。

  // 关于函数表达式的写法还有秘密可以探寻，我们看下面的代码：
  function ftn03() {
    var ftn04 = function() {
      console.log(this === global); // true
    };
    ftn04();
  }
  ftn03();
  // 运行结果我们发现ftn04虽然在ftn03作用域下，但是执行它里面的this指针也是指向window，
  // 其实函数表达式的写法我们大多数更喜欢在函数内部写，因为声明函数里的this指向window这已经不是秘密，
  // 但是函数表达式的this指针指向window却是常常被我们所忽视，特别是当它被写在另一个函数内部时候更加如此。

  // 其实在javascript语言里任何匿名函数都是属于window对象，它们也都是在全局作用域构造时候完成定义和赋值，
  // 但是匿名函数是没有名字的函数变量，但是在定义匿名函数时候它会返回自己的内存地址，如果此时有个变量接收了这个内存地址，
  // 那么匿名函数就能在程序里被使用了，因为匿名函数也是在全局执行环境构造时候定义和赋值，所以匿名函数的this指向也是window对象，
  // 所以上面代码执行时候ftn04的this也是指向window，因为javascript变量名称不管在那个作用域有效，
  // 堆区的存储的函数都是在全局执行环境时候就被固定下来了，变量的名字只是一个指代而已。

  var obj = {
    name: "sharpxiajun",
    job: "Software",
    show: function() {
      console.log("Name:" + this.name + ";Job:" + this.job); // Name:sharpxiajun;Job:Software
      console.log(this); // { name: 'sharpxiajun', job: 'Software', show: [Function] }
      console.log(this === obj); // true
    }
  };
  var otherObj = new Object();
  otherObj.name = "xtq";
  otherObj.job = "good";
  otherObj.show = function() {
    console.log("Name:" + this.name + ";Job:" + this.job); // Name:xtq;Job:good
    console.log(this); // { name: 'xtq', job: 'good', show: [Function] }
    console.log(this === otherObj); // true
  };
  obj.show();
  otherObj.show();

  function Person(name, sex, age, job) {
    this.name = name;
    this.sex = sex;
    this.age = age;
    this.job = job;
    this.showPerson = function() {
      console.log("姓名:" + this.name);
      console.log("性别:" + this.sex);
      console.log("年龄:" + this.age);
      console.log("工作:" + this.job);
      console.log(this); // { name: '马云', sex: '男', age: 46, job: '董事长', showPerson:[Function] }
      console.log(this === person); // true
    };
  }
  var person = new Person("马云", "男", 46, "董事长");
  person.showPerson();
  // 看this指针的打印，类变成了Person，这表明function Person就是相当于在定义一个类，
  // 在javascript里function的意义实在太多，function既是函数又可以表示对象，function是函数时候还能当做构造函数，
  // javascript的构造函数我常认为是把类和构造函数合二为一，当然在javascript语言规范里是没有类的概念，
  // 但是我这种理解可以作为构造函数和普通函数的一个区别，这样理解起来会更加容易些。

  // 下面我贴出在《javascript高级编程》里对new操作符的解释：
  // new操作符会让构造函数产生如下变化：
  // 1.       创建一个新对象；
  // 2.       将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
  // 3.       执行构造函数中的代码（为这个新对象添加属性）；
  // 4.       返回新对象
})();

(function() {
  console.log("\n---Call和apply是改变函数的作用域");

  // Call和apply是将this指针指向方法的第一个参数。
  var name1 = "sharpxiajun";

  function ftn(name1) {
    console.log(name1);
    console.log(this.name1);
    console.log(this === obj1);
  }
  ftn("101");
  var obj1 = {
    name1: "xtq"
  };
  ftn.call(obj1, "102");
  // 我们看到apply和call改变的是this的指向，这点在开发里很重要，开发里我们常常被this所迷惑，
  // 迷惑的根本原因我在上文讲到了，这里我讲讲表面的原因：

  // 表面原因就是我们定义对象使用对象的字面表示法，字面表示法在简单的表示里我们很容易知道this指向对象本身，
  // 但是这个对象会有方法，方法的参数可能会是函数，而这个函数的定义里也可能会使用this指针，
  // 如果传入的函数没有被实例化过和被实例化过，this的指向是不同，
  // 有时我们还想在传入函数里通过this指向外部函数或者指向被定义对象本身，
  // 这些乱七八糟的情况使用交织在一起导致this变得很复杂，结果就变得糊里糊涂。

  // 其实理清上面情况也是有迹可循的，就以定义对象里的方法里传入函数为例：
  // 情形一：传入的参数是函数的别名，那么函数的this就是指向window；
  // 情形二：传入的参数是被new过的构造函数，那么this就是指向实例化的对象本身；
  // 情形三：如果我们想把被传入的函数对象里this的指针指向外部字面量定义的对象，那么我们就是用apply和call

  // 我们可以通过代码看出我的结论，代码如下：
  var name = "I am window";
  var obj = {
    name: "sharpxiajun",
    job: "Software",
    ftn01: function(obj) {
      obj.show();
    },
    ftn02: function(ftn) {
      ftn();
    },
    ftn03: function(ftn) {
      ftn.call(this);
    }
  };

  function Person(name) {
    this.name = name;
    this.show = function() {
      console.log("姓名:" + this.name);
      console.log(this === p);
    };
  }
  var p = new Person("Person");
  obj.ftn01(p);
  obj.ftn02(function() {
    console.log(this.name);
    console.log(this === global);
  });
  obj.ftn03(function() {
    console.log(this.name);
    console.log(this === obj);
  });

  // ***如果在javascript语言里没有通过new（包括对象字面量定义）、call和apply改变函数的this指针，函数的this指针都是指向window的。
})();

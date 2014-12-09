
exports.testThis = function(test) {
  // 在node环境里，如果执行一个js脚本，在全局范围内，this以一个空对象开始作为最高级的命名空间，
  // 这个时候，它和global不是等价的。
  test.notEqual(this, global);
  // console.log(this);
  // console.log(global);
  test.equal(this.toString(), "[object Object]");
  test.equal(global.toString(), "[object global]");

  foo = "bar";
  console.log(this.foo);
  console.log(global.foo);
  test.equal(foo, "bar");
  test.equal(this.foo, undefined);
  test.equal(global.foo, "bar");

  // 无论是在浏览器环境还是node环境， 除了在DOM事件处理程序里或者给出了thisArg(接下来会讲到)外，
  // 如果不是用new调用，在函数里面使用this都是指代全局范围的this。
  foo = "bar";
  function changeThis() {
    test.equal(this, global);
    test.equal(this.toString(), "[object global]");
    test.equal(global.toString(), "[object global]");
    this.foo = "foo";
    test.equal(this.foo, "foo");
    return this.foo;
  }
  test.equal(global.foo, "bar");
  test.equal(changeThis(), "foo");
  test.equal(global.foo, "foo");

  // 除非你使用严格模式，这时候this就会变成undefined。
  foo = "bar";
  function changeThisStrict() {
    "use strict";
    test.equal(this, undefined);
    test.notEqual(this, global);
    // test.equal(this.toString(), "[object global]");
    test.equal(global.toString(), "[object global]");
    // this.foo = "foo2";
    global.foo = "fooStrict";
    return global.foo;
  }
  test.equal(global.foo, "bar");
  test.equal(changeThisStrict(), "fooStrict");
  test.equal(global.foo, "fooStrict");

  // 如果你在调用函数的时候在前面使用了new，this就会变成一个新的值，和global的this脱离干系。
  foo = "bar";
  function changeThisNew() {
    test.equal(this, global);
    test.equal(this.toString(), "[object global]");
    test.equal(global.toString(), "[object global]");
    this.foo = "fooNew";
    test.equal(this.foo, "fooNew");
    return this.foo;
  }
  test.equal(global.foo, "bar");
  test.equal(changeThisNew(), "fooNew");
  test.equal(global.foo, "fooNew");
  //new changeThisNew();
  // test.notEqual(, "fooNew");
  test.equal(global.foo, "fooNew");

  // 你创建的每一个函数都是函数对象。它们会自动获得一个特殊的属性prototype，你可以给这个属性赋值。
  // 当你用new的方式调用一个函数的时候，你就能通过this访问你给prototype赋的值了。
  // foo = "bar";
  // function Thing() {
  //   test.equal(this.foo, "bar");
  // }
  // test.equal(Thing.prototype.foo, "bar");
  // var thing = new Thing();
  // test.equal(thing.foo, "bar");


  test.done();
};

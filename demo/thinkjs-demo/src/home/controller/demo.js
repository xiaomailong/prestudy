'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    //auto render template file index_index.html
    return this.display();
  }

  // 控制器里可以很方便的使用 Generator Function 来处理异步嵌套的问题。
  * generatorAction() {
      let model = this.model("user");
      let data = yield model.select();
      return this.success(data);
    }
    // 动态创建类的方式
  generatorClassAction: function* () {
    var model = this.model("user");
    var data = yield model.select();
    return this.success(data);
  }

  // 借助 Babel 编译，还可以在控制器里使用 ES7 里的 async/await。
  async asyncAction() {
    let model = this.model("user");
    let data = await model.select();
    return this.success(data);
  }

  // 动态创建类的方式
  asyncClassAction: async function () {
    var model = this.model("user");
    var data = await model.select();
    return this.success(data);
  }

  // ES6 里的 class 有 contructor 方法，但动态创建的类就没有该方法了，为了统一初始化执行的方法，将该方法统一定义为 init。
  // 该方法在类实例化的时候自动调用，无需手工调用。
  init(http) {
    super.init(http); //调用父类的init方法
    // ...
  }

  // 控制器在实例化时，会将 http 传递进去。该 http 对象是 ThinkJS 对 req 和 res 重新包装的一个对象，而非 Node.js 内置的 http 对象。
  // Action 里如果想获取该对象，可以通过 this.http 来获取。

  // 动态创建类方式
  // init: function (http) {
  //   this.super("init", http); //调用父类的init方法
  //   // ...
  // }

  // hinkJS 支持前置操作，方法名为 __before，该方法会在具体的 Action 调用之前自动调用。
  // 如果前置操作里阻止了后续代码继续执行，则不会调用具体的 Action，这样可以提前结束请求。
  /**
   * 前置方法
   * @return {Promise} []
   */
  __before() {
    // ...
  }

  // 一个 Action 代表一个要执行的操作。
  // 如： url 为 /home/article/detail，解析后的模块为 /home，控制器为 article， Action 为 detail，
  // 那么执行的 Action 就是文件 src/home/controller/aritcle 里的 detailAction 方法。
  // 如果解析后的 Action 值里含有 _，会自动做转化，具体的转化策略见 路由 -> 大小写转化。

  // 当解析后的 url 对应的控制器存在，但 Action 不存在时，会试图调用控制器下的魔术方法 __call。这里可以对不存在的方法进行统一处理。
  /**
   * @return {Promise} []
   */
  __call() {
    // ...
  }

  // Node.js 里经常有很多异步操作，而异步操作常见的处理方式是使用回调函数或者 Promise。
  // 这些处理方式都会增加一层作用域，导致在回调函数内无法直接使用 this，简单的处理办法是在顶部定义一个变量，将 this 赋值给这个变量，然后在回调函数内使用这个变量。
  // 如果每个 Action 里都要使用者手工写一个 var self = this，势必比较麻烦。
  // 为了解决这个问题，ThinkJS 在 Action 里直接提供了一个参数，这个参数等同于 var self = this
  //参数 self 等同于 var self = this
  selfAction: function (self) {
    this.model("user")
      .find()
      .then(function (data) {
        return self.model("article")
          .where({
            user_id: data.id
          })
          .select();
      })
      .then(function (data) {
        self.success(data);
      })
  }

  // 当然更好的解决办法是推荐使用 ES6 里的 Generator Function 和 Arrow Function，这样就可以彻底解决 this 作用域的问题。

  * selfGeneratorAction() {
    let data = yield this.model("user")
      .find();
    let result = yield this.model("article")
      .where({
        user_id: data.id
      })
      .select();
    this.success(result);
  }

  selfArrowAction: function () {
    this.model("user")
      .find()
      .then(data => {
        return this.model("article")
          .where({
            user_id: data.id
          })
          .select();
      })
      .then(data => {
        this.success(data);
      })
  }

  // 项目中经常要提供一些接口，这些接口一般都是直接输出 JSON 格式的数据，并且会有标识表明当前接口是否正常。
  // 如果发生异常，需要将对应的错误信息随着接口一起输出。
  // 控制器里提供了 this.success 和 this.fail 方法来输出这样的接口数据。
  successAction() {
    let data = {
      name: "thinkjs"
    };
    this.success(data);
    // 输出结果为 {errno: 0, errmsg: "", data: {"name": "thinkjs"}}，客户端可以通过 errno 是否为 0 来判断当前接口是否有异常。
  }

  failAction() {
    this.fail(1000, "connect error"); //指定错误号和错误信息
    // 输出结果为 {errno: 1000, errmsg: "connect error"}，客户端判断 errno 大于 0，就知道当前接口有异常，并且通过 errmsg 拿到具体的错误信息。
  }

  // 配置错误号和错误信息
  // 如果每个地方输出错误的时候都要指定错误号和错误信息势必比较麻烦，比较好的方式是把错误号和错误信息在一个地方配置，
  // 然后输出的时候只要指定错误号，错误信息根据错误号自动读取。
  // 错误信息支持国际化，所以配置放在 src/common/config/locale/[lang].js 文件中。如：
  // export default {
  //   10001: "get data error"
  // }
  // 通过上面的配置后，执行 this.fail(10001) 时会自动读取到对应的错误信息。
  fail10001Action() {
    this.fail(10001);
  }

  // 友好的错误号
  // 在程序里执行 this.fail(10001) 虽然能输出正确的错误号和错误信息，但人不能直观的看出来错误号对应的错误信息是什么。
  // 这时可以将 key 配置为大写字符串，值为错误号和错误信息。如:
  // export default {
  //   GET_DATA_ERROR: [1234, "get data error"] //key 必须为大写字符或者下划线才有效
  // }
  // 执行 this.fail('GET_DATA_ERROR') 时也会自动取到对应的错误号和错误信息。
  failDataAction() {
    this.fail('GET_DATA_ERROR');
  }

  // 输出不包含错误信息的 JSON
  // 如果输出的 JSON 数据里不想包含 errno 和 errmsg 的话，可以通过 this.json 方法输出 JSON。如：
  jsonAction() {
    this.json({
      name: "thinkjs"
    });
  }

  // 可以通过 get 方法获取 GET 参数
  // 如果参数不存在，那么值为空字符串。
  getAction() {
    let name = this.get("name");
    let allParams = this.get(); //获取所有 GET 参数
  }

  // 可以通过 post 方法获取 POST 参数
  // 如果参数不存在，那么值为空字符串。
  postAction() {
    let name = this.post("name");
    let allParams = this.post(); //获取所有 POST 参数
  }

  // 可以通过 file 方法获取上传的文件
  // 返回值是个对象，包含下面的属性：
  // {
  //   fieldName: "file", //表单字段名称
  //   originalFilename: filename, //原始的文件名
  //   path: filepath, //文件保存的临时路径，使用时需要将其移动到项目里的目录，否则请求结束时会被删除
  //   size: 1000 //文件大小
  // }
  // 如果文件不存在，那么值为一个空对象 {}。
  fileAction() {
    let file = this.file("image");
    let allFiles = this.file(); //获取所有上传的文件
  }

  // JSONP 格式数据输出
  // 可以通过 this.jsonp 方法输出 JSONP 格式的数据，callback 的请求参数名默认为 callback。如果需要修改请求参数名，可以通过修改配置 callback_name 来完成。

  // 更多方法
  // isGet() 当前是否是 GET 请求
  // isPost() 当前是否是 POST 请求
  // isAjax() 是否是 AJAX 请求
  // ip() 获取请求用户的 ip
  // redirect(url) 跳转到一个 url
  // write(data) 输出数据，会自动调用 JSON.stringify
  // end(data) 结束当前的 http 请求
  // json(data) 输出 JSON 数据，自动发送 JSON 相关的 Content-Type
  // jsonp(data) 输出 JSONP 数据，请求参数名默认为 callback
  // success(data) 输出一个正常的 JSON 数据，数据格式为 {errno: 0, errmsg: "", data: data}
  // fail(errno, errmsg, data) 输出一个错误的 JSON 数据，数据格式为 {errno: errno_value, errmsg: string, data: data}
  // download(file) 下载文件
  // assign(name, value) 设置模版变量
  // display() 输出一个模版
  // fetch() 渲染模版并获取内容
  // cookie(name, value) 获取或者设置 cookie
  // session(name, value) 获取或者设置 session
  // header(name, value) 获取或者设置 header
  // action(name, data) 调用其他 Controller 的方法，可以跨模块
  // model(name, options) 获取模型实例
}

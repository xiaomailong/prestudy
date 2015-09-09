module.exports = {
  // entry 模块的入口文件。依赖项数组中所有的文件会按顺序打包，每个文件进行依赖的递归查找，直到所有模块都被打成包；
  entry: './modules/main.js',
  // output: 是指页面通过webpack打包后生成的目标文件放在什么地方去
  output: {
    filename: 'bundle.js'
      // filename: 打包后的文件名
      // path: 打包文件存放的绝对路径。
      // publicPath: 网站运行时的访问路径。
  },
  module: {
    // module.loaders：是文件的加载器
    loaders: [
      // 比如我们之前react需要在页面中引入jsx的js源码到页面上来，然后使用该语法，
      // 但是通过webpack打包后就不需要再引入JSXTransformer.js；
      // 比如jsx-loader加载器就是代表JSXTransformer.js的
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      },
      // less-loader加载器是把css代码转化到style标签内，动态插入到head标签内；
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      // use ! to chain loaders
      {
        test: /\.css$/, // /.css$/会匹配xx.css文件，但是并不适用于xx.sass或者xx.css.zip文件.
        loader: 'style-loader!css-loader'
      },
      // url-loader 它会将样式中引用到的图片转为模块来处理; 配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式。
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  // resolve: 定义了解析模块路径时的配置，常用的就是extensions; 可以用来指定模块的后缀，这样在引入模块时就不需要写后缀，会自动补全。
  resolve: {
    // relolve.extensions: 自动扩展文件的后缀名，比如我们在require模块的时候，可以不用写后缀名的。
    extensions: ['', '.js', '.jsx']
      // relolve.alias: 模块别名定义，方便后续直接引用别名，无须多写长长的地址
  },
  // plugins: 定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取公用的部分，生成common.js;
  plugins: []
};

// webpack的几个命令
// webpack         // 最基本的启动webpack的方法
// webpack -w      // 提供watch方法；实时进行打包更新
// webpack -p      // 对打包后的文件进行压缩
// webpack -d      // 提供source map，方便调式代码

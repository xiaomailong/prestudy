
// 我们做js构建工作，都习惯安装grunt-cli，只需要命令行grunt。。。一切构建工作都自动完成了。
// 这已经是很完美的情况了，不过最近要做一个服务器版的自动化构建系统，
// 在nodejs中调用批处理执行grunt就显得很矬，而且各种问题。是否有更好，更漂亮的方式呢？

// grunt本来就是nodejs程序，安装后表现为一个node_module，那么cli是什么呢？
// 这只是一个nodejs写的命令行界面。所以，nodejs肯定可以直接在js层面调用grunt。
// 我们需要做的，只需要揭开cli的面纱。
// cli主要代码是一堆参数判断处理，但最终实际关键点是grunt.cli( )

var grunt = require('grunt');
// console.log(grunt.cli);
grunt.cli({
  // gruntfile必须是绝对路径，不能是相对路径。
  gruntfile: __dirname + '/Gruntfile.js'
});

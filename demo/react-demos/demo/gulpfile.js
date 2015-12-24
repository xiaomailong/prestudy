var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");


//gulp主动设置的命令
gulp.task("combine", function () {
  //通过browserify管理依赖
  browserify({
      //入口点,app.jsx
      entries: ["./app.jsx"],
      //利用reactify工具将jsx转换为js
      transform: [reactify]
    })
    //转换为gulp能识别的流
    .bundle()
    //合并输出为app.js
    .pipe(source("app.js"))
    //输出到当前文件夹中
    .pipe(gulp.dest("./"));
});


//gulp默认命令
gulp.task("default", ["combine"]);

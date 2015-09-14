var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpack = require("gulp-webpack");
var size = require('gulp-size');
var webpackConfig = require("./webpack.config.js");

// 语法检查
gulp.task('jshint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// 编译Sass
// gulp.task('sass', function() {
// gulp.src('./scss/*.scss')
// .pipe(sass())
// .pipe(gulp.dest('./css'));
// });

// 合并文件之后压缩代码
gulp.task('minify', function() {
  return gulp.src('src/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//监视文件变化
gulp.task('watch', function() {
  gulp.watch('src/*.js', ['jshint', 'minify']);
});

gulp.task('webpack', function() {
  var myConfig = Object.create(webpackConfig);
  return gulp.src('./src/main.js')
    .pipe(webpack(myConfig))
    .pipe(gulp.dest('./build'));
});

gulp.task('size', function() {
  return gulp.src('*.js')
    .pipe(size()) // 压缩前计算所有js大小
    .pipe(uglify()) // 压缩js文件
    .pipe(size()) // 压缩后计算所有js文件大小
    .pipe(gulp.dest('dist')); // 将文件拷贝到目标目录
});

//注册任务
// gulp.task('default', ['size', 'jshint', 'minify', 'watch', 'webpack']);
gulp.task('default', ['jshint', 'size']);

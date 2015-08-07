var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 语法检查
gulp.task('jshint', function(){
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
gulp.task('minify', function(){
return gulp.src('src/*.js')
.pipe(concat('all.js'))
.pipe(gulp.dest('dist'))
.pipe(rename('all.min.js'))
.pipe(uglify())
.pipe(gulp.dest('dist'));
});

//监视文件变化
gulp.task('watch', function(){
gulp.watch('src/*.js', ['jshint', 'minify']);
});

//注册任务
gulp.task('default', ['jshint', 'minify', 'watch']);

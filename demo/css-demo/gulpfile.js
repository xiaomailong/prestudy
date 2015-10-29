var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');

// 自动增加浏览器识别前缀
var autoprefixer = require('autoprefixer');

var color_rgba_fallback = require('postcss-color-rgba-fallback');

var opacity = require('postcss-opacity');

var pseudoelements = require('postcss-pseudoelements');

var vmin = require('postcss-vmin');

var pixrem = require('pixrem');

var will_change = require('postcss-will-change');

var atImport = require('postcss-import');

var mqpacker = require('css-mqpacker');

var cssnano = require('cssnano');

// Css语言超前功能
var cssnext = require('cssnext');

// 预处理
var precss = require('precss');

// 压缩Css文件
var nano = require('gulp-cssnano');

// 网格
var grid = require('postcss-grid');
// 网格选项
var options = {
  columns: 12, // the number of columns in the grid
  maxWidth: 960, // the maximum width of the grid (in px)
  gutter: 20, // the width of the gutter (in px)
  legacy: false // fixes the double-margin bug in older browsers. Defaults to false
};

var processors = [
  grid(options),
  autoprefixer({
    browsers: 'safari >= 9, ie >= 11'
  }),
  cssnext,
  precss,
  will_change,
  color_rgba_fallback,
  opacity,
  pseudoelements,
  vmin,
  pixrem,
  atImport,
  mqpacker,
  cssnano
];

gulp.task('css', function () {
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    // .pipe(nano())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass', function () {
  return gulp.src('./src/*.sass')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'));
});


// 样式向导
var styleGuide = require('postcss-style-guide');

var fs = require('fs');

gulp.task('style-guide', function () {
  var processedCSS = fs.readFileSync('./css/diamond1.css', 'utf-8');
  var processors = [
    styleGuide({
      name: "css-demo", // Project name
      theme: "default", // Theme name: default, sassline, 1column, forest
      file: "styleguide.html", // Style guide file name (default: styleguide.html)
      dir: "docs", // Output directory (default: "docs")
      showCode: true, // The flag to show CSS code (default: true)
      processedCSS: processedCSS
    })
  ];
  return gulp.src('./src/diamond1.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'));
});

// wrapper 函数
// 每一份 Gruntfile （和grunt插件）都遵循同样的格式，你所书写的Grunt代码必须放在此函数内：
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // 大部分的Grunt任务都依赖某些配置数据，这些数据被定义在一个object内，并传递给grunt.initConfig 方法。
    pkg: grunt.file.readJSON('package.json'),
    // 与大多数task一样，grunt-contrib-uglify 插件中的uglify 任务要求它的配置被指定在一个同名属性中。
    // 在这里有一个例子, 我们指定了一个banner选项(用于在文件顶部生成一个注释)，
    // 紧接着是一个单一的名为build的uglify目标，用于将一个js文件压缩为一个目标文件。
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        // src: 'src/<%= pkg.name %>.js',
        // dest: 'build/<%= pkg.name %>.min.js'
        src: 'Gruntfile.js',
        dest: 'Gruntfile.min.js'
      }
    }
  });

  // 加载 Grunt 插件和任务
  // 像 concatenation、[minification]、grunt-contrib-uglify 和 linting这些常用的任务（task）
  // 都已经以grunt插件的形式被开发出来了。
  // 只要在 package.json 文件中被列为dependency（依赖）的包，并通过npm install安装之后，
  // 都可以在Gruntfile中以简单命令的形式使用：
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 通过定义 default 任务，可以让Grunt默认执行一个或多个任务。
  // 在下面的这个案例中，执行 grunt 命令时如果不指定一个任务的话，将会执行uglify任务。
  // 这和执行grunt uglify 或者 grunt default的效果一样。
  // default任务列表数组中可以指定任意数目的任务（可以带参数）。
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify']);

  // A very basic default task.
  // grunt.registerTask('default', 'Log some stuff.', function() {
  //   grunt.log.write('Logging some stuff...').ok();
  // });

};

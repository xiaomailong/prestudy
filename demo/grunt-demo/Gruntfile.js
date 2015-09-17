// wrapper 函数
// 每一份 Gruntfile （和grunt插件）都遵循同样的格式，你所书写的Grunt代码必须放在此函数内：
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // 大部分的Grunt任务都依赖某些配置数据，这些数据被定义在一个object内，并传递给grunt.initConfig 方法。
    pkg: grunt.file.readJSON('package.json'),
    imagemin: {
      // grunt-contrib-imageimin
      // 这个任务拥有以下的一些优化器，它们可以压缩web上的绝大多数图片格式：
      // gifsicle压缩GIF图片、jpegtran压缩JPEG图片、optipng压缩PNG图片、svgo压缩SVG图片
      dist: {
        options: {
          // 这个配置可以通过使用optimizationLevel选项来实现高程度的优化。这个值范围从0到7,默认为3。
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/'
        }]
      }
    },
    uglify: {
      // grunt-contrib-uglify任务用来压缩JavaScript文件。
      // 这个任务删除你源码中的所有不必要的空格，并且重命名变量和函数以便使用尽可能短的名字。
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        // src: 'src/<%= pkg.name %>.js',
        // dest: 'build/<%= pkg.name %>.min.js'
        src: 'Gruntfile.js',
        dest: 'Gruntfile.min.js'
      }
    },
    cssmin: {
      // grunt-contrib-cssmin是用来压缩CSS文件的。
      dist: {
        options: {
          banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
        },
        files: {
          'dist/css/style.min.css': ['src/css/**/*.css']
        }
      }
    },
    uncss: {
      // grunt-uncss。这个任务从一个项目中删除未使用的CSS，因此会减少了最终CSS文件的大小，从而提高了下载时间。
      // 如果你正在使用一个像Bootstrap或Foundation的框架开发，它是特别适合的。
      // 通过阅读官方文档，你会发现这个任务有一些重要的局限性。
      // 一些值得一提的不错选项是ignore，它允许我们指定的选择器列表不应该被删除，ignoreSheets允许我们忽略指定样式表。
      dist: {
        options: {
          ignore: [/js-.+/, '.special-class'],
          ignoreSheets: [/fonts.googleapis/],
        },
        files: {
          'dist/css/unused-removed.css': ['src/index.html', 'src/contact.html', 'src/service.html']
        }
      }
    },
    htmlmin: {
      // grunt-contrib-htmlmin，这是一个用来压缩HTML代码的任务。
      // 它不会对你的网站加速很多，因为它通常只可以为你节省几Kb内容，如果你正使用gzip压缩你的内容的话，它帮助甚至会更低。
      // 因此，如果你想要压缩你的HTML，恩……祝贺你，这意味着你的网站已经优化的相当不错啦。
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.html',
          dest: 'dist/'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  // 加载 Grunt 插件和任务
  // 像 concatenation、[minification]、grunt-contrib-uglify 和 linting这些常用的任务（task）
  // 都已经以grunt插件的形式被开发出来了。
  // 只要在 package.json 文件中被列为dependency（依赖）的包，并通过npm install安装之后，
  // 都可以在Gruntfile中以简单命令的形式使用：
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 通过定义 default 任务，可以让Grunt默认执行一个或多个任务。
  // 在下面的这个案例中，执行 grunt 命令时如果不指定一个任务的话，将会执行uglify任务。
  // 这和执行grunt uglify 或者 grunt default的效果一样。
  // default任务列表数组中可以指定任意数目的任务（可以带参数）。
  // 默认被执行的任务列表。
  // grunt.registerTask(taskName, [description, ] taskList)
  // grunt.registerMultiTask(taskName, [description, ] taskFunction)
  grunt.registerTask('default', ['jshint', 'uglify']);

  // A very basic default task.
  // 你可以和任务一起疯狂。如果你的任务并没有遵循 "多任务" 结构，那就使用自定义任务。
  grunt.registerTask('bar', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

  // 在一个任务内部，你可以执行其他的任务。
  grunt.registerTask('foo', 'My "foo" task.', function() {
    // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
    grunt.task.run('bar', 'baz');
    // Or:
    grunt.task.run(['bar', 'baz']);
  });

  // 任务也可以是异步的。
  grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();
    // Run some sync stuff.
    grunt.log.writeln('Processing task...');
    // And some async stuff.
    setTimeout(function() {
      grunt.log.writeln('All done!');
      done();
    }, 1000);
  });

  // 任务也可以访问它们自身名称和参数。
  grunt.registerTask('fooo', 'My "fooo" task.', function(a, b) {
    grunt.log.writeln(this.name, a, b);
  });

  // Load the project's grunt tasks from a directory
  require('grunt-config-dir')(grunt, {
    configDir: require('path').resolve('tasks')
  });
  // Register tasks
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage', 'sonarRunner:analysis']);

};


#提高网站性能的 5 个 Grunt任务

##grunt-contrib-imagemin

我想说的第一个任务是grunt-contrib-imageimin。我想先讨论它的原因是，图片是拖慢网站性能的主要杀手！

如果你看过HTTParchive.org上的统计，你会发现图片占了整个页面大小的63%还多。如此臃肿的原因是图片通常没有被压缩到尽可能小的程度。grunt-contrib-imageimin是可以用来解决这个问题的其中一个任务。

这个任务拥有以下的一些优化器，它们可以压缩web上的绝大多数图片格式：
gifsicle压缩GIF图片
jpegtran压缩JPEG图片
optipng压缩PNG图片
svgo压缩SVG图片
该任务配置的一个示例如下所示：

    imagemin: {
       dist: {
          options: {
            optimizationLevel: 5
           },
          files: [{
             expand: true,
             cwd: 'src/images',
             src: ['**/*.{png,jpg,gif}'],
             dest: 'dist/'
          }]
       }
    }

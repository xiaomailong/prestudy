'use strict';
/**
 * template config
 */
export default {
  // ThinkJS 默认支持的模版引擎有：ejs，jade，swig 和 nunjucks，默认模版引擎为 ejs，可以根据需要修改为其他的模版引擎。
  type: "ejs", //模版引擎
  content_type: "text/html", //输出模版时发送的 Content-Type
  file_ext: ".html", //文件的扩展名
  file_depr: "_", //控制器和操作之间的连接符
  // file_depr: '/', //将控制器和操作之间的连接符由'_'修改为'/'
  root_path: think.ROOT_PATH + "/view", //视图文件的根目录
  adapter: { //模版引擎需要的配置项
    ejs: { //使用 ejs 模板引擎时额外配置
      // ejs 默认的定界符是 <% 和 %>。
      // delimiter: "&" //将定界符修改为 <& 和 &>
    },
    nunjucks: { //使用 nunjucks 模板引擎时额外配置
      // trimBlocks: false, //不转义
      // prerender: function(nunjucks, env){} //针对nunjucks模板的过滤器
    }
  }
};

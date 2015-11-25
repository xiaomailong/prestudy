'use strict';
/**
 * config
 */
export default {
  port: 8360,
  host: "",
  encoding: "utf-8",
  timeout: 120,
  // 有时候为了搜索引擎优化或者一些其他的原因， URL 上会多加一些东西。
  // 比如：当前页面是一个动态页面，但 URL 最后加了 .html，这样对搜索引擎更加友好。
  // 但这些在后续的路由解析中是无用的，需要去除。
  // ThinkJS 里提供了下面的配置可以去除 pathname 的前缀和后缀内容：
  pathname_prefix: "",
  pathname_suffix: ".html",
  // timeout: 30, // 将超时时间由120s修改为 30s
  // default_module: "home", // 默认模块为 home 模块。
  // deny_module_list: ["xxx"], //禁用 xxx 模块
  subdomain: { // 子域名部署
    admin: "admin", //表示将 admin.example.com 映射到 admin 模块下
  },
  default_module: "home",
  default_controller: "index",
  default_action: "index",
  // route_on: true, // 开启自定义路由
  // 路由识别默认根据 模块/控制器/操作/参数1/参数1值/参数2/参数2值 来识别过滤后的 pathname
};

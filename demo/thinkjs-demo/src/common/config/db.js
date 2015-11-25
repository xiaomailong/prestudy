'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  // 默认连接 Mysql 始终只有一个连接，如果想要多个连接，可以使用连接池的功能。
  connectionLimit: 10, //建立 10 个连接
  type: "mysql", //数据库类型
  host: "127.0.0.1", //数据库 host
  port: "3306", //数据库端口，默认为 3306
  name: "", //数据库名
  user: "", //账号
  pwd: "",  //密码
  prefix: "think_", //数据表前缀，如果不想要数据表前缀，可以设置为空
  encoding: "utf8", //数据库编码
  nums_per_page: 10, //每页显示的条数
  log_sql: true, //是否记录执行的 sql 语句
  log_connect: true, //是否记录数据库连接信息
  cache: { // 数据库查询缓存配置
    on: true,
    type: "",
    timeout: 3600
  },
  adapter: {
    mysql: {}, //mysql 的特定配置
    mongo: {} //mongo 的特定配置
  }
};

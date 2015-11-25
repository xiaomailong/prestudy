// export default [
//   // ["规则1", "需要识别成的pathname"],
//   // ["规则2", {
//   //   get: "get请求下需要识别成的pathname",
//   //   post: "post请求下需要识别成的pathname"
//   // }]
//   // ThinkJS 支持 3 种类型的自定义路由，即：正则路由，规则路由和静态路由。
//
//   // 正则路由是采用正则表示式来定义路由的一种方式，依靠强大的正则表达式，能够定义非常灵活的路由规则。
//   [/^article\/(\d+)$/, "home/article/detail?id=:1"],
//   // 上面的正则会匹配类似 article/10 这样的 pathname，识别后新的 pathname 为 home/article/detail，
//   // 并且将捕获到的值赋值给参数 id ，这样在控制器里就可以通过 this.get 方法 来获取该值。
//   // 如果正则里含有多个子分组，那么可以通过 :1，:2，:3 来获取对应的值。
//   [/^article\/(\d+)$/, {
//     get: "home/article/detail?id=:1",
//     delete: "home/article/delete?id=:1",
//     post: "home/article/save?id=:1"
//   }],
//
//   // 规则路由是一种字符串匹配方式，但支持含有一些动态的值。
//   ["group/:year/:month", "home/group/list"],
//   // 假如访问的 URL 为 http://www.example.com/group/2015/10，那么会命中该项规则，得到的 pathname 为 home/group/list，
//   // 同时会添加 2 个参数 year 和 month，这2个参数可以在控制器里通过 this.get 方法来获取。
//
//   // 静态路由是一种纯字符串的完全匹配方式，写法和识别都很简单，功能也相对要弱很多。
//   ["list", "home/article/list"],
//   // 假如访问的 URL 为 http://www.example.com/list，那么替换后的 pathname 为 home/article/list。
//
// ];
// 注：自定义路由每一条规则都是一个数组。（至于为什么不用对象，是因为正则路由下，正则不能作为对象的 key 直接使用）
// 识别方式
// 自定义路由的匹配规则为：从前向后逐一匹配，如果命中到了该项规则，则不在向后匹配。

// 优化路由性能
// 上面已经说到，自定义路由是个数组，数组每一项是个具体的路由规则，匹配时是从前向后逐一进行匹配。如果这个路由表比较大的话，可能会有性能问题。
// 为了避免有性能问题，ThinkJS 提供了一种更加高效的自定义路由方式，按模块来配置路由。使用这种方式，路由配置格式跟上面稍微有所不同。

// // 使用这种方式后，通用模块里的路由配置不再配置具体的路由规则，而是配置哪些规则命中到哪个模块。
// export default {
//   admin: {
//     reg: /^admin/ //命中 admin 模块的正则
//   },
//   home: { //默认走 home 模块
//
//   }
// }
//
// // admin 模块配置 admin 下的具体路由规则。
// export default [
//   [/^admin\/(?!api).*$/, "admin/index"],
//   [/^admin\/api\/(\w+?)(?:\/([\d,]*))?$/, "admin/:1?id=:2&resource=:1"],
// ];

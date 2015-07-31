
// Promise是一种对一个任务的抽象。Promise的相关API提供了一组方法和对象来实现这种抽象。
// Promise的实现目前有很多：
// *ECMAScript Promise4
//    即原生的Promise对象, Chrome32+以上支持
// *Promise/A+5标准
//    kriskowal/q
//    cujojs/when
//    tildeio/rsvp.js
// *其他厂商标准
//    jQuery.Deferred
//    WinJS

// 虽然标准很多，但是所有的实现基本遵循如下基本规律：
// *Promise对象
//    是一个有限状态机
//        -完成（fulfilled）
//        -否定（rejected）
//        -等待（pending）
//        -结束（settled）
//    一定会有一个then([fulfill], [reject])方法，让使用者分别处理成功失败
//    可选的done([fn])、fail([fn])方法
//    支持链式API
// *Deffered对象
//    提供reject和resolve方法，来完成一个Promise

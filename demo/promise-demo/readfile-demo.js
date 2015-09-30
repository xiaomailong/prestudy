
// Promise是异步代码实现控制流的一种方式。这一方式可以让你的代码干净、可读并且健壮。

var Promise = require('bluebird');
// bluebird提供了一个非常有用的功能来promise化不返回promise的模块。
// 比如，promise化fs模块，只需要简单地require bluebird模块和一个被promise化的fs模块。
var fs = Promise.promisifyAll(require('fs'));

// 我想要异步的读取一个文件，然后创建一个目录并创建一个文件。
// 你可以看到这个简单的三步走的任务变成了多么丑陋的嵌套的代码，
// 尤其是一旦你再在这些代码中添加逻辑控制的时候，代码更是不可想象丑陋。
fs.readFile('directory/file-to-read', function(err, file){
  if (err){
    //handle error
    console.log(err);
  } else {
    //do something with the file
    fs.mkdir('directory/new-directory', function(err, file){
      if (err) {
        //handle error
        console.log(err);
      } else {
        //new directory has been made
        fs.writeFile('directory/new-directory/message.txt', function(err, file){
          if(err) {
            // handle error
            console.log(err);
          } else {
            // File successfully created
          }
        });
      }
    });
  }
});

// 以上面对的代码作为例子，我们将探究如何用Promise解决上面说到的问题
fs.readFileAsync('directory/file-to-read')
  .then(function(fileData){
    return fs.mkdirAsync('directory/new-directory');
  })
  .then(function(){
    return fs.writeFileAsync('directory/new-directory/message.txt');
  })
  .catch(function(err){
    //do something with the error and handle it
    console.log(err);
  });

// 创建promise需要提供resolve和reject的回调方法。每一个都需要传对了：
//myPromise.js
var Promise = require('bluebird');
module.exports = function(){
  return new Promise(function(resolve, reject){
    tradiationCallbackBasedThing(function(error, data){
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

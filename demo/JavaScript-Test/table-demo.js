var languages = [{
  name: "JavaScript",
  fileExtension: ".js"
}, {
  name: "TypeScript",
  fileExtension: ".ts"
}, {
  name: "CoffeeScript",
  fileExtension: ".coffee"
}];

console.log(languages);
// console.table(languages);

var languages = {
  csharp: {
    name: "C#",
    paradigm: "object-oriented"
  },
  fsharp: {
    name: "F#",
    paradigm: "functional"
  }
};
console.log(languages);
// console.table(languages);
// console.table(languages, ["name", "paradigm"]);
// console.table(languages, "name");

// 短小强悍的JavaScript异步调用库
// http://blog.jobbole.com/60046/
var queue = function(funcs, scope) {
  (function next() {
    if (funcs.length > 0) {
      funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
    }
  })();
};

var obj = {
  value: null
};

queue([
  function(callback) {
    var self = this;
    setTimeout(function() {
      self.value = 10;
      callback(20);
    }, 200);
  },
  function(callback, add) {
    console.log(this.value + add);
    callback();
  },
  function() {
    console.log(obj.value);
  }
], obj);

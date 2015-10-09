var Bacon = require('baconjs').Bacon;
var fs = require('fs');

// bacon-fromnodecallback
var read = Bacon.fromNodeCallback(fs.readFile, 'input.txt');
read.onError(function(error) {
  console.log("Reading failed: " + error);
});
read.onValue(function(value) {
  console.log("Read contents: " + value);
});

// bacon-repeat
// The generator function is called with one argument — iteration number starting from `0`.
Bacon.repeat(function(i) {
  if (i < 3) {
    return Bacon.once(i);
  } else {
    return false;
  }
}).log();

// bacon-frombinder
var stream = Bacon.fromBinder(function(sink) {
  sink("first value");
  sink([new Bacon.Next("2nd"), new Bacon.Next("3rd")]);
  sink(new Bacon.Next(function() {
    return "This one will be evaluated lazily";
  }));
  sink(new Bacon.Error("oops, an error"));
  sink(new Bacon.End());
  return function() {
    // unsub functionality here, this one's a no-op
  };
});
stream.log();

// observable-scan
var plus = function(a, b) {
  return a + b;
};
Bacon.sequentially(1, [1, 2, 3]).scan(0, plus).log();
// This would result to following elements in the result stream:
//     seed value = 0
//     0 + 1 = 1
//     1 + 2 = 3
//     3 + 3 = 6

// observable-diff
var distance = function(a, b) {
  return Math.abs(b - a);
};
Bacon.sequentially(1, [1, 2, 3]).diff(0, distance).log();
// This would result to following elements in the result stream:
//     1 - 0 = 1
//     2 - 1 = 1
//     3 - 2 = 1

// observable-zip
var x = Bacon.fromArray([1, 2]);
// x.log();
var y = Bacon.fromArray([3, 4]);
// y.log();
var z = x.zip(y, function(x, y) {
  return x + y;
});
// console.log('this is x: ');
// x.log();
// console.log('this is y: ');
// y.log();
console.log('this is z: ');
z.log();
// # produces values 4, 6

// observable-withstatemachine
Bacon.fromArray([1, 2, 3])
  .withStateMachine(0, function(sum, event) {
    if (event.hasValue())
      return [sum + event.value(), []];
    else if (event.isEnd())
      return [undefined, [new Bacon.Next(sum), event]];
    else
      return [sum, [event]];
  }).log();

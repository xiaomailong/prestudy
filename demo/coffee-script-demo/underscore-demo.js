// Generated by CoffeeScript 1.9.3
(function() {
  var _, even, numbers, odds, oneUp;

  _ = require('underscore');

  numbers = _.range(10);

  odds = _(numbers).filter(function(x) {
    return x % 2 !== 0;
  });

  console.log(odds);

  oneUp = _(numbers).map(function(x) {
    return x + 1;
  });

  console.log(oneUp);

  even = function(x) {
    return x % 2 === 0;
  };

  console.log(_(numbers).all(even));

  console.log(_(numbers).any(even));

  _.each(numbers, function(x) {
    return console.log(x);
  });

}).call(this);

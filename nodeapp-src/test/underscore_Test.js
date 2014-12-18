var _ = require("underscore");

exports.UnderscoreObjectFunctions_Test = function(test) {

  test.equal(_.VERSION, '1.7.0');

  // _.keys(object) -----------------------------------------------------------
  // Retrieve all the names of the object's properties.
  test.deepEqual(_.keys({ one: 1, two: 2, three: 3 }),
                 ["one", "two", "three"]);

  // _.values(object) ---------------------------------------------------------
  // Return all of the values of the object's properties.
  test.deepEqual(_.values({ one: 1, two: 2, three: 3 }), [1, 2, 3]);

  // _.pairs(object) ----------------------------------------------------------
  // Convert an object into a list of [key, value] pairs.
  test.deepEqual(_.pairs({ one: 1, two: 2, three: 3 }),
                 [["one", 1], ["two", 2], ["three", 3]]);

  // _.invert(object) ---------------------------------------------------------
  // Returns a copy of the object where the keys have become
  // the values and the values the keys.
  // For this to work, all of your object's values
  // should be unique and string serializable.
  test.deepEqual(_.invert({ Moe: "Moses", Larry: "Louis", Curly: "Jerome" }),
                 { Moses: "Moe", Louis: "Larry", Jerome: "Curly" });

  // _.functions(object) Alias: methods ---------------------------------------
  // Returns a sorted list of the names of every method in an object
  // — that is to say, the name of every function property of the object.
  test.deepEqual(_.functions(_),
                 ['_', 'after', 'all', 'any', 'before', 'bind',
      'bindAll', 'chain', 'clone', 'collect', 'compact', 'compose', 'constant',
      'contains', 'countBy', 'debounce', 'defaults', 'defer', 'delay', 'detect',
      'difference', 'drop', 'each', 'escape', 'every', 'extend', 'filter',
      'find', 'findWhere', 'first', 'flatten', 'foldl', 'foldr', 'forEach',
      'functions', 'groupBy', 'has', 'head', 'identity', 'include', 'indexBy',
      'indexOf', 'initial', 'inject', 'intersection', 'invert', 'invoke',
      'isArguments', 'isArray', 'isBoolean', 'isDate', 'isElement', 'isEmpty',
      'isEqual', 'isFinite', 'isFunction', 'isNaN', 'isNull', 'isNumber',
      'isObject', 'isRegExp', 'isString', 'isUndefined', 'iteratee', 'keys',
      'last', 'lastIndexOf', 'map', 'matches', 'max', 'memoize', 'methods',
      'min', 'mixin', 'negate', 'noConflict', 'noop', 'now', 'object', 'omit',
      'once', 'pairs', 'partial', 'partition', 'pick', 'pluck', 'property',
      'random', 'range', 'reduce', 'reduceRight', 'reject', 'rest', 'result',
      'sample', 'select', 'shuffle', 'size', 'some', 'sortBy', 'sortedIndex',
      'tail', 'take', 'tap', 'template', 'throttle', 'times', 'toArray',
      'unescape', 'union', 'uniq', 'unique', 'uniqueId', 'values', 'where',
      'without', 'wrap', 'zip']);
  test.deepEqual(_.methods(test),
                 ['AssertionError', 'deepEqual',
      'doesNotThrow', 'done', 'equal', 'equals', 'expect', 'fail', 'ifError',
      'notDeepEqual', 'notEqual', 'notStrictEqual', 'ok', 'same', 'strictEqual',
      'throws']);

  // _.extend(destination, *sources) ------------------------------------------
  // Copy all of the properties in the source objects
  // over to the destination object, and return the destination object.
  // It's in-order, so the last source will override
  // properties of the same name in previous arguments.
  test.deepEqual(_.extend({ name: 'moe' }, { age: 50 }),
                 { name: 'moe', age: 50 });
  test.deepEqual(_.extend({ age: 30, name: 'moe' }, { age: 50, sex: 'male' }),
                 { age: 50, name: 'moe', sex: 'male' });

  // _.pick(object, *keys) ----------------------------------------------------
  // Return a copy of the object, filtered to only have values
  // for the whitelisted keys (or array of valid keys).
  // Alternatively accepts a predicate indicating which keys to pick.
  test.deepEqual(_.pick({ name: 'moe', age: 50, userid: '1' }, 'name', 'age'),
                        { name: 'moe', age: 50 });
  test.deepEqual(_.pick({ name: 'moe', age: 50, userid: '1'},
                        function(value, key, object) {
                          return _.isNumber(value);
                        }),
                 { age: 50 });
  test.deepEqual(_.pick({ name: 'moe', age: 50, userid: '1'},
                        function(value, key, object) {
                          return _.isString(value);
                        }),
                 { name: 'moe', userid: '1' });

  // _.omit(object, *keys) ----------------------------------------------------
  // Return a copy of the object,
  // filtered to omit the blacklisted keys (or array of keys).
  // Alternatively accepts a predicate indicating which keys to omit.
  test.deepEqual(_.omit({ name: 'moe', age: 50, userid: '1' }, 'userid'),
                 { name: 'moe', age: 50 });
  test.deepEqual(_.omit({ name: 'moe', age: 50, userid: '1' },
                        function(value, key, object) {
                          return _.isNumber(value);
                        }),
                 {name: 'moe', userid: '1'});

  // _.defaults(object, *defaults) --------------------------------------------
  // Fill in undefined properties in object with the first value present
  // in the following list of defaults objects.
  var iceCream = { flavor: "chocolate" };
  var iceCream2 = { flavor: "vanilla", sprinkles: "lots" };
  test.deepEqual(_.defaults(iceCream, iceCream2),
                 { flavor: "chocolate", sprinkles: "lots" });
  test.deepEqual(_.defaults(iceCream, iceCream2),
                 _.extend(iceCream2, iceCream));

  // _.clone(object) ----------------------------------------------------------
  // Create a shallow-copied clone of the object.
  // Any nested objects or arrays will be copied by reference, not duplicated.
  test.deepEqual(_.clone({ name: 'moe' }), { name: 'moe' });

  // _.tap(object, interceptor) -----------------------------------------------
  // Invokes interceptor with the object, and then returns object.
  // The primary purpose of this method is to "tap into" a method chain,
  // in order to perform operations on intermediate results within the chain.
  test.deepEqual(_.chain([1, 2, 3, 200])
                  .filter(function(num) { return num % 2 == 0; })
                  .tap(function(object) { test.deepEqual(object, [2, 200]); })
                  .map(function(num) { return num * num; })
                  .value(),
                [4, 40000]);

  // _.has(object, key) -------------------------------------------------------
  // Does the object contain the given key?
  // Identical to object.hasOwnProperty(key),
  // but uses a safe reference to the hasOwnProperty function,
  // in case it's been overridden accidentally.
  test.ok(_.has({ a: 1, b: 2, c: 3 }, "b"));
  test.ok(!_.has({ a: 1, b: 2, c: 3 }, "e"));

  // _.property(key) ----------------------------------------------------------
  // Returns a function that will itself return the key property
  // of any passed-in object.
  var moe = { name: 'moe' };
  test.equal('moe', _.property('name')(moe));

  // _.matches(attrs) ---------------------------------------------------------
  // Returns a predicate function that will tell you if a passed in object
  // contains all of the key/value properties present in attrs.
  var ready = _.matches({ selected: true, visible: true });
  // var readyToGoList = _.filter(list, ready);

  // _.isEqual(object, other) -------------------------------------------------
  // Performs an optimized deep comparison between the two objects,
  // to determine if they should be considered equal.
  var moe   = { name: 'moe', luckyNumbers: [13, 27, 34] };
  var clone = { name: 'moe', luckyNumbers: [13, 27, 34] };
  test.notEqual(moe, clone);
  test.deepEqual(moe, clone);
  test.ok(_.isEqual(moe, clone));

  // _.isEmpty(object) --------------------------------------------------------
  // Returns true if an enumerable object contains
  // no values (no enumerable own-properties).
  // For strings and array-like objects
  // _.isEmpty checks if the length property is 0.
  test.ok(_.isEmpty({}));
  test.ok(_.isEmpty([]));
  test.ok(_.isEmpty(""));
  test.ok(!_.isEmpty("[]"));
  test.ok(!_.isEmpty([1,2,3]));

  // _.isElement(object) ------------------------------------------------------
  // Returns true if object is a DOM element.
  // test.ok(_.isElement(jQuery('body')[0]));

  // _.isArray(object) --------------------------------------------------------
  // Returns true if object is an Array.
  (function(){ test.ok(!_.isArray(arguments)); })();
  (function(){ test.ok(!_.isArray(arguments)); })([]);
  (function(){ test.ok(!_.isArray(arguments)); })([1]);
  (function(){ test.ok(!_.isArray(arguments)); })([1, 2]);
  (function(){ test.ok(!_.isArray(arguments)); })(new Array(20));
  test.ok(_.isArray([]));
  test.ok(_.isArray([1]));
  test.ok(_.isArray([1, 2]));
  test.ok(_.isArray(new Array()));
  test.ok(_.isArray(new Array(20)));
  test.ok(!_.isArray(123));

  // _.isObject(object) -------------------------------------------------------
  // Returns true if value is an Object.
  // Note that JavaScript arrays and functions are objects,
  // while (normal) strings and numbers are not.
  test.ok(_.isObject(test));
  test.ok(_.isObject([]));
  test.ok(_.isObject({}));
  test.ok(_.isObject(_.isObject));
  test.ok(!_.isObject(123));
  test.ok(!_.isObject("123"));
  test.ok(!_.isObject(null));
  test.ok(!_.isObject(undefined));

  // _.isArguments(object) ----------------------------------------------------
  // Returns true if object is an Arguments object.
  (function(){ test.ok(_.isArguments(arguments)); })(1, 2, 3);
  test.ok(!_.isArguments([1, 2, 3]));

  // _.isFunction(object) -----------------------------------------------------
  // Returns true if object is a Function.
  test.ok(_.isFunction(_.isFunction));
  test.ok(_.isFunction(test.ok));
  test.ok(!_.isFunction(test));
  test.ok(!_.isFunction(123));

  // _.isString() -------------------------------------------------------------
  // Returns true if object is a String.
  test.ok(_.isString("moe"));
  test.ok(!_.isString(123));
  test.ok(!_.isString(["123"]));
  test.ok(!_.isString(undefined));

  // _.isNumber(object) -------------------------------------------------------
  // Returns true if object is a Number (including NaN).
  test.ok(_.isNumber(1234));
  test.ok(_.isNumber(-12.34));
  test.ok(_.isNumber(NaN));
  test.ok(_.isNumber(Infinity));
  test.ok(!_.isNumber("1234"));

  // _.isFinite(object) -------------------------------------------------------
  // Returns true if object is a finite Number.
  test.ok(_.isFinite(1234));
  test.ok(_.isFinite(-12.34));
  test.ok(_.isFinite([123]));
  test.ok(_.isFinite("1234"));
  test.ok(!_.isFinite(NaN));
  test.ok(!_.isFinite(Infinity));

  // 判断一个数是整数并且在安全范围内，利用整数取整后还是与自身相等的特点：
  function isInteger(obj) {
    return typeof obj === 'number' && isFinite(obj)
    && obj > -9007199254740992
    && obj < 9007199254740992
    && Math.floor(obj) === obj;
  };
  test.ok(isInteger(1234));
  test.ok(!isInteger(-12.34));
  test.ok(!isInteger("1234"));
  test.ok(!isInteger(NaN));
  test.ok(!isInteger(Infinity));

  // _.isBoolean(object) ------------------------------------------------------
  // Returns true if object is either true or false.
  test.ok(_.isBoolean(true));
  test.ok(_.isBoolean(false));
  test.ok(_.isBoolean(1 != 1));
  test.ok(!_.isBoolean("str1"));
  test.ok(!_.isBoolean(""));
  test.ok(!_.isBoolean(test));
  test.ok(!_.isBoolean(test.ok));
  test.ok(!_.isBoolean(null));
  test.ok(!_.isBoolean(undefined));

  // _.isDate(object) ---------------------------------------------------------
  // Returns true if object is a Date.
  test.ok(new Date());

  // _.isRegExp(object) -------------------------------------------------------
  // Returns true if object is a RegExp.
  test.ok(_.isRegExp(/moe/));

  // _.isNaN(object) ----------------------------------------------------------
  // Returns true if object is NaN.
  // Note: this is not the same as the native isNaN function,
  // which will also return true for many other not-number values,
  // such as undefined.
  test.ok(_.isNaN(NaN));
  test.ok(_.isNaN(Number.NaN));
  test.ok(_.isNaN(0/0));
  test.ok(!_.isNaN([1, 2]));
  test.ok(!_.isNaN('abc'));
  test.ok(!_.isNaN(void 0));
  test.ok(!_.isNaN(undefined));

  // _.isNull(object) ---------------------------------------------------------
  // Returns true if the value of object is null.
  test.ok(_.isNull(null));
  test.ok(!_.isNull(undefined));
  test.ok(!_.isNull(void 0));
  test.ok(!_.isNull(NaN));
  test.ok(!_.isNull(123));

  // _.isUndefined(object) ----------------------------------------------------
  // Returns true if value is undefined.
  var obj;
  test.ok(_.isUndefined(obj));
  test.ok(_.isUndefined(undefined));
  test.ok(_.isUndefined(void 0));
  test.ok(!_.isUndefined(123));

  test.done();
}

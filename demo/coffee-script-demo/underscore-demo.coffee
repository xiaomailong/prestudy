# _（也就是 underscore）是一个有效的变量名，因此我将其设置为引用 Underscore 库。
_ = require 'underscore'

# 假设您需要找到一个数字集合内的所有奇数，该数字集合包含从 0 到 10（不含 10）的数字。
# 结合使用 CoffeeScript 和 Underscore 能使您节约大量键入时间，或许还能减少一些 bug。
numbers = _.range(10)
odds = _(numbers).filter (x) ->
  x % 2 isnt 0
console.log odds

# map 函数是另外一个我最常应用于 JavaScript 中的集合的函数
oneUp = _(numbers).map (x) ->
  x + 1
console.log oneUp

# 如果您需要测试一个集合的多个方面，Underscore 能帮助您简化一切！
even = (x) ->
  x % 2 is 0

console.log _(numbers).all(even)
console.log _(numbers).any(even)

# each 函数作为一个易用的迭代器（也就是说，它能处理场景背后的循环逻辑，在每次迭代时传入指定的函数）。
_.each numbers, (x) ->
	console.log(x)

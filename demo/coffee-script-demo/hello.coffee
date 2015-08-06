# 赋值:
number   = 42
opposite = true

# 条件:
number = -42 if opposite

# 函数:
square = (x) -> x * x

# 数组:
list = [1, 2, 3, 4, 5]

# 对象:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# 存在性:
console.log "I knew it!" if elvis?

# 数组 推导(comprehensions):
cubes = (math.cube num for num in list)

# CoffeeScript 语言手册 --------------------------------------------------------------
# 使用显式的空白来区分代码块. 你不需要使用分号 ; 来关闭表达式,
# 在一行的结尾换行就可以了(尽管分号依然可以用来把多行的表达式简写到一行里).
# 不需要再用花括号来 { } 包裹代码快,
# 在 函数, if 表达式, switch, 和 try/catch 当中使用缩进.

# 传入参数的时候, 你不需要再使用圆括号来表明函数被执行.
# 隐式的函数调用的作用范围一直到行尾或者一个块级表达式.
console.log sys.inspect object

# 函数 ---------------
# 函数通过一组可选的圆括号包裹的参数, 一个箭头, 一个函数体来定义. 一个空的函数像是这样:
square = (x) -> x * x
cube   = (x) -> square(x) * x

# 一些函数函数参数会有默认值, 当传入的参数的不存在 (null 或者 undefined) 时会被使用.
fill = (container, liquid = "coffee") ->
  "Filling the #{container} with #{liquid}..."

# 对象和数组 ----------
# CoffeeScript 中对象和数组的字面量看起来很像在 JavaScript 中的写法.
# 如果单个属性被写在自己的一行里, 那么逗号是可以省略的. 和 YAML 类似, 对象可以用缩进替代花括号来声明.
song = ["do", "re", "mi", "fa", "so"]
singers = {Jagger: "Rock", Elvis: "Roll"}
bitlist = [
  1, 0, 1
  0, 0, 1
  1, 1, 0
]
kids =
  brother:
    name: "Max"
    age:  11
  sister:
    name: "Ida"
    age:  9

# JavaScript 里, 你不能使用不添加引号的保留字段作为属性名称, 比如 class.
# CoffeeScript 里作为键出现的保留字会被识别并补上引号, 所以你不用有额外的操心(比如说, 使用 jQuery 的时候).
$('.account').attr class: 'active'
console.log object.class

# 词法作用域和变量安全 -------------
# CoffeeScript 编译器会考虑所有变量, 保证每个变量都在词法域里适当地被定义 — 你永远不需要自己去写 var.
outer = 1
changeNumbers = ->
  inner = -1
  outer = 10
inner = changeNumbers()
# 注意所有变量的定义都被推到相关的顶层作用域, 也就是第一次出现的位置.
# outer 在内层的函数里没有被重新定义, 因为它已经存在于作用域当中了.
# 同时, 内层函数里的 inner 不应该改变外部的同名的变量, 所以在这里有自己的声明.

# 函数的所有 CoffeeScript 结果都被一个匿名函数包裹: (function(){ ... })();
# 这层安全的封装, 加上自动生成的 var 关键字, 使得不小心污染全局命名空间很难发生.
# 如果你希望创建一个其他脚本也能使用的顶层变量, 那么将其作为赋值在 window 上, 或者在 CommonJS 里的 exports 上.
# 存在操作符(existential operator)可以帮你写出一个可靠的方式找到添加位置;
# 比如你的目标是同时满足 CommonJS 和浏览器: exports ? this

# if, else, unless 和条件赋值 -------------
# if/else 表达式可以不用圆括号和花括号就写出来.
# 就像函数和其他块级表达式那样, 多行的条件可以通过缩进来表明.
# 另外还有一个顺手的后缀形式, 在行尾使用 if or unless.

# CoffeeScript 会尝试编译 if 语句到 JavaScript 表达式, 或者一个封装的闭包.
# CoffeeScript 里不存在直白的三元表达式. — 你只要在一行内使用普通的 if 语句.
mood = greatlyImproved if singing
if happy and knowsIt
  clapsHands()
  chaChaCha()
else
  showIt()
date = if friday then sue else jill

# 变参(splats)... -----------------
# 使用 JavaScript 的 arguments 对象是一种处理接收不定数量个参数的函数常用办法.
# CoffeeScript 在函数定义和调用里提供了变参(splats) ... 的语法, 让不定个数的参数使用起来更愉悦一些.
gold = silver = rest = "unknown"
awardMedals = (first, second, others...) ->
  gold   = first
  silver = second
  rest   = others
contenders = [
  "Michael Phelps"
  "Liu Xiang"
  "Yao Ming"
  "Allyson Felix"
  "Shawn Johnson"
  "Roman Sebrle"
  "Guo Jingjing"
  "Tyson Gay"
  "Asafa Powell"
  "Usain Bolt"
]
awardMedals contenders...
alert "Gold: " + gold
alert "Silver: " + silver
alert "The Field: " + rest

# 循环和推导式 -----------------
# 你可以使用CoffeeScript将大多数的循环写成基于数组、对象或范围的推导式(comprehensions)。
# 推导式替代（编译为）for循环，并且可以使用可选的子句和数组索引值。
# 不同于for循环，数组的推导式是表达式，可以被返回和赋值。

# 吃午饭.
eat food for food in ['toast', 'cheese', 'wine']

# 精致的五道菜.
courses = ['greens', 'caviar', 'truffles', 'roast', 'cake']
menu i + 1, dish for dish, i in courses

# 注重健康的一餐.
foods = ['broccoli', 'spinach', 'chocolate']
eat food for food in foods when food isnt 'chocolate'

# 推导式可以适用于其他一些使用循环的地方，例如each/forEach, map，或者select/filter，例如：
shortNames = (name for name in list when name.length < 5)
# 如果你知道循环的开始与结束，或者希望以固定的跨度迭代，你可以在范围推导式中 指定开始与结束。
countdown = (num for num in [10..1])

# 注意：上面的例子中我们展示了如何将推导式赋值给变量，CoffeeScript总是将 每个循环项收集到一个数组中。
# 但是有时候以循环结尾的函数运行的目的就是 它们的副作用(side-effects)。
# 这种情况下要注意不要意外的返回推导式的结果， 而是在函数的结尾增加一些有意义的返回值—例如true — 或 null。

# 在推导式中使用by子句，可以实现以固定跨度迭代范围值：
evens = (x for x in [0..10] by 2)

# 推导式也可以用于迭代对象中的key和value。在推导式中使用of 来取出对象中的属性，而不是数组中的值。
yearsOld = max: 10, ida: 9, tim: 11
ages = for child, age of yearsOld
  "#{child} is #{age}"

# 如果你希望仅迭代在当前对象中定义的属性，通过hasOwnProperty检查并 避免属性是继承来的，可以这样来写：
# for own key, value of object

# CoffeeScript仅提供了一种底层循环，即while循环。
# 与JavaScript中的while 循环的主要区别是，在CoffeeScript中while可以作为表达式来使用，
# 而且可以返回一个数组，该数组包含每个迭代项的迭代结果。
if this.studyingEconomics
  buy()  while supply > demand
  sell() until supply > demand

# 摇篮曲
num = 6
lyrics = while num -= 1
  "#{num} little monkeys, jumping on the bed.
    One fell out and bumped his head."

# 为了更好的可读性，until关键字等同于while not, loop关键字 等同于while true。
#
# 使用 JavaScript 循环生成函数的时候, 经常会添加一个闭包来包裹代码,
# 这样做目的是为了循环的变量被保存起来, 而不是所有生成的函数搜去访问最后一个循环的变量.
# CoffeeScript 提供了一个 do 关键字, 用来直接调用跟在后边的函数, 并且传递需要的参数.
for filename in list
  do (filename) ->
    fs.readFile filename, (err, contents) ->
      compile filename, contents.toString()

# 数组的切片和用 range 进行拼接 -----------------
# Range 也可以被用来展开数组的切片. 通过两个点号的写法 (3..6), range 会包含最后一个数据 (3, 4, 5, 6);
# 通过三个点号的写法 (3...6), range 不会包含最后一个数据 (3, 4, 5).
# 切片的索引位置存在不错的默认值. 前面的索引位置省略的话, 默认会是 0, 后面的索引位置被省略的话, 默认值是数组的大小.
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
start   = numbers[0..2]
middle  = numbers[3...-2]
end     = numbers[-2..]
copy    = numbers[..]

# 同样的语法还可以用在数组的片段上赋值一些新的值, 进行拼接.
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
numbers[3..6] = [-3, -4, -5, -6]
# 注意 JavaScript 的 string 是不可变的, 所以不能用被拼接.

# 一切都是表达式 (至少尽可能成为) ----------------
# 读者大概有注意到上面的代码 CoffeeScript 函数是不需要写 return 语句的, 但是也会返回最终的结果.
# CoffeeScript 编译器会尽可能保证语言中所有的表达式都可以被当作表达式使用.
# 观察一下下面的函数, return 是怎样尽可能地插入到执行的分支当中的.
grade = (student) ->
  if student.excellentWork
    "A+"
  else if student.okayStuff
    if student.triedHard then "B" else "B-"
  else
    "C"
eldest = if 24 > 21 then "Liz" else "Ike"

# 尽管函数总是会自动 return 其最终的值, 你可以在函数体前面显式地写上 (return value),
# 这个做法也是值得借鉴的, 前提是你明确你在做的事情是什么.
# 由于变量声明是生成在作用域顶部, 所以在表达式内部也可以写赋值, 即便是前面没写到过的变量.
six = (one = 1) + (two = 2) + (three = 3)

# 有些代码在 JavaScript 当中要写不少的语句, 而在 CoffeeScript 中只是表达式的一部分, 这些代码的编译结果会自动生成一个闭包.
# 这个写法很有用, 比如把列表解析的结果赋值给变量:
# 前十个全局属性(变量).
globals = (name for name of window)[0...10]

# 结果是一些原来明确是语句的东西也可以像, 比如把 try/catch 语句直接传给函数调用:
alert(
  try
    nonexistent / undefined
  catch error
    "And the error is ... #{error}"
)
# 有一些 JavaScript 语句是不能编译到表达式的对应的语义的, 比如 break, continue 和 return.
# 如果你的代码当中用到了它们, CoffeeScript 是步骤尝试去进行转换的.

# 操作符和 aliase -----------------------
# 由于操作符 == 常常带来不准确的约束, 不容易达到效果, 而且跟其他语言当中意思不一致,
# CoffeeScript 会把 == 编译为 ===, 把 != 变异为 !==. 此外, is 编译我 ===, 而 isnt 编译为 !==.
#
# not 可以作为 ! 的 alias 使用.
#
# 逻辑操作方面, and 编译为 &&, 而 or 编译为 ||.
#
# 在 while, if/else, switch/when 的语句当中,  then 可以被用来分隔判断条件跟表达式, 这样就不用强制写换行或者分号了.
#
# 就像 YAML, on 和 yes 跟 true 是一样的, 而 off 和 no 是布尔值 false.
#
# unless 可以认为是 if 相反的版本.
#
# this.property 简短的写法可以用 @property.
#
# 可以用 in 判断数据在数组中是否出现, 而 of 可以探测 JavaScript 对象的属性是否存在.
#
# 为了简化数学表达式, ** 可以用来表示乘方, // 表示整除, %% 提供数学的模运算(译注: true mathematical modulo?).
#
# 完整的列表:
# CoffeeScript            JavaScript
# is                      ===
# isnt                    !==
# not                     !
# and                     &&
# or                      ||
# true, yes, on           true
# false, no, off          false
# @, this                 this
# of                      in
# in                      no JS equivalent
# a ** b                  Math.pow(a, b)
# a // b                  Math.floor(a / b)
# a %% b                  (a % b + b) % b
launch() if ignition is on

volume = 10 if band isnt SpinalTap

letTheWildRumpusBegin() unless answer is no

if car.speed < limit then accelerate()

winner = yes if pick in [47, 92, 13]

print inspect "My name is #{@name}"

# 存在性操作符 ------------------------
# 在 JavaScript 里检测一个变量的存在性有点麻烦.  if (variable) ... 比较接近答案, 但是对 `0` 不成立.
# CoffeeScript 的存在性操作符 ? 除非是 null 或者 undefined, 否则都返回 true, 这大致是模仿 Ruby 当中的 nil?.
#
# 这也可以用在比 ||= 更安全的条件赋值当中, 有些情况你会需要处理数字跟字符串的.
solipsism = true if mind? and not world?

speed = 0
speed ?= 15

footprints = yeti ? "bear"

# 存在性操作符 ?. 的访问器的变体可以用来吸收链式属性调用中的 null.
# 数据可能是 null 或者 undefined 的情况下可以用这种写法替代访问器 ..
# 如果所有属性都存在, 那么你会得到想要的结果, 如果链式调用有问题, 会返回 undefined 而不是抛出 TypeError.
zip = lottery.drawWinner?().address?.zipcode
# 吸收 null 数据的做法类似 Ruby 的 andand gem, 和 Groovy 的 safe navigation operator.

# class, 继承, super -------------------------------
# JavaScript 的原型集成有点烧脑, 存在大量的类库用于在 JavaScript 的原型之上实现更清晰的 class 继承比如:
# Base2, Prototype.js, JS.Class. 这些类库提供了语法糖, 但如果不是因为一些例外的话原生的继承完全是可用的,
# 例外比如: 很难调用 super(当前函数的原型上的实现), 很难正确设置原型链.

# 相比重复地设置函数的原型, CoffeeScript 提供了一个基础的 class 结构,
# 你可以在一个定义的表达式里完成命名 class, 定义父类, 赋值原型上的属性, 定义构造器.

# 构造函数被命名, 这对查看调用栈有更好的支持. 下面例子中的第一个类, this.constructor.name is "Animal".

class Animal
  constructor: (@name) ->

  move: (meters) ->
    alert @name + " moved #{meters}m."

class Snake extends Animal
  move: ->
    alert "Slithering..."
    super 5

class Horse extends Animal
  move: ->
    alert "Galloping..."
    super 45

sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the Palomino"

sam.move()
tom.move()

# 如果你不喜欢用 class 的裁判法定义原型, CoffeeScript 提供了一些低级的方便写法.
# extends 操作符可以用来恰当地定义任何一对构造函数的原型链;
# 用 :: 可以快速访问对象的原型;
# super() 可以编译为一个父类上同名方法的调用.
String::dasherize = ->
  this.replace /_/g, "-"
# 最后, class 定义是可执行的代码, 这样就可能进行元编程.
# 因为在 class 定义的上下文当中, this 是类对象本身(构造函数), 可以用 @property: value 赋值静态的属性,
# 也可以调用父类的方法: @attr 'title', type: 'text'.

# 解构赋值 -----------------------------
# CoffeeScript 实现 ECMAScript Harmony 的提议 解构赋值 语法, 这样从复杂的数组和对象展开数据会更方便一些.
# 当你把数组或者对象的字面量赋值到一个变量时, CoffeeScript 把等式两边都解开配对, 把右边的值赋值给左边的变量.
# 最简单的例子, 可以用来并行赋值:
theBait   = 1000
theSwitch = 0
[theBait, theSwitch] = [theSwitch, theBait]

# 用来处理函数多返回值也很方便.
weatherReport = (location) ->
  # 发起一个 Ajax 请求获取天气...
  [location, 72, "Mostly Sunny"]

[city, temp, forecast] = weatherReport "Berkeley, CA"

# 解构赋值可以用在深度嵌套的数组跟对象上, 取出深度嵌套的属性.
futurists =
  sculptor: "Umberto Boccioni"
  painter:  "Vladimir Burliuk"
  poet:
    name:   "F.T. Marinetti"
    address: [
      "Via Roma 42R"
      "Bellagio, Italy 22021"
    ]

{poet: {name, address: [street, city]}} = futurists

# 解构赋值还可以跟 splats 搭配使用.
tag = "<impossible>"

[open, contents..., close] = tag.split("")

# 展开式(expansion)可以用于获取数组结尾的元素, 而不需要对中间过程的数据进行赋值. 它也可以用在函数参数的列表上.
text = "Every literary critic believes he will
        outwit history and have the last word"

[first, ..., last] = text.split " "

# 解构赋值也可以用在 class 的构造器上, 从构造器配置对象赋值到示例属性上.
class Person
  constructor: (options) ->
    {@name, @age, @height} = options

tim = new Person age: 4

# 函数绑定 ---------------------------
# JavaScript 当中 this 关键字被动态地设定为当前函数挂载所在的对象上.
# 如果你把函数当作回调, 或者挂载到别的对象, 那么原先的 this 就丢失了.
# 如果你不了解这个行为, http://www.digital-web.com/articles/scope_in_javascript/ 对怪异模式做了很好的回顾.

# Fat arrow => 可以同时定义函数, 绑定函数的 this 到当前的值, 正是我们需要的.
# 这有助于在 Prototype 或者 jQuery 这种基于回调的类库当中使用,
# 用于创建迭代器函数传递给 each, 或者借助 bind 的事件处理器函数.
# Fat arrow 定义的函数可以访问到他们创建位置的 this 对象的属性.
Account = (customer, cart) ->
  @customer = customer
  @cart = cart

  $('.shopping_cart').bind 'click', (event) =>
    @customer.purchase @cart
# 如果上边用的是 this,  @customer 会指向一个 DOM 元素的 undefined "customer" 属性,
# 然后强行调用上面的 purchase() 时会抛出一个异常.

# 对于类的定义, 实例创建的过程中 fat arrow 定义的方法会自动绑定到类的每个示例上去.

# 嵌入 JavaScript
# 这个写法应该不会被用到, 但如果什么时候需要在 CoffeeScript 中穿插 JavaScript 片段的话, 你可以用反引号直接传进去.
hi = `function() {
  return [document.title, "Hello JavaScript"].join(": ");
}`

# Switch/When/Else --------------------
# JavaScript 里的 Switch 语句有点难看. 你需要在每个 case 写 break 防止自动进入默认的 case.
# CoffeeScript 会阻止掉意外的 fall-through. 而且 switch 编译的结果会是可以带 return, 可以被用于赋值的表达式.
# 格式这样写: switch 判断条件,  when 然后子句, else 然后默认的 case.

# 就像 Ruby, CoffeeScript 里边 switch 语句对于每个子句可以带多个值. 任何一个值匹配的情况下, 子句就会执行.

switch day
  when "Mon" then go work
  when "Tue" then go relax
  when "Thu" then go iceFishing
  when "Fri", "Sat"
    if day is bingoDay
      go bingo
      go dancing
  when "Sun" then go church
  else go work

# Switch 语句也可以不写控制条件, 当作 if/else 调用链的一个更整洁的可选写法.
score = 76
grade = switch
  when score < 60 then 'F'
  when score < 70 then 'D'
  when score < 80 then 'C'
  when score < 90 then 'B'
  else 'A'
# grade == 'C'

# Try/Catch/Finally ----------------------------
# Try/catch 语句基本上 JavaScript 的一样(尽管它们是表达式执行).
try
  allHellBreaksLoose()
  catsAndDogsLivingTogether()
catch error
  print error
finally
  cleanUp()

# 链式对比 Chained Comparisons ---------------------
# CoffeeScript 从 Python 学习了 链式对比 — 这样判断数值是否在某个范围内在写法上更容易.
cholesterol = 127
healthy = 200 > cholesterol > 60

# 字符串替换, 块级的字符串, 块级的注释 --------------------------
# Ruby 风格的字符串替换也在 CoffeeScript 实现了.
# 双引号包裹的字符串允许数据替换, 用 #{ ... } 语法, 而单引号包裹的字符串仅仅是字面量.
author = "Wittgenstein"
quote  = "A picture is a fact. -- #{ author }"

sentence = "#{ 22 / 7 } is a decent approximation of π"

# CoffeeScript 支持多行字符串. 行与行会用一个空格拼接, 除非结尾用了反斜杠. 其中缩进会被忽略.
mobyDick = "Call me Ishmael. Some years ago --
  never mind how long precisely -- having little
  or no money in my purse, and nothing particular
  to interest me on shore, I thought I would sail
  about a little and see the watery part of the
  world..."

# 块级的字符串可以用于书写格式化的或者对缩进敏感的文本(或者你只是不想转义单引号双引号).
# 代码块开始的位置的缩进层级会被保留, 用在后面的代码中, 所以这部分代码依然可以跟整体的代码一起对齐.
html = """
       <strong>
         cup of coffeescript
       </strong>
       """
# 块级的字符串用双引号, 跟普通的双引号字符串一样, 支持替换.

# 有时候你想把整块的注释传给生成的 JavaScript.
# 比如在文件顶部嵌入协议. 块级的注释, 仿照了块级字符串的语法, 将会在生成的代码当中保留.

###
SkinnyMochaHalfCaffScript Compiler v1.0
Released under the MIT License
###

# 块级的正则表达式 ---------------------
# 类似块级的字符串跟注释, CoffeeScript 支持块级的正则 — 扩展了正则表达式, 可以忽略内部的空格, 可以包含注释和替换.
# 模仿了 Perl 的 /x 修饰符, CoffeeScript 的块级正则以 /// 为界, 让正则表达式获得了很大程度的可读性.
# 引用一下 CoffeeScript 源码:
OPERATOR = /// ^ (
  ?: [-=]>             # 函数
   | [-+*/%<>&|^!?=]=  # 复合赋值 / 比较
   | >>>=?             # 补 0 右移
   | ([-+:])\1         # 双写
   | ([&|<>])\2=?      # 逻辑 / 移位
   | \?\.              # soak 访问
   | \.{2,3}           # 范围或者 splat
) ///

# Cake, and Cakefiles -------------------
fs = require 'fs'

option '-o', '--output [DIR]', 'directory for compiled code'

task 'build:parser', 'rebuild the Jison parser', (options) ->
  require 'jison'
  code = require('./lib/grammar').parser.generate()
  dir  = options.output or 'lib'
  fs.writeFile "#{dir}/parser.js", code

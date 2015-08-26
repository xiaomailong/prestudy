// JS原型继承和类式继承
// 原型继承比较符合js这种语言的特点。因为它本身就是js强大的原型的一部分。
// 而类式继承，与其称它为继承方式，毋宁说是一种函数的运用技巧来模拟继承罢了。
// 下面这张表列出了原型继承相比于基于类的基础的优点：

// 类式继承（构造函数）
// JS中其实是没有类的概念的，所谓的类也是模拟出来的。
// 特别是当我们是用new 关键字的时候，就使得“类”的概念就越像其他语言中的类了。
// 类式继承是在函数对象内调用父类的构造函数，使得自身获得父类的方法和属性。
// call和apply方法为类式继承提供了支持。通过改变this的作用环境，使得子类本身具有父类的各种属性。
var father = function() {
	this.age = 52;
	this.say = function() {
		console.log('hello i am ' + this.name + ' and i am ' + this.age + 'years old');
	}
}

var child = function() {
	this.name = 'bill';
	father.call(this);
}

var man = new child();
man.say();
console.log(man);
console.log(father, father.__proto__);
console.log(child, child.__proto__);

// 原型继承
// 原型继承在开发中经常用到。它有别于类继承是因为继承不在对象本身，而在对象的原型上（prototype）。
// 每一个对象都有原型，在浏览器中它体现在一个隐藏的__proto__属性上。在一些现代浏览器中你可以更改它们。
// 比如在zepto中，就是通过添加zepto的fn对象到一个空的数组的__proto__属性上去，
// 从而使得该数组成为一个zepto对象并且拥有所有的方法。
// 话说回来，当一个对象需要调用某个方法时，它回去最近的原型上查找该方法，如果没有找到，它会再次往下继续查找。
// 这样逐级查找，一直找到了要找的方法。 这些查找的原型构成了该对象的原型链条。原型最后指向的是null。
// 我们说的原型继承，就是将父对像的方法给子类的原型。子类的构造函数中不拥有这些方法和属性。
var father = function() {}
father.prototype.a = function() {}
var child = function() {}
	//开始继承
child.prototype = new father();
var man = new child();
man.a();
console.log(man);
console.log(father, father.__proto__);
console.log(child, child.__proto__);

// 和原型对比起来，构造函数（类）式继承有什么不一样呢？
// 首先，构造函数继承的方法都会存在父对象之中，每一次实例，都回将funciton保存在内存中，
// 这样的做法毫无以为会带来性能上的问题。
// 其次类式继承是不可变的。在运行时，无法修改或者添加新的方法，这种方式是一种固步自封的死方法。
// 而原型继承是可以通过改变原型链接而对子类进行修改的。
// 另外就是类式继承不支持多重继承，而对于原型继承来说，你只需要写好extend对对象进行扩展即可。

// 组合模式
// 另外的一种模式，是结合类继承和原型继承的各自优点来进行对父类的继承。
// 用类式继承属性，而原型继承方法。
// 这种模式避免了属性的公用，因为一般来说，每一个子类的属性都是私有的，而方法得到了统一。
// 这种模式称为组合模式，也是继承类式常用到的一种方法。
function father() {
	this.a = 'father'
}
father.prototype.b = function() {
	console.log(this.a);
}
var child = function() {
	father.call(this);
}
child.prototype = new father();
console.log(father, father.__proto__);
console.log(child, child.__proto__);

// new 关键字和Obeject.create方法
// new关键字掩盖了Javascript中真正的原型继承，使得它更像是基于类的继承。
// 其实new关键字只是Javascript在为了获得流行度而加入与Java类似的语法时期留下来的一个残留物。
// 推荐我们使用Object.create方法创建或者实例化对象。
// 使用new
var father = function() {
	this.a = 'father'
}
father.prototype.b = function() {
	console.log(this.a)
}
var obj = new father();
console.log(obj, obj.__proto__);
// 通过new关键字用构造函数生成的实例，a属性是无法改变的。从这里，我们也可以看到类继承和原型基础的一些区别。

// objcet.create方法
var father = {
	a: 'father',
	b: function() {
		console.log(this.a);
	}
}
var obj = Object.create(father);
console.log(obj, obj.__proto__);
// 用create的方法构造出来的对象，a属性和b方法都是在对象的原型上，
// 也就是说我们可以通过更改father的属性动态改变obj的原型上的方法和属性

// Javascript中的问题是由于每个函数都可以被当成构造函数使用，所以我们需要区分普通的函数调用和构造函数调用；
// 我们一般使用new关键字来进行区别。然而，这样就破坏了Javascript中的函数式特点，
// 因为new是一个关键字而不是函数。因而函数式的特点无法和对象实例化一起使用。
function Person(firstname, lastname) {
	this.firstname = firstname;
	this.lastname = lastname;
}
// 可以通过new关键字来调用Person方法来创建一个函数Person的实例：
var author = new Person('Aadit', 'Shah');
// 然而，没有任何办法来使用apply方法来为构造函数指定参数列表：
// var author = new Person.apply(null,['Aadit','Shah']);//error
// 如果new是一个方法那么上面的需求就可以通过下面这种方式实现了：
// var author = Person.new.apply(Person,['Aadit','Shah']) ;
// 幸运的是，因为Javascript有原型继承，所以我们可以实现一个new的函数：
Function.prototype.new = function() {
	function functor() {
		return constructor.apply(this, args);
	}
	var args = Array.prototype.slice.call(arguments);
	functor.prototype = this.prototype;
	var constructor = this;
	return new functor;
};
// 在像Java这样对象只能通过new关键字来实例化的语言中，上面这种方式是不可能实现的。
var author = Person.new.apply(Person, ['Aadit', 'Shah']);
console.log(author, author.__proto__);

// 基于类的继承																						原型继承
// 类是不可变的。在运行时，你无法修改或者添加新的方法						原型是灵活的。它们可以是不可变的也可以是可变的
// 类可能会不支持多重继承																		对象可以继承多个原型对象
// 基于类的继承比较复杂。你需要使用抽象类，接口和final类等等		原型继承比较简洁。你只有对象，你只需要对对象进行扩展就可以了

// 无中生有”对象创建法
// Javascript中的Object.create方法用来从0开始创建一个对象，像下面这样:
var object = Object.create(null);
console.log(object, object.__proto__);

// Object.create方法也可以克隆一个现有的对象
var rectangle = {
	area: function() {
		return this.width * this.height;
	}
};
var rect = Object.create(rectangle);
console.log(rect, rect.__proto__);
rect.width = 5;
rect.height = 10;
console.log(rect.area());
console.log(rect, rect.__proto__, rectangle);

// 构造函数。我们把这个函数叫做create然后在rectangle对象上定义它:
var rectangle = {
	create: function(width, height) {
		var self = Object.create(this);
		self.height = height;
		self.width = width;
		return self;
	},
	area: function() {
		return this.width * this.height;
	}
};
var rect = rectangle.create(5, 10);
console.log(rect.area());
console.log(rect, rect.__proto__, rectangle);

// 构造函数 VS 原型
// 这看起来很像Javascript中的正常构造模式:
function Rectangle(width, height) {
	this.height = height;
	this.width = width;
};
Rectangle.prototype.area = function() {
	return this.width * this.height;
};
var rect = new Rectangle(5, 10);
console.log(rect.area());
console.log(rect, rect.__proto__, rectangle);

// 原型模式和构造模式都是平等的。因此你也许会怀疑为什么有人会困扰于是否应该使用原型模式而不是构造模式。
// 毕竟构造模式比原型模式更加简洁。但是原型模式相比构造模式有许多优势。具体如下：
// 构造模式																					原型模式
// 函数式特点无法与new关键字一起使用									函数式特点可以与create结合使用
// 忘记使用new会导致无法预期的bug并且会污染全局变量		由于create是一个函数，所以程序总是会按照预期工作
// 使用构造函数的原型继承比较复杂并且混乱							使用原型的原型继承简洁易懂

// 使用构造函数的原型继承相比使用原型的原型继承更加复杂，
// 我们先看看使用原型的原型继承:
var square = Object.create(rectangle);
square.create = function(side) {
	return rectangle.create.call(this, side, side);
};
var sq = square.create(5);
console.log(sq.area());
console.log(sq, sq.__proto__, rectangle);
// 首先我们创建一个rectangle的克隆然后命名为square。
// 接着我们用新的create方法重写square对象的create方法。
// 最终我们从新的create方法中调用rectangle的create函数并且返回对象。

// 使用构造函数的原型继承像下面这样:
function Square(side) {
	Rectangle.call(this, side, side);
};
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;
var sq = new Square(5);
console.log(sq.area());
console.log(sq, sq.__proto__, rectangle);
// 构造函数的方式更简单。然后这样的话，向一个不了解情况的人解释原型继承就变得非常困难。
// 如果想一个了解类继承的人解释则会更加困难。

// 当使用原型模式时一个对象继承自另一个对象就变得很明显。
// 当使用方法构造模式时就没有这么明显，因为你需要根据其他构造函数来考虑构造继承。

// 对象创建和扩展相结合
// 在上面的例子中我们创建一个rectangle的克隆然后命名为square。
// 然后我们利用新的create属性扩展它，重写继承自rectangle对象的create方法。
// 如果把这两个操作合并成一个就很好了，就像对象字面量是用来创建Object.prototype的克隆然后用新的属性扩展它。
// 这个操作叫做extend，可以像下面这样实现:
Object.prototype.extend = function(extension) {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(this);

	for (var property in extension)
		if (hasOwnProperty.call(extension, property) ||
			typeof object[property] === "undefined")
			object[property] = extension[property];

	return object;
};

// 利用上面的extend方法，我们可以重写square的代码
var rectangle = {
	create: function(width, height) {
		var self = Object.create(this);
		self.height = height;
		self.width = width;
		return self;
	},
	area: function() {
		return this.width * this.height;
	}
};
var square = rectangle.extend({
	create: function(side) {
		return rectangle.create.call(this, side, side);
	}
});
var sq = square.create(25);
console.log(sq.area());
console.log(sq, sq.__proto__, rectangle);

// extend方法是原型继承中唯一需要的操作。它是Object.create函数的超集，因此它可以用在对象的创建和扩展上。
// 因此我们可以用extend来重写rectangle，使得create函数更加结构化看起来就像模块模式。
var rectangle = {
	create: function(width, height) {
		return this.extend({
			height: height,
			width: width
		});
	},
	area: function() {
		return this.width * this.height;
	}
};
var rect = rectangle.create(55, 10);
console.log(rect.area());
console.log(rect, rect.__proto__, rectangle);

// 译者注：我觉得博主这里的实现有点不符合逻辑，
// 正常extend的实现应该是可以配置当被扩展对象和用来扩展的对象属性重复时是否覆盖原有属性，而博主的实现就只是简单的覆盖。
// 同时博主的实现在if判断中的做法个人觉得是值得学习的，首先判断extension属性是否是对象自身的，
// 如果是就直接复制到object上，否则再判断object上是否有这个属性，如果没有那么也会把属性复制到object上，
// 这种实现的结果就使得被扩展的对象不仅仅只扩展了extension中的属性，还包括了extension原型中的属性。
// 不难理解，extension原型中的属性会在extension中表现出来，所以它们也应该作为extension所具有的特性而被用来扩展object。
// 所以我对这个方法进行了改写:
Object.prototype.extend2 = function(extension, override) {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(this);
	for (var property in extension) {
		if (hasOwnProperty.call(extension, property) ||
			typeof object[property] === 'undefined') {
			if (object[property] !== 'undefined') {
				if (override) {
					deepClone(extension[property], object[property]);
				}
			} else {
				deepClone(extension[property], object[property]);
			}
		}
	}
};

// 原型继承的两种方法
// extend函数返回的对象实际上是继承了两个对象的属性，一个是被扩展的对象，另一个是用来扩展的对象。
// 另外从两个对象继承属性的方式也不一样。
// 第一种情况下是通过委派来继承属性(也就是使用Object.create()来继承属性)，
// 第二种情况下使用合并属性的方式来继承属性。

// 委派(差异化继承)
// 大部分对象是从其他更一般的对象中得到的，只是在一些很小的地方进行了修改。
// 每个对象通常在内部维护一个指向其他对象的引用列表，这些对象就是该对象本身进行差异化继承的对象。
// Javascript中的原型继承是基于差异化继承的。
// 每个对象都有个内部指针叫做[[proto]] (在大部分浏览器中可以通过__proto__属性访问)，这个指针指向对象的原型。
// 多个对象之间通过内部[[proto]]属性链接起来形成了原型链，链的最后指向null。

// 当你试图获取一个对象的属性时Javascript引擎会首先查找对象自身的属性。
// 如果在对象上没找到该属性，那么它就会去对象的原型中去查找。
// 以此类推，它会沿着原型链一直查找知道找到或者到原型链的末尾。
function get(object, property) {
	if (!Object.hasOwnProperty.call(object, property)) {
		var prototype = Object.getPrototypeOf(object);
		if (prototype) return get(prototype, property);
	} else {
		return object[property];
	}
};

// 克隆(合并式继承)
// 大多数Javascript程序员会觉得复制一个对象的属性到另一个对象上并不是一个正确的继承的方式，
// 因为任何对原始对象的修改都不会反映在克隆的对象上。
// 五天前我会同意这个观点。然而现在我相信合并式继承是原型继承的一种正确方式。
// 对于原始对象的修改可以发送到它的副本来实现真正的原型继承。

// 合并式继承和代理有他们的优点和缺点。下表列出了它们的优缺点:
// 代理																					合并
// 任何对于原型的修改都会反映在所有副本上					任何对于原型的修改都需要手动更新到副本中
// 属性查找效率较低因为需要进行原型链查找					属性查找更搞笑因为继承的属性是通过复制的方式附加在对象本身的
// 使用Object.create()方法只能继承单一对象				对象可以从任意数量的对象中通过复制继承属性

// 从多个原型继承
// 上表中最后一点告诉我们对象可以通过合并的方式从多个原型中继承属性。
// 这是一个重要的特点因为这证明原型继承比Java中的类继承更强大并且与C++中的类继承一样强大。
// 为了实现多重继承，你只需要修改extend方法来从多个原型中复制属性。
Object.prototype.extend = function() {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(this);
	var length = arguments.length;
	var index = length;

	while (index) {
		var extension = arguments[length - (index--)];
		for (var property in extension) {
			if (hasOwnProperty.call(extension, property) ||
				typeof object[property] === 'undefined') {
				//这里同样应该使用深复制
				object[property] = extension[property];
			}
		}
	}
	return object;
};

// 多重继承是非常有用的因为它提高了代码的可重用性和模块化。对象通过委派继承一个原型对象然后通过合并继承其他属性。
// 比如说你有一个事件发射器的原型，像下面这样：
var eventEmitter = {
	on: function(event, listener) {
		if (typeof this.event !== 'undefined') {
			this.event.push(listener);
		} else {
			this.event = [listener];
		}
	},
	emit: function(event) {
		if (typeof this.event !== 'undefined') {
			var listeners = this.event;
			var length = listeners.length;
			var index = length;
			var args = Array.prototype.slice.call(arguments, 1);

			while (index) {
				var listener = listeners[length - (index--)];
				listener.apply(this, args);
			}
		}
	}
};

// 现在你希望square表现得像一个事件发射器。
// 因为square已经通过委派的方式继承了rectangle，所以它必须通过合并的方式继承eventEmitter。
// 这个修改可以很容易地通过使用extend方法实现：
var rectangle = {
	create: function(width, height) {
		var self = Object.create(this);
		self.height = height;
		self.width = width;
		return self;
	},
	area: function() {
		return this.width * this.height;
	}
};
var square = rectangle.extend(eventEmitter, {
	create: function(side) {
		return rectangle.create.call(this, side, side);
	},
	resize: function(newSize) {
		var oldSize = this.width;
		this.width = this.height = newSize;
		this.emit('resize', oldSize, newSize);
	}
});
var sq = square.create(5);
sq.on('resize', function(oldSize, newSize) {
	console.log('sq resized from ' + oldSize + 'to' + newSize + '.');
});
sq.resize(10);
console.log(sq.area());
console.log(sq, sq.__proto__, rectangle, eventEmitter);

// Mixin的蓝图(Buleprint)
// 在上面的例子中你肯定注意到eventEmitter原型并没有一个create方法。
// 这是因为你不应该直接创建一个eventEmitter对象。
// 相反eventEmitter是用来作为其他原型的原型。
// 这类原型称为mixin。它们等价于抽象类。
// mixin用来通过提供一系列可重用的方法来扩展对象的功能。

// 然而有时候mixin需要私有的状态。
// 例如eventEmitter如果能够把它的事件监听者列表放在私有变量中而不是放在this对象上会安全得多。
// 但是mixin没有create方法来封装私有状态。
// 因此我们需要为mixin创建一个蓝图(blueprint)来创建闭包。
// 蓝图(blueprint)看起来会像是构造函数但是它们并不用像构造函数那样使用。
// 例如：
function eventEmitter() {
	var events = Object.create(null);

	this.on = function(event, listener) {
		if (typeof events[event] !== "undefined")
			events[event].push(listener);
		else events[event] = [listener];
	};

	this.emit = function(event) {
		if (typeof events[event] !== "undefined") {
			var listeners = events[event];
			var length = listeners.length,
				index = length;
			var args = Array.prototype.slice.call(arguments, 1);

			while (index) {
				var listener = listeners[length - (index--)];
				listener.apply(this, args);
			}
		}
	};
}


// 一个蓝图用来在一个对象创建之后通过合并来扩展它(我觉得有点像装饰者模式)。
// Eric Elliot把它们叫做闭包原型。
// 我们可以使用蓝图版本的eventEmitter来重写square的代码，如下：
var rectangle = {
	create: function(width, height) {
		var self = Object.create(this);
		self.height = height;
		self.width = width;
		return self;
	},
	area: function() {
		return this.width * this.height;
	}
};
var square = rectangle.extend(eventEmitter, {
	create: function(side) {
		var self = rectangle.create.call(this, side, side);
		// eventEmitter.call(self);
		return self;
	},
	resize: function(newSize) {
		var oldSize = this.width;
		this.width = this.height = newSize;
		this.emit("resize", oldSize, newSize);
	}
});
var sq = square.create(5);
sq.on("resize", function(oldSize, newSize) {
	console.log("sq resized from " + oldSize + " to " + newSize + ".");
});
sq.resize(100);
console.log(sq.area());
console.log(sq, sq.__proto__, rectangle, eventEmitter);

// 蓝图在Javascript中是独一无二的。它是一个很强大的特性。然而它们也有自己的缺点。下表列出了mixin和蓝图的优缺点：
// Mixin																						蓝图
// 它们用来扩展对象的原型。因此对象共享同一个原型			它们用来扩展新创建的对象。因此每个对象都是在自己对象本身进行修改
// 因为缺少封装方法所以不存在私有状态								它们是函数，所以可以封装私有状态
// 它们是静态原型并且不能被自定义										它们可以传递参数来自定义对象，可以向蓝图函数传递一些用来自定义的参数

// 修复instanceof操作
// 许多Javascript程序员会觉得使用原型模式来继承违背了语言的精髓。
// 他们更偏向于构造模式因为他们觉得通过构造函数创建的对象才是真正的实例，因为instanceof操作会返回true。
// 然而，这个争论是没有意义的，因为instanceof操作可以像下面这样实现：
Object.prototype.instanceof = function(prototype) {
		var object = this;
		do {
			if (object === prototype) return true;
			var object = Object.getPrototypeOf(object);
		} while (object);
		return false;
	}
	// 这个instanceof方法现在可以被用来测试一个对象是否是通过委派从一个原型继承的。例如：
console.log(sq.instanceof(square));
console.log(sq.instanceof(rectangle));
console.log(sq.instanceof(eventEmitter));

// 然而还是没有办法判断一个对象是否是通过合并的方式从一个原型继承的，因为实例的关联信息丢失了。
// 为了解决这个问题我们将一个原型的所有克隆的引用保存在原型自身中，然后使用这个信息来判断一个对象是否是一个原型的实例。
// 这个可以通过修改extend方法来实现：
Object.prototype.extend = function() {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(this);
	var length = arguments.length;
	var index = length;

	while (index) {
		var extension = arguments[length - (index--)];

		for (var property in extension)
			if (property !== "clones" &&
				hasOwnProperty.call(extension, property) ||
				typeof object[property] === "undefined")
				object[property] = extension[property];

		if (hasOwnProperty.call(extension, "clones"))
			extension.clones.unshift(object);
		else extension.clones = [object];
	}

	return object;
};

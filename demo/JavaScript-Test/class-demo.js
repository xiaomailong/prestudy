// JS原型继承和类式继承
// 原型继承比较符合js这种语言的特点。因为它本身就是js强大的原型的一部分。
// 而类式继承，与其称它为继承方式，毋宁说是一种函数的运用技巧来模拟继承罢了。
// 下面这张表列出了原型继承相比于基于类的基础的优点：

// 输出对象及其原型链
function printChain(object) {
	var protoChain = [object];
	while (object = object.__proto__) {
		if (object != Object.prototype) {
			protoChain.push(object);
		}
	}
	// protoChain.push(null);
	console.dir(protoChain);
}

// 遍历原型链
function getPrototypeChain(object) {
	var protoChain = [];
	while (object = object.__proto__) {
		protoChain.push(object);
	}
	protoChain.push(null);
	return protoChain;
}

// 类式继承（构造函数）-------------
// JS中其实是没有类的概念的，所谓的类也是模拟出来的。
// 特别是当我们是用new 关键字的时候，就使得“类”的概念就越像其他语言中的类了。
// 类式继承是在函数对象内调用父类的构造函数，使得自身获得父类的方法和属性。
// call和apply方法为类式继承提供了支持。通过改变this的作用环境，使得子类本身具有父类的各种属性。
(function() {
	console.log("\n---类式继承（构造函数）");

	var father = function() {
		this.father = 'father';
		this.age = 52;
		this.say = function() {
			console.log('hello i am ' + this.name + ' and i am ' + this.age + 'years old');
		};

		console.log(this);
	};

	var child = function() {
		this.child = 'child';
		this.name = 'bill';
		console.log(this);

		father.call(this);
	};

	var man = new child();
	man.say();
	printChain(man);
	printChain(father);
	console.log("***结论：类式继承是在函数对象内调用父类的构造函数，使得自身获得父类的方法和属性。");
})();

// 原型继承 -------------
// 原型继承在开发中经常用到。它有别于类继承是因为继承不在对象本身，而在对象的原型上（prototype）。
// 每一个对象都有原型，在浏览器中它体现在一个隐藏的__proto__属性上。在一些现代浏览器中你可以更改它们。
// 比如在zepto中，就是通过添加zepto的fn对象到一个空的数组的__proto__属性上去，
// 从而使得该数组成为一个zepto对象并且拥有所有的方法。
// 话说回来，当一个对象需要调用某个方法时，它回去最近的原型上查找该方法，如果没有找到，它会再次往下继续查找。
// 这样逐级查找，一直找到了要找的方法。 这些查找的原型构成了该对象的原型链条。原型最后指向的是null。
// 我们说的原型继承，就是将父对像的方法给子类的原型。子类的构造函数中不拥有这些方法和属性。
(function() {
	console.log("\n---原型继承");

	var father = function() {
		this.father = 'father';
		this.age = 38;
		console.log(this);
	};
	father.prototype.say = function() {
		console.log('Hello, I am ' + this.name + ' and i am ' + this.age + 'years old!');
	};
	var child = function() {
		this.child = 'child';
		this.name = 'Bolik';
		console.log(this);
	};
	//开始继承
	child.prototype = new father();
	var man = new child();
	man.say();
	printChain(man);
	printChain(father);
	console.log("***结论：原型继承，就是将父对像的方法给子类的原型。子类的构造函数中不拥有这些方法和属性。");
})();

// 和原型对比起来，构造函数（类）式继承有什么不一样呢？
// 首先，构造函数继承的方法都会存在父对象之中，每一次实例，都回将funciton保存在内存中，
// 这样的做法毫无以为会带来性能上的问题。
// 其次类式继承是不可变的。在运行时，无法修改或者添加新的方法，这种方式是一种固步自封的死方法。
// 而原型继承是可以通过改变原型链接而对子类进行修改的。
// 另外就是类式继承不支持多重继承，而对于原型继承来说，你只需要写好extend对对象进行扩展即可。

// 组合模式 -----------------
// 另外的一种模式，是结合类继承和原型继承的各自优点来进行对父类的继承。
// 用类式继承属性，而原型继承方法。
// 这种模式避免了属性的公用，因为一般来说，每一个子类的属性都是私有的，而方法得到了统一。
// 这种模式称为组合模式，也是继承类式常用到的一种方法。
(function() {
	console.log("\n---组合模式");

	function father() {
		this.father = 'father';
		console.log(this);
	};
	father.prototype.say = function() {
		console.log(this.father + ' & ' + this.child);
	};
	var child = function() {
		this.child = 'child';
		father.call(this);
	};
	child.prototype = new father(); // { fatername: 'father' }
	var man = new child(); // { childname: 'child', fatername: 'father' }
	man.say(); // father & child
	printChain(man);
	printChain(father);
	console.log("***结论：组合模式用类式继承属性，而原型继承方法。这种模式避免了属性的公用");
})();

// new 关键字和Obeject.create方法 -------------
// new关键字掩盖了Javascript中真正的原型继承，使得它更像是基于类的继承。
// 其实new关键字只是Javascript在为了获得流行度而加入与Java类似的语法时期留下来的一个残留物。
// 推荐我们使用Object.create方法创建或者实例化对象。
// 使用new
(function() {
	console.log("\n---new 关键字");

	var father = function() {
		this.fathername = 'father';
		console.log(this);
	};
	father.prototype.say = function() {
		console.log(this.fathername);
	};
	var obj = new father();
	obj.say();
	father.fathername = 'newfather';
	obj.say();
	printChain(obj);
	printChain(father);
	// 通过new关键字用构造函数生成的实例，fathername属性是无法通过修改faher属性改变的。
	// 从这里，我们也可以看到类继承和原型基础的一些区别。
	console.log("***结论：new关键字用构造函数生成的实例，fathername属性是无法通过修改faher属性改变的。\nnew关键字掩盖了Javascript中真正的原型继承，使得它更像是基于类的继承。\n其实new关键字只是Javascript在为了获得流行度而加入与Java类似的语法时期留下来的一个残留物！ ");
})();

(function() {
	console.log("\n---objcet.create方法");

	var father = {
		fathername: 'father',
		say: function() {
			console.log(this.fathername);
		}
	}
	var obj = Object.create(father);
	obj.say();
	father.fathername = 'newfather';
	obj.say();
	printChain(obj);
	printChain(father);
	console.log("***结论：Object.create的方法构造出来的对象，fathername属性和say方法都是在对象的原型上，\n也就是说我们可以通过更改father的属性动态改变obj的原型上的方法和属性。");

})();

// new函数扩展 --------------
// Javascript中的问题是由于每个函数都可以被当成构造函数使用，所以我们需要区分普通的函数调用和构造函数调用；
// 我们一般使用new关键字来进行区别。然而，这样就破坏了Javascript中的函数式特点，
// 因为new是一个关键字而不是函数。因而函数式的特点无法和对象实例化一起使用。
(function() {
	console.log("\n---new函数扩展");

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
	printChain(author);
	console.log("***结论：通过new函数扩展我们可以使用Person.new.apply(arguments)为构造函数指定参数列表。 ");
})();

// 原型继承相比于基于类的基础的优点：
// 基于类的继承                                         原型继承
// 类是不可变的。在运行时，你无法修改或者添加新的方法          原型是灵活的。它们可以是不可变的也可以是可变的
// 类可能会不支持多重继承                                 对象可以继承多个原型对象
// 基于类的继承比较复杂。你需要使用抽象类，接口和final类等等   原型继承比较简洁。你只有对象，你只需要对对象进行扩展就可以了

// 不要再使用关键词new了 --------
// 到现在你应该知道为什么我觉得new关键字是不会的了吧—你不能把它和函数式特点混合使用。
// 然后，这并不代表你应该停止使用它。new关键字有合理的用处。
// 但是我仍然建议你不要再使用它了。
// new关键字掩盖了Javascript中真正的原型继承，使得它更像是基于类的继承。就像Raynos说的:
//     new是Javascript在为了获得流行度而加入与Java类似的语法时期留下来的一个残留物

// Javascript是一个源于Self的基于原型的语言。然而，为了市场需求，Brendan Eich把它当成Java的小兄弟推出：
//     并且我们当时把Javascript当成Java的一个小兄弟，就像在微软语言家庭中Visual Basic相对于C++一样。

// 这个设计决策导致了new的问题。当人们看到Javascript中的new关键字，他们就想到类，然后当他们使用继承时就遇到了傻了。
// 就像Douglas Crockford说的：
//     这个间接的行为是为了使传统的程序员对这门语言更熟悉，但是却失败了，就像我们看到的很少Java程序员选择了Javascript。
//     Javascript的构造模式并没有吸引传统的人群。它也掩盖了Javascript基于原型的本质。
//     结果就是，很少的程序员知道如何高效的使用这门语言

// 因此我建议停止使用new关键字。Javascript在传统面向对象假象下面有着更加强大的原型系统。然大部分程序员并没有看见这些还处于黑暗中。

// 理解原型继承 ------------------
// 原型继承很简单。在基于原型的语言中你只有对象。没有类。
// 有两种方式来创建一个新对象—“无中生有”对象创建法或者通过现有对象创建。
// 在Javascript中Object.create方法用来创建新的对象。
// 新的对象之后会通过新的属性进行扩展。

// 无中生有”对象创建法
// Javascript中的Object.create方法用来从0开始创建一个对象，像下面这样:
// var object = Object.create(null);
(function() {
	console.log("\n---Object.create方法克隆一个现有的对象，并对其进行扩展进行属性赋值");

	var rectangle = {
		rectangle: 'rectangle',
		area: function() {
			return this.width * this.height;
		}
	};
	// 克隆rectangle对象命名为rect
	var rect = Object.create(rectangle);
	// var rectangle = Object.create(Object.prototype);
	// rectangle.area = function() {
	// 	return this.width * this.height;
	// };
	// 在使用rect的area方法之前我们需要扩展它的width和height属性
	rect.rect = 'rect';
	rect.width = 5;
	rect.height = 10;
	console.log(rect.area());
	printChain(rect);
	console.log("***结论：通过Object.create创建一个对象的克隆然后扩展它是一个非常傻缺的方法。\n我们需要在每个rectangle对象的克隆上手动定义width和height属性。 ");
})();

// 构造函数。我们把这个函数叫做create然后在rectangle对象上定义它:
(function() {
	console.log("\n---原型模式(Prototypal Pattern) create构造函数");

	var rectangle = {
		rectangle: 'rectangle',
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
	var rect = rectangle.create(55, 10);
	rect.rect = 'rect';
	console.log(rect.area());
	printChain(rect);
	console.log("***结论：原型模式(Prototypal Pattern)可以方便的对属性进行赋值。");
})();

// 构造函数 VS 原型
// 这看起来很像Javascript中的正常构造模式:
(function() {
	console.log("\n---构造模式(Constructor Pattern) Function构造模式");

	function Rectangle(width, height) {
		this.rectangle = 'rectangle';
		this.height = height;
		this.width = width;
	};
	Rectangle.prototype.area = function() {
		return this.width * this.height;
	};
	var rect = new Rectangle(5, 10);
	rect.rect = 'rect';
	console.log(rect.area());
	printChain(rect);
	console.log("***结论：构造模式(Constructor Pattern)看起来很像Javascript中的正常构造模式。");
})();

// 原型模式和构造模式都是平等的。因此你也许会怀疑为什么有人会困扰于是否应该使用原型模式而不是构造模式。
// 毕竟构造模式比原型模式更加简洁。但是原型模式相比构造模式有许多优势。具体如下：
// 构造模式(Constructor Pattern)                原型模式(Prototypal Pattern)
// 函数式特点无法与new关键字一起使用                 函数式特点可以与create结合使用
// 忘记使用new会导致无法预期的bug并且会污染全局变量    由于create是一个函数，所以程序总是会按照预期工作
// 使用构造函数的原型继承比较复杂并且混乱             使用原型的原型继承简洁易懂

// 使用构造函数的原型继承相比使用原型的原型继承更加复杂 -------------
(function() {
	console.log("\n---使用原型模式的原型继承");

	var rectangle = {
		rectangle: 'rectangle',
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
	var square = Object.create(rectangle);
	square.create = function(side) {
		return rectangle.create.call(this, side, side);
	};
	square.square = 'square';
	var sq = square.create(5);
	console.log(sq.area());
	printChain(sq);
	// 首先我们创建一个rectangle的克隆然后命名为square。
	// 接着我们用新的create方法重写square对象的create方法。
	// 最终我们从新的create方法中调用rectangle的create函数并且返回对象。
	console.log("***结论：使用原型模式的原型继承相对简单，容易理解");
})();

(function() {
	console.log("\n---使用构造模式的原型继承");

	function Rectangle(width, height) {
		this.Rectangle = 'Rectangle';
		this.height = height;
		this.width = width;
	};
	Rectangle.prototype.area = function() {
		return this.width * this.height;
	};

	function Square(side) {
		this.Square = 'Square';
		Rectangle.call(this, side, side);
	};
	Square.prototype = Object.create(Rectangle.prototype);
	Square.prototype.constructor = Square;
	var sq = new Square(5);
	console.log(sq.area());
	printChain(sq);

	console.log("***结论：使用构造模式的原型继承相比使用原型模式的原型继承更加复杂");
})();

// 当使用原型模式时一个对象继承自另一个对象就变得很明显。
// 当使用方法构造模式时就没有这么明显，因为你需要根据其他构造函数来考虑构造继承。

// 对象创建和扩展相结合 -----------------
// 在上面的例子中我们创建一个rectangle的克隆然后命名为square。
// 然后我们利用新的create属性扩展它，重写继承自rectangle对象的create方法。
// 如果把这两个操作合并成一个就很好了，就像对象字面量是用来创建Object.prototype的克隆然后用新的属性扩展它。
// 这个操作叫做extend，可以像下面这样实现:
(function() {
	console.log("\n---extend对象创建和扩展相结合");

	// extend方法是原型继承中唯一需要的操作。
	// 它是Object.create函数的超集，因此它可以用在对象的创建和扩展上。
	Object.prototype.extend = function(extension) {
		var hasOwnProperty = Object.hasOwnProperty;
		var object = Object.create(this);

		for (var property in extension)
			if (hasOwnProperty.call(extension, property) ||
				typeof object[property] === "undefined") {
				object[property] = extension[property];
			}

		return object;
	};

	var rectangle = {
		rectangle: 'rectangle',
		create: function(width, height) {
			// var self = Object.create(this);
			// self.height = height;
			// self.width = width;
			// return self;
			// 用extend来重写rectangle构造函数
			return this.extend({
				rectanonymous: 'rectanonymous',
				height: height,
				width: width
			});
		},
		area: function() {
			return this.width * this.height;
		}
	};

	// 利用上面的extend方法，我们可以重写square的代码
	var square = rectangle.extend({
		anonymous: 'anonymous',
		create: function(side) {
			return rectangle.create.call(this, side, side);
		}
	});
	var sq = square.create(25);
	console.log(sq.area());
	printChain(sq);
	// 原型继承的两种方法
	// extend函数返回的对象实际上是继承了两个对象的属性，一个是被扩展的对象，另一个是用来扩展的对象。
	// 另外从两个对象继承属性的方式也不一样。
	// 第一种情况下是通过委派来继承属性(也就是使用Object.create()来继承属性)，
	// 第二种情况下使用合并属性的方式来继承属性。
	console.log("***结论：利用extend可以实现原型模式原型继承与扩展的融合");
})();

// 委派(差异化继承)
// 很多Javascript程序员对于差异化继承比较熟悉。维基百科是这么解释的:
//     大部分对象是从其他更一般的对象中得到的，只是在一些很小的地方进行了修改。
//     每个对象通常在内部维护一个指向其他对象的引用列表，这些对象就是该对象本身进行差异化继承的对象。
// Javascript中的原型继承是基于差异化继承的。
// 每个对象都有个内部指针叫做[[proto]] (在大部分浏览器中可以通过__proto__属性访问)，这个指针指向对象的原型。
// 多个对象之间通过内部[[proto]]属性链接起来形成了原型链，链的最后指向null。

// 当你试图获取一个对象的属性时Javascript引擎会首先查找对象自身的属性。
// 如果在对象上没找到该属性，那么它就会去对象的原型中去查找。
// 以此类推，它会沿着原型链一直查找知道找到或者到原型链的末尾。

// Javascript中属性查找的过程就像下面的程序那样。
(function() {
	function get(object, property) {
		if (!Object.hasOwnProperty.call(object, property)) {
			var prototype = Object.getPrototypeOf(object);
			if (prototype) return get(prototype, property);
		} else {
			return object[property];
		}
	};
})();

// 克隆(合并式继承)
// 大多数Javascript程序员会觉得复制一个对象的属性到另一个对象上并不是一个正确的继承的方式，
// 因为任何对原始对象的修改都不会反映在克隆的对象上。
// 五天前我会同意这个观点。然而现在我相信合并式继承是原型继承的一种正确方式。
// 对于原始对象的修改可以发送到它的副本来实现真正的原型继承。

// 合并式继承和代理有他们的优点和缺点。下表列出了它们的优缺点:
// 代理式继承(Delegation)                     合并式继承(Concatenation)
// 任何对于原型的修改都会反映在所有副本上					任何对于原型的修改都需要手动更新到副本中
// 属性查找效率较低因为需要进行原型链查找					属性查找更搞笑因为继承的属性是通过复制的方式附加在对象本身的
// 使用Object.create()方法只能继承单一对象				对象可以从任意数量的对象中通过复制继承属性

// 从多个原型继承 ------------------
// 上表中最后一点告诉我们对象可以通过合并的方式从多个原型中继承属性。
// 这是一个重要的特点因为这证明原型继承比Java中的类继承更强大并且与C++中的类继承一样强大。
// 为了实现多重继承，你只需要修改extend方法来从多个原型中复制属性。
(function() {
	console.log("\n---从多个原型继承");

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
		eventEmitter: 'eventEmitter',
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
		rectangle: 'rectangle',
		create: function(width, height) {
			return this.extend({
				rect: 'rectanonymous',
				height: height,
				width: width
			});
		},
		area: function() {
			return this.width * this.height;
		}
	};
	var square = rectangle.extend(eventEmitter, {
		anonymous: 'anonymous',
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
	sq.square = 'square';
	sq.on('resize', function(oldSize, newSize) {
		console.log('sq resized from ' + oldSize + ' to ' + newSize + '.');
	});
	sq.resize(10);
	console.log(sq.area());
	printChain(sq);

	// 修复instanceof操作
	Object.prototype.instanceof = function(prototype) {
		var object = this;
		do {
			if (object === prototype) return true;
			var object = Object.getPrototypeOf(object);
		} while (object);
		return false;
	};
	// 这个instanceof方法现在可以被用来测试一个对象是否是通过委派从一个原型继承的。例如：
	// console.log(sq instanceof square); // Expecting a function in instanceof check, but got #<Object>
	// console.log(sq instanceof rectangle); // Expecting a function in instanceof check, but got #<Object>
	// console.log(sq instanceof eventEmitter); // Expecting a function in instanceof check, but got #<Object>
	console.log(sq.instanceof(square));
	console.log(sq.instanceof(rectangle));
	console.log(sq.instanceof(eventEmitter));
	console.log("***结论：利用extend可以实现原型模式原型继承与扩展多继承");
})();

// Mixin的蓝图(Blueprints for Mixins) ----------------
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
(function() {
	console.log("\n---Blueprints for Mixins");

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

	function eventEmitter() {
		this.eventEmitter = 'eventEmitter';
		var events = Object.create(null);

		this.on = function(event, listener) {
			if (typeof events[event] !== "undefined") {
				events[event].push(listener);
			} else {
				events[event] = [listener];
			}
		};

		this.emit = function(event) {
			if (typeof events[event] !== "undefined") {
				var listeners = events[event];
				var length = listeners.length;
				var index = length;
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
		rectangle: 'rectangle',
		create: function(width, height) {
			return this.extend({
				rectanonymous: 'rectanonymous',
				height: height,
				width: width
			});
		},
		area: function() {
			return this.width * this.height;
		}
	};
	// 	var square = rectangle.extend(eventEmitter, {
	var square = rectangle.extend({
		anonymous: 'anonymous',
		create: function(side) {
			var self = rectangle.create.call(this, side, side);
			eventEmitter.call(self);
			return self;
		},
		resize: function(newSize) {
			var oldSize = this.width;
			this.width = this.height = newSize;
			this.emit("resize", oldSize, newSize);
		}
	});
	var sq = square.create(5);
	sq.square = 'square';
	sq.on("resize", function(oldSize, newSize) {
		console.log("sq resized from " + oldSize + " to " + newSize + ".");
	});
	sq.resize(100);
	console.log(sq.area());
	printChain(sq);

	console.log("***结论：一个蓝图用来在一个对象创建之后通过合并来扩展它, Eric Elliot把它们叫做闭包原型。");

	// 蓝图在Javascript中是独一无二的。它是一个很强大的特性。然而它们也有自己的缺点。下表列出了mixin和蓝图的优缺点：
	// Mixins                                    蓝图(Blueprints)
	// 它们用来扩展对象的原型。因此对象共享同一个原型     它们用来扩展新创建的对象。因此每个对象都是在自己对象本身进行修改
	// 因为缺少封装方法所以不存在私有状态               它们是函数，所以可以封装私有状态
	// 它们是静态原型并且不能被自定义                  它们可以传递参数来自定义对象，可以向蓝图函数传递一些用来自定义的参数

	// 修复instanceof操作
	// 许多Javascript程序员会觉得使用原型模式来继承违背了语言的精髓。
	// 他们更偏向于构造模式因为他们觉得通过构造函数创建的对象才是真正的实例，因为instanceof操作会返回true。
	// 然而，这个争论是没有意义的，因为instanceof操作可以像下面这样实现：
	// console.log("\n---修复instanceof操作");

	Object.prototype.instanceof = function(prototype) {
		var object = this;
		do {
			if (object === prototype) {
				return true;
			}
			var object = Object.getPrototypeOf(object);
		} while (object);
		return false;
	};
	// 这个instanceof方法现在可以被用来测试一个对象是否是通过委派从一个原型继承的。例如：
	// console.log(sq instanceof square); // Expecting a function in instanceof check, but got #<Object>
	// console.log(sq instanceof rectangle); // Expecting a function in instanceof check, but got #<Object>
	console.log(sq instanceof eventEmitter);
	console.log(sq.instanceof(square));
	console.log(sq.instanceof(rectangle));
	console.log(sq.instanceof(eventEmitter));
})();

// 然而还是没有办法判断一个对象是否是通过合并的方式从一个原型继承的，因为实例的关联信息丢失了。
// 为了解决这个问题我们将一个原型的所有克隆的引用保存在原型自身中，然后使用这个信息来判断一个对象是否是一个原型的实例。
// 这个可以通过修改extend方法来实现：
(function() {
	console.log("\n---修复Mixins合并继承instanceof操作");

	Object.prototype.extend = function() {
		var hasOwnProperty = Object.hasOwnProperty;
		var object = Object.create(this);
		var length = arguments.length;
		var index = length;

		while (index) {
			var extension = arguments[length - (index--)];

			for (var property in extension) {
				if (property !== "clones" &&
					hasOwnProperty.call(extension, property) ||
					typeof object[property] === "undefined") {
					object[property] = extension[property];
				}
			}

			if (hasOwnProperty.call(extension, "clones")) {
				extension.clones.unshift(object);
			} else {
				extension.clones = [object];
			}
		}

		return object;
	};

	// 通过合并继承自原型的对象形成了一个克隆树，这些树从根对象开始然后向下一直到叶子对象。
	// 一个克隆链是一个从根对象到叶子对象的单一路径，这跟遍历原型链很相似。
	// 我们可以使用这个信息来判断一个对象是否是通过合并继承自一个原型。
	Object.prototype.instanceof = function(prototype) {
		if (Object.hasOwnProperty.call(prototype, "clones"))
			var clones = prototype.clones;
		var object = this;

		do {
			if (object === prototype ||
				clones && clones.indexOf(object) >= 0)
				return true;
			var object = Object.getPrototypeOf(object);
		} while (object);

		return false;
	};

	var eventEmitter = {
		eventEmitter: 'eventEmitter',
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
	var rectangle = {
		rectangle: 'rectangle',
		create: function(width, height) {
			return this.extend({
				rect: 'rectanonymous',
				height: height,
				width: width
			});
		},
		area: function() {
			return this.width * this.height;
		}
	};
	var square = rectangle.extend(eventEmitter, {
		anonymous: 'anonymous',
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
	sq.square = 'square';
	sq.on('resize', function(oldSize, newSize) {
		console.log('sq resized from ' + oldSize + ' to ' + newSize + '.');
	});
	sq.resize(10);
	console.log(sq.area());
	printChain(sq);

	// 这个instanceof方法现在可以用来判断一个对象是否是通过合并继承自一个原型。例如:
	console.log(sq.instanceof(square));
	console.log(sq.instanceof(rectangle));
	console.log(sq.instanceof(eventEmitter));
})();


// 然而还是没有办法判断一个对象是否是通过合并的方式从一个原型继承的，因为实例的关联信息丢失了。
// 为了解决这个问题我们将一个原型的所有克隆的引用保存在原型自身中，然后使用这个信息来判断一个对象是否是一个原型的实例。
// 这个可以通过修改extend方法来实现：
(function() {
	console.log("\n---修复Blueprints合并继承instanceof操作");

	Object.prototype.extend = function() {
		var hasOwnProperty = Object.hasOwnProperty;
		var object = Object.create(this);
		var length = arguments.length;
		var index = length;

		while (index) {
			var extension = arguments[length - (index--)];

			for (var property in extension) {
				if (property !== "clones" &&
					hasOwnProperty.call(extension, property) ||
					typeof object[property] === "undefined") {
					object[property] = extension[property];
				}
			}

			if (hasOwnProperty.call(extension, "clones")) {
				extension.clones.unshift(object);
			} else {
				extension.clones = [object];
			}
		}

		return object;
	};

	// 通过合并继承自原型的对象形成了一个克隆树，这些树从根对象开始然后向下一直到叶子对象。
	// 一个克隆链是一个从根对象到叶子对象的单一路径，这跟遍历原型链很相似。
	// 我们可以使用这个信息来判断一个对象是否是通过合并继承自一个原型。
	Object.prototype.instanceof = function(prototype) {
		if (Object.hasOwnProperty.call(prototype, "clones")) {
			var clones = prototype.clones;
		}
		var object = this;

		do {
			if (object === prototype ||
				clones && clones.indexOf(object) >= 0) {
				return true;
			}
			var object = Object.getPrototypeOf(object);
		} while (object);

		return false;
	};

	function blueprint(f) {
		this.blueprint = 'blueprint';
		var g = function() {
			f.apply(this, arguments);
			g.clones.unshift(this);
		};

		g.clones = [];

		return g;
	};

	var eventEmitter = blueprint(function() {
		this.eventEmitter = 'eventEmitter';
		var events = Object.create(null);

		this.on = function(event, listener) {
			if (typeof events[event] !== "undefined") {
				events[event].push(listener);
			} else {
				events[event] = [listener];
			}
		};

		this.emit = function(event) {
			if (typeof events[event] !== "undefined") {
				var listeners = events[event];
				var length = listeners.length;
				var index = length;
				var args = Array.prototype.slice.call(arguments, 1);

				while (index) {
					var listener = listeners[length - (index--)];
					listener.apply(this, args);
				}
			}
		};
	});

	// 一个蓝图用来在一个对象创建之后通过合并来扩展它(我觉得有点像装饰者模式)。
	// Eric Elliot把它们叫做闭包原型。
	// 我们可以使用蓝图版本的eventEmitter来重写square的代码，如下：
	var rectangle = {
		rectangle: 'rectangle',

		create: function(width, height) {
			return this.extend({
				rect: 'rect',
				height: height,
				width: width
			});
		},
		area: function() {
			return this.width * this.height;
		}
	};
	var square = rectangle.extend(eventEmitter, {
		anonymous: 'anonymous',

		create: function(side) {
			var self = rectangle.create.call(this, side, side);
			eventEmitter.call(self);
			return self;
		},
		resize: function(newSize) {
			var oldSize = this.width;
			this.width = this.height = newSize;
			this.emit("resize", oldSize, newSize);
		}
	});
	var sq = square.create(5);
	sq.square = 'square';
	sq.on("resize", function(oldSize, newSize) {
		console.log("sq resized from " + oldSize + " to " + newSize + ".");
	});
	sq.resize(100);
	console.log(sq.area());
	printChain(sq);
	// 这个instanceof方法现在可以用来判断一个对象是否是通过合并继承自一个原型。例如:
	console.log(sq instanceof eventEmitter);
	console.log(sq.instanceof(square));
	console.log(sq.instanceof(rectangle));
	console.log(sq.instanceof(eventEmitter));
})();

// 向原型发送变化 -------------
// 上面例子中的clones属性有双重作用。
// 它可以用来判断一个对象是否是通过合并继承自一个原型的，然后他可以用来发送原型改变给所有它的克隆。
// 原型继承相比类继承最大的优势就是你可以修改一个原型在它创建之后。
// 为了使克隆可以继承对于原型的修改，我们创建了一个叫做define的函数：
(function() {
	console.log("\n---修复Blueprints合并继承instanceof操作");
	Object.prototype.define = function(property, value) {
		this[property] = value;

		if (Object.hasOwnProperty.call(this, "clones")) {
			var clones = this.clones;
			var length = clones.length;

			while (length) {
				var clone = clones[--length];
				if (typeof clone[property] === "undefined") {
					clone.define(property, value);
				}
			}
		}
	};

	// 蓝图需要特别注意。尽管对于蓝图的修改会被发送到它的克隆，但是蓝图的新的克隆并不会反映这些修改。
	// 幸运的是这个问题的解决方法很简单。我们只需要对blueprint方法进行小小的修改，然后任何对于蓝图的修改就会反映在克隆上了。
	// function blueprint(f) {
	// 	var g = function() {
	// 		f.apply(this, arguments);
	// 		g.clones.unshift(this);
	// 		var hasOwnProperty = Object.hasOwnProperty;
	// 		for (var property in g) {
	// 			if (property !== "clones" &&
	// 				hasOwnProperty.call(g, property)) {
	// 				this[property] = g[property];
	// 			}
	// 		}
	// 	};
	// 	g.clones = [];
	// 	return g;
	// };

	// var eventEmitter = blueprint(function() {
	// 	this.eventEmitter = 'eventEmitter';
	// 	var events = Object.create(null);
	//
	// 	this.on = function(event, listener) {
	// 		if (typeof events[event] !== "undefined") {
	// 			events[event].push(listener);
	// 		} else {
	// 			events[event] = [listener];
	// 		}
	// 	};
	//
	// 	this.emit = function(event) {
	// 		if (typeof events[event] !== "undefined") {
	// 			var listeners = events[event];
	// 			var length = listeners.length;
	// 			var index = length;
	// 			var args = Array.prototype.slice.call(arguments, 1);
	//
	// 			while (index) {
	// 				var listener = listeners[length - (index--)];
	// 				listener.apply(this, args);
	// 			}
	// 		}
	// 	};
	// });
	// 现在我们可以修改原型然后这个修改会反映在所有的克隆上。
	// 例如我们可以创建创建一个别名addEventListener针对eventEmitter上的on方法：
	var eventEmitter = {
		eventEmitter: 'eventEmitter',
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
	var rectangle = {
		rectangle: 'rectangle',

		create: function(width, height) {
			return this.extend({
				rect: 'rect',
				height: height,
				width: width
			});
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
			this.emit("resize", oldSize, newSize);
		}
	});

	var sq = square.create(5);

	eventEmitter.define("addEventListener", eventEmitter.on);

	sq.addEventListener("resize", function(oldSize, newSize) {
		console.log("sq resized from " + oldSize + " to " + newSize + ".");
	});

	sq.resize(10);
	console.log(sq.area());
})();

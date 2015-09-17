// 理解Ecmascript 6中的类和继承
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function printChain(object) {
    var protoChain = [object];
    while (object = object.__proto__) {
        if (object != Object.prototype) {
            protoChain.push(object);
        }
    }
    console.dir(protoChain);
}
(function () {
    console.log("\n---ECMAScript 6 class");
    var AnimalES6 = (function () {
        function AnimalES6(name) {
            this.name = name;
        }
        Object.defineProperty(AnimalES6.prototype, "age", {
            get: function () {
                return this._age;
            },
            set: function (value) {
                if (value < 0) {
                    console.log("We do not support undead animals");
                }
                this._age = value;
            },
            enumerable: true,
            configurable: true
        });
        AnimalES6.prototype.doSomething = function () {
            console.log("I'm a " + this.name);
        };
        return AnimalES6;
    })();
    var lionES6 = new AnimalES6("Lion");
    lionES6.doSomething();
    printChain(lionES6);
})();
(function () {
    console.log("\n---ECMAScript 6 getter 和 setter");
    var AnimalES6 = (function () {
        function AnimalES6(name) {
            this.name = name;
        }
        Object.defineProperty(AnimalES6.prototype, "age", {
            get: function () {
                return this._age;
            },
            set: function (value) {
                if (value < 0) {
                    console.log("We do not support undead animals");
                }
                this._age = value;
            },
            enumerable: true,
            configurable: true
        });
        AnimalES6.prototype.doSomething = function () {
            console.log("I'm a " + this.name);
        };
        return AnimalES6;
    })();
    var lionES6 = new AnimalES6("Lion");
    lionES6.doSomething();
    lionES6.age = 5;
    printChain(lionES6);
})();
(function () {
    console.log("\n---ECMAScript 6 Symbol ");
    var ageSymbol = Symbol("age");
    var AnimalES6 = (function () {
        function AnimalES6(name) {
            this.name = name;
            this[ageSymbol] = 0;
        }
        Object.defineProperty(AnimalES6.prototype, "age", {
            get: function () {
                return this[ageSymbol];
            },
            set: function (value) {
                if (value < 0) {
                    console.log("We do not support undead animals");
                }
                this[ageSymbol] = value;
            },
            enumerable: true,
            configurable: true
        });
        AnimalES6.prototype.doSomething = function () {
            console.log("I'm a " + this.name);
        };
        return AnimalES6;
    })();
    var lionES6 = new AnimalES6("Lion");
    lionES6.doSomething();
    lionES6.age = 5;
    printChain(lionES6);
    console.log(lionES6.age);
    console.log(Object.getOwnPropertySymbols(lionES6));
    console.log(Object.getOwnPropertySymbols(lionES6).length);
    console.log(Object.getOwnPropertySymbols(lionES6)[0]);
    console.log(lionES6[ageSymbol]);
    console.log(lionES6[Object.getOwnPropertySymbols(lionES6)[0]]);
    console.log(ageSymbol);
    console.log("\n---ECMAScript 6 继承 ");
    var legsCountSymbol = Symbol('legs');
    var InsectES6 = (function (_super) {
        __extends(InsectES6, _super);
        function InsectES6(name) {
            _super.call(this, name);
            this[legsCountSymbol] = 0;
        }
        Object.defineProperty(InsectES6.prototype, "legsCount", {
            get: function () {
                return this[legsCountSymbol];
            },
            set: function (value) {
                if (value < 0) {
                    console.log("We do not support nether or interstellar insects");
                }
                this[legsCountSymbol] = value;
            },
            enumerable: true,
            configurable: true
        });
        InsectES6.prototype.doSomething = function () {
            _super.prototype.doSomething.call(this);
            console.log("And I have " + this[legsCountSymbol] + " legs!");
        };
        return InsectES6;
    })(AnimalES6);
    var spiderES6 = new InsectES6("Spider");
    spiderES6.legsCount = 8;
    spiderES6.age = 37;
    spiderES6.doSomething();
    printChain(spiderES6);
    console.log(Object.getOwnPropertySymbols(spiderES6));
    console.log(Object.getOwnPropertySymbols(spiderES6).length);
    console.log(spiderES6[Object.getOwnPropertySymbols(spiderES6)[0]]);
    console.log(spiderES6[Object.getOwnPropertySymbols(spiderES6)[1]]);
})();

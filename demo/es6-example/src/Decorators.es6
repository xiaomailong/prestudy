import 'core-js/shim';
import 'core-decorators';

import { autobind } from 'core-decorators';
(function() {
  console.log("\n---@autobind 绑定方法所属的类对象实例");

  // Forces invocations of this function to always have this refer to the class instance,
  // even if the function is passed around or would otherwise lose its this context.
  // e.g. var fn = context.method;
  class Person {
    @autobind
    getPerson() {
      return this;
    }
  }
  let person1 = new Person();
  let getPerson1 = person1.getPerson;
  let person2 = new Person();
  let getPerson2 = person2.getPerson;
  console.log(getPerson1() === person1, getPerson2() === person2); // true true
  console.log(getPerson1() === person2, getPerson2() === person1); // false false
})();

(function() {
  class Person {
    getPerson() {
      return this;
    }
  }
  let person1 = new Person();
  let getPerson1 = person1.getPerson;
  let person2 = new Person();
  let getPerson2 = person2.getPerson;
  console.log(getPerson1() === person1, getPerson2() === person2); // false false
  console.log(getPerson1() === person2, getPerson2() === person1); // false false
})();

// import { readonly } from 'core-decorators';
// (function() {
//   console.log("\n---@readonly 设定属性或方法为只读");
//   class Meal {
//     @readonly
//     entree = 'steak';
//   }
//
//   var dinner = new Meal();
//   dinner.entree = 'salmon';  // Cannot assign to read only property 'entree' of [object Object]
// })();
//
// (function() {
//   class Meal {
//     entree = 'steak';
//   }
//
//   var dinner = new Meal();
//   dinner.entree = 'salmon';  // Cannot assign to read only property 'entree' of [object Object]
// })();

import { override } from 'core-decorators';
(function() {
  console.log("\n---@override 重写父类方法");
  class Parent {
    speak(first, second) {}
  }

  class Child extends Parent {
    @override
    speak(first, second) {}
  }

  // class Child extends Parent {
  //   @override
  //   speak() {}
  //   // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
  // }

  // or

  // class Child extends Parent {
  //   @override
  //   speaks() {}
  //   // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  //   //
  //   //   Did you mean "speak"?
  // }
})();

import { deprecate } from 'core-decorators';
(function() {
  console.log("\n---@deprecate (alias: @deprecated) 废弃的");
  class Person {
    @deprecate
    facepalm() {}

    @deprecate('We stopped facepalming')
    facepalmHard() {}

    @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
    facepalmHarder() {}
  }

  let person = new Person();

  person.facepalm();
  // DEPRECATION Person#facepalm: This function will be removed in future versions.

  person.facepalmHard();
  // DEPRECATION Person#facepalmHard: We stopped facepalming

  person.facepalmHarder();
  // DEPRECATION Person#facepalmHarder: We stopped facepalming
  //
  //     See http://knowyourmeme.com/memes/facepalm for more details.
  //
})();

import { debounce } from 'core-decorators';
(function() {
  console.log("\n---@debounce 延时调用");
  class Editor {

    // content = '';

    @debounce(500)
    updateContent(content) {
      this.content = content;
    }
  }
})();

import { deprecated } from 'core-decorators';
import { suppressWarnings } from 'core-decorators';
(function() {
  console.log("\n---@suppressWarnings 警告");
  class Person {
    @deprecated
    facepalm() {}

    @suppressWarnings
    facepalmWithoutWarning() {
      this.facepalm();
    }
  }

  let person = new Person();

  person.facepalmWithoutWarning();  // no warning is logged
})();

// import { nonenumerable } from 'core-decorators';
// (function() {
//   console.log("\n---@nonenumerable");
//   class Meal {
//     entree = 'steak';
//
//     @nonenumerable
//     cost = 20.99;
//   }
//
//   var dinner = new Meal();
//   for (var key in dinner) {
//     key;
//     // "entree" only, not "cost"
//   }
//
//   Object.keys(dinner); // ["entree"]
// })();

// import { nonconfigurable } from 'core-decorators';
// (function() {
//   console.log("\n---@nonconfigurable");
//
//   class Meal {
//     @nonconfigurable
//     entree = 'steak';
//   }
//
//   var dinner = new Meal();
//
//   Object.defineProperty(dinner, 'entree', {
//     enumerable: false
//   });
//   // Cannot redefine property: entree
// })();


(function() {
  console.log("\n---@memoize");

})();

// import { mixin } from 'core-decorators';
// (function() {
//   console.log("\n---@mixin (alias: @mixins)");
//   const SingerMixin = {
//     sing(sound) {
//       alert(sound);
//     }
//   };
//
//   const FlyMixin = {
//     fly() {}
//
//     land() {}
//   };
//
//   @mixin(SingerMixin, FlyMixin)
//   class Bird {
//     singMatingCall() {
//       this.sing('tweet tweet');
//     }
//   }
//
//   var bird = new Bird();
//   bird.singMatingCall();
//   // alerts "tweet tweet"
// })();


(function() {
  console.log("\n---");

})();

(function() {
  console.log("\n---");

})();


(function() {
  console.log("\n---");

})();

(function() {
  console.log("\n---");

})();

// Synchronous Code ------------------
var assert = require("assert");
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});


// Asynchronous Code -----------------
var User = (function () {
  function User(greeting) {
    this.greeting = greeting;
  }
  User.prototype.save = function (func) {
    console.log("" + this.greeting + "");
    func(this.greeting);
  };
  return User;
})();
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        // if (err) throw err;
        done();
      });
    });
  });
});
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      // user.save(done);
			done();
    });
  });
});

// Working with Promises  -----------------------
beforeEach(function() {
  // return db.clear()
  //   .then(function() {
  //     return db.save([tobi, loki, jane]);
  //   });
});
describe('#find()', function() {
  it('respond with matching records', function() {
    // return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
});

// Hooks -------------------------------
// Mocha provides the hooks before(), after(), beforeEach(), and afterEach(),
// which can be used to set up preconditions and clean up after your tests.
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
});

// Asynchronous Hooks ------------------------
// All "hooks" (before(), after(), beforeEach(), afterEach()) may be sync or async as well,
// behaving much like a regular test-case.
// For example, you may wish to populate database with dummy content before each test:
// describe('Connection', function() {
//   var db = new Connection,
//     tobi = new User('tobi'),
//     loki = new User('loki'),
//     jane = new User('jane');
//
//   beforeEach(function(done) {
//     db.clear(function(err) {
//       if (err) return done(err);
//       db.save([tobi, loki, jane], done);
//     });
//   });
//
//   describe('#find()', function() {
//     it('respond with matching records', function(done) {
//       db.find({type: 'User'}, function(err, res) {
//         if (err) return done(err);
//         res.should.have.length(3);
//         done();
//       });
//     });
//   });
// });

// Root-Level Hooks
beforeEach(function() {
  console.log('before every test in every file');
});

// Delayed Root Suite
setTimeout(function() {
  // do some setup
  describe('my suite', function() {
    // ...
  });
  run();
}, 5000);

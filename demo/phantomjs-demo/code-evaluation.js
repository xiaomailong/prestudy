
// To evaluate JavaScript code in the context of the web page, use evaluate() function.
// The execution is "sandboxed", there is no way for the code to access any JavaScript objects
// and variables outside its own page context. An object can be returned from evaluate(),
// however it is limited to simple objects and can't contain functions or closures.
// var page = require('webpage').create();
// page.open('http://wit.xjgc.com', function(status) {
//   var title = page.evaluate(function() {
//     return document.title;
//   });
//   console.log('Page title is ' + title);
//   phantom.exit();
// });

// Any console message from a web page, including from the code inside evaluate(),
// will not be displayed by default. To override this behavior,
// use the onConsoleMessage callback. The previous example can be rewritten to:
var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
  console.log('Page title is ' + msg);
};
page.open('http://wit.xjgc.com', function(status) {
  page.evaluate(function() {
    console.log(document.title);
  });
  phantom.exit();
});

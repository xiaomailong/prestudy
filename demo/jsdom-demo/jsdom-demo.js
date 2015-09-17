// https://github.com/tmpvar/jsdom

(function() {
  console.log("\n---Creating a browser-like window object");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom("hello world");
  var window = document.defaultView;

  console.log(window.document.documentElement.outerHTML);
  // <html><head></head><body>hello world</body></html>
  console.log(window.innerWidth, window.innerHeight); // 1024 768
  console.log(typeof window.document.getElementsByClassName); // function
})();

(function() {
  console.log("\n---jQueryify");

  var jsdom = require("jsdom");
  var window = jsdom.jsdom().defaultView;

  jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.1.js", function() {
    window.$("body").append('<div class="testing">---jQueryify: Hello World, It works</div>');
    console.log(window.$(".testing").text()); // ---jQueryify: Hello World, It works
  });
})();

(function() {
  console.log("\n---Passing objects to scripts inside the page");
  var jsdom = require("jsdom").jsdom;
  var window = jsdom().defaultView;

  window.__myObject = {
    foo: "bar"
  };

  var scriptEl = window.document.createElement("script");
  scriptEl.src = "anotherScript.js";
  // scriptEl.text = "window.appendChild(__myObject);"
  window.document.body.appendChild(scriptEl);
  console.log(window.document.documentElement.outerHTML);

  // anotherScript.js will have the ability to read `window.__myObject`, even
  // though it originated in io.js!
})();

(function() {
  console.log("\n---Serializing a document");
  var jsdom = require("jsdom").jsdom;
  var serializeDocument = require("jsdom").serializeDocument;

  var doc = jsdom("<!DOCTYPE html>hello");
  console.log(serializeDocument(doc)); // <!DOCTYPE html><html><head></head><body>hello</body></html>
  console.log(doc.documentElement.outerHTML); // <html><head></head><body>hello</body></html>
})();


// (function() {
//   console.log("\n---Sharing cookie state among pages");
//   var jsdom = require("jsdom");
//   var cookieJar = jsdom.createCookieJar();
//
//   jsdom.env({
//     url: 'http://google.com',
//     cookieJar: cookieJar,
//     done: function(err1, window1) {
//       //...
//
//       jsdom.env({
//         url: 'http://code.google.com',
//         cookieJar: cookieJar,
//         done: function(err2, window2) {
//           //...
//         }
//       });
//     }
//   });
// })();

// Capturing Console Output
(function() {
  console.log("\n---Forward a window's console output to the io.js console");
  var jsdom = require("jsdom");

  var document = jsdom.jsdom(undefined, {
    virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  });

  // By default this will forward all "jsdomError" events to console.error.
  // If you want to maintain only a strict one-to-one mapping of events to method calls,
  // and perhaps handle "jsdomErrors" yourself,
  // then you can do jsdom.createVirtualConsole({ omitJsdomErrors: true }).
})();


(function() {
  console.log("\n---Create an event emitter for a window's console");
  var jsdom = require("jsdom");

  var virtualConsole = jsdom.createVirtualConsole();

  virtualConsole.on("log", function(message) {
    console.log("console.log called ->", message);
  });

  var document = jsdom.jsdom(undefined, {
    virtualConsole: virtualConsole
  });

  // Post-initialization, if you didn't pass in a virtualConsole or no longer have a reference to it,
  // you can retreive the virtualConsole by using:
  // var virtualConsole = jsdom.getVirtualConsole(window);

})();


(function() {
  console.log("\n---use it with a URL");

  // Count all of the links from the io.js build page
  var jsdom = require("jsdom");

  jsdom.env(
    "http://wit.xjgc.com", ["http://code.jquery.com/jquery.js"],
    function(err, window) {
      console.log("there have been", window.$(".logo").length, "get it!");
    }
  );
})();

(function() {
  console.log("\n---use it with raw HTML");
  // Run some jQuery on a html fragment
  var jsdom = require("jsdom");

  jsdom.env(
    '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>', ["http://code.jquery.com/jquery.js"],
    function(err, window) {
      console.log("contents of a.the-link:", window.$("a.the-link").text());
    }
  );
})();


(function() {
  console.log("\n---use it with a configuration object");

  // Print all of the news items on Hacker News
  var jsdom = require("jsdom");

  jsdom.env({
    url: "http://news.ycombinator.com/",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function(err, window) {
      var $ = window.$;
      console.log("HN Links");
      $("td.title:not(:last) a").each(function() {
        console.log(" -", $(this).text());
      });
    }
  });
})();


// (function() {
//   console.log("\n---use it with raw JavaScript source");
//
//   // Print all of the news items on Hacker News
//   var jsdom = require("jsdom");
//   var fs = require("fs");
//   var jquery = fs.readFileSync("./jquery.js", "utf-8");
//
//   jsdom.env({
//     url: "http://news.ycombinator.com/",
//     src: [jquery],
//     done: function(err, window) {
//       var $ = window.$;
//       console.log("HN Links");
//       $("td.title:not(:last) a").each(function() {
//         console.log(" -", $(this).text());
//       });
//     }
//   });
// })();


// As of version 1.6, you are also able to include jQuery into your page
// using a page.includeJs as follows:
var page = require('webpage').create();
page.open('http://www.sample.com', function() {
  page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    page.evaluate(function() {
      $("button").click();
    });
    phantom.exit()
  });
});

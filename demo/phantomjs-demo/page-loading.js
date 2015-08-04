var page = require('webpage').create();
//viewportSize being the actual size of the headless browser
page.viewportSize = { width: 1024, height: 768 };
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };

page.open('http://wit.xjgc.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('wit.png');
  }
  phantom.exit();
});

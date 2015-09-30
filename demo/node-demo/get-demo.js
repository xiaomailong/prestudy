http.get(options, function(res) {
  var data = '';

  res.on('data', function(chunk) {
    data += chunk;
  });

  res.on('end', function() {
    var obj = JSON.parse(data);
    console.log(obj.buck.email);
  });

});


var fs = require('fs');
var file = __dirname + '/config.json';

fs.readFile(file, 'utf8', function(err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  console.dir(data);
});

var request = require('request');
var JSONStream = require('JSONStream');

request({
    url: 'http://isaacs.couchone.com/registry/_all_docs'
  })
  .pipe(JSONStream.parse('rows.*'))
  .pipe(es.mapSync(function(data) {
    return data;
  }));

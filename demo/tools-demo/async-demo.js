// Async is a utility module which provides straight-forward,
// powerful functions for working with asynchronous JavaScript.
// Although originally designed for use with Node.js and installable via npm install async,
// it can also be used directly in the browser.

var async = require('async');
var fs = require('fs');

// Quick Examples
async.map(['file1','file2','file3'], fs.stat, function(err, results){
    // results is now an array of stats for each file
    console.log(err);
});

async.filter(['file1','file2','file3'], fs.exists, function(results){
    // results now equals an array of the existing files
    console.log(results);
});

// async.parallel([
//     function(){ ... },
//     function(){ ... }
// ], callback);
//
// async.series([
//     function(){ ... },
//     function(){ ... }
// ]);

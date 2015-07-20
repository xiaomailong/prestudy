var mysql = require('mysql');
var Wind = require("wind");

var pool =  mysql.createPool({
  connectionLimit : 10,
  host : "localhost",
  user : "root",
  password: "",
  database: "demo"
});
pool.on('connection', function (connection) {
  console.log('The new mysql instance conneted!');
  // connection.query('SET SESSION auto_increment_increment=1')
});

var async_mysql_demo = eval(Wind.compile("async", function () {

    $await(Wind.Async.sleep(100));
    console.log("first with 1 query -----------");
    pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) {
        throw err;
      }
      console.log('The solution is: ', rows[0].solution);
    });


    $await(Wind.Async.sleep(100));
    console.log("second with 1 query -----------");
    pool.getConnection(function(err, connection){
      if (err) {
      	console.log(err);
      } else {
        connection.query("select * from DemoTable",  function(err, rows){
    	    if (err) {
          	console.log(err);
    	    } else {
    		    console.log(rows);
    	    }
        });
        connection.release();
      }
    });

    $await(Wind.Async.sleep(100));
    console.log("third with 2 query -----------");
    pool.getConnection(function(err, connection){
      if (err) {
      	console.log(err);
      } else {
        connection.query("select * from DemoTable",  function(err, rows){
    	    if (err) {
          	console.log(err);
    	    } else {
    		    console.log(rows);
    	    }
        });
        connection.release();
      }
    });
    // 延时一定时间即可避免再次创建新连接
    $await(Wind.Async.sleep(0));
    pool.getConnection(function(err, connection){
      if (err) {
      	console.log(err);
      } else {
        connection.query("select * from DemoTable",  function(err, rows){
    	    if (err) {
          	console.log(err);
    	    } else {
    		    console.log(rows);
    	    }
        });
        connection.release();
      }
    });

    $await(Wind.Async.sleep(100));
    console.log("four with 3 query -----------");
    pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) {
        throw err;
      }
      console.log('The solution is: ', rows[0].solution);
    });
    // 延时一定时间即可避免再次创建新连接
    $await(Wind.Async.sleep(0));
    pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) {
        throw err;
      }
      console.log('The solution is: ', rows[0].solution);
    });
    // 延时一定时间即可避免再次创建新连接
    $await(Wind.Async.sleep(0));
    pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) {
        throw err;
      }
      console.log('The solution is: ', rows[0].solution);
    });

}));

async_mysql_demo().start();

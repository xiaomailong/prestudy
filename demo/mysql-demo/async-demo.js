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
    console.log("first query -----------");
    pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) {
        throw err;
      }
      console.log('The solution is: ', rows[0].solution);
    });

    $await(Wind.Async.sleep(100));
    console.log("second query -----------");
    pool.getConnection(function(err, connection){
      if (err) {
        console.log("Can not get connect fro pool!");
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

}));

async_mysql_demo().start();

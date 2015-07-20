var mysql = require('mysql');

// 基本连接测试
// {
//   var connection =  mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password: "",
//     database: "demo"
//   });
//
//   // console.log(connection);
//
//
//   connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       // return;
//     }
//
//     console.log('connected as id ' + connection.threadId);
//   });
//
//   // console.log(connection);
//   connection.query('SELECT 1', function(err, rows) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rows);
//     }
//   });
//
//   // connection.query("use demo", function(err, rows){
//   // 	if (err) {
//   //   	console.log(err);
//   // 	} else {
//   // 		console.log(rows);
//   // 	}
//   // });
//
//   var strQuery = "select * from DemoTable";
//
//   connection.query(strQuery, function(err, rows){
//   	if (err) {
//     	console.log(err);
//   	} else {
//   		console.log(rows);
//   	}
//   });
//
//   connection.end(function(err) {
//     console.log(err);
//   });
//
//   connection.destroy();
// }

// 采用连接池
{
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
  // pool.on('enqueue', function () {
  //   console.log('Waiting for available connection slot');
  // });


  pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) {
      throw err;
    }
    console.log('The solution is: ', rows[0].solution);
  });

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

  pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) {
      throw err;
    }
    console.log('The solution is: ', rows[0].solution);
  });

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
}

// 执行多条查询语句
// 为了安全起见，默认情况下是不允许执行多条查询语句的。要使用多条查询语句的功能，就需要在创建数据库连接的时候打开这一功能
// {
//   var connection =  mysql.createConnection( { multipleStatements: true } );
//   connection.query('select column1; select column2; select column3;', function(err, result){
//     if (err) {
//     	console.log(err);
//     } else {
//     	console.log(result[0]);       // Column1 as a result
//     	console.log(result[1]);       // Column2 as a result
//     	console.log(result[2]);       // Column3 as a result
//     }
//   });
// }

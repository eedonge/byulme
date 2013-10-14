
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var fs = require('fs')
var path = require('path');
var mysql = require('mysql')
var dbcontroller = require('./lib/dbcontroller');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(){
	fs.readFile('public/index.html', function(err, data){
		if(err){
			res.end(err);
		} else {
			res.end(data);	
		}
	});
});

/*************** DB Control Process ****************/ 

/*************** MY SQL POOL Manager ***************/

var bmMysqlConfig={
  host:"14.49.42.89",
  port:"11000",
  user:"bmmast",
  password:"qufal13818",
  waitForConnections:true, //사용자가 많을 경우 대기 유지
  connectionLimit:100, //동시에 최대 100명 접속
  queueLimit:0 //Queue에 사용자 제한없음
};


var pool = mysql.createPool(bmMysqlConfig);

/***************************************************/
/* SELECT : GET                                    */
/* operation : 조회를 원하는 쿼리 번호              */
/***************************************************/
app.get('/bmdb/:operation', function(req, res){
  	pool.getConnection(function(err, connection){
    	connection.query(dbcontroller.get_query(parseInt(req.params.operation), req.query), function(err, rows){
      		res.send(rows)
      		connection.release();
    }); 
  });
});
   

/***************************************************/
/* INSERT, UPDATE : POST                           */
/***************************************************/
app.post('/bmdb/add', function(req, res){
  //req.body.name
});

/*************** MY SQL POOL Manager ***************/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

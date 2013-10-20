
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var fs = require('fs')
var path = require('path');
var mysql = require('mysql')
var dbcontroller = require('./lib/dbcontroller');
var graph = require('fbgraph');

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

/***************************************************/
/* FaceBook Auth                                   */
/***************************************************/
app.post('/bm/fb/auth', function(req, res){

    //Short Token 을 Long Token 으로 Extend  
    graph.setAccessToken(req.body.shorttoken);
    graph.extendAccessToken({
        "client_id": '533349720068935'
      , "client_secret": '6f61d913f18f56f394c592a2c694ed35'
    }, function (err, facebookRes) {

      var fbParam = {
        uid : req.body.uid,
        token : facebookRes.access_token,
        expires : facebookRes.expires
      };

      pool.getConnection(function(err, connection){
        connection.query(dbcontroller.fb_query("SET_TOKEN", fbParam), function(err, rows){
            res.send(rows)
            connection.release();
        });
      });
         
    });
});

/***************************************************/
/* FaceBook Neews Feed                             */
/***************************************************/
app.post('/bm/fb/feed', function(req, res){
    //사용자의 Long Token Select
    pool.getConnection(function(err, connection){
      connection.query(dbcontroller.fb_query("GET_TOKEN", req.body), function(err, rows){
        
          //사용자의 Lonf Token이 존재하면 사용자의 Facebook ID를 조회 한다.
          if(rows.length > 0){
            var options = {
                timeout:  3000
              , pool:     { maxSockets:  Infinity }
              , headers:  { connection:  "keep-alive" }
            };

            graph.setAccessToken(rows[0].token);

            graph.get("me", function(err, res) {

              //사용자의 ID가 존재하면 Feeding Post
              if(err == null){
                var wallPost = {
                  message: "별미 테스트 입니다.",
                  link: "http://www.youtube.com/watch?v=gAal8xHfV0c"
                };

                graph.post(res.id + "/feed", wallPost, function(err, res) {
                  //console.log("Success");
                });

              }
            });
          }
          res.send("Success");
          connection.release();
      });
    });
});



/*************** MY SQL POOL Manager ***************/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


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
var io = require('socket.io');
var requirejs = require('requirejs');

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

requirejs.config({
  paths: {
    "dummyData": "public/script/util/dummyData"
  }
});

app.get('/card/:menuId/:maxRank', function(req, res){
  requirejs(['dummyData'], function(DummyData){
    res.send(DummyData.cardData(req.params.menuId, req.params.maxRank));
  });
})

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
/* operation : 조회를 원하는 쿼리                   */
/***************************************************/
app.get('/bmdb/:operation', function(req, res){
  	pool.getConnection(function(err, connection){
    	connection.query(dbcontroller.get_query(req.params.operation, req.query), function(err, rows){
      		res.send(rows)
      		connection.release();
    }); 
  });

});
      

/***************************************************/
/* INSERT, UPDATE : POST                           */
/* operation : 조회를 원하는 쿼리                   */
/***************************************************/
app.post('/bmdb/:operation', function(req, res){

});


/***************************************************/
/* Star 신청                                       */
/***************************************************/
app.post('/bm/regstar', function(req, res){
  //Star Path 생성
  var starPath = new Date().getTime();
  req.body.path = starPath;
  pool.getConnection(function(err, connection){
    connection.query(dbcontroller.get_query("SET_REG_STAR_INFO", req.body), function(err, rows){
        res.send(rows)
        connection.release();
    });
  }); 
  
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
/* operation : 1 CONTENTS UPDATE 완료 후 호출       */
/***************************************************/
app.post('/bm/fb/feed/:operation', function(req, res){
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
              if(err != null){

                var wallPost;
                if (req.params.operation == "1"){
                  wallPost = {
                    message: "새로운 컨텐츠를 업로드 하였습니다.",
                    link: "http://www.youtube.com/watch?v=gAal8xHfV0c"
                  };
                }else{
                  wallPost = {
                    message: "별미 테스트 입니다.",
                    link: "http://www.youtube.com/watch?v=gAal8xHfV0c"
                  };
                }

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

var serverHandler = http.createServer(app);
serverHandler.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



/***************  SOCKET IO ****************************/
var app_io = io.listen(serverHandler);
app_io.set('log level', 1); //Log Disable
app_io.sockets.on('connection', function(socket){

  socket.on('setMovieMake', function(data){
    var pParam = {
      cid : data.cid
    };

    var curCnt = 0;
    //Movie Encoding 확인
    
    var intervalId = setInterval(function(){
      
      var isEmit = false;
      pool.getConnection(function(err, connection){
        connection.query(dbcontroller.get_query("GET_MOVIE_MAKE", pParam), function(err, rows){

          if(rows.length > 0){
            if(rows[0].result == "1"){

              socket.emit('getMovieMake', {status: 'success'}); 
              isEmit = true;
            }
          }

          connection.release(); 
        });      
      }); 
      
      curCnt = curCnt + 1;
      if(isEmit == true || curCnt > 60){ //최대 60회 시도 후 접속 해지
        clearInterval(intervalId);
      }
    }, 20000); //20초 단위로 체크

  });

});

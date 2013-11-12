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
var email = require('emailjs');
var crypto = require('crypto');
var util = require('util');
var app = express();

// all environments
app.set('port', process.env.PORT || 8001);
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
	multipleStatements: true,
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
			res.send(rows);
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
		connection.query(dbcontroller.get_query("SET_REG_STAR_INFO", req.body) + "; " + dbcontroller.get_query("SET_USER_TYPE_FOR_STAR", req.body), function(err, results){
			//console.log(results[0]);
			//console.log(results[1]);
			res.send(results[0]);
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


/*
var server  = email.server.connect({
	 user:    '', 
	 password: '', 
	 host:    'smtp.gmail.com', 
	 ssl:     true
});
*/

/***************************************************/
/* Sign In Process                                 */
/***************************************************/
app.post('/bm/sign/:operation', function(req, res){
	if(req.params.operation == "LOGIN"){

		pool.getConnection(function(err, connection){
			connection.query(dbcontroller.get_query("GET_LOGIN", req.body), function(err, rows){
				if(err){
					res.send(err)
				}else{
					res.send(rows)
				}
				connection.release();
			});
		});    

	}else if(req.params.operation == "SIGNIN"){

		//Auth Key 만들기
		var authKey = new Date().getTime() + crypto.createHash('md5').update(req.body.email).digest("hex");
		var uid = crypto.createHash('md5').update(req.body.email).digest("hex");
		var signParam = {
			uid : uid,
			email : req.body.email,
			pw : req.body.pass,
			auth : authKey
		};

		pool.getConnection(function(err, connection){
			connection.query(dbcontroller.get_query("SET_SIGN_INFO", signParam), function(err, rows){
				if(err){
					res.send(err)
				}else{
					res.send(rows)
				}
				connection.release();
			});
		});

		/*
		server.send({
			 text:    '', 
			 from:    '별미관리<wizardp80@gmail.com>', 
			 to:      '<' + req.body.email + '>',
			 subject: 'testing emailjs',
			 attachment: 
			 [
					{data:'<html>i <i>hope</i> this works!<br/> <a href="http://localhost:8080/bm/auth/' + authKey + '" target="_blank">별미인증하기</a></html>', alternative:true}
			 ]
		}, function(err, message) { console.log(err || message); });
		*/
	}
});


app.get('/bm/auth/:authkey', function(req, res){

	pool.getConnection(function(err, connection){
		var authParam = {
			auth : req.params.authkey
		}
		connection.query(dbcontroller.get_query("SET_AUTH", authParam), function(err, rows){
			if(data.affectedRows == 1){
					//성공
			}
			res.send(rows)
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


var mysql = require('mysql')
var crypto = require('crypto');


var bmMysqlConfig={
	host:"14.49.42.89",
	port:"11000",
	user:"bmmast",
	password:"qufal13818",
	multipleStatements: true,
	waitForConnections:true, //사용자가 많을 경우 대기 유지
	connectionLimit:10000, //동시에 최대 100명 접속
	queueLimit:0 //Queue에 사용자 제한없음
};


var pool = mysql.createPool(bmMysqlConfig);

pool.getConnection(function(err, connection){

  var nUserArr = [];
  //일반사용자 100명 생성
  for(var i = 0; i < 100; i++){

    var nUserEmail = 'normail' + i + '@byulme.com';
    var nUserId = crypto.createHash('md5').update(nUserEmail).digest("hex");
    var nUserPw = crypto.createHash('md5').update('11111').digest("hex");

    //User Master 
    var nUser_qry = " insert into bmdb.bm_user_mast (uid, email, pw, type, auth) values ('" + nUserId + "',  '" +  nUserEmail + "', '" + nUserPw + "',  'N', 'Y' )";

    //connection.query(nUser_qry, function(err, rows){}); 

    nUserArr.push(nUserId);

  }

  // User 9 명 생성(Star)
  for(var i = 1; i < 10; i++){

    var userEmail = 'starmail' + i + '@byulme.com';
    var userId = crypto.createHash('md5').update(userEmail).digest("hex");
    var userPw = crypto.createHash('md5').update('11111').digest("hex");

    //User Master 
    var user_qry = " insert into bmdb.bm_user_mast (uid, email, pw, type, auth) values ('" + userId + "',  '" +  userEmail + "', '" + userPw + "',  'S', 'Y' )";

    connection.query(user_qry, function(err, rows){}); 

    //User Star Master
    var userStarProfile = "files/profile/" + i + ".jpg";
    var userStarAlias = "스타(" + i + ")";
    var userStarIntro = "최고의 스타가 되려고합니다(" + i + ")";
    var userStarPath = i + "" + i + "" + i + "" + i + "" + i;
    var user_star_qry = " insert into bmdb.bm_user_star (uid, pf_img_url, alias, intro, path, fb_album_id) values ('" + userId + "',  '" +  userStarProfile + "', '" + userStarAlias + "',   '" + userStarIntro + "', '" + userStarPath + "', null )";

    connection.query(user_star_qry, function(err, rows){});

    //Star Card Mast (스타 1명당 100개의 데이터 넣음)
    var cardData = 
    [
      {masturl : '76566050', mastthumburl : 'http://b.vimeocdn.com/ts/451/499/451499729_640.jpg', pType : 'MV'},
      {masturl : '76428111', mastthumburl : 'http://b.vimeocdn.com/ts/451/217/451217222_640.jpg', pType : 'MV'},
      {masturl : '72047036', mastthumburl : 'http://b.vimeocdn.com/ts/446/854/446854087_640.jpg', pType : 'MV'},
      {masturl : '76841647', mastthumburl : 'http://b.vimeocdn.com/ts/451/806/451806617_640.jpg', pType : 'MV'},
      {masturl : '26013528', mastthumburl : 'http://b.vimeocdn.com/ts/445/584/445584914_640.jpg', pType : 'MV'},
      {masturl : '43929737', mastthumburl : 'http://b.vimeocdn.com/ts/449/669/449669423_640.jpg', pType : 'MV'},
      {masturl : '75623972', mastthumburl : 'http://b.vimeocdn.com/ts/451/518/451518382_640.jpg', pType : 'MV'},
      {masturl : '76440793', mastthumburl : 'http://b.vimeocdn.com/ts/451/233/451233366_640.jpg', pType : 'MV'},
      {masturl : '75491258', mastthumburl : 'http://b.vimeocdn.com/ts/450/063/450063825_640.jpg', pType : 'MV'},
      {masturl : 'files/' + userStarPath + '/1.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/1.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/2.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/2.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/3.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/3.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/4.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/4.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/5.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/5.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/6.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/6.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/7.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/7.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/8.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/8.jpg', pType : 'IMG'},
      {masturl : 'files/' + userStarPath + '/9.jpg' , mastthumburl : 'files/' + userStarPath + '/thumb/9.jpg', pType : 'IMG'}
    ]


    for(var j = 0; j< 100; j++){
      var result = Math.floor(Math.random() * 16); // 0 ~ 16

      //Card Mast
      var cardCid = new Date().getTime() + "" + i + "" + j;
      var rateCount = Math.floor(Math.random() * 100); // 0 ~ 100명
      var card_mast_qry = " insert into bmdb.bm_card_mast (cid, uid, rate_count, type, date, mast_url, mast_thumb_url) ";
      card_mast_qry = card_mast_qry + " values ('" + cardCid + "', '" + userId + "', '" + rateCount + "', '" + cardData[result].pType + "', sysdate(), '" + cardData[result].masturl + "', '" + cardData[result].mastthumburl + "' ) ";
      
      connection.query(card_mast_qry, function(err, rows){});

      //별점수 
      for(var k = 0; k < rateCount; k++){
        
        var tmpNUserIdx = Math.floor(Math.random() * 100); // 0 ~ 100
        var tmpCardRate = Math.floor(Math.random() * 3) + 1; // 1 ~ 4

        var card_rate_qry = " insert into bmdb.bm_user_card (uid, cid, rate) values ('" + nUserArr[tmpNUserIdx] + "',  '" +  cardCid + "', '" + tmpCardRate + "' )";  

        connection.query(card_rate_qry, function(err, rows){});

      }

      var rate_qry_d = " insert into bmdb.bm_card_rate (cid, type, rate_avg, type_date) values ('" +  cardCid + "', 'D', '" +  (Math.round(Math.random() * 3 * 100) / 100) + "', date_format(date_add(now(), interval -" + result + " day),'%Y%m%d')) ";
      var rate_qry_w = " insert into bmdb.bm_card_rate (cid, type, rate_avg, type_date) values ('" +  cardCid + "', 'W', '" +  (Math.round(Math.random() * 3 * 100) / 100) + "', date_format(date_add(now(), interval -" + result + " day),'%Y%m%d')) ";
      var rate_qry_m = " insert into bmdb.bm_card_rate (cid, type, rate_avg, type_date) values ('" +  cardCid + "', 'M', '" +  (Math.round(Math.random() * 3 * 100) / 100) + "', date_format(date_add(now(), interval -" + result + " day),'%Y%m%d')) ";
      var rate_qry_s = " insert into bmdb.bm_card_rate (cid, type, rate_avg, type_date) values ('" +  cardCid + "', 'S', '" +  (Math.round(Math.random() * 3 * 100) / 100) + "', date_format(date_add(now(), interval -" + result + " day),'%Y%m%d')) ";
      
      connection.query(rate_qry_d, function(err, rows){});
      connection.query(rate_qry_w, function(err, rows){});
      connection.query(rate_qry_m, function(err, rows){});
      connection.query(rate_qry_s, function(err, rows){});
    }
  }
});


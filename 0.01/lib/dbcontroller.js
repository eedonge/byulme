exports.get_query = function(operation, params){

	var _query = "";

	switch (operation)
	{
		case "GET_MOVIE_MAKE": //Movie Encoding 완료 확인
			_query = "select case when vimeo_url is not null or youtube_url is not null then '1' ";
			_query = _query + "else '0' end as result ";
			_query = _query + "from bmdb.bm_movie_mast ";
			_query = _query + "where cid = '" + params.cid + "' ";
			break;
		case "GET_FB_TOKEN_CF": //Face Book Token이 현재 유효한지 확인
			_query = "select ";
			_query = _query + " case when now() <= date_add(rst.last_date, interval + 58 day) then '1' ";
		    _query = _query + " else '0' end as result ";
		    _query = _query + " from ( ";
			_query = _query + " select ifnull(max(last_date), date_add(now(), interval - 100 day)) as last_date ";
			_query = _query + " from bmdb.bm_facebook_auth ";
			_query = _query + " where uid = '" + params.uid + "' ) rst ";
			break;
		case "SET_REG_STAR_INFO": //Star 신청 정보 
			_query = "INSERT INTO bmdb.bm_user_star ";
			_query = _query + "(uid, ";
			_query = _query + "pf_img_url, ";
			_query = _query + "alias, ";
			_query = _query + "intro, ";
			_query = _query + "path, ";
			_query = _query + "fb_album_id) ";
			_query = _query + "VALUES( ";
			_query = _query + "'" + params.uid + "', '" + params.pf_img_url + "', '" + params.alias + "', '" + params.intro + "', '" + params.path + "', null) ";
			break;

		case "SET_USER_TYPE_FOR_STAR": //User type을 Star로 수정 
			_query = "UPDATE bmdb.bm_user_mast set type = 'S' where uid = '" + params.uid + "' ";
			break;

		case "SET_SIGN_INFO": //회원가입 신청
			_query = "INSERT INTO bmdb.bm_user_mast ";
			_query = _query + "(uid, ";
			_query = _query + "email, ";
			_query = _query + "pw, ";
			_query = _query + "type, ";
			_query = _query + "auth) ";
			_query = _query + "VALUES( ";
			_query = _query + "'" + params.uid + "', '" + params.email + "', '" + params.pw + "', 'N', '" + params.auth + "') ";
			break;

		case "SET_AUTH": //회원가입 인증
			_query = "update bmdb.bm_user_mast set auth = 'Y'  where auth = '" + params.auth + "' ";			
			break;

		case "GET_USER_INFO_AUTH": //회원정보 
			_query = "select uid, email, type from bmdb.bm_user_mast where auth = '" + params.auth + "' ";			
			break;

		case "GET_LOGIN": //로그인 
			_query = "select uid, email, type from bmdb.bm_user_mast where email = '" + params.email + "' and pw = '" + params.pass + "' and auth = 'Y' ";
			break;

		default:
			_query = "select 'TEST' from dual";
			break;
	}
	return _query;

};

exports.fb_query = function(operation, params){
	var _query = "";

	switch (operation)
	{
		case "SET_TOKEN": //Facebook Token Update
			_query = "insert into bmdb.bm_facebook_auth (uid, token, expires, last_date) ";
			_query = _query + "values ('" + params.uid + "', '" + params.token + "', '" + params.expires + "', sysdate() )";
			_query = _query + "on duplicate key ";
			_query = _query + "update token='" + params.token + "',  expires='" + params.expires + "', last_date=sysdate() ";
			break;
		case "GET_TOKEN": //Facebook Token Select 
			_query = "select token from bmdb.bm_facebook_auth where uid = '" + params.uid + "' ";
			break;
		default:
			_query = "";
			break;
	}	
	return _query;
}


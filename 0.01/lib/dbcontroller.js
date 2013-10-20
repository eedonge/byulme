exports.get_query = function(operation, params){

	var _query = "";

	switch (operation)
	{
		case 1:
			_query = "select email, pw, uid, '" + params.name + "' as name from bmdb.bm_user_mast";
			break;
		default:
			_query = "";
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


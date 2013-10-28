

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
define(function(require){
	var cardDataUtil = function() {
		var cardList = null;
	};

	cardDataUtil.prototype.cardData = function(id, limit, callback) {
		var list = {};
		var i = 0;

		$.get('/bmdb/GET_' + id.toUpperCase() + '?curMaxIndex=' + limit, function(data){
			for(i = 0; i < data.length; i++) {
				list[data[i].cid] = {
					'menuId':id,
					'starId':data[i].uid,
					'rank':data[i].rownum,
					'starName':data[i].alias
				}
			}
			
			callback && callback(list);
		});
	};

	return new cardDataUtil();
});
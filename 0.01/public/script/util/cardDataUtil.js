define(function(require){
	var cardDataUtil = function() {
		var cardList = null;
	};

	cardDataUtil.prototype.cardData = function(id, limit, callback) {
		var list = {};
		var i = 0;
		var byulmeHost = "http://14.49.42.89";
		$.get('/bmdb/GET_' + id.toUpperCase() + '?curMaxIndex=' + limit, function(data){
			if( Object.prototype.toString.call( data ) === '[object Array]' ) {
			    data = data[0];
			}

			for(i = 0; i < data.length; i++) {
				var srcParam = "";
				var thumbParam = "";
				switch (data[i].type) {
				    case 'MV' :
				    	if(data[i].mast_thumb_url.indexOf('b.vimeocdn.com') > 0){ //Vimeo일 경우
							srcParam = 'http://player.vimeo.com/video/' + data[i].mast_url + '?portrait=0&amp;title=0&amp;byline=0&amp;badge=0&amp;autoplay=1&amp;loop=1';
				    	}else{ //YouTube일 경우
				    		srcParam = 'http://www.youtube.com/embed/' + data[i].mast_url + '?rel=0&amp;showinfo=0&amp;controls&amp;autohide=1&amp;autoplay=1&amp;loop=1';
				    	}
				    	thumbParam = data[i].mast_thumb_url;
				    	break;
				    case 'IMG' :
				    	srcParam = byulmeHost + '/' + data[i].mast_url;
				    	thumbParam = byulmeHost + '/' + data[i].mast_thumb_url;
				    	break;
				    case 'SD' :
				    	srcParam = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + data[i].mast_url + '&amp;auto_play=true&amp;liking=false&amp;buying=false&amp;sharing=false&amp;download=false&amp;show_playcount=false&amp;show_bpm=true&amp;show_comments=false&amp;show_artwork=false&amp;show_user=false';
				    	thumbParam = byulmeHost + '/' + data[i].mast_thumb_url;
				    	break;
				    default :break;
				}

				list[data[i].cid] = {
					'cId':data[i].cid,
					'menuId':id,
					'starId':data[i].uid,
					'rank':data[i].rownum,
					'starName':data[i].alias,
					'type':data[i].type,
					'mast_url':srcParam,
					'mast_thumb_url':thumbParam
				}
			}
			callback && callback(list);
		});
	};

	return new cardDataUtil();
});

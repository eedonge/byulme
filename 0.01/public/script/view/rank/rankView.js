define(
	[
		'jquery', 
		'backbone',
		'util/dummyData',
		'template!../template/rank/rank',
		'template!../template/rank/card',
		'isotope', 
		'style!../style/main/main',
		'style!../style/rank/rankstyle'
	], function(
		$, 
		Backbone,
		DummyData,
		template,
		cardTemplate
	){
	var RankView = Backbone.View.extend({
		el : 'div#contentsView',	//뷰가 그려질 공간
		con : '#dashboard_container',	//랭킹 공간 (카드들이 위치할 컨테이너)
		menuId : null,	//메뉴아이디 (랭킹 종류)
		render: function() {
        $(this.el).html(template());
      // this.currentList = ;
    	this.makeCardList(DummyData.cardData(this.menuId));
    	//isotope 처리
        $(this.con).isotope({
          itemSelector : '.dashboardItem',
          getSortData : {
				    starId : function ( $elem ) {
					    return $elem.attr('data-starId');
					  },
				    rank : function ( $elem ) {
				      return $elem.find('.rank').text();
					  },
					  name : function ( $elem ) {
				      return $elem.find('.starName').text();
				    }
				  },
				  sortBy : 'rank'
      });
    },

    //랭킹메뉴가 최초 실행될 경우 랭킹 리스트를 새로 만든다.
    makeCardList: function(list) {
    	for(sId in list) {
    		var cardData = list[sId];
    		$(this.con).append(cardTemplate(cardData));
    	}
    },

    //랭킹 리스트가 이미 있는 상태에서 새로운 리스트로 업데이트한다.
    updateCardList: function(list) {
    	var board = $('.dashboardItem'); //카드 그룹
    	var cardData = null;
    	var cardElem = null;
    	
    	//새로운 카드 리스트 객체를 루프돌면서 새로운 카드를 추가한다.
    	for(sId in list) {
    		cardData = list[sId];
    		cardElem = board.filter('[data-starId="' + sId + '"]');
    		if (cardElem.length > 0) {	//이전 리스트에 해당 카드가 있다면
    			cardElem.html($(cardTemplate(cardData)).html());	//이전 리스트의 해당 카드를 새로운 리스트의 같은 카드로 변경 (랭킹 정보등 갱신을 위해)
    			cardElem.attr('data-menuId',this.menuId);			//해당 카드의 menuId 변경
    		} else {	//이전 리스트에 해당 카드가 없다면 랭킹에 추가한다.
    			$(this.con).isotope('insert',$(cardTemplate(cardData)));
    		}
    	}

    	//menuId가 다른 카드는 새로운 순위 리스트에 포함되지 않으므로 삭제한다.
    	$(this.con).isotope('remove',board.filter('[data-menuId!="' + this.menuId + '"]'));	//isotope 객체에서 삭제
    	board.filter('[data-menuId!="' + this.menuId + '"]').remove();	//실제 해당 엘리먼트 삭제
    	$(this.con).isotope('reloadItems').isotope({sortBy:'rank'});	//isotope reload 하고 정렬을 실행한다.
    },

    sortCardList: function(id) {
     	this.updateCardList(DummyData.cardData(this.menuId));
    },

    viewDidAppear: function() {
    }
	});

	return new RankView;
});
define(
	[
		'jquery', 
		'backbone',
		'util/dummyData',
		'cardView',
		'template!../template/cardList/cardList',
		'bm',
		'isotope',
		'waypoints',
		'waypoints-infinite',
		'style!../style/cardList/cardList'
	], function(
		$, 
		Backbone,
		DummyData,
		Card,
		template,
		bm
	){
		var cardListView = Backbone.View.extend({
		el : 'div#content',	//뷰가 그려질 공간
		con : '#cardList_container',	//랭킹 공간 (카드들이 위치할 컨테이너)
		menuId : null,	//메뉴아이디 (랭킹 종류)
		maxRank : 0,
		render: function() {
			this.maxRank = 0;
			$(this.el).html(template());
			this.makeCardList(DummyData.cardData(this.menuId, this.maxRank));
			this.maxRank = 20;
			//isotope 처리
			$(this.con).isotope({
				itemSelector : '.card',
				getSortData : {
					starId : function ( $elem ) {
						return $elem.attr('data-starId');
					},
					rank : function ( $elem ) {
						return parseInt($elem.find('.rank').text(),10);
					},
					name : function ( $elem ) {
						return $elem.find('.starName').text();
					}
				},
				sortBy : 'rank'
			});

		},

		appendCardListCall: function(callback) {
			// bm.log($(window).scrollTop());
			// bm.log($(document).height() - $(window).height());
			if($(window).scrollTop() == $(document).height() - $(window).height() - 1) {
				this.appendCardList(DummyData.cardData(this.menuId, this.maxRank));
				this.maxRank = this.maxRank + 20;
			}
			// this.appendCardList(DummyData.cardData(this.menuId, this.maxRank));
			// this.maxRank = this.maxRank + 20;
		},

		appendCardList: function(list){
			$(window).unbind('scroll');
			var self = this;
			var allTemplate;
			for(sId in list) {
				var card = new Card();
				// $(this.con).isotope('insert',$(card.template(list[sId])));
				allTemplate += card.template(list[sId]);
			}
			$(this.con).isotope('insert', $(allTemplate), function(){
				bm.log('okkkkkkkkkkkkkkkkk');	
			});
			
			$(window).scroll(function(){
				self.appendCardListCall();
			});
		},

		//랭킹메뉴가 최초 실행될 경우 랭킹 리스트를 새로 만든다.
		makeCardList: function(list) {
			var i = 0;
			for(sId in list) {
				var card = new Card();
				card.render(this.con, list[sId]);
			}
		},

		//랭킹 리스트가 이미 있는 상태에서 새로운 리스트로 업데이트한다.
		updateCardList: function(list, callback) {
			var board = $('.card'); //카드 그룹
			var cardElem = null;
						//새로운 카드 리스트 객체를 루프돌면서 새로운 카드를 추가한다.
			for(sId in list) {
				cardElem = board.filter('[data-starId="' + sId + '"]');
				if (cardElem.length > 0) {	//이전 리스트에 해당 카드가 있다면
					var card = new Card();
					cardElem.html($(card.template(list[sId])).html());	//이전 리스트의 해당 카드를 새로운 리스트의 같은 카드로 변경 (랭킹 정보등 갱신을 위해)
					cardElem.attr('data-menuId',this.menuId);			//해당 카드의 menuId 변경
				} else {	//이전 리스트에 해당 카드가 없다면 랭킹에 추가한다.
					var card = new Card();
					$(this.con).isotope('insert',$(card.template(list[sId])));
				}
			}

			//menuId가 다른 카드는 새로운 순위 리스트에 포함되지 않으므로 삭제한다.
			$(this.con).isotope('remove',board.filter('[data-menuId!="' + this.menuId + '"]'));	//isotope 객체에서 삭제
			board.filter('[data-menuId!="' + this.menuId + '"]').remove();	//실제 해당 엘리먼트 삭제
			$(this.con).isotope('reloadItems').isotope({sortBy:'rank'});	//isotope reload 하고 정렬을 실행한다.

			callback && callback();
		},

		sortCardList: function(id,callback) {
			this.maxRank = 0;
			var self = this;
			$(window).scrollTop(0)
			this.updateCardList(DummyData.cardData(id, this.maxRank), callback);
			this.maxRank = 20;
		},

		/*
		무한 스크롤 적용
		jquery.infinitescroll.min.js 로....
		 */
		viewDidAppear: function() {
			//
		},

		setAppendData: function(){

		}
	});

		

	return new cardListView;
});
define(
	[
		'jquery',
		'backbone',
		'util/cardDataUtil',
		'cardView',
		'template!../template/cardList/cardList',
		'bm',
		'isotope',
		'style!../style/cardList/cardList'
	], function(
		$,
		Backbone,
		cardDataUtil,
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
			var that  = this;

			cardDataUtil.cardData(this.menuId, this.maxRank, function(list){
				that.makeCardList(list);
				that.maxRank = 20;
				//isotope 처리
				$(that.con).isotope({
					animationEngine:'jquery',
					itemSelector : '.card',
					getSortData : {
						rank : function ( $elem ) {
							return parseInt($elem.find('.rank').text(),10);
						}
					},
					sortBy : 'rank'
				});
			});
		},

		appendCardListCall: function() {;
			if($(window).scrollTop() == $(document).height() - $(window).height() ) {
				var that = this;
				$(window).unbind('scroll');
				cardDataUtil.cardData(this.menuId, this.maxRank, function(list){
					that.appendCardList(list);
					that.maxRank  = that.maxRank + 20;
				});
			}
		},

		appendCardList: function(list){
			var that = this;
			var allTemplate;
			for(sId in list) {
				var card = new Card();
				allTemplate += card.template(list[sId]);
			}
			$(this.con).isotope('insert', $(allTemplate), function(){
				$(window).scroll(function(){
					that.appendCardListCall();
				});
			});
		},

		//랭킹메뉴가 최초 실행될 경우 랭킹 리스트를 새로 만든다.
		makeCardList: function(list) {
			var i = 0;
			for(sId in list) {
				var card = new Card();
				card.render(this.con, list[sId]);
			}
			card.eventSet();
		},

		//랭킹 리스트가 이미 있는 상태에서 새로운 리스트로 업데이트한다.
		updateCardList: function(list) {
			var board = $('.card'); //카드 그룹
			var cardElem = null;
			var tmpTemplate = '';
			//새로운 카드 리스트 객체를 루프돌면서 새로운 카드를 추가한다.
			for(sId in list) {
				cardElem = board.filter('[data-starId="' + sId + '"]');
				if (cardElem.length > 0) {	//이전 리스트에 해당 카드가 있다면
					var card = new Card();
					cardElem.html($(card.template(list[sId])).html());	//이전 리스트의 해당 카드를 새로운 리스트의 같은 카드로 변경 (랭킹 정보등 갱신을 위해)
					cardElem.attr('data-menuId',this.menuId);			//해당 카드의 menuId 변경
				} else {	//이전 리스트에 해당 카드가 없다면 랭킹에 추가한다.
					var card = new Card();
					tmpTemplate += card.template(list[sId]);
				}
			}
			var self = this;
			//menuId가 다른 카드는 새로운 순위 리스트에 포함되지 않으므로 삭제한다.
			$(this.con)
				// .append($(tmpTemplate))
				.isotope('remove',board.filter('[data-menuId!="' + self.menuId + '"]'))	//isotope 객체에서 삭제
				.isotope('insert',$(tmpTemplate), function() {
						$(self.con).isotope('reloadItems');
						$(self.con).isotope({sortBy:'rank'});
					});
		},

		sortCardList: function(id) {
			this.maxRank = 0;
			var that = this;
			$(window).scrollTop(0)
			cardDataUtil.cardData(id, this.maxRank, function(list){
				that.updateCardList(list);
				that.maxRank = 20;
			});
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

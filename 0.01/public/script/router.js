define(function(require) {
	var $ = require("jquery");
	var Backbone = require("backbone");
	var bm = require("bm");

	
	/**
	 * 라우트를 정의
	 */
	var MainRouter = Backbone.Router.extend({
		/*
		 * 프레그먼트 문자를 기준으로 라우트 정의
		 */
		routes : {
			'' : 'rankRoute',
			'rank/:menuId' : 'rankRoute',
			'about' : 'aboutRoute',
			'member' : 'memberRoute'
		},

		initialize: function() {

		},

		rankRoute : function(menuId) {
				require(["cardListView"], function(cardListView) {
				menuId = menuId || 'newly'; //메뉴아이디가 없다면 최근 리스트로
				if(cardListView['menuId'] === null) { //랭킹 메뉴 아이디가 없다면 랭킹 메뉴는 처음 실행한것, 랭킹 화면을 그린다.
					cardListView['menuId'] = menuId;  //처음은 newly
					cardListView.render();
				} else {  //랭킹 메뉴 아이디가 있다면 랭킹 뷰를 새로 그리지않고 isotope 처리만 해준다.
					cardListView['menuId'] = menuId;  //새로운 메뉴아이디
					cardListView.sortCardList(menuId, function(){
						// cardListView.viewDidAppear();
					}); //새로운 랭킹 리스트로 정렬한다.
				}
				// $(window).scroll(function(){
				// 	cardListView.appendCardListCall();
				// });
			})
		},

		
		aboutRoute : function() {
			require(["aboutView"], function(AboutView) {
				require('cardListView')['menuId'] = null; //랭킹 메뉴아이디 초기화
				AboutView.render();
			})
		},

		memberRoute : function() {
			require(["memberView"], function(MemberView) {
				MemberView.render();
			})
		},
	});

	new MainRouter();

	Backbone.history.start();
}); 
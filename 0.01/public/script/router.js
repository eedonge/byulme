define(function(require) {
	var $ = require("jquery");
	var Backbone = require("backbone");
	var BreadCrumb = require("util/breadcrumb");
	var PageTransition = require("util/pageTransition");
	
	/**
	 * 라우트를 정의
	 */
	var MainRouter = Backbone.Router.extend({
		/*
		 * 프레그먼트 문자를 기준으로 라우트 정의
		 */
		routes : {
			// '' : 'mainRoute',
			// 'index' : 'mainRoute',
			'' : 'rankRoute',
			'rank/:menuId' : 'rankRoute',
			'about' : 'aboutRoute'
		},

    initialize: function() {

    },

		mainRoute : function() {
			require(["mainView"], function(MainView) {
				var direction = BreadCrumb.manager.route('index', 'ByulMe');
				PageTransition.page.transition(direction, MainView);
			});
		},

		rankRoute : function(menuId) {
			require(["rankView"], function(RankView) {
				menuId = menuId || 'newly';	//메뉴아이디가 없다면 최근 리스트로
				var direction = BreadCrumb.manager.route('rank/' + menuId, 'Rank');
				if(RankView['menuId'] === null) {	//랭킹 메뉴 아이디가 없다면 랭킹 메뉴는 처음 실행한것, 랭킹 화면을 그린다.
					RankView['menuId'] = menuId;	//처음은 newly
					PageTransition.page.transition(direction, RankView);
				} else {	//랭킹 메뉴 아이디가 있다면 랭킹 뷰를 새로 그리지않고 isotope 처리만 해준다.
					RankView['menuId'] = menuId;	//새로운 메뉴아이디
					RankView.sortCardList();	//새로운 랭킹 리스트로 정렬한다.
				}
			})
		},

		aboutRoute : function() {
			require(["aboutView"], function(AboutView) {
				require('rankView')['menuId'] = null;	//랭킹 메뉴아이디 초기화
				var direction = BreadCrumb.manager.route('about', 'About');
				PageTransition.page.transition(direction, AboutView);
			})
		}
	});

	new MainRouter();

	Backbone.history.start();
}); 
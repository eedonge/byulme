//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"transition": Cornerstone.PATH + "util/transition",
		"navigation":"../lib/navigation",
		"isotope": "../lib/jquery.isotope",
		"iosocket": "../lib/socket.io.min",
		"waypoints": "../lib/waypoints.min",
		"waypoints-infinite": "../lib/waypoints-infinite",
		"headerView": "view/header/headerView",
		"cardListView": "view/cardList/cardListView",
		"cardView": "view/cardList/cardView",
		"aboutView": "view/about/aboutView",
		"makeView": "view/make/makeView",
		"express": "../../node_modules/express",
		"dummyData": "util/dummyData",
		"bm": "util/bm"
	},
	
	shim: {
		
		"isotope": {
				deps:["jquery"]
		},

		"waypoints": {
				deps:["jquery"]
		},

		"headerView": {
				deps:["app-container"]
		},

		"cardListView": {
				deps:["app-container"]
		},

		"cardView": {
				deps:["app-container"]
		},
		
		"aboutView": {
			deps:["app-container"]
		},

		"makeView": {
				deps:["app-container"]
		}
	}
});

// require(["headerView"], function(headerView) {
// 		headerView.render();
// });

define(['router', 'widget-plugins'], function(Router) {
	return {
		launch: function() {
			// 애플리게이션의 시작점
		}
	}
});
//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"transition": Cornerstone.PATH + "util/transition",
		"navigation":"../lib/navigation",
		"isotope": "../lib/jquery.isotope",
		"iosocket": "../lib/socket.io.min",
		"waypoints": "../lib/waypoints.min",
		"waypoints-infinite": "../lib/waypoints-infinite",
		"mainView": "view/main/mainView",
		"headerView": "view/header/headerView",
		"cardListView": "view/cardList/cardListView",
		"cardView": "view/cardList/cardView",
		"rankView": "view/rank/rankView",
		"aboutView": "view/about/aboutView",
		"memberView": "view/member/memberView",
		"makeView": "view/make/makeView",
		"regstarView": "view/regstar/regstarView",
		"express": "../../node_modules/express",
		"dummyData": "util/dummyData",
		"bm": "util/bm",
		"fb": "util/bm.facebook",
		"colorbox":"../lib/jquery.colorbox-min"
	},
	
	shim: {
		"transition":{
				deps:["jquery"],
				exports: "Transition"
		},
		
		"navigation": {
			deps:["transition"]
		},
		
		"isotope": {
				deps:["jquery"]
		},

		"waypoints": {
				deps:["jquery"]
		},

		"mainView": {
				deps:["app-container"]
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

		"rankView": {
			deps:["app-container"]
		},

		"aboutView": {
			deps:["app-container"]
		},

		"memberView": {
			deps:["app-container"]
		},

		"makeView": {
			deps:["app-container"]
		},

		"regstarView": {
			deps:["app-container"]
		},

		"colorbox":{
			deps:["jquery"]
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
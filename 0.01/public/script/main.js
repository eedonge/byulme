//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"transition": Cornerstone.PATH + "util/transition",
		"navigation":"../lib/navigation",
		"isotope": "../lib/jquery.isotope",
		"mainView": "view/main/mainView",
		"rankView": "view/rank/rankView",
		"aboutView": "view/about/aboutView",
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

        "mainView": {
        	deps:["app-container"]
        },

        "rankView": {
        	deps:["app-container"]
        },

        "aboutView": {
        	deps:["app-container"]
        }
	}
});


define(['router', 'widget-plugins'], function(Router) {
	return {
		launch: function() {
			// 애플리게이션의 시작점
		}
	}
});
//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"mainView": "view/main/mainView",
	},
	
	shim: {
        "mainView": {
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
//추가 모듈 및 의존성 정의
requirejs.config({
	paths: {
		"transition": Cornerstone.PATH + "util/transition",
		"navigation":"../lib/navigation",
		"isotope": "../lib/jquery.isotope",
		"mainView": "view/main/mainView",
		"rankView": "view/rank/rankView",
		"aboutView": "view/about/aboutView",
        "makeView": "view/make/makeView",
        "express": "../../node_modules/express"
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
        },

        "makeView": {
            deps:["app-container"]
        }
	}
});

require(['jquery'], function($) {
    $("document").ready(function($){
        var nav = $('#main-menu-container');
        var lastScrollTop = 0;
        $(window).scroll(function () {
            var st = $(window).scrollTop();
            var topsize = (nav.width() == 455) && '200' || '100';
            if(st > lastScrollTop) {
                if(nav.offset().top == $(this).scrollTop() && $(this).scrollTop() > 300) {
                    nav.animate({
                       top: "-" + topsize + "px",
                    }, 200);
                }
            } else {
                if(nav.offset().top == ($(this).scrollTop() - parseInt(topsize,10)) && $(this).scrollTop() > 300) {
                    nav.animate({
                       top: "0px",
                    }, 200);
                }
            }
            lastScrollTop = st;
        });
    });
});

define(['router', 'widget-plugins'], function(Router) {
	return {
		launch: function() {
			// 애플리게이션의 시작점
		}
	}
});
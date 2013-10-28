define(
	[
		'jquery',
    'backbone',
		'template!../template/header/header',
		'style!../style/header/header'
	], function(
		$, 
		Backbone,
		template
	){
	var headerView = Backbone.View.extend({
		el : 'div#header',	//뷰가 그려질 공간
		render: function() {
      $(this.el).html(template());

      $("document").ready(function($){
          var nav = $('#header-container');
          var lastScrollTop = 0;
          $(window).scroll(function () {
              var st = $(window).scrollTop();
              var topsize = (nav.width() == 320) && '200' || '100';
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
    }  
	});

	return new headerView;
});
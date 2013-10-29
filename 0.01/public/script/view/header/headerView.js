define(
	[
		'jquery',
		'backbone',
		'template!../template/header/header',
		'bm',
		'style!../style/header/header'
	], function(
		$, 
		Backbone,
		template,
		bm
	){
	var headerView = Backbone.View.extend({
		el : 'div#header',	//뷰가 그려질 공간
		render: function() {
			$(this.el).html(template());

			$("document").ready(function($){
				var nav = $('#header-container');
				var lastScrollTop = 0;
				var didScroll = false;
				$(window).scroll(function () {
					// bm.log(didScroll);
					if (!didScroll) {
						var st = $(window).scrollTop();
						var topsize = (nav.width() == 320) && '200' || '100';
						var self = this;
						didScroll = true;
						if(st > lastScrollTop) {  //down scroll
							// bm.log('down');
							// bm.log(nav.offset().top);
							// bm.log($(this).scrollTop());
							if(nav.offset().top == $(this).scrollTop() && $(this).scrollTop() > 300) {
								nav.animate({
									 top: "-" + topsize + "px",
								}, 200);
							}
						} else {	//up scroll
							// bm.log('up');
							if(nav.offset().top == ($(this).scrollTop() - parseInt(topsize,10))) {
								nav.animate({
									 top: "0px",
								}, 200);
							}
						}
						lastScrollTop = st;
						didScroll = false;
					}
				});
			});
		}  
	});

	return new headerView;
});
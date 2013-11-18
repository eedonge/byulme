define(
	[
		'jquery', 
		'backbone',
		'template!../template/about/about',
				'util/jquery.zoom', 
		'style!../style/main/main', 
		'style!../style/viewer/viewerstyle' //Viewer 
	], function(
		$, 
		Backbone,
		template
	){
	var MainView = Backbone.View.extend({
		el : 'div#content',
		render: function() {
			$(this.el).html(template());

			/***********  Contents View **********/
			//YOUTUBE 초기화 
			require( [ 'util/bm.youtube'], function() {
					var tag = document.createElement('script');

					tag.src = "https://www.youtube.com/iframe_api";
					var firstScriptTag = document.getElementsByTagName('script')[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			});


			$('#playContent').on('shown.bs.modal', function () {
					if($('#yt_player').is(':visible')) {
							YT_PLAYER.loadVideoById($('#yt_player').data('videoid'));
					}
					else if($('#vm_player').is(':visible')){
							$("#vm_player").attr("src", "//player.vimeo.com/video/"+ $('#vm_player').data('videoid') + "?portrait=0&title=0&byline=0&badge=0&autoplay=1&loop=1");
					}
			});

			$('#playContent').on('hide.bs.modal', function () {
					if($('#yt_player').is(':visible')) {
							YT_PLAYER.stopVideo();
							YT_PLAYER.loadVideoById('');
							$("#yt_player").hide();
					}
					else if($('#vm_player').is(':visible')){
							$("#vm_player").attr("src", "");
							$('#vm_player').hide();
					}
			});

			$("#youtube_test").click(function(){
					$('#yt_player').show();
					$('#yt_player').data('videoid', '6pw972Kl3L0');
					$('#playContent').modal({
							keyboard:false,
							backdrop:'static'}); 
			});

			$("#vimeo_test").click(function(){
					$('#vm_player').show();
					$('#vm_player').data('videoid', '7100569');
					$('#playContent').modal({
							keyboard:false,
							backdrop:'static'}); 
			});

			/***********  Contents View **********/

			$("#sc_player").attr("src", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/118329744&auto_play=true&buying=false&sharing=false&download=false&show_playcount=false&show_bpm=true&show_comments=false&show_artwork=false&show_user=false");

			$('#img_player').zoom();
			return this;
		}

	});
	return new MainView;
});
define(
	[
		'jquery',
		'backbone',
		'template!../template/cardList/card',
		'colorbox',
		'style!../style/cardList/card',
		'style!../style/colorbox'
	], function(
		$,
		Backbone,
		template
	){

	var cardView = Backbone.View.extend({

		render: function(con, data) {
			if(data.menuId === 'newly') {
				data.rankdisplay = 'none';
			} else {
				data.rankdisplay = 'block';
			}
			$(con).append(template(data));
		},
		template: function(data) {
			return template(data);
		},
		eventSet: function(){
			$(".viewer").colorbox({iframe:true, innerWidth:640, innerHeight:390, overlayClose:false});
			$('.thumb').click(function(){
				$('.viewer', $(this).siblings()).click();
			});
		}
	});

	return cardView;
});

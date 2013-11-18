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
			$(con).append(template(data));
			$(".viewer").colorbox({iframe:true, innerWidth:640, innerHeight:390, overlayClose:false});
		},
		template: function(data) {
			return template(data);
		},
		eventSet: function(){
			$('.viewer').click(function(){});
			$('#cboxOverlay').click(function(e){
				e.preventDefault();
				console.log($(this).html());
				return false;
			});
		}
	});

	return cardView;
});
define(
	[
		'jquery', 
		'backbone',
		'template!../template/cardList/card',
		'style!../style/cardList/card'
	], function(
		$, 
		Backbone,
		template
	){
	var cardView = Backbone.View.extend({
		render: function(con, data) {
			$(con).append(template(data));
		},
		template: function(data) {
			return template(data);
		},
		eventSet: function(){
			$('.card').click(function(){
				alert($(this).attr('data-starId'));
			});
		}
	});

	return cardView;
});
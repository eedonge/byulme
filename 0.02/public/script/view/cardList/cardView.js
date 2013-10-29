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
		}
	});

	return cardView;
});
define(
	[
		'jquery', 
		'backbone',
		'template!../template/about/about',
		'style!../style/main/main'
	], function(
		$, 
		Backbone,
		template
	){
	var MainView = Backbone.View.extend({
		el : 'div#contentsView',
		render: function() {
        $(this.el).html(template());
        return this;
    }
	});
	return new MainView;
});
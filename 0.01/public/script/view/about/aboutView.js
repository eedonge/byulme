define(
	[
		'jquery', 
		'backbone',
		'template!../template/about/about',
		'util/bm.facebook',
		'style!../style/main/main'
	], function(
		$, 
		Backbone,
		template,
		BmFaceBook
	){
	var MainView = Backbone.View.extend({
		el : 'div#contentsView',
		render: function() {
        $(this.el).html(template());

        $("#uploadtest").click(function(){
        	document.location = '#make';
        });

        $("#test").click(function(){
        	$.ajax({
        		type:"GET",
        		url:"bmdb/1",
        		data:{name:"1111", age:"2222"}
        	}).done(function(data){
        		console.log(data);
        	}).fail(function(data){
				console.log(data);
        	});
        });

        BmFaceBook.init('facebookauthtest');

        $("#facebookfeedtest").click(function(){
        	BmFaceBook.feed();	
        });

        return this;
    }
	});
	return new MainView;
});
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
        	/*
    		$.get( "bmdb/1", function( data ) {
				alert('success!!');
				console.log(data);
			})
			.fail(function(data){
				alert('fail!!');
				console.log(data);
			});
*/

			$('#bmUploaderModal').modal({
  				keyboard: false,
  				backdrop: 'static'
			});



			$('#bmUploaderModal').on('hide.bs.modal', function () {
				//return false;
			});

			$('#bmUploaderModal').on('hidden.bs.modal', function () {
				$(this).remove();
				window.history.back();
			});

			/*
			$('#bmDataTest').click(function(){

			});*/	

        });
        return this;
    }
	});
	return new MainView;
});
define(
	[
		'jquery', 
		'backbone',
		'template!../template/make/make',
		'bootstrap',
		'util/vendor/jquery.ui.widget',
		'util/jquery.fileupload',
		'util/jquery.fileupload-process',
		'util/jquery.fileupload-validate',
		'style!../style/make/makestyle'
	], function(
		$, 
		Backbone,
		template
	){
	var MakeView = Backbone.View.extend({
		el : 'div#contentsView',
		render: function() {
        	$(this.el).html(template());
        	require( [ 'util/bm.mv.uploader', 'util/bm.img.uploader'], function( BmMVUploader, BmImgUploader) {

        	$('#makemodal').modal({
  					keyboard: false, 
  					backdrop: 'static'
					});

    			BmMVUploader.init('test1');
    			BmImgUploader.init('test1');
			});
    	}
	});
	return new MakeView;
});
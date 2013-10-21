define(
	[
		'jquery', 
		'backbone',
		'template!../template/about/about',
		'util/bm.facebook',
        'bootstrap',
        'util/vendor/jquery.ui.widget',
        'util/jquery.fileupload',
        'util/jquery.fileupload-process',
        'util/jquery.fileupload-validate',
		'style!../style/main/main',
        'style!../style/make/makestyle'  
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

        /*
        $("#uploadtest").click(function(){
        	document.location = '#make';
        });
        */

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

        $("#uploadtest").click(function(){

            require( [ 'util/bm.mv.uploader', 'util/bm.img.uploader'], function( BmMVUploader, BmImgUploader) {
                BmMVUploader.init('test1');
                BmImgUploader.init('test1');

                $('#makemodal').modal({
                    keyboard: false, 
                    backdrop: 'static'
                });
            });
        });

        /*
        var options_mv = {
            trigger: 'hover',
            title: '동영상을 선택해 주세요',
            placement:'top'
        };
        $("#span_mv").tooltip(options_mv);

        var options_img = {
            trigger: 'hover',
            title: '이미지를 선택해 주세요',
            placement:'top'
        };
        $("#span_img").tooltip(options_img);

        $("#movieupload").change(function(){
            $("#span_mv").tooltip('hide');
        });
        
        $("#imageupload").change(function(){
            $("#span_img").tooltip('hide');
        });
        */
        
        /*
        BmFaceBook.init('facebookauthtest');

        $("#facebookfeedtest").click(function(){
        	BmFaceBook.feed();	
        });
        */
        return this;
    }
	});
	return new MainView;
});
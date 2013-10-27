define(
	[
		'jquery'
	], function(
		$
	){
	var BMUploader = function(){

	    //var url = 'http://localhost/byulmefileserver/index.php',
	    var url = 'http://14.49.42.89/BMFileUpload.php',
	    	upType = 'PROFILE';

		this.init = function(pUserID){

			$('#profile_upload').fileupload({
		        url: url,
		        dataType: 'json',
		        autoUpload: false,
		        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		        maxFileSize: 2000000, // 2 MB
		        //maxChunkSize: 10000000, // 10 MB
		        disableImageResize: true,
		        //previewMaxWidth: 100,
		        //previewMaxHeight: 100,
		        previewCrop: false
		    }).on('fileuploadadd', function (e, data) {
		    	$("#reg_star_alert").hide();
		    	$("#reg_star_alert").text('');

		    }).on('fileuploadprocessalways', function (e, data) {
				var index = data.index,
		            file = data.files[index];

		        if (file.error) {
		        	$("#reg_star_alert").show();
		    		$("#reg_star_alert").text(file.error);
		        }else{
		    		data.submit().always(function(){
		    		})
		        }
		        
		    }).on('fileuploadprogressall', function (e, data) {

		    }).on('fileuploaddone', function (e, data) {
		    	
		    	//File 1개만 업로드 가능
		    	$.each(data.result.files, function (index, file) {
		    		if (file.url) {
		    			$("#profile_img").attr("src", file.url);
		    		}
		        });

		    }).on('fileuploadfail', function (e, data) {
		    	$("#reg_star_alert").show();
		    	$("#reg_star_alert").text('사진 업로드에 실패했습니다. 다시 시도해 주세요!!');
		    }).on('fileuploadsubmit', function (e, data) {

				data.formData = {userid: pUserID, type: upType};

		    });
		};
	};

	return new BMUploader;
});

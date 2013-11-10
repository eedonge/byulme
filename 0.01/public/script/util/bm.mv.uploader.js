define(
	[
		'jquery'
	], function(
		$
	){
	var BMUploader = function(){

	    var url = 'http://14.49.42.89/BMFileUpload.php',
	        upType = 'MOVIE',
		    uploadFileInfo = $('<span/>')
		    	.addClass('alert')
		    	.addClass('upload_file_list');

		this.init = function(pUserID, cardMakeInit){

			$('#movieupload').fileupload({
		        url: url,
		        dataType: 'json',
		        autoUpload: false,
		        acceptFileTypes: /(\.|\/)(mp4|MP4)$/i,
		        maxFileSize: 20000000, // 20 MB
		        //maxChunkSize: 10000000, // 10 MB
		        disableImageResize: true,
		        //previewMaxWidth: 100,
		        //previewMaxHeight: 100,
		        previewCrop: false
		    }).on('fileuploadadd', function (e, data) {
				
		    	//Movie 일 경우 Single File 만 Upload 가능
		    	$('#fileinfo').children().remove();

		        $.each(data.files, function (index, file) {
		        	if (!index) {
						data.context = uploadFileInfo
							.clone(true)
							.text(file.name)
							.data(data)
							.appendTo('#fileinfo');
		        	}
		        });

		    }).on('fileuploadprocessalways', function (e, data) {
		    	
		        var index = data.index,
		            file = data.files[index],
		            node = $(data.context.children()[index]);
		        if (file.preview) {
		            node
		                .prepend('<br>')
		                .prepend(file.preview);
		        }

		        $("#errmsg").children().remove();
		        if (file.error) {
		        	$("#errmsg").append($('<div class="alert alert-danger"><strong>'+ file.error +'</stron></div>')); 
		        }
		        if (index + 1 === data.files.length) {
		        	$("#makebutton").attr('disabled', !!data.files.error);
		        }
		    }).on('fileuploadprogressall', function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        
		        $('#progress .bar-info').css(
            		'width',
            		progress + '%'
        		);
		    }).on('fileuploaddone', function (e, data) {

				//File 1개만 업로드 가능
		    	$.each(data.result.files, function (index, file) {
					
					cardMakeInit();
					if (file.url) {

						$("#upload_complete_box").text('동영상 업로드 완료(인코딩 중...)');
		 				$("#upload_complete_box").toggle( "bounce", { times: 3 }, "slow" );
		 				
		 				setTimeout(function(){
							$( "#upload_complete_box" ).toggle( "bounce", { times: 3 }, "slow" );
		 				}, 6000);

		 				//Facebook에 New Feed
                    	//BmFaceBook.feed("1", uid);

					} else if (file.error) {
						$("#errmsg").children().remove();
		        		$("#errmsg").append($('<div class="alert alert-danger"><strong>업로드 실패!!</stron></div>'));
					}

			    });

		    }).on('fileuploadfail', function (e, data) {
		        $.each(data.files, function (index, file) {

		        	$("#errmsg").children().remove();
		        	$("#errmsg").append($('<div class="alert alert-danger"><strong>업로드에 실패했습니다. 다시 시도해 주세요!!</stron></div>'));
		        });

		    }).on('fileuploadsubmit', function (e, data) {

				data.formData = {userid: pUserID, type: upType};

		    }).on('fileuploadchunksend', function (e, data) {})
		    .on('fileuploadchunkdone', function (e, data) {})
		    .on('fileuploadchunkfail', function (e, data) {})
		    .on('fileuploadchunkalways', function (e, data) {});

		    $("#makebutton").click(function(){
				
		    	$(".upload_file_list").each(function(){
		    		var data = $(this).data();
		    		data.submit().always(function(){
		    		})
		    	});
		    });
		};
	};

	return new BMUploader;
});

define(
	[
		'jquery'
	], function(
		$
	){
	var BMUploader = function(){

	    //var url = 'http://localhost/byulmefileserver/index.php',
	    var url = 'http://14.49.42.89/BMFileUpload.php',
	    uploadFileInfo = $('<input/>')
	    	.addClass('form-control')
	    	.addClass('upload_file_list')
	    	.attr('type', 'text')
	    	.prop('readOnly', true);

		this.init = function(pUserID){

			$('#movieupload').fileupload({
		        url: url,
		        dataType: 'json',
		        autoUpload: false,
		        acceptFileTypes: /(\.|\/)(mp4|MP4)$/i,
		        maxFileSize: 10000000, // 10 MB
		        //maxChunkSize: 10000000, // 10 MB
		        disableImageResize: true,
		        //previewMaxWidth: 100,
		        //previewMaxHeight: 100,
		        previewCrop: false
		    }).on('fileuploadadd', function (e, data) {
				
		    	//Movie 일 경우 Single File 만 Upload 가능
		    	$('#fileinfo').children().remove();

		        data.context = $('<div/>').appendTo('#fileinfo');
		        $.each(data.files, function (index, file) {
		        	
		        	var node = $('<p/>');
		        	if (!index) {
		        		node
		        			.append(uploadFileInfo.clone(true).val(file.name).data(data));
		            }

					node.appendTo(data.context);
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
		        if (file.error) {
		            node
		                .append($('<div class="alert"><strong>'+ file.error +'</stron></div>'));
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
		    	
				$('#makemodal').modal({
  					keyboard: false, 
  					backdrop: 'static'
				});

				$('#makemodal')
					.off('hidden.bs.modal')
					.on('hidden.bs.modal', function(){
					document.location = '#rank/newly';
				});
		    }).on('fileuploadfail', function (e, data) {
		        $.each(data.files, function (index, file) {
		        	var error = $('<div class="alert"><strong>업로드에 실패했습니다. 다시 시도해 주세요!!</stron></div>');
		        	var datanode = $(data.context.children()[index]);
		        	datanode.find('.alert').remove();
		        	datanode.append(error);
		        });
		    }).on('fileuploadsubmit', function (e, data) {

				data.formData = {userid: pUserID, type: "MOVIE"};

		    }).on('fileuploadchunksend', function (e, data) {})
		    .on('fileuploadchunkdone', function (e, data) {})
		    .on('fileuploadchunkfail', function (e, data) {})
		    .on('fileuploadchunkalways', function (e, data) {});

		    $("#makebutton").click(function(){
				
		    	$(".upload_file_list").each(function(){
		    		var data = $(this).data();
		    		data.submit().always(function(){
		    			//$(this).remove();
		    		})
		    	});
		    });
		};
	};

	return new BMUploader;
});

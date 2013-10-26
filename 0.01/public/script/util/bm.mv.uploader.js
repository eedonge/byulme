define(
	[
		'jquery'
	], function(
		$
	){
	var BMUploader = function(){

	    //var url = 'http://localhost/byulmefileserver/index.php',
	    var url = 'http://14.49.42.89/BMFileUpload.php',
	        upType = 'MOVIE',
		    uploadFileInfo = $('<span/>')
		    	.addClass('label')
		    	.addClass('label-primary')
		    	.addClass('upload_file_list');

	    /*
	    uploadFileInfo = $('<input/>')
	    	.addClass('form-control')
	    	.addClass('upload_file_list')
	    	.attr('type', 'text')
	    	.prop('readOnly', true);
	    */
		this.init = function(pUserID, cardMakeInit){

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

		        //data.context = $('<div/>').appendTo('#fileinfo');
		        $.each(data.files, function (index, file) {
		        	if (!index) {
						data.context = uploadFileInfo
							.clone(true)
							.text(file.name)
							.data(data)
							.appendTo('#fileinfo');
		        	}
		        	/*
		        	var node = $('<p/>');
		        	if (!index) {
		        		node
		        			.append(uploadFileInfo.clone(true).val(file.name).data(data));
		            }
					node.appendTo(data.context);
					*/
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
		        	$("#errmsg").append($('<div class="alert"><strong>'+ file.error +'</stron></div>')); 
		        	/*
		            node
		                .append($('<div class="alert"><strong>'+ file.error +'</stron></div>'));
		             */
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

			    	$('.modal-footer').show();
					$('.tabbable').hide();
			    	$('.succable').show();
					$('#cardinform').show();

		            if (file.url) {
		            	$('#cardrstheader').text('카드 생성 완료');

				    	$('#cardkind').text('동영상');
				    	var curD = new Date();
						$('#cardgendate').text(curD.getFullYear() + "년 " + (curD.getMonth() + 1) + "월 " + curD.getDate() + "일 " + curD.getHours() + "시 " + curD.getMinutes() + "분");
				    	
				    	$('#cardkindcode').val(upType);
				    	$('#cardid').val(file.cid);

		            } else if (file.error) {
		            	$('#cardrstheader').text('카드 생성 실패');

				    	$('#cardkind').text('동영상');
				    	$('#cardgendate').text('동영상 업로드 실패(다시 시도해 주세요)');
		            }
		    	});

		    }).on('fileuploadfail', function (e, data) {
		        $.each(data.files, function (index, file) {

		        	$("#errmsg").children().remove();
		        	$("#errmsg").append($('<div class="alert"><strong>업로드에 실패했습니다. 다시 시도해 주세요!!</stron></div>'));

		        	/*
		        	var error = $('<div class="alert"><strong>업로드에 실패했습니다. 다시 시도해 주세요!!</stron></div>');
		        	var datanode = $(data.context.children()[index]);
		        	datanode.find('.alert').remove();
		        	datanode.append(error);
		        	*/
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
		    			//$(this).remove();
		    		})
		    	});
		    });
		};
	};

	return new BMUploader;
});

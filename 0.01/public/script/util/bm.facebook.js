define(
	[
		'jquery'
	], function(
		$
	){
	var BMFacebook = function(){
		
		this.auth = function(elementid, fbUserId, isAdmin){
			var fbAppId = "533349720068935";

			$.ajax({
        		type:"GET",
        		url:"bmdb/GET_FB_TOKEN_CF",
        		data:{uid:fbUserId}
        	}).done(function(data){
        		if(data.length > 0 && data[0].result == "1"){

					$("#" + elementid).tooltip({
				        title: 'FaceBook',
				        placement: 'right',
				        trigger:'hover'
			    	});
			    	$("#" + elementid).attr("src", "../style/image/lin_fb.png");

        		}else{
        			var fbPermission = "publish_stream";
        			if(isAdmin == true){
        				fbPermission = "email,user_likes,read_stream,publish_stream,photo_upload,user_photos,user_photo_video_tags";
        			}

					//사용자의 Facebook 정보가 없을 경우 실행됨
					window.fbAsyncInit = function() {
						FB.init({
						  appId      : fbAppId, // App ID
						  status     : true, // check login status
						  cookie     : false, // enable cookies to allow the server to access the session
						  xfbml      : true  // parse XFBML
						});
					};

					var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
					if (document.getElementById(id)) {return;}
					js = document.createElement('script'); js.id = id; js.async = true;
					js.src = "//connect.facebook.net/en_US/all.js";
					ref.parentNode.insertBefore(js, ref);

					$("#" + elementid).css('cursor', 'pointer');
					$("#" + elementid).popover({
				        title: "FaceBook",
				        content:"클릭하시면 FaceBook과 함께 하실 수 있습니다.",
				        placement: 'right',
				        trigger:"hover"
			    	});

			    	$("#" + elementid).attr("src", "../style/image/lout_fb.png");
			        $("#" + elementid).click(function(){
			        	FB.login(function(response) {
			        		if (response.status === 'connected') {
			        			$.ajax({
					        		type:"POST",
					        		url:"/bm/fb/auth",
					        		data:{shorttoken: response.authResponse.accessToken, uid: fbUserId}
					        	}).done(function(data){
					        		
					        		if(data.affectedRows >= 1){
					        			//FaceBook Icon으로 수정 
					        			$("#" + elementid).attr("src", "../style/image/lin_fb.png");
					        			$("#" + elementid).popover('disable').popover("hide");
					        			$("#" + elementid).tooltip({
									        title: "FaceBook",
									        placement: 'right',
									        trigger:"hover"
								    	});
										
					        		}else{
					        			
					        		}
					        	}).fail(function(data){
									
					        	});
			        		}else{
			        		}
					   }, {scope: fbPermission});

			        });

        		}
        	}).fail(function(data){
				
        	});

		}

		this.feed = function(operation, fbUserId){
	        $.ajax({
	    		type:"POST",
	    		url:"/bm/fb/feed/" + operation,
	    		data:{uid: fbUserId}
	    	}).done(function(data){
	    	}).fail(function(data){
	    	});
		}
	};

	return new BMFacebook;
});

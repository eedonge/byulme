define(
	[
		'jquery'
	], function(
		$
	){
	var BMFacebook = function(){
		var fbAppId = "533349720068935";
		//var fbUserId = "admin";
		//var fbPermission = "email,user_likes,read_stream,publish_stream,photo_upload,user_photos,user_photo_video_tags";
		var fbUserId = "test1";
		var fbPermission = "publish_stream";

		this.init = function(elementid){

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


			$("#" + elementid).popover({
		        title: "FaceBook",
		        content:"FaceBook에서 '홍길동'님과 함께 함니다~^^",
		        placement: 'right',
		        trigger:"hover"
	    	});

	        $("#" + elementid).click(function(){
	        	FB.login(function(response) {
	        		if (response.status === 'connected') {
	        			$.ajax({
			        		type:"POST",
			        		url:"/bm/fb/auth",
			        		data:{shorttoken: response.authResponse.accessToken, uid: fbUserId}
			        	}).done(function(data){
			        		console.log(data);
			        		if(data.affectedRows >= 1){
			        			alert("성공했습니다.");
			        		}else{
			        			alert("실패했습니다.");
			        		}
			        	}).fail(function(data){
							console.log(data);
			        	});
	        		}else{
	        			console.log(response);	
	        		}
			   }, {scope: fbPermission});

	        });
		}

		this.feed = function(){
	        $.ajax({
	    		type:"POST",
	    		url:"/bm/fb/feed",
	    		data:{uid: fbUserId}
	    	}).done(function(data){
	    		alert("Success!!");
	    	}).fail(function(data){
				alert("Fail!!");
	    	});
		}
	};

	return new BMFacebook;
});

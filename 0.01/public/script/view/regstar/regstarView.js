define(
	[
		'jquery',
    'bm',
    'util/jquery.fileupload',
    'util/jquery.fileupload-process',
    'util/jquery.fileupload-validate',
    '../source/jquery.mmenu'
	], function(
		$,
    bm
	){
		var BMStarRegister = function(){

      var regInit = function (){
          $("#reg_star_alert").hide();

          $("#reg_star_name").val('');
          $("#reg_star_intro").val('');
          $("#profile_img").attr("src", '../../style/image/bm_profile.png');
      } 

      this.init = function(uid){
        require( [ 'util/bm.prof.uploader'], function( BmProfUploader) {
            BmProfUploader.init(uid);
        });

        $("#reg_star_submit").click(function(){

            var starName = $("#reg_star_name").val();
            var starIntro = $("#reg_star_intro").val();
            var starProfThumb = $("#profile_img").attr("src");
            
            if(starName.length <= 0 || starIntro.length <= 0 || starProfThumb.indexOf("bm_profile") > 0){
              $("#reg_star_alert").show();
              $("#reg_star_alert").text('프로필 사진, 이름, 소개는 필수입니다!!');
            }else{

              //$("#popup-1").mmenu().trigger( "close.mm" );
              $.ajax({
                      type:"POST",
                      url:"/bm/regstar",
                      data:{
                          uid: uid, 
                          pf_img_url: starProfThumb.replace('http://14.49.42.89/', ''),
                          alias: starName,
                          intro: starIntro
                      }
                  }).done(function(data){
                      bm.setStarType();
                      document.location.href="/";
                  }).fail(function(data){
                      
                  });
              
            }

        });

      }

      //Upload Modal이 Open 될 때
			$("#tooltips").bind("reg-show-modal",function(){
				regInit();
			}); 

		};

		return new BMStarRegister;
});

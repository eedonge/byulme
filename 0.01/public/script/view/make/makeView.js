define(
	[
		'jquery',
		'util/jquery.fileupload',
    'util/jquery.fileupload-process',
    'util/jquery.fileupload-validate',
    'util/jquery-ui.min' 
	], function(
		$
	){
		var BMUploader = function(){

      // 카드 만들기 초기화 함수
      var makeInit = function (){
          //선택파일초기화
          $('#fileinfo').children().remove();
          $('#imgfileinfo').children().remove();
          $('#sdfileinfo').children().remove();
          
          //Progress Bar 초기화(0%)
          $('.progress .bar').attr("style", "width:0%");

          //업로드 버튼 비활성화
          $('#makebutton').prop('disabled', true);
          $('#imgmakebutton').prop('disabled', true);
          $('#sdmakebutton').prop('disabled', true);

          //Error 메세지 영역 초기화
          $("#errmsg").children().remove();
          $('#imgerrmsg').children().remove();
          $('#sderrmsg').children().remove();

          $( "#upload_complete_box" ).hide();
      } 

      this.init = function(uid){
				require( [ 'util/bm.mv.uploader', 'util/bm.img.uploader', 'util/bm.sd.uploader'], function( BmMVUploader, BmImgUploader, BmSdUploader) {
	          BmMVUploader.init(uid, makeInit);
	          BmImgUploader.init(uid, makeInit);
	          BmSdUploader.init(uid, makeInit);
	      });
      }

      //Upload Modal이 Open 될 때
			$("#tooltips").bind("show-modal",function(){
				makeInit();
			}); 

		};

		return new BMUploader;
});

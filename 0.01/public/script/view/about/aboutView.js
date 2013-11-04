define(
	[
		'jquery', 
		'backbone',
		'template!../template/about/about',
		'util/bm.facebook', //Card Make
        'bootstrap', //Card Make
        'util/vendor/jquery.ui.widget', //Card Make
        'util/jquery.fileupload', //Card Make
        'util/jquery.fileupload-process', //Card Make
        'util/jquery.fileupload-validate', //Card Make
        'util/jquery-ui.min', //Card Make
        'util/jquery.zoom', 
        'iosocket', 
		'style!../style/main/main', 
				'style!../style/make/makestyle', //Card Make
				'style!../style/regstar/regstarstyle', //Register Star
				'style!../style/viewer/viewerstyle' //Viewer 
	], function(
		$, 
		Backbone,
		template,
		BmFaceBook
	){
	var MainView = Backbone.View.extend({
		el : 'div#content',
		render: function() {
        $(this.el).html(template());

        /***********  Card Make **************/
        var uid = 'test1';
        var bmURL = 'http://localhost:8080'
        var isAdmin = false;

        // 카드 만들기 Tooltip
        $("#cardmake").popover({
            title: "카드만들기",
            content:"동영상, 이미지 올리기",
            placement: 'right',
            trigger:"hover"
        });

        // 카드 만들기 초기화 함수
        var cardMakeInit = function (){
            $('.tabbable').show();
            //하단완료버튼 Hide
            $('.modal-footer').hide();
            //선택파일초기화
            $('#fileinfo').children().remove();
            $('#fileinfo').append($('<span class="label label-primary">...동영상을 선택해 주세요...</span>'));
            $('#imgfileinfo').children().remove();
            $('#imgfileinfo').append($('<span class="label label-primary">...이미지를 선택해 주세요...</span>'));
            //Progress Bar 초기화(0%)
            $('.progress .bar').attr("style", "width:0%");
            //업로드 버튼 비활성화
            $('#makebutton').prop('disabled', true);
            $('#imgmakebutton').prop('disabled', true);
            //Error 메세지 영역 초기화
            $("#errmsg").children().remove();
            $('#imgerrmsg').children().remove();
            //Tab 초기화
            $('#card-tab a:first').tab('show');
            //성공 메세지 Hide
            $('.succable').hide();
            //카드 종류 초기화
            $('#cardkindcode').val('');
            $('#cardid').val('');
            
        }   


        // 카드 만들기 Click Event Handler
        $("#cardmake").click(function(){

            cardMakeInit();
            require( [ 'util/bm.mv.uploader', 'util/bm.img.uploader'], function( BmMVUploader, BmImgUploader) {
                BmMVUploader.init(uid, cardMakeInit);
                BmImgUploader.init(uid, cardMakeInit);

                $('#makemodal').modal({
                    keyboard: false, 
                    backdrop: 'static'
                }).on("hidden", function(e) {
                    
                    if($('#cardkindcode').val() == 'MOVIE'){ //Movie 업로드 성공
                        var socket = io.connect(bmURL);
                        
                        //Card 생성완료를 확인하기 위해 Event 호출
                        //CID : 컨텐츠 ID
                        socket.emit('setMovieMake', {cid : $('#cardid').val()});

                        //Card 생성완료 후 Socket Disconnect 
                        socket.on('getMovieMake', function(data){

                        //메세지 Alarm
                        $( "#movie_complete_dialog" ).dialog( "open" );

                            socket.disconnect();
                        });

                    } else if ($('#cardkindcode').val() == 'IMAGE'){ //Image 업로드 성공

                    }

                    //Facebook에 New Feed
                    BmFaceBook.feed("1", uid);
                });


            });
        });

        //동영상 인코딩 완료 메세지창 초기화 
        $( "#movie_complete_dialog" ).dialog({
              autoOpen: false,
              show: {
                effect: "blind",
                duration: 1000 ,
              },
              hide: {
                effect: "blind",
                duration: 1000
              },
              open: function() { $(".ui-dialog-titlebar-close").hide(); },
              position: ['right', 'bottom']
        });

        $( "#mcd_close" ).click(function() {
          $( "#movie_complete_dialog" ).dialog( "close" );
        });

        /***********  Card Make **************/

        /***********  Facebook **************/
        BmFaceBook.auth('bm_fb_auth', uid, isAdmin);

        /***********  Facebook **************/

        /***********  스타 등록 **************/
        $("#reg_star").click(function(){

            require( [ 'util/bm.prof.uploader'], function( BmProfUploader) {
                BmProfUploader.init(uid);
                
                $("#reg_star_alert").hide();

                $("#regStarModal").modal({
                        keyboard:false,
                        backdrop:'static'}); 

                $("#reg_star_submit").click(function(){

                   $("#reg_star_alert").hide();
                   $("#reg_star_name").val('');
                   $("#reg_star_intro").val('');
                   $("#profile_img").attr("src", '../style/image/bm_profile.png');

                    var starName = $("#reg_star_name").val();
                    var starIntro = $("#reg_star_intro").val();
                    var starProfThumb = $("#profile_img").attr("src");
                    
                    if(starName.length <= 0 || starIntro.length <= 0 || starProfThumb.indexOf("bm_profile") > 0){
                        $("#reg_star_alert").show();
                        $("#reg_star_alert").text('프로필 사진, 이름, 소개는 필수입니다!!');
                    }else{
                        $.ajax({
                                type:"POST",
                                url:"/bm/regstar",
                                data:{
                                    uid: uid, 
                                    pf_img_url: starProfThumb,
                                    alias: starName,
                                    intro: starIntro
                                }
                            }).done(function(data){
                                $("#regStarModal").modal("hide");
                            }).fail(function(data){
                                
                            });
                    }

                });
            });
        });
        /***********  스타 등록 **************/

        /***********  Contents View **********/
        //YOUTUBE 초기화 
        require( [ 'util/bm.youtube'], function() {
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        });


        $('#playContent').on('shown.bs.modal', function () {
            if($('#yt_player').is(':visible')) {
                YT_PLAYER.loadVideoById($('#yt_player').data('videoid'));
            }
            else if($('#vm_player').is(':visible')){
                $("#vm_player").attr("src", "//player.vimeo.com/video/"+ $('#vm_player').data('videoid') + "?portrait=0&title=0&byline=0&badge=0&autoplay=1&loop=1");
            }
        });

        $('#playContent').on('hide.bs.modal', function () {
            if($('#yt_player').is(':visible')) {
                YT_PLAYER.stopVideo();
                YT_PLAYER.loadVideoById('');
                $("#yt_player").hide();
            }
            else if($('#vm_player').is(':visible')){
                $("#vm_player").attr("src", "");
                $('#vm_player').hide();
            }
        });

        $("#youtube_test").click(function(){
            $('#yt_player').show();
            $('#yt_player').data('videoid', '6pw972Kl3L0');
            $('#playContent').modal({
                keyboard:false,
                backdrop:'static'}); 
        });

        $("#vimeo_test").click(function(){
            $('#vm_player').show();
            $('#vm_player').data('videoid', '7100569');
            $('#playContent').modal({
                keyboard:false,
                backdrop:'static'}); 
        });

        /***********  Contents View **********/
        $("#member_test").click(function(){
            document.location.href="#member";
        });


        $("#sc_player").attr("src", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/118329744&auto_play=true&buying=false&sharing=false&download=false&show_playcount=false&show_bpm=true&show_comments=false&show_artwork=false&show_user=false");

        $('#img_player').zoom();
        return this;
    }
>>>>>>> 0b5dd145f8ae73da8a2026edfb01a659038cee6b
	});
	return new MainView;
});
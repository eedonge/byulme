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
        'iosocket', 
		'style!../style/main/main', 
        'style!../style/make/makestyle' //Card Make
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

        return this;
    }
	});
	return new MainView;
});
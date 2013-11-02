define(
	[
		'jquery', 
		'backbone',
		'template!../template/member/member',
        'style!../style/member/memberstyle' 
	], function(
		$, 
		Backbone,
		template
	){
	var MemberView = Backbone.View.extend({
		el : 'div#contentsView',

		render: function() {
        $(this.el).html(template());

        //초기화
        $('#bm_log_in_err').hide();
        $('#bm_sign_in_err').hide();
        
        var LogInErrMsg = function(isErr, logMsg, controller){
            var $logInErr = $('#bm_log_in_err');

            if(isErr){
                $logInErr.show();
                $logInErr.text(logMsg);
                $('#' + controller).focus();
            }else{
                $logInErr.hide();
                $logInErr.text('');
            }
        }

        var SignInErrMsg = function(isErr, logMsg, controller){
            var $SignInErr = $('#bm_sign_in_err');

            if(isErr){
                $SignInErr.show();
                $SignInErr.text(logMsg);
                $('#' + controller).focus();
            }else{
                $SignInErr.hide();
                $SignInErr.text('');
            }
        }

        $('#bm_log_in_submit').click(function(){
            var pEmail = $('#bm_log_in_email').val();
            var pPass = $('#bm_log_in_pass').val();

            //Email 확인
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(pEmail) === false)  
            {  
                LogInErrMsg(true, 'Email을 정확하게 입력하세요.', 'bm_log_in_email');
            }else if(pPass.length < 5){
                LogInErrMsg(true, '비밀번호는 최소 5자 이상입니다.', 'bm_log_in_pass');
            }

            $.ajax({
                type:"POST",
                url:"/bm/sign/LOGIN",
                data:{
                    email: pEmail, 
                    pass: pPass
                }
            }).done(function(data){
            }).fail(function(data){
            });

        });

        $('#bm_sign_in_submit').click(function(){
            var pEmail = $('#bm_sign_in_email').val();
            var pPass = $('#bm_sign_in_pass').val();
            var pRePass = $('#bm_sign_in_repass').val();

            //Email 확인
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(pEmail) === false)  
            {  
                SignInErrMsg(true, 'Email을 정확하게 입력하세요.', 'bm_sign_in_email');
            }else if(pPass.length < 5){
                SignInErrMsg(true, '비밀번호는 최소 5자 이상입니다.', 'bm_sign_in_pass');
            }else if(pPass !== pRePass){
                SignInErrMsg(true, '비밀번호가 일치하지 않습니다.', 'bm_sign_in_repass');
            }

            $.ajax({
                type:"POST",
                url:"/bm/sign/SIGNIN",
                data:{
                    email: pEmail, 
                    pass: pPass
                }
            }).done(function(data){
            }).fail(function(data){
            });

        });

        $('#bm_log_in_email').keydown(function(){
            LogInErrMsg(false);
        });

        $('#bm_log_in_pass').keydown(function(){
            LogInErrMsg(false);
        });

        $('#bm_sign_in_email').keydown(function(){
            SignInErrMsg(false);
        });

        $('#bm_sign_in_pass').keydown(function(){
            SignInErrMsg(false);
        });

        $('#bm_sign_in_repass').keydown(function(){
            SignInErrMsg(false);
        });

        return this;
    }
	});
	return new MemberView;
});
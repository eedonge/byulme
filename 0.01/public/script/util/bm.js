define(function() {

  "use strict";

  var console = window.console || {log:function(){}};

  var getCookieValue = function(c_name){
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    
    if (c_start == -1){
      c_start = c_value.indexOf(c_name + "=");
    }

    if (c_start == -1){
      c_value = null;
    }
    else{
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1){
        c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start,c_end));
    }

    return c_value;
  }

  var exports = {
    version: "0.1.0",
    author: "eedonge"
  };

  exports.log = function() {
    var args = Array.prototype.unshift.call(arguments, new Date().toLocaleString());
    console.log.apply(console, arguments);
  };

  //로그인 
  exports.login = function(uid, type){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 1);

    document.cookie="bm_uid=" + escape(uid) + ((exdate==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie="bm_type=" + escape(type) + ((exdate==null) ? "" : "; expires="+exdate.toUTCString());
  };

  //로그아웃
  exports.logout = function(){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() - 1);

    document.cookie = "bm_uid= " + "; expires=" + exdate.toUTCString() + "";
    document.cookie = "bm_type= " + "; expires=" + exdate.toUTCString() + "";
  };

  //로그인,아웃 확인
  exports.isLogIn = function(){
    var status = getCookieValue('bm_uid');
    if (status!=null && status!=""){
      return true;
    }else{
      return false;
    }
  }

  //User ID 가져오기 
  exports.getUserID = function(){
    return getCookieValue('bm_uid');
  }

  //사용자 구분 가져오기
  //N - Normal
  //S - Star
  //A - Admin
  exports.getUserType = function(){    
    return getCookieValue('bm_type');
  }

  return exports;

})
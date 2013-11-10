<?php
class BMMySQL{
  private $host_name = "172.27.150.164:3306";
  private $user_name = "bmmast";
  private $user_password = "qufal13818";

  private $connect;

  public function __construct()
  {
  }

  function bm_connect(){
    $this->connect = mysql_connect($this->host_name, $this->user_name, $this->user_password);  
  }
  
  function bm_close(){
    mysql_close($this->connect);
  }
   
  function bm_select_user_info($user_id=null){

    $que = "SELECT * FROM  bmdb.bm_user_star WHERE uid = '".$user_id."' ";
    $data = mysql_query( $que, $this->connect );  

    return $this->bm_make_array_for_result( $data );
  }

  function bm_update_vimeo_info($cid=null, $mv_vimeo_id=null, $mv_vimeo_thumb=null){
    $que = "UPDATE bmdb.bm_movie_mast ";
    $que = $que."  SET vimeo_url = '".$mv_vimeo_id."' ";
    $que = $que."  , vimeo_thumb_url = '".$mv_vimeo_thumb."' ";
    $que = $que."  WHERE cid = '".$cid."' ";

    return mysql_query( $que, $this->connect );
  }

  function bm_update_youtube_info($cid=null,  $mv_youtube_id=null, $mv_youtube_thumb=null){
    $que = "UPDATE bmdb.bm_movie_mast ";
    $que = $que."  SET youtube_url = '".$mv_youtube_id."' ";
    $que = $que."  , youtube_thumb_url = '".$mv_youtube_thumb."' ";
    $que = $que."  WHERE cid = '".$cid."' ";

    return mysql_query( $que, $this->connect );
  }

  function bm_update_soundcloud_info($cid=null,  $sd_id=null, $sd_url=null){
    $que = "UPDATE bmdb.bm_sound_mast ";
    $que = $que."  SET soundcloud_id = '".$sd_id."' ";
    $que = $que."  , soundcloud_url = '".$sd_url."' ";
    $que = $que."  WHERE cid = '".$cid."' ";

    return mysql_query( $que, $this->connect );
  }

  function bm_update_card_mast_info($cid=null, $mast_url=null, $mast_thumb_url=null, $confirm=false){
    
    $que = " UPDATE bmdb.bm_card_mast set mast_url = '".$mast_url."', mast_thumb_url = '".$mast_thumb_url."' "; 
    $que = $que." where cid = '".$cid."' ";
    
    if($confirm == true){
      $que = $que." and mast_url IS NULL ";  
    }
    
    return mysql_query( $que, $this->connect );
  }


  function bm_update_facebook_info($cid=null, $img_facebook_id=null){
    $que = "UPDATE bmdb.bm_image_mast ";
    $que = $que."  SET facebook_url = '".$img_facebook_id."' ";
    $que = $que."  WHERE cid = '".$cid."' ";

    return mysql_query( $que, $this->connect );
  }

  function bm_insert_card_info($uid=null, $cid=null, $type=null){
    $que = " INSERT INTO bmdb.bm_card_mast ";
    $que = $que."(cid, ";
    $que = $que."uid, ";
    $que = $que."rate_count, ";
    $que = $que."type) ";
    $que = $que."VALUES( ";
    $que = $que."'".$cid."', ";
    $que = $que."'".$uid."', ";
    $que = $que." 0.0, ";
    $que = $que."'".$type."') ";
    
    return mysql_query( $que, $this->connect );
  }

  function bm_insert_movie_info($cid=null, $local_url=null){

    $que = "INSERT INTO bmdb.bm_movie_mast ";
    $que = $que."(cid,  ";
    $que = $que."local_url,  ";
    $que = $que."vimeo_url,  ";
    $que = $que."youtube_url,  ";
    $que = $que."vimeo_thumb_url,  ";
    $que = $que."youtube_thumb_url,  ";
    $que = $que."del_status) ";
    $que = $que." VALUES( ";
    $que = $que."'".$cid."', ";
    $que = $que."'".$local_url."', ";
    $que = $que."null, ";
    $que = $que."null, ";
    $que = $que."null, ";
    $que = $que."null, ";
    $que = $que."'N') ";

    return mysql_query( $que, $this->connect );
  }

  function bm_insert_image_info($cid=null, $local_url=null, $local_thumb_url=null){
    $que = "INSERT INTO bmdb.bm_image_mast ";
    $que = $que."(cid,  ";
    $que = $que."local_url,  ";
    $que = $que."local_thumb_url,  ";
    $que = $que."facebook_url,  ";
    $que = $que."del_status)  ";
    $que = $que." VALUES( ";
    $que = $que."'".$cid."', ";
    $que = $que."'".$local_url."', ";
    $que = $que."'".$local_thumb_url."', ";
    $que = $que."null, ";
    $que = $que."'N') ";    

    return mysql_query( $que, $this->connect );
  }

  function bm_insert_sound_info($cid=null, $local_url=null){
    
    $que = "insert into bmdb.bm_sound_mast (cid, local_url, soundcloud_id, soundcloud_url) ";
    $que = $que."values ('".$cid."', '".$local_url."', null, null) ";

    return mysql_query( $que, $this->connect );
  }


  function bm_insert_soundcloud_token($token){
    $que = "DELETE FROM bmdb.bm_soundcloud_auth ";
    mysql_query( $que, $this->connect );
    $que = "INSERT INTO bmdb.bm_soundcloud_auth (TOKEN) VALUES ('".$token."') ";
    mysql_query( $que, $this->connect );
  }

  function bm_select_soundcloud_token(){
    $que = "SELECT * FROM bmdb.bm_soundcloud_auth ";
    $data = mysql_query( $que, $this->connect );  
    return $this->bm_make_array_for_result( $data );
  }

  function bm_insert_youtube_token($token){
    $que = "DELETE FROM bmdb.bm_youtube_auth ";
    mysql_query( $que, $this->connect );
    $que = "INSERT INTO bmdb.bm_youtube_auth (TOKEN) VALUES ('".$token."') ";
    mysql_query( $que, $this->connect );
  }

  function bm_select_youtube_token(){
    $que = "SELECT * FROM bmdb.bm_youtube_auth ";
    $data = mysql_query( $que, $this->connect );  
    return $this->bm_make_array_for_result( $data );
  }

  function bm_insert_facebook_token($token){
    $que = "DELETE FROM bmdb.bm_facebook_auth ";
    mysql_query( $que, $this->connect );
    $que = "INSERT INTO bmdb.bm_facebook_auth (TOKEN) VALUES ('".$token."') ";
    mysql_query( $que, $this->connect );
  }

  function bm_select_facebook_token($uid){
    $que = "SELECT * FROM bmdb.bm_facebook_auth WHERE uid = '".$uid."'";
    $data = mysql_query( $que, $this->connect );  
    return $this->bm_make_array_for_result( $data );
  }

  function bm_select_facebook_album_id($user_id){
    $que = " SELECT IFNULL(fb_album_id, 'X') AS album_id ";
    $que = $que." FROM bmdb.bm_user_star ";
    $que = $que." WHERE uid = '".$user_id."' ";

    $data = mysql_query( $que, $this->connect );  
    return $this->bm_make_array_for_result( $data );
  }

  function bm_update_facebook_album_id($user_id=null, $album_id=null){
    $que = "UPDATE bmdb.bm_user_star ";
    $que = $que."  SET fb_album_id = '".$album_id."' ";
    $que = $que."  WHERE uid = '".$user_id."' ";

    return mysql_query( $que, $this->connect );
  }

  private function bm_make_array_for_result($data){
    $rt_arr = array();

    while($result = mysql_fetch_assoc($data)){
        $rt_arr[] = $result;
    }
    return $rt_arr;
  }
}

?>

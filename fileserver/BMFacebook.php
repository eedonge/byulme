<?php
include 'facebook.php';
include 'BMMySql.php';

class BMFacebook{
	
	private $bmMySql;
	private $facebook; 

	public function __construct()
	{
		$this->facebook = new Facebook(array(
  			'appId'  => '533349720068935',
  			'secret' => '6f61d913f18f56f394c592a2c694ed35',
		));
		//MySQL Connect
      	$this->bmMySql = new BMMySQL(); 

     	$this->bmMySql->bm_connect();
  		$token_info = $this->bmMySql->bm_select_facebook_token("admin");
  		$this->bmMySql->bm_close();

  		if(count($token_info) > 0){
  			$this->facebook->setAccessToken($token_info[0]["token"]);
  		}
	}

	function bm_upload($file_path_with_name, $user_id, $img_id){

		$this->facebook->setFileUploadSupport(true);

		$this->bmMySql->bm_connect();
		/*****************1. Facebook Album ID 확인******************/
		$album_info = $this->bmMySql->bm_select_facebook_album_id($user_id);
		
		$user_album_id;
		if(count($album_info) > 0 && $album_info[0]["album_id"] != 'X'){
			$user_album_id = $album_info[0]["album_id"];
			//Facebook에 Album 생성 불필요 

		}else{
			//Facebook에 Star Album 생성
			$album_data = array(
      		'name' => 'star album',
      		'message' => 'this is star album',
    		);
    		$new_album = $this->facebook->api("me/albums", 'post', $album_data);
    		$user_album_id = $new_album['id'];

    		//ALBUM ID UPDATE 
    		$this->bmMySql->bm_update_facebook_album_id($user_id, $user_album_id);
		}

		/*****************2. Facebook Image Upload******************/
	    $photo_details = array(
	        'message'=> 'byulme upload folder'
	    );

	    $photo_details['source'] = '@' . realpath($file_path_with_name);

	    $upload_photo = $this->facebook->api('/'.$user_album_id.'/photos', 'post', $photo_details);

		/*****************3. Facebook Image ID UPDATE TO DataBase******************/
		$this->bmMySql->bm_update_facebook_info($img_id, $upload_photo['id']);

    	$this->bmMySql->bm_close();
	}

}
?>


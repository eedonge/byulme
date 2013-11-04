<?php

require_once 'Services/Soundcloud.php';
include 'BMMySql.php';

class BMSoundCloud{
	
	private $OAUTH2_CLIENT_ID = '44756ea3874af04c8e20a7521ddc82cb';
	private $OAUTH2_CLIENT_SECRET = '3e0abc9c50f432ee37431737307752de';

	private $bmMySql;

	public function __construct()
	{
		//MySQL Connect
        $this->bmMySql = new BMMySQL(); 
	}

  	function bm_upload($file_path_with_name, $file_artwork_path, $soundcloud_info, $user_id, $sd_id){
  		
  		$client = new Services_Soundcloud($this->OAUTH2_CLIENT_ID, $this->OAUTH2_CLIENT_SECRET);

		$this->bmMySql->bm_connect();
  		$token_info = $this->bmMySql->bm_select_soundcloud_token();
  		
    	if(count($token_info) > 0){
    		$client->setAccessToken($token_info[0]["token"]);

			$track = json_decode($client->post('tracks', array(
			    'track[title]' => $soundcloud_info["title"],
			    'track[asset_data]' => '@'.$file_path_with_name,
			    'track[artwork_data]' => '@'.$file_artwork_path,
			    'track[description]' => $soundcloud_info["description"],
			    'track[tag_list]' => $soundcloud_info["tag_list"]
			)));
			// 'track[genre]' => $soundcloud_info["genre"]
		    $this->bmMySql->bm_update_soundcloud_info($sd_id, $track->id, $track->permalink_url);
		}

		$this->bmMySql->bm_close();

  	}
}
?>

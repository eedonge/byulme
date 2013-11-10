<?php

require_once 'Services/Soundcloud.php';
include 'BMMySql.php';

class BMSoundCloud{
	
	private $OAUTH2_CLIENT_ID = 'aeed2671db2174f479db979ffa061cbd';
	private $OAUTH2_CLIENT_SECRET = '294134e6f38feb8c3031bc5152322542';

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
		    //Master Table Update
	    	$this->bmMySql->bm_update_card_mast_info($sd_id, $track->id, $file_artwork_path, false);
	    	
		}

		$this->bmMySql->bm_close();

  	}
}
?>

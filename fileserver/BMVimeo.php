<?php
include 'vimeo.php';
include 'BMMySql.php';

class BMVimeo{
	
	private $vimeo;
	private $vimeo_default_thumbnail;

	private $bmMySql;
	public function __construct()
	{
		$this->vimeo = new phpVimeo('b6eabf90f23022308f7feb48d1722bd09671c26f', 'ec58774fffbc67fb12acc739f3002a1e16c4a0d6', 'b92fe632d4746f958e4a31a7359b8eff', '6d73748d41a3e35d5f363c682db336f62ca9ff7f');
		//$vimeo = new phpVimeo('CONSUMER_KEY', 'CONSUMER_SECRET', 'ACCESS_TOKEN', 'ACCESS_TOKEN_SECRET');

		$this->vimeo_default_thumbnail = "default";
		
		//MySQL Connect
        $this->bmMySql = new BMMySQL(); 
	}

	function bm_upload($file_path_with_name, $vimeo_info, $user_id, $mv_id){

		try{

			/**********  1. Video Upload To VIMEO ******************/
			$video_id = $this->vimeo->upload($file_path_with_name);
			//echo "Get ID --> ".$video_id;

			$i = 0;
			/**********  2. Loop Up To Completion of Getting Thumbnail Image ******************/
			//default thumbnail http://b.vimeocdn.com/thumbnails/defaults/default.480x640.jpg"
			$vimeo_thumbnail = "";
			while ($i < 60) { //60분동안 
				$getInfoRst = $this->vimeo->call('vimeo.videos.getThumbnailUrls', array('video_id' => $video_id));

				try{
					$vimeo_thumbnail = $getInfoRst->thumbnails->thumbnail[2]->_content;
				}catch(Exception $e){
				} 
				
				$i = $i + 1;
				//echo "Try --> [".$i.">>".$vimeo_thumbnail;
				$pos = strpos($vimeo_thumbnail, $this->vimeo_default_thumbnail);
				if ($pos === false) {
					break;
				}else{
					sleep(60); //60 Seconds Sleep
				}
	   		}

	   		/**********  3. Update Tilte, Description ******************/
	        $this->vimeo->call('vimeo.videos.setTitle', array('title' => $vimeo_info["title"], 'video_id' => $video_id));
	        $this->vimeo->call('vimeo.videos.setDescription', array('description' => $vimeo_info["description"], 'video_id' => $video_id));

			/**********  4. DB Info Update ******************/
	        $this->bmMySql->bm_connect();

			//echo "DB Info >> ".$user_id.", ".$mv_id.", ".$video_id.", ".$vimeo_thumbnail;
	        $this->bmMySql->bm_update_vimeo_info($mv_id, $video_id, $vimeo_thumbnail);
	        
	        //Master Table Update
	    	$this->bmMySql->bm_update_card_mast_info($mv_id, $video_id, $vimeo_thumbnail, false);
	    	

	        $this->bmMySql->bm_close();


		}catch (VimeoAPIException $e) {
    		//echo "Encountered an API error -- code {$e->getCode()} - {$e->getMessage()}";
		}

	}
}
?>



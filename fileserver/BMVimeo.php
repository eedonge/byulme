<?php
include 'vimeo.php';
include 'BMMySql.php';

class BMVimeo{
	
	private $vimeo;
	private $vimeo_default_thumbnail;

	private $bmMySql;
	public function __construct()
	{
		$this->vimeo = new phpVimeo('d5f9d950a3bb9d7bd1ff7b1e999ccb94950bb1f0', '7a1f0855aec5fd9acb13571e86b1ae29edb5eb6e', '9a52c23ab4a46097f40bf56fe3a80861', '7afe94b50ce768177c89fe2b0408837bc0fb1b0a');
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

	        $this->bmMySql->bm_close();


		}catch (VimeoAPIException $e) {
    		//echo "Encountered an API error -- code {$e->getCode()} - {$e->getMessage()}";
		}

	}
}
?>



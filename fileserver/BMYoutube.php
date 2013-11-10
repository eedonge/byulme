<?php
//session_start();
include 'Google_Client.php';
include 'contrib/Google_YouTubeService.php';
include 'BMMySql.php';

class BMYoutube{
	
	private $OAUTH2_CLIENT_ID = '148100349774.apps.googleusercontent.com';
	private $OAUTH2_CLIENT_SECRET = '441gJo6i0RU6QHzkUhNusLEp';

	private $bmMySql;

	public function __construct()
	{
		//MySQL Connect
        $this->bmMySql = new BMMySQL(); 
	}

  	function bm_upload($file_path_with_name, $youtube_info, $user_id, $mv_id){
  		
  		$client = new Google_Client();
		$client->setClientId($this->OAUTH2_CLIENT_ID);
		$client->setClientSecret($this->OAUTH2_CLIENT_SECRET);
		$client->setAccessType('offline');

		$youtube = new Google_YoutubeService($client);

		$this->bmMySql->bm_connect();
  		$token_info = $this->bmMySql->bm_select_youtube_token();
  		
    	if(count($token_info) > 0){
  			$client->setAccessToken(unserialize(base64_decode($token_info[0]["token"])));
  			$sessionToken = json_decode($client->getAccessToken());
  			$client->refreshToken($sessionToken->refresh_token);

  			$safe_string_to_store = base64_encode(serialize($client->getAccessToken()));
  			$this->bmMySql->bm_insert_youtube_token($safe_string_to_store);

  			  try{
				    // REPLACE with the path to your file that you want to upload
				    $videoPath = $file_path_with_name;

				    // Create a snipet with title, description, tags and category id
				    $snippet = new Google_VideoSnippet();
				    $snippet->setTitle($youtube_info["title"]);
				    $snippet->setDescription($youtube_info["description"]);
				    $snippet->setTags($youtube_info["tag"]);

				    // Numeric video category. See
				    // https://developers.google.com/youtube/v3/docs/videoCategories/list 
				    $snippet->setCategoryId("24"); //ENTERTAINMENT

				    // Create a video status with privacy status. Options are "public", "private" and "unlisted".
				    $status = new Google_VideoStatus();
				    $status->privacyStatus = "public";

				    // Create a YouTube video with snippet and status
				    $video = new Google_Video();
				    $video->setSnippet($snippet);
				    $video->setStatus($status);

				    // Size of each chunk of data in bytes. Setting it higher leads faster upload (less chunks,
				    // for reliable connections). Setting it lower leads better recovery (fine-grained chunks)
				    $chunkSizeBytes = 1 * 1024 * 1024;

				    // Create a MediaFileUpload with resumable uploads
				    $media = new Google_MediaFileUpload('video/*', null, true, $chunkSizeBytes);
				    $media->setFileSize(filesize($videoPath));

				    // Create a video insert request
				    $insertResponse = $youtube->videos->insert("status,snippet", $video,
				        array('mediaUpload' => $media));

				    $uploadStatus = false;

				    // Read file and upload chunk by chunk
				    $handle = fopen($videoPath, "rb");
				    while (!$uploadStatus && !feof($handle)) {
				      $chunk = fread($handle, $chunkSizeBytes);
				      $uploadStatus = $media->nextChunk($insertResponse, $chunk);
				    }

				    fclose($handle);
					
					$youtube_id = $uploadStatus['id'];
					$youtube_thumbnail = $uploadStatus['snippet']['thumbnails']['high']['url'];

					// DB Info Update
					
					$this->bmMySql->bm_connect();
	    		    $this->bmMySql->bm_update_youtube_info($mv_id, $youtube_id, $youtube_thumbnail);

	    		    //Master Table Update
	    		    $this->bmMySql->bm_update_card_mast_info($mv_id, $youtube_id, $youtube_thumbnail, true);
	    		    
	        		$this->bmMySql->bm_close();	

			  } catch (Google_ServiceException $e) {
			    //$htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>',
			    //    htmlspecialchars($e->getMessage()));
			  } catch (Google_Exception $e) {
			    //$htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>',
			    //    htmlspecialchars($e->getMessage()));
			  }
		}

		$this->bmMySql->bm_close();

  	}
}
?>

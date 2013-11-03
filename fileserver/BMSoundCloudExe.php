<?php
	require('BMSoundCloud.php');
	require_once("log/Logger.php");

	//ini 설정 
	Logger::configure('log/config.xml'); 
	$bm_Logger  = Logger::getLogger("bm_logger"); 

	$file_name = $argv[1];
	$artwork_name = $argv[2];
	$user_id  = $argv[3];
	$sd_id = $argv[4];


	$bm_Logger->info("******************SoundCloud Upload START***************");
	$bm_Logger->info("File Name : [".$file_name."], User ID : [".$user_id."], Movie ID : [".$sd_id."]");
	$upload_handler = new BMYoutube();
	$paramArr = array('title' => 'Byulme Test', 'description' => 'Byulme Description', 'tag_list' => 'tag1 tag2 "tag 3"');
	$upload_handler->bm_upload($file_name, $artwork_name, $paramArr, $user_id, $sd_id);
	$bm_Logger->info("******************SoundCloud Upload FINISH***************");

?>
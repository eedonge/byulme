<?php
	require('BMFacebook.php');
	require_once("log/Logger.php");

	//ini 설정 
	Logger::configure('log/config.xml'); 
	$bm_Logger  = Logger::getLogger("bm_logger"); 

	$file_name = $argv[1];
	$user_id  = $argv[2];
	$img_id = $argv[3];

	$bm_Logger->info("******************Facebook Upload START***************");	
	$upload_handler = new BMFacebook();
	$upload_handler->bm_upload($file_name, $user_id, $img_id);
	$bm_Logger->info("******************Facebook Upload FINISH***************");

?>

<?php
	require('BMYoutube.php');
	require_once("log/Logger.php");

	//ini 설정 
	Logger::configure('log/config.xml'); 
	$bm_Logger  = Logger::getLogger("bm_logger"); 

	$file_name = $argv[1];
	$user_id  = $argv[2];
	$mv_id = $argv[3];


	$bm_Logger->info("******************YOUTube Upload START***************");
	$bm_Logger->info("File Name : [".$file_name."], User ID : [".$user_id."], Movie ID : [".$mv_id."]");
	$upload_handler = new BMYoutube();
	$paramArr = array("title" => "Byulme Test", "description" => "Byulme Description", "tag" => array("Byulme", "Test"));
	$upload_handler->bm_upload($file_name, $paramArr, $user_id, $mv_id);
	$bm_Logger->info("******************YOUTube Upload FINISH***************");

?>

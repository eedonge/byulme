<?php
	require('BMVimeo.php');

	$file_name = $argv[1];
	$user_id  = $argv[2];
	$mv_id = $argv[3];

	
	$upload_handler = new BMVimeo();
	$paramArr = array("title" => "Byulme Test", "description" => "Byulme Description");
	$upload_handler->bm_upload($file_name, $paramArr, $user_id, $mv_id);	
?>

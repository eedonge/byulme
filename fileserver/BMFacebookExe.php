<?php
	require('BMFacebook.php');

	$file_name = $argv[1];
	$user_id  = $argv[2];
	$img_id = $argv[3];

	
	$upload_handler = new BMFacebook();
	$upload_handler->bm_upload($file_name, $user_id, $img_id);

?>

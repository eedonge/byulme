<?php
include 'BMMySql.php';

if (isset($_GET['sound_code'])) {

  //MySQL Connect
  $bmMySql = new BMMySQL(); 
  $bmMySql->bm_connect();
  $bmMySql->bm_insert_soundcloud_token($_GET['sound_code']);
  $bmMySql->bm_close();

  echo "Complete";
}
  
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<script src="http://connect.soundcloud.com/sdk.js"></script>
<title>Sound Cloud Token Save</title>
</head>
<body>
  <input onclick="javascript:getTokenExe();" type="button" value="Get Token"/>
</body>
<script>
  SC.initialize({
    client_id: 'aeed2671db2174f479db979ffa061cbd',
    redirect_uri: 'http://14.49.42.89/callback.html',
    scope: 'non-expiring'
  });

  function getTokenExe(){
    SC.connect(function() {
      document.location.href="http://14.49.42.89/getsoundcloud.php?sound_code=" + SC.accessToken();
    });
  }

</script>
</html>



<?php
include 'BMMySql.php';

//session_start();
// Call set_include_path() as needed to point to your client library.
include 'Google_Client.php';
include 'contrib/Google_YouTubeService.php';

$OAUTH2_CLIENT_ID = '148100349774.apps.googleusercontent.com';
$OAUTH2_CLIENT_SECRET = '441gJo6i0RU6QHzkUhNusLEp';

$client = new Google_Client();
$client->setClientId($OAUTH2_CLIENT_ID);
$client->setClientSecret($OAUTH2_CLIENT_SECRET);
$client->setAccessType('offline');

$redirect = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'],
    FILTER_SANITIZE_URL);
$client->setRedirectUri($redirect);


// YouTube object used to make all API requests.
$youtube = new Google_YoutubeService($client);


if (isset($_GET['code'])) {
  $client->authenticate();

  $safe_string_to_store = base64_encode(serialize($client->getAccessToken()));
  
  //MySQL Connect
  $bmMySql = new BMMySQL(); 
  $bmMySql->bm_connect();
  $bmMySql->bm_insert_youtube_token($safe_string_to_store);
  $bmMySql->bm_close();

  //$date = unserialize(base64_decode($safe_string_to_store));
  //$_SESSION['token'] = $client->getAccessToken();
  //echo serialize($client->getAccessToken());
  //$sessionToken = json_decode($client->getAccessToken());
  //$client->refreshToken($sessionToken->refresh_token);
  //echo serialize($client->getAccessToken());
  //$_SESSION['token'] = $client->getAccessToken();
}

  $authUrl = $client->createAuthUrl();

  $htmlBody = <<<END
  <h3>Authorization Required</h3>
  <p>You need to <a href="$authUrl">authorize access</a> before proceeding.<p>
END;

  echo $htmlBody;
  
?>

<!doctype html>
<html>
<head>
<title>Video Uploaded</title>
</head>
<body>
</body>
</html>
var YT_PLAYER;
function onYouTubeIframeAPIReady() {
	YT_PLAYER = new YT.Player('yt_player', {
		height: '390',
    width: '640',
    videoId: '',
    playerVars: {'autoplay': 1, 'rel': 0, 'showinfo': 0, 'controls' : 1, 'autohide' : 1},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
      }
    });
};

function onPlayerReady(event) {
  //event.target.playVideo();
}

function onPlayerStateChange(event) {
	if(event.data == YT.PlayerState.ENDED){
    YT_PLAYER.playVideo(); 
  }
}

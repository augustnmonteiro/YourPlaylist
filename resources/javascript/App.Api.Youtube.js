App.Api.Youtube = {
	baseUrl: "https://www.googleapis.com/youtube/v3/",
	baseParam: {
		key: "AIzaSyDy9tU6dnsg97RjQlYPBOpysXuRUAZiOoc",
		maxResults: 20,
		order: "viewCount",
		part: "snippet",
		pageToken: ""
	},
	response: {},
	lastquery: "",
	query: function(params){
		var query = "?";
		for(item in params){
			query += item+"="+params[item]+"&";
		};
		for(item in this.baseParam){
			query += item+"="+this.baseParam[item]+"&";
		};
		return query.substr(0, (query.length - 1));
	},
	request: function(url, params, callback){
		url = this.baseUrl+url+this.query(params);
		App.Ajax.jsonp(url, callback);
	},
	search: function(q, callback){
		this.request("search", {q: q}, function(data){
			callback(data);
		});
		this.lastquery = q;
	}
};

var tag = document.createElement('script'),
	firstScriptTag,
	player,
	done = false;

function loadIframeApi(){
	tag.src = "https://www.youtube.com/iframe_api";
	firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '200',
		width: '290',
		endSeconds: null,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
function onPlayerReady(event) {
	event.target.playVideo();
}
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
	if(event.data == YT.PlayerState.ENDED){
		videoEnd();
	}
}
function videoEnd(){

}
function stopVideo() {
	player.stopVideo();
}
function loadVideo(videoId){
	player.loadVideoById({
		'videoId': videoId
   	});
}

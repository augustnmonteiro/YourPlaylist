var playlistItem = 0,
	currentVideo,
	dragEl;

function allowDrop(e){
	e.preventDefault();
}
function drag(e){
	dragEl = e.target;
}
function drop(e){
	e.preventDefault();
    this.appendChild(dragEl);
    dragEl = null;
}

Doc.getElementById("playlist").addEventListener("drop", drop);
Doc.getElementById("playlist").addEventListener("dragover", allowDrop);

function searchMusic(e){
	var key = e.keyCode;
	if(key === 13){
		//do search
		query = this.value;
		App.Api.Youtube.search(query, function(data){
			var list = Doc.getElementById("list"),
				items = data.items,
				li;

			list.innerHTML = "";
			for(var i=0, len=items.length; i<len; i++){
				li = Doc.createElement("li");
				li.className = "dragable";
				li.setAttribute("video-id", items[i].id.videoId);
				li.setAttribute("draggable", true);
				li.innerHTML = '<img draggable="false" src="'+items[i].snippet.thumbnails.default.url+'"/><span>'+items[i].snippet.title+'</span>';
				li.addEventListener("dragstart", drag);
				li.addEventListener("click", playmusic);
				list.appendChild(li);
			}
		});
	}
};

function playmusic(){
	var video = this.getAttribute("video-id");
	currentVideo = video;
	loadVideo(video);
}
window.videoEnd = function(){
	nextmusic();
}
function nextmusic(){
	var videoId = "05dKOG0A5Wk";
	if(currentVideo && currentVideo != ""){
		videoId = currentVideo
	}
	loadVideo(videoId);	
}
Doc.getElementById("search").addEventListener("keypress", searchMusic);

loadIframeApi();
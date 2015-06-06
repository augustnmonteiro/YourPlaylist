var playlistItem = 0;

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
				li.innerHTML = '<img src="'+items[i].snippet.thumbnails.default.url+'"/><span>'+items[i].snippet.title+'</span>';
				li.addEventListener("click", playmusic);
				list.appendChild(li);
			}
		});
	}
};

function playmusic(){
	var video = this.getAttribute("video-id");
	loadVideo(video);
}
window.videoEnd = function(){
	nextmusic();
}
function nextmusic(){
	loadVideo("05dKOG0A5Wk");	
}
Doc.getElementById("search").addEventListener("keypress", searchMusic);

loadIframeApi();
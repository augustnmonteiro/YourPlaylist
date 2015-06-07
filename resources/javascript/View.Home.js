loadIframeApi();

var currentVideo,
	currentItem = 0,
	videoId,
	dragEl,
	requestData,
	Storage = App.Storage;

Storage.setNotExists("playlist", []);

var mylist = Storage.get("playlist");

function allowDrop(e){
	e.preventDefault();
}
function drag(e){
	dragEl = e.target;
}
function drop(e){
	e.preventDefault();
	var id = dragEl.getAttribute("data-id");
	dragEl.addEventListener("click", playmusicList);
    this.appendChild(dragEl);
    Storage.append("playlist", requestData.items[id]);
}

Doc.getElementById("playlist").addEventListener("drop", drop);
Doc.getElementById("playlist").addEventListener("dragover", allowDrop);

function searchMusic(e){
	var key = e.keyCode;
	if(key === 13){
		//do search
		query = this.value;
		App.Api.Youtube.search(query, function(data){
			requestData = data;
			var list = Doc.getElementById("list"),
				items = data.items,
				li;

			list.innerHTML = "";
			for(var i=0, len=items.length; i<len; i++){
				li = Doc.createElement("li");
				li.className = "dragable";
				li.setAttribute("data-id", i);
				li.setAttribute("draggable", true);
				li.innerHTML = '<img draggable="false" src="'+items[i].snippet.thumbnails.default.url+'"/><span>'+items[i].snippet.title+'</span>';
				li.addEventListener("dragstart", drag);
				li.addEventListener("click", playmusic);
				list.appendChild(li);
			}
		});
	}
};

function playmusic(id){
	var id = this.getAttribute("data-id"),
		video = null;
	video = requestData.items[id].id.videoId;
	loadVideo(video);
}
function playmusicList(id){
	var video = null;
	if(typeof id == "object"){
		id = parseInt(this.getAttribute("data-id"));
		video = mylist[id].id.videoId;	
	}else{
		id = parseInt(id);
		video = mylist[id].id.videoId;
	}
	currentVideo = video;
	currentItem = id+1;
	loadVideo(video);
}
window.videoEnd = function(){
	nextmusic();
}
function nextmusic(){
	if(!currentItem || currentItem >= mylist.length){
		currentItem = 0;		
	}
	playmusicList(currentItem);
}
Doc.getElementById("search").addEventListener("keypress", searchMusic);

function setPlaylist(){
	var playlist = Doc.getElementById("playlist"),
		items = mylist,
		li;

	list.innerHTML = "";
	for(var i=0, len=items.length; i<len; i++){
		li = Doc.createElement("li");
		li.className = "dragable";
		li.setAttribute("data-id", i);
		li.setAttribute("draggable", true);
		li.innerHTML = '<img draggable="false" src="'+items[i].snippet.thumbnails.default.url+'"/><span>'+items[i].snippet.title+'</span>';
		li.addEventListener("dragstart", drag);
		li.addEventListener("click", playmusicList);
		playlist.appendChild(li);
	};
	playmusicList(0);
}
setPlaylist();
App.Ajax = function(){
	this.jsonp = function(url, callback){
		var query = url;
		if(url.split("?")[1]){
			query += "&"
		}else{
			query += "?"
		}
		query += "callback=jsonp";

		var script = Doc.createElement("script");
		window.jsonp = function(data){
			callback(data);			
			delete window.jsonp;
			Body.removeChild(script);
		}
		script.src = query;
		Body.appendChild(script);
	}
};
App.Ajax = new App.Ajax();
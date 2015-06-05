App.Api.Youtube = {
	baseUrl: "https://www.googleapis.com/youtube/v3/",
	baseParam: {
		key: "AIzaSyBy4Hl33iqHbJe6nFTDh-f6cASBGjy4vL4",
		maxResults: 50,
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
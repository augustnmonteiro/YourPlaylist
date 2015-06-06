App.Types = function(){
	this.isObject = function(param){
		return (typeof param == "object")? true : false;
	};
}

App.Types = new App.Types();
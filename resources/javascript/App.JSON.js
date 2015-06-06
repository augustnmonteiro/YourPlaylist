App.JSON = function(){
	this.jparse = function(string){
		return JSON.parse(string);
	};
	this.jstring = function(object){
		return JSON.stringify(object);	
	};
}
App.JSON = new App.JSON();
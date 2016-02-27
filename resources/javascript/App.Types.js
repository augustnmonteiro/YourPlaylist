'use strict'

App.Types = function(){
	this.isObject = function(param){
		return (typeof param === "object");
	};
}

App.Types = new App.Types();

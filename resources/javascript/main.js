var App = {},
	Sys = {},
	Win,
	Doc,
	Body,
	JS_PATH,
	Temp,
	Require;

JS_PATH = "resources/javascript/";

Require = [
	"App.js",
	"App.Types.js",
	"App.JSON.js",
	"App.Storage.js",
	"App.Ajax.js",
	"App.Api.js",
	"App.Api.Youtube.js"
];

function addScript(src){
	Temp = Doc.createElement("script");
	Temp.src = JS_PATH+src;
	Body.appendChild(Temp);
}
function setScripts(){
	for(var i=0, len = Require.length; i<len; i++){
		addScript(Require[i]);
	}
}

function init(){
	var fs = require("fs");
	Win = window;
	Doc = Win.document;
	Body = Doc.body;

	setScripts();
};

window.onload = init;
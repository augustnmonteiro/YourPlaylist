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
	"App.Api.Youtube.js",
	"View.Home.js"
];

function addScript(src){
	Temp = Doc.createElement("script");
	Temp.type = "text/javascript";
	Temp.src = JS_PATH+src;
	Temp.async = false;

	Doc.getElementsByTagName("head")[0].appendChild(Temp);
}
function setScripts(){
	for(var i=0, len = Require.length; i<len; i++){
		addScript(Require[i]);
	}
}

function init(){
	Win = window;
	Doc = Win.document;
	Body = Doc.body;

	setScripts();
};

window.onload = init;
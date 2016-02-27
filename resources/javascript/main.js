var App = {}
    , Sys = {}
    , Win
    , Doc
    , Body
    , JS_PATH
    , Temp
    , Require;

JS_PATH = "resources/javascript/";

Require = {
  app: "App.js",
	appTypes: "App.Types.js",
	appJson: "App.JSON.js",
	appStorage: "App.Storage.js",
	appAjax: "App.Ajax.js",
	appApi: "App.Api.js",
	appApiYoutube: "App.Api.Youtube.js",
	viewHome: "View.Home.js"
};

RequireLoaded = [];

function module(dependencies, loaded){

  var forLoad = dependencies.filter(function(need){
      return RequireLoaded.indexOf(need) === -1;
  });

  if(forLoad.length === 0){
      loaded();
  }else{
      var loadFile = function(){
          Temp = Doc.createElement("script");
          Temp.type = "text/javascript";
          Temp.src = JS_PATH + Require[forLoad[0]];
          Temp.async = false;

          Doc.getElementsByTagName("head")[0].appendChild(Temp);
          Temp.onload = function(){
              if(forLoad.length){
                  forLoad.shift();  
                  loadFile();
              }else{
                  loaded();
              }    
          };
      }    
      loadFile();
  }   

}


function init(){
	Win = window;
	Doc = Win.document;
	Body = Doc.body;

  module(['app', "appTypes", "appJson", "appStorage", "appAjax", "appApi", "appApiYoutube", "viewHome"], function(){});
};

window.onload = init;

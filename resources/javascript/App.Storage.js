App.Storage = function(){
	this.set = function(key, val){
		if(App.Types.isObject(val)){
			val = App.JSON.jstring(val);
		}
		localStorage.setItem(key, val);
	};
	this.get = function(key){
		temp = localStorage.getItem(key);
		try{
			temp = App.JSON.jparse(temp);
			return temp;
		}catch(e){
			return temp;
		}
	};
	this.append = function(key, val){
		temp = localStorage.getItem(key);
		if(App.Types.isObject(val)){
			try{
				temp = App.JSON.jparse(temp);
				temp.push(val);
				this.set(key, temp);
			}catch(e){
				console.log("Object only can appended in another object!");
			}
		}else{
			temp += val;
			this.set(key, temp);
		}
	};
	this.delete = function(key){
		localStorage.removeItem(key);
	};
	this.clear = function(){
		localStorage.clear();
	};
};
App.Storage = new App.Storage();
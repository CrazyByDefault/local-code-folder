module.export = function bla (callback){
	function(err, data){ 
		var ext = '.' + process.argv[3];
		for (var i = 0; i < data.length; i++){
			if(path.extname(data[i]) == ext)console.log(data[i]);
		}
	}
}


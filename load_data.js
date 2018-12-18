
var load =(function() {
	let convertDataToArray=function convertDataToArray(data) {
		try {
			let lines=data.split('\n'),converted_data=[];
			for(let line=0;line<lines.length-1;line++) converted_data.push(lines[line].split(' '));
			return converted_data;
	    }
		catch(e){
	        console.log(e.message);
	    }
	}

	let getDataFromFile=function getDataFromFile(filename) {
		try {
			const fs = require('fs');
			let data = fs.readFileSync(filename, 'utf8');
			data=convertDataToArray(data);
			for(let i=0;i<data.length-1;i++) {
				data[i]=data[i].map(function(elem) {return parseFloat(elem);});
				data[i]=data[i].slice(0, data[i].length-1);
			}
			return data;
		}
		catch(e){
	        console.log(e.message);
	    }

	}
	return {
		getDataFromFile:getDataFromFile
	};

})();

module.exports=load
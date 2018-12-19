
var plot=(function() {

	let getRandomRGBColor=function getRandomRGBColor() {
		return'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	} 

	let initTraces=function initTraces(cluster_numbers) {
		let traces={};
		for(let i=0;i<cluster_numbers;i++) traces[i+1]={x:[],y:[],type:'scatter',mode:'markers'};
		for(key in traces)  {
			traces[key]['color']=getRandomRGBColor();
			traces[key]['name']="cluster " + key;
		}
		return traces;
	} 

	let getTraces=function getTraces (data, cluster_numbers, parameter_indexes) { 
		let traces=initTraces(cluster_numbers);
		for(let i=0;i<data.length;i++) {
			traces[data[i][4]].x.push(data[i][parameter_indexes[0]]);
			traces[data[i][4]].y.push(data[i][parameter_indexes[1]]);
		}
		return Object.values(traces);
	}

	let getClustersImage=function getClustersImage(data, cluster_numbers, parameter_indexes, xaxis_title, yaxis_title,img_name) {
		const plotly = require('plotly')('name','key');
		let layout={ xaxis: {title: xaxis_title},yaxis: {title: yaxis_title} };
		let figure = { data: getTraces(data, cluster_numbers, parameter_indexes),layout: layout};
		let imgOpts = {
		    format: 'png',
		    width: 1000,
		    height: 500
		};
		plotly.getImage(figure, imgOpts, function (error, imageStream) {
			const fs = require('fs');
		    if (error) return console.log (error);
		    let fileStream = fs.createWriteStream(img_name+'.'+imgOpts.format);
		    imageStream.pipe(fileStream);
		});
	}

	return {
		getClustersImage:getClustersImage
	};

})();

module.exports=plot;


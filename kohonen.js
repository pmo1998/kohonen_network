//const fs = require('fs');
const Neuron = require('./neuron.js');

function SOM(number_of_clusters) {
	this.neurons=new Array(number_of_clusters);
	this.learning_rate=0.0;
	this.epochs_number=0;
	this.winner=0;
}

SOM.prototype.init = function(learning_rate, epochs_number, dimension) {
	this.learning_rate=learning_rate;
	this.epochs_number=epochs_number;
	for(let i=0;i<this.neurons.length;i++) {
		this.neurons[i]=new Neuron(dimension,i);
		this.neurons[i].initWeights();
	}
};

SOM.prototype.findBMU=function(sample) {
	let distance = this.neurons[0].getEuclidianDistance(sample);
    this.winner = this.neurons[0].label;
   // console.log('distance to 0 neuron is '+distance);
    for(let i=1;i<this.neurons.length;i++) {
    	let new_distance=this.neurons[i].getEuclidianDistance(sample);
   // 	console.log('distance to '+i+' neuron is '+new_distance);
    	if(new_distance<distance) {
    		distance=new_distance;
    		this.winner=this.neurons[i].label;
    	}
    }
}

SOM.prototype.adjustWeights=function(sample,learning_rate) {
	let winner=this.neurons[this.winner];
	for(let i=0;i<winner.weights.length;i++) {
		winner.weights[i]=winner.weights[i]+learning_rate*(parseFloat(sample[i])-winner.weights[i]);
	}
}

SOM.prototype.training=function(data) {
	for(let i=0;i<this.epochs_number;i++) {
		for(let j=0;j<data.length-1;j++) {
			//console.log('sample '+data[j]);
			this.findBMU(data[j]);
			//console.log('BMU '+this.winner);
			let learning_rate=this.learning_rate*Math.exp(-(i+1)/this.epochs_number);
			this.adjustWeights(data[j],learning_rate);
		}
	}
}

SOM.prototype.clustering=function(testing_data) {
	for(let i=0;i<testing_data.length;i++) {
		this.findBMU(testing_data[i]);
		console.log(testing_data[i]+'  fits into category '+(this.winner+1));
	}
}

SOM.prototype.printWeights=function() {
	for(let i=0;i<this.neurons.length;i++) {
		this.neurons[i].printWeights();
	}
}

/*var getContent=function getContent(content) {
	try {
		let lines=content.split('\n'),data=[];
		for(let line=0;line<lines.length-1;line++) {
			data.push(lines[line].split(' '));
		}
		return data;
		
    }
	catch(e){
        console.log(e.message);
    }

}*/

//(last index) 1-setosa, 2-versicolor, 3-virginica
var training_data=[
[5.1,3.5,1.4,0.2,1],
[4.9,3,1.4,0.2,1],
[4.7,3.2,1.3,0.2,1],
[5,3.6,1.4,0.2,1],
[5.4,3.9,1.7,0.4,1],
[4.6,3.4,1.4,0.3,1],
[5,3.4,1.5,0.2,1],
[4.4,2.9,1.4,0.2,1],
[4.9,3.1,1.5,0.1,1],
[5.4,3.7,1.5,0.2,1],
[4.8,3.4,1.6,0.2,1],
[5.7,3.8,1.7,0.3,1],
[5.1,3.8,1.5,0.3,1],
[5.4,3.4,1.7,0.2,1],
[5.1,3.7,1.5,0.4,1],
[4.6,3.6,1,0.2,1],
[4.8,3.4,1.9,0.2,1],
[5,3,1.6,0.2,1],
[5,3.4,1.6,0.4,1],
[5.2,3.5,1.5,0.2,1],
[5.2,3.4,1.4,0.2,1],
[4.7,3.2,1.6,0.2,1],
[4.8,3.1,1.6,0.2,1],
[5.4,3.4,1.5,0.4,1],
[5.2,4.1,1.5,0.1,1],
[5.5,4.2,1.4,0.2,1],
[4.9,3.1,1.5,0.1,1],
[5,3.2,1.2,0.2,1],
[5.5,3.5,1.3,0.2,1],
[4.9,3.1,1.5,0.1,1],
[4.4,3,1.3,0.2,1],
[5.1,3.4,1.5,0.2,1],
[5,3.5,1.3,0.3,1],
[4.5,2.3,1.3,0.3,1],
[5,3.5,1.6,0.6,1],
[5.1,3.8,1.9,0.4,1],
[4.8,3,1.4,0.3,1],
[4.6,3.2,1.4,0.2,1],
[5.3,3.7,1.5,0.2,1],
[5,3.3,1.4,0.2,1],
[7,3.2,4.7,1.4,2],
[6.4,3.2,4.5,1.5,2],
[6.9,3.1,4.9,1.5,2],
[5.5,2.3,4,1.3,2],
[5.7,2.8,4.5,1.3,2],
[6.3,3.3,4.7,1.6,2],
[4.9,2.4,3.3,1,2],
[6.6,2.9,4.6,1.3,2],
[5.2,2.7,3.9,1.4,2],
[5,2,3.5,1,2],
[5.9,3,4.2,1.5,2],
[6,2.2,4,1,2],
[6.1,2.9,4.7,1.4,2],
[5.6,2.9,3.6,1.3,2],
[6.7,3.1,4.4,1.4,2],
[5.8,2.7,4.1,1,2],
[6.2,2.2,4.5,1.5,2],
[5.6,2.5,3.9,1.1,2],
[5.9,3.2,4.8,1.8,2],
[6.1,2.8,4,1.3,2],
[6.3,2.5,4.9,1.5,2],
[6.1,2.8,4.7,1.2,2],
[6.4,2.9,4.3,1.3,2],
[6.6,3,4.4,1.4,2],
[6.8,2.8,4.8,1.4,2],
[6.7,3,5,1.7,2],
[5.7,2.6,3.5,1,2],
[5.5,2.4,3.8,1.1,2],
[5.5,2.4,3.7,1,2],
[5.8,2.7,3.9,1.2,2],
[6,2.7,5.1,1.6,2],
[5.4,3,4.5,1.5,2],
[6,3.4,4.5,1.6,2],
[5.8,2.6,4,1.2,2],
[5,2.3,3.3,1,2],
[5.6,2.7,4.2,1.3,2],
[5.7,3,4.2,1.2,2],
[6.2,2.9,4.3,1.3,2],
[5.1,2.5,3,1.1,2],
[5.7,2.8,4.1,1.3,2],
[6.3,3.3,6,2.5,3],
[5.8,2.7,5.1,1.9,3],
[7.1,3,5.9,2.1,3],
[6.3,2.9,5.6,1.8,3],
[6.5,3,5.8,2.2,3],
[4.9,2.5,4.5,1.7,3],
[7.3,2.9,6.3,1.8,3],
[6.7,2.5,5.8,1.8,3],
[7.2,3.6,6.1,2.5,3],
[6.5,3.2,5.1,2,3],
[6.4,2.7,5.3,1.9,3],
[7.7,2.6,6.9,2.3,3],
[6,2.2,5,1.5,3],
[6.9,3.2,5.7,2.3,3],
[5.6,2.8,4.9,2,3],
[6.3,2.7,4.9,1.8,3],
[6.7,3.3,5.7,2.1,3],
[7.2,3.2,6,1.8,3],
[6.2,2.8,4.8,1.8,3],
[6.1,3,4.9,1.8,3],
[6.4,2.8,5.6,2.1,3],
[7.2,3,5.8,1.6,3],
[7.4,2.8,6.1,1.9,3],
[7.9,3.8,6.4,2,3],
[6.3,2.8,5.1,1.5,3],
[6.1,2.6,5.6,1.4,3],
[7.7,3,6.1,2.3,3],
[6.3,3.4,5.6,2.4,3],
[6.4,3.1,5.5,1.8,3],
[6,3,4.8,1.8,3],
[6.9,3.1,5.4,2.1,3],
[6.7,3.1,5.6,2.4,3],
[6.9,3.1,5.1,2.3,3],
[5.8,2.7,5.1,1.9,3],
[6.8,3.2,5.9,2.3,3],
[6.7,3.3,5.7,2.5,3],
[6.7,3,5.2,2.3,3],
[6.5,3,5.2,2,3],
[6.2,3.4,5.4,2.3,3]];


var testing_data=[
[4.6,3.1,1.5,0.2,1],
[5.1,3.3,1.7,0.5,1],
[4.4,3.2,1.3,0.2,1],
[4.8,3,1.4,0.1,1],
[5.8,4,1.2,0.2,1],
[5.7,4.4,1.5,0.4,1],
[5.4,3.9,1.3,0.4,1],
[5.1,3.5,1.4,0.3,1],
[4.3,3,1.1,0.1,1],
[5.1,3.8,1.6,0.2,1],
[6.5,2.8,4.6,1.5,2],
[5.6,3,4.5,1.5,2],
[6.3,2.3,4.4,1.3,2],
[5.6,3,4.1,1.3,2],
[5.5,2.5,4,1.3,2],
[5.5,2.6,4.4,1.2,2],
[6.1,3,4.6,1.4,2],
[6,2.9,4.5,1.5,2],
[6.7,3.1,4.7,1.5,2],
[5.7,2.9,4.2,1.3,2],
[7.6,3,6.6,2.1,3],
[6.8,3,5.5,2.1,3],
[5.7,2.5,5,2,3],
[5.8,2.8,5.1,2.4,3],
[6.4,3.2,5.3,2.3,3],
[6.5,3,5.5,1.8,3],
[7.7,3.8,6.7,2.2,3],
[7.7,2.8,6.7,2,3],
[7.4,2.8,6.1,1.9,3],
[7.9,3.8,6.4,2,3],
[6.3,2.8,5.1,1.5,3],
[6.1,2.6,5.6,1.4,3],
[7.7,3,6.1,2.3,3],
[6.3,3.4,5.6,2.4,3],
[6.4,3.1,5.5,1.8,3],
[6,3,4.8,1.8,3],
[6.9,3.1,5.4,2.1,3],
[6.4,2.8,5.6,2.2,3]];

/*var content = fs.readFileSync('datasets/iris.test', 'utf8');
let data=getContent(content);
for(let i=0;i<data.length-1;i++) {
	let line=data[i].map(function(elem) {return parseFloat(elem);});
	console.log('['+line+'],');
}*/

let SOM_=new SOM(3);
let learning_rate=0.1, epochs=100, dimension=4;
SOM_.init(learning_rate,epochs,dimension);
SOM_.training(training_data);
//SOM_.printWeights();
//content= fs.readFileSync('datasets/iris.test', 'utf8');
//data=getContent(content);
//console.log(data);
SOM_.clustering(testing_data);
//console.log(testing_data);

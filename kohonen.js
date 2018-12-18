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
		testing_data[i].push(this.winner+1);
		console.log('['+testing_data[i].slice(0,testing_data[i].length-1)+']  fits into category '+(testing_data[i][4]));
	}
}

SOM.prototype.printWeights=function() {
	for(let i=0;i<this.neurons.length;i++) {
		this.neurons[i].printWeights();
	}
}

module.exports=SOM;
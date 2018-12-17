function Neuron(dimension,label) {
	this.label=label;
	this.weights=new Array(dimension).fill();	
}

Neuron.prototype.initWeights = function() {
	for(let i=0;i<this.weights.length;i++) this.weights[i]=parseFloat((Math.random()).toFixed(2));
};

Neuron.prototype.getEuclidianDistance=function(sample) {
	let distance=0.0;
	for (let i = 0; i < this.weights.length; i++) {
		distance += Math.pow(sample[i]-this.weights[i], 2);
	}
	return distance.toFixed(2);
}

Neuron.prototype.printWeights=function() {
	console.log(this.weights);
}



module.exports=Neuron;
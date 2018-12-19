const SOM=require('./kohonen.js');
const load=require('./load_data.js');
const plot = require('./plot_clusters.js');
let number_of_clusters=3,learning_rate=0.1, epochs=100, dimension=4;
let training_data=load.getDataFromFile('datasets/iris.data');
let testing_data=load.getDataFromFile('datasets/iris.test');
let SOM_=new SOM(number_of_clusters);
SOM_.init(learning_rate,epochs,dimension);
SOM_.training(training_data);
SOM_.clustering(testing_data);
plot.getClustersImage(testing_data,3,[0,1],'Sepal width (cm)','Sepal length (cm)','sepal');
plot.getClustersImage(testing_data,3,[2,3],'Petal width (cm)','Petal length (cm)','petal');


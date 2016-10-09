var Chroma = require("chroma-js");



//Chroma.scale('RdYlBu')
//var colors = ["black", "white"]
var colors = 'BuGn';
//var range = [1, 2, 3, 4];

 //var min = 12, max = 15;
 //var intervalLength = max - min;
 var numClasses = 3;
// var range = [min, max+1];
// var numClasses = 4;

//var scale = Chroma.scale(colors).domain(range, numClasses);
var scale = Chroma.scale(colors).domain([0, numClasses], numClasses);

console.log(scale.domain());


// var x = 0;
// for(var i=0; i<50; i++){
// 	x = i/5;
// 	console.log("n: " + x + ", color: " + scale(x).hex())
// }

var darken = Chroma('#e34a33').darken(2.0).hex();
console.log("darken: ", darken);



console.log(Chroma(224, 243, 219).hex())
console.log(Chroma(168, 221, 181).hex())
console.log(Chroma(67, 162, 202).hex())





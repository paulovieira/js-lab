/*
var CountriesC = require("./country.js").collection;
var CitiesC = require("./city.js").collection;

var countriesC = new CountriesC();
var citiesC = new CitiesC();

*/

//var Backbone = require("Backbone");


debugger;
require("./set-relations.js");
debugger;
//
//var CitiesC = require("./city.js").collection;
var CountriesC = require("./country.js").collection;


//var CitiesC = require("./city.js").collection;
//var citiesC = new CitiesC();



var countriesC = new CountriesC();
debugger;

countriesC.fetch({
	success: function(x,y,z){
		debugger;
		var y = this;
		var x = countriesC.toJSON();
	},
	error: function(x,y,z){
		debugger;
	}
});
debugger;



// var x = 1;
// var y = 2;
// var z = 3;

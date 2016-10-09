(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

var CityM = Backbone.AssociatedModel.extend({
    idAttribute: "city_id",
    defaults: {
        city_name: "no city name",
    },
    relations: [
    // {
    //     type: Backbone.One,
    //     key: 'city_country',
    //     relatedModel: CountryM
    // }
    ],
});

var CityAM = Backbone.AssociatedModel.extend({
    idAttribute: "city_id",
    defaults: {
        city_name: "no city name",
    },
});

 
var CitiesC = Backbone.Collection.extend({
    url: "/api/cities.json",
    model: CityM
});


module.exports = {
	model: CityM,
    associatedModel: CityAM,
	collection: CitiesC
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
(function (global){
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

var CountryM = Backbone.AssociatedModel.extend({
    idAttribute: "country_id",
    defaults: {
        country_name: "no country name",
    },
    relations: [
    // {
    //     type: Backbone.Many,
    //     key: 'country_cities',
    //     collectionType: CitiesC
    // }
    ],
});

var CountryAM = Backbone.AssociatedModel.extend({
    idAttribute: "country_id",
    defaults: {
        country_name: "no country name",
    },
});


var CountriesC = Backbone.Collection.extend({
    url: "/api/countries.json",
    model: CountryM
});

 
module.exports = {
	model: CountryM,
    associatedModel: CountryAM,
	collection: CountriesC
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
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

},{"./country.js":2,"./set-relations.js":4}],4:[function(require,module,exports){
var country = require("./country.js");
var city    = require("./city.js");

var CountryM = country.model;
var CityM = city.model;

//debugger;
// a country has many cities
CountryM.prototype.relations.push({
    type: Backbone.Many,
    key: 'country_cities',
    relatedModel: city.associatedModel
});

// a city belongs to one country
CityM.prototype.relations.push({
    type: Backbone.One,
    key: 'city_country',
    ModelType: country.associatedModel
});

},{"./city.js":1,"./country.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjaXR5LmpzIiwiY291bnRyeS5qcyIsImV4YW1wbGUzLmpzIiwic2V0LXJlbGF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBCYWNrYm9uZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LkJhY2tib25lIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5CYWNrYm9uZSA6IG51bGwpO1xuXG52YXIgQ2l0eU0gPSBCYWNrYm9uZS5Bc3NvY2lhdGVkTW9kZWwuZXh0ZW5kKHtcbiAgICBpZEF0dHJpYnV0ZTogXCJjaXR5X2lkXCIsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY2l0eV9uYW1lOiBcIm5vIGNpdHkgbmFtZVwiLFxuICAgIH0sXG4gICAgcmVsYXRpb25zOiBbXG4gICAgLy8ge1xuICAgIC8vICAgICB0eXBlOiBCYWNrYm9uZS5PbmUsXG4gICAgLy8gICAgIGtleTogJ2NpdHlfY291bnRyeScsXG4gICAgLy8gICAgIHJlbGF0ZWRNb2RlbDogQ291bnRyeU1cbiAgICAvLyB9XG4gICAgXSxcbn0pO1xuXG52YXIgQ2l0eUFNID0gQmFja2JvbmUuQXNzb2NpYXRlZE1vZGVsLmV4dGVuZCh7XG4gICAgaWRBdHRyaWJ1dGU6IFwiY2l0eV9pZFwiLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGNpdHlfbmFtZTogXCJubyBjaXR5IG5hbWVcIixcbiAgICB9LFxufSk7XG5cbiBcbnZhciBDaXRpZXNDID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIHVybDogXCIvYXBpL2NpdGllcy5qc29uXCIsXG4gICAgbW9kZWw6IENpdHlNXG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0bW9kZWw6IENpdHlNLFxuICAgIGFzc29jaWF0ZWRNb2RlbDogQ2l0eUFNLFxuXHRjb2xsZWN0aW9uOiBDaXRpZXNDXG59XG4iLCJ2YXIgQmFja2JvbmUgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5CYWNrYm9uZSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuQmFja2JvbmUgOiBudWxsKTtcblxudmFyIENvdW50cnlNID0gQmFja2JvbmUuQXNzb2NpYXRlZE1vZGVsLmV4dGVuZCh7XG4gICAgaWRBdHRyaWJ1dGU6IFwiY291bnRyeV9pZFwiLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGNvdW50cnlfbmFtZTogXCJubyBjb3VudHJ5IG5hbWVcIixcbiAgICB9LFxuICAgIHJlbGF0aW9uczogW1xuICAgIC8vIHtcbiAgICAvLyAgICAgdHlwZTogQmFja2JvbmUuTWFueSxcbiAgICAvLyAgICAga2V5OiAnY291bnRyeV9jaXRpZXMnLFxuICAgIC8vICAgICBjb2xsZWN0aW9uVHlwZTogQ2l0aWVzQ1xuICAgIC8vIH1cbiAgICBdLFxufSk7XG5cbnZhciBDb3VudHJ5QU0gPSBCYWNrYm9uZS5Bc3NvY2lhdGVkTW9kZWwuZXh0ZW5kKHtcbiAgICBpZEF0dHJpYnV0ZTogXCJjb3VudHJ5X2lkXCIsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY291bnRyeV9uYW1lOiBcIm5vIGNvdW50cnkgbmFtZVwiLFxuICAgIH0sXG59KTtcblxuXG52YXIgQ291bnRyaWVzQyA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgICB1cmw6IFwiL2FwaS9jb3VudHJpZXMuanNvblwiLFxuICAgIG1vZGVsOiBDb3VudHJ5TVxufSk7XG5cbiBcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRtb2RlbDogQ291bnRyeU0sXG4gICAgYXNzb2NpYXRlZE1vZGVsOiBDb3VudHJ5QU0sXG5cdGNvbGxlY3Rpb246IENvdW50cmllc0Ncbn1cbiIsIi8qXG52YXIgQ291bnRyaWVzQyA9IHJlcXVpcmUoXCIuL2NvdW50cnkuanNcIikuY29sbGVjdGlvbjtcbnZhciBDaXRpZXNDID0gcmVxdWlyZShcIi4vY2l0eS5qc1wiKS5jb2xsZWN0aW9uO1xuXG52YXIgY291bnRyaWVzQyA9IG5ldyBDb3VudHJpZXNDKCk7XG52YXIgY2l0aWVzQyA9IG5ldyBDaXRpZXNDKCk7XG5cbiovXG5cbi8vdmFyIEJhY2tib25lID0gcmVxdWlyZShcIkJhY2tib25lXCIpO1xuXG5cbmRlYnVnZ2VyO1xucmVxdWlyZShcIi4vc2V0LXJlbGF0aW9ucy5qc1wiKTtcbmRlYnVnZ2VyO1xuLy9cbi8vdmFyIENpdGllc0MgPSByZXF1aXJlKFwiLi9jaXR5LmpzXCIpLmNvbGxlY3Rpb247XG52YXIgQ291bnRyaWVzQyA9IHJlcXVpcmUoXCIuL2NvdW50cnkuanNcIikuY29sbGVjdGlvbjtcblxuXG4vL3ZhciBDaXRpZXNDID0gcmVxdWlyZShcIi4vY2l0eS5qc1wiKS5jb2xsZWN0aW9uO1xuLy92YXIgY2l0aWVzQyA9IG5ldyBDaXRpZXNDKCk7XG5cblxuXG52YXIgY291bnRyaWVzQyA9IG5ldyBDb3VudHJpZXNDKCk7XG5kZWJ1Z2dlcjtcblxuY291bnRyaWVzQy5mZXRjaCh7XG5cdHN1Y2Nlc3M6IGZ1bmN0aW9uKHgseSx6KXtcblx0XHRkZWJ1Z2dlcjtcblx0XHR2YXIgeSA9IHRoaXM7XG5cdFx0dmFyIHggPSBjb3VudHJpZXNDLnRvSlNPTigpO1xuXHR9LFxuXHRlcnJvcjogZnVuY3Rpb24oeCx5LHope1xuXHRcdGRlYnVnZ2VyO1xuXHR9XG59KTtcbmRlYnVnZ2VyO1xuXG5cblxuLy8gdmFyIHggPSAxO1xuLy8gdmFyIHkgPSAyO1xuLy8gdmFyIHogPSAzO1xuIiwidmFyIGNvdW50cnkgPSByZXF1aXJlKFwiLi9jb3VudHJ5LmpzXCIpO1xudmFyIGNpdHkgICAgPSByZXF1aXJlKFwiLi9jaXR5LmpzXCIpO1xuXG52YXIgQ291bnRyeU0gPSBjb3VudHJ5Lm1vZGVsO1xudmFyIENpdHlNID0gY2l0eS5tb2RlbDtcblxuLy9kZWJ1Z2dlcjtcbi8vIGEgY291bnRyeSBoYXMgbWFueSBjaXRpZXNcbkNvdW50cnlNLnByb3RvdHlwZS5yZWxhdGlvbnMucHVzaCh7XG4gICAgdHlwZTogQmFja2JvbmUuTWFueSxcbiAgICBrZXk6ICdjb3VudHJ5X2NpdGllcycsXG4gICAgcmVsYXRlZE1vZGVsOiBjaXR5LmFzc29jaWF0ZWRNb2RlbFxufSk7XG5cbi8vIGEgY2l0eSBiZWxvbmdzIHRvIG9uZSBjb3VudHJ5XG5DaXR5TS5wcm90b3R5cGUucmVsYXRpb25zLnB1c2goe1xuICAgIHR5cGU6IEJhY2tib25lLk9uZSxcbiAgICBrZXk6ICdjaXR5X2NvdW50cnknLFxuICAgIE1vZGVsVHlwZTogY291bnRyeS5hc3NvY2lhdGVkTW9kZWxcbn0pO1xuIl19

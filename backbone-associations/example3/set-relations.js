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

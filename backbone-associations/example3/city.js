var Backbone = require("Backbone");

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

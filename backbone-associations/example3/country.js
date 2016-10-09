var Backbone = require("Backbone");

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

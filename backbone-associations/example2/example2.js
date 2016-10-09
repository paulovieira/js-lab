/*

COUNTRIES TABLE

country_id | country_name
------------------
13 | "portugal"
15 | "spain"
19 | "france"



CITIES TABLE

city_id | city_name | country_id
--------------------------------
1 | "lisbon" | 13
2 | "porto" | 13
3 | "madrid" | 15

We have a foreign key in the cities table. That key is referencing the countries table. This means we have:

	- a one-to-one relation from cities to countries (one city is associated with one country - and only one!)
	- a one-to-many relation from countries to cities (one country is associated with many cities)

Note that in the one-to-many relation, the country doesn't have to ba associated with 2 or more cities. It might be associated with only 1 city. It might also happen that some country is not associated with any city at all.

In general we have:

	- the one-to-one relation is from the table that has the foreign key to the table that is referenced
	- the one-to-many relation is from the other way (from the table that is referenced to the table that has the foreign key)


We also have this general property:

	- the one-to-one relation always exists, that is, given a city in the cities table, there is always one (and only one) country that is associated with the city

	- the many-to-one relation might not exists, that is, given a country in the countries table, it might happen that there is no city associated with the country. This can happen because it is the city that "chooses" the country that is associated. So if some country is not choosen by any city, that country will not have city.


the serialization of countries will be:

[
	{
		"country_id": 13,
		"country_name": "portugal",
		"country_cities": [
			{
				"city_id": 1,
				"city_name": "lisbon",
			},
			{
				"city_id": 2,
				"city_name": "porto",
			}
		]
	},
	{
		"country_id": 15,
		"country_name": "spain",
		"country_cities": [
			{
				"city_id": 3,
				"city_name": "madrid",
			}
		]
	},
	{
		"country_id": 19,
		"country_name": "france",
		"country_cities": [
		]
	}
]



the serialization of cities will be:

[
	{
		"city_id": 1,
		"city_name": "lisbon",
		"city_country": [
			{
				"country_id": 13,
				"country_name": "portugal"
			}
		]
	},
	{
		"city_id": 2,
		"city_name": "porto",
		"city_country": [
			{
				"country_id": 13,
				"country_name": "portugal"
			}
		]
	},
	{
		"city_id": 3,
		"city_name": "madrid",
		"city_country": [
			{
				"country_id": 15,
				"country_name": "spain"
			},
		]
	}
]



*/


var CityM = Backbone.AssociatedModel.extend({
    idAttribute: "city_id",
    defaults: {
        city_name: "no city name",
    }
});

var CitiesC = Backbone.Collection.extend({
    url: "/api/cities.json",
    model: CityM
});



CountryM = Backbone.AssociatedModel.extend({
    relations: [{
        type: Backbone.Many,
        key: 'country_cities',
        collectionType: CitiesC
    }],

    idAttribute: "country_id",
    defaults: {
        country_name: "no country name",
    },


});


var CountriesC = Backbone.Collection.extend({
    url: "/api/countries.json",
    model: CountryM
});

var countriesC = new CountriesC();
var citiesC = new CitiesC();

/*
todo: try to make the circular reference (use browserify)
todo: if the payload doesn't have the nested models, what happens to nested (associated) collectionType
todo: for the one-to-one association, we have to overload the parse (or change the code in postgres)

row_to_json
(we could also do it in hapi
	)
*/
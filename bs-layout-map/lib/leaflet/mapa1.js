$("#radius").val("500");



// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([40.7113, -74.0139], 14);

// add an OpenStreetMap tile layer

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	id: 'examples.map-i875mjb7'
}).addTo(map);


function getStations(geoJSON, radius){

	var deferred = Q.defer();

	$.ajax({
		type: "GET",
		url: "getStations",
		timeout: 5000,
		data: {
			geom: geoJSON,
			radius: radius
		},
		success: function(stations){
			deferred.resolve(stations);
		},
		error: function(jqXhr, status, error){
			var errorMessage = "status: " + status
							+ ", error: " + error;

			deferred.reject(new Error(errorMessage));
		}
	});

	return deferred.promise;
};

function onMapClick(e) {

	var geoJSON = L.marker(e.latlng).toGeoJSON();
	console.log( JSON.stringify(geoJSON.geometry));

	getStations(geoJSON.geometry)
		.then(function(stations){
			console.log("stations: ", stations);
			L.geoJson(stations).addTo(map);
		})
		.catch(function(err){
			console.log(err);
		});
}

//map.on('click', onMapClick);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

L.control.scale({
	position: "bottomleft",
	imperial: false,
	maxWidth: 150
}).addTo(map);

var drawControl = new L.Control.Draw({
	draw: {
		position: 'topleft',
		polygon: {
			title: 'Draw a sexy polygon!',
			allowIntersection: false,
			drawError: {
				color: '#b00b00',
				timeout: 1000
			},
			shapeOptions: {
				color: '#7555da'
			},
			showArea: true
		},
		polyline: {
			metric: false,
			shapeOptions: {
				color: '#5578da'
			},
		},
		circle: false,
		rectangle: true,
		marker: false
	},
	edit: {
		featureGroup: drawnItems
	}
});

map.addControl(drawControl);


map.on('draw:created', function (e) {
	var type = e.layerType,
		layer = e.layer,
		geometry = layer.toGeoJSON().geometry,
		radius = $("#radius").val();


	drawnItems.addLayer(layer);

	if (type === 'polyline' || type === 'rectangle' || type === 'polygon') {

		getStations(geometry, radius)
			.then(function(stations){
				console.log("stations: ", stations);
				L.geoJson(stations).addTo(map);
			})
			.catch(function(err){
				console.log(err);
			});
	}


});

$("#clear").on("click", function(){
	map.eachLayer(function(layer){
		if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
			//console.log(layer);
			map.removeLayer(layer);
		}

	})
})
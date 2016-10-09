L.Browser.retina = false;
L.mapbox.accessToken = 'dummyAccessToken';

var map = L.map("map", {})
    .setView([37.78, -25.5], 5);

var layerData = [
    [
        { name: "my_wms_test", title: "my_wms_test title" },
    ]
];


var baseLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    opacity: 0.4
});
//map.addLayer(baseLayer);


var tileJson = {
    "tiles": ["http://prac.dev/api/v1/tiles/my_wms_test_cache/{z}/{x}/{y}.png"],
    "minzoom": 5,
    "maxzoom": 14
};
var mbtilesLayer = L.mapbox.tileLayer(tileJson, {
	opacity: 0.6
})
map.addLayer(mbtilesLayer);


/*
example
var tms_ne = L.tileLayer('http://demo.opengeo.org/geoserver/gwc/service/tms/1.0.0/ne:ne@EPSG:900913@png/{z}/{x}/{y}.png', {
    tms: true
}).addTo(map);

http://demo.opengeo.org/geoserver/gwc/service/tms/1.0.0/ne:ne@EPSG:900913@png/4/6/7.png
*/



// var tmsLayer = L.tileLayer("http://localhost:8081/tms/1.0.0/my_wms_test/EPSG3857/{z}/{x}/{y}.png", {
//     opacity: 0.6,
//     tms: true
// });
// map.addLayer(tmsLayer);

/*
// only for Sao Miguel; for the others see http://sig-sraa.azores.gov.pt/sram/site/servicos-wms.asp
var mapProxyUrl = "http://localhost:8082/service";

var array, wmsLayers = [], wmsLegends = [];

for(var i=0; i<layerData.length; i++){

	array = layerData[i];
	wmsLayers.push({});
	//wmsLegends.push({});
	
	for(var j=0; j<array.length; j++){

		var key = array[j].title + " (" + array[j].name + ")";
		wmsLayers[i][key] = L.tileLayer.wms(mapProxyUrl, {
			layers: array[j].name,
			format: "image/png",
			transparent: true,
            //crs: L.CRS.EPSG4326
            crs: L.CRS.EPSG3857
		});

		//wmsLayers[i][array[j].name].title = array[j].title;
		wmsLayers[i][key].arrayIndex = i;

		wmsLayers[i][key].on("loading", function(e){
			//debugger;
			console.log("loading @ " + Date.now());
		});

		wmsLayers[i][key].on("load", function(e){
			//debugger;
			console.log("    load @ " + Date.now());
		});
	

	}
}

for(i=0; i<wmsLayers.length; i++){
	map.addControl(L.control.layers(wmsLayers[i], undefined));	
}
*/



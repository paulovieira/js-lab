var map = L.map("map").setView([39.5676, -8.7068], 8);

var layerTitles = [

	[
		"Basic Flood Vulnerability Index (Parish)", 
		"Basic Flood Vulnerability Index (zip code)", 
		"Basic Flood Vulnerability Index P75 (zip code)", 

		"Basic Flood Vulnerability Index p75 (BGRI)", 
		"Basic Flood Vulnerability Index (BGRI)", 

		/*---------------------------*/

		"Combined Flood Vulnerability Index by Parish (Mode)", 
		"Combined Flood Vulnerability Index by Parish (75 percentile)", 
		"Combined Flood Vulnerability Index by Zip Code (Mode)", 

		"Combined Flood Vulnerability Index by BGRI unit (Mode)", 
		"Combined Flood Vulnerability Index by BGRI unit (P75)", 


		/*---------------------------*/
		
		"Flood Vulnerability Index (Parish)", 
		"Flood Vulnerability Index (zip code)", 
		"Flood Vulnerability Index p75 (zip code)", 

		"Flood Vulnerability Index p75 (BGRI)", 
		"Flood Vulnerability Index (BGRI)", 
		
		/*---------------------------*/

		"Exposure (Parish)", 
		"Exposure (zip code)", 
		"Exposure P75 (zip code)", 

		"Exposure (BGRI)", 
		"Exposure P75 (BGRI)", 

		/*---------------------------*/
		
		"Physical Susceptibility (Parish)", 
		"Physical Susceptibility p75 (Parish)", 
		"Physical Susceptibility (zip code)", 
		"Physical Susceptibility p75 (zip code)", 

		"Physical Susceptibility p75 (BGRI)", 
		"Physical Susceptibility (BGRI)", 

		/*---------------------------*/
		
		"Precipitation Index (Parish)", 
		"Precipitation Index (zip code)", 
		"Precipitation Index p75 (zip code)", 

		"Precipitation Index (BGRI)", 
		"Precipitation Index P75 (BGRI)", 

		/*---------------------------*/
		
		"Social Susceptibility (Parish)", 
		"Social Susceptibility p75 (Parish)", 
		"Social Susceptibility (zip code)", 
		"Social Susceptibility p75 (zip code)", 

		"Social Susceptibility (BGRI)", 

	],

	[
		"Alges 100 year flood", 
		"Alges 50 year flood", 
		"Alges 500 year flood", 
		"Alges Annual Damage - Industrial fixed assets - Basement (Permillage)", 
		"Alges Annual Damage - Industrial fixed assets - Ground floor (Permillage)", 
		"Alges Annual Damage - No industrial fixed assets - Basement (Permillage)", 
		"Alges Annual Damage - No industrial fixed assets - Ground floor (Permillage)", 
		"Alges Annual Damage - Residential Inventory - Basement (Permillage)", 
		"Alges Annual Damage - Residential Inventory - Ground floor (Permillage)", 
		"Alges Annual Damage - Stocks - Basement (Permillage)", 
		"Alges Annual Damage - Stocks - Ground floor (Permillage)", 
		"Alges Annual Damage - Structure (Permillage)"
	],

	[
		"Coimbra downtown 100 year flood", 
		"Coimbra downtown 50 year flood", 
		"Coimbra downtown 500 year flood", 
		"Coimbra downtown Annual Damage - Industrial fixed assets - Basement (Permillage)", 
		"Coimbra downtown Annual Damage - Industrial fixed assets - Ground floor (Permillage)", 
		"Coimbra downtown Annual Damage - No industrial fixed assets - Basement (Permillage)", 
		"Coimbra downtown Annual Damage - No industrial fixed assets - Ground floor (Permillage)", 
		"Coimbra downtown Annual Damage - Residential Inventory - Basement (Permillage)", 
		"Coimbra downtown Annual Damage - Residential Inventory - Ground floor (Permillage)", 
		"Coimbra downtown Annual Damage - Stocks - Basement (Permillage)", 
		"Coimbra downtown Annual Damage - Stocks - Ground floor (Permillage)", 
		"Coimbra downtown Annual Damage - Structure (Permillage)", 
		"Coimbra south 100 year flood", 
		"Coimbra south 50 year flood", 
		"Coimbra south 500 year flood", 
		"Coimbra south Annual Damage - Industrial fixed assets - Basement (Permillage)", 
		"Coimbra south Annual Damage - Industrial fixed assets - Ground floor (Permillage)", 
		"Coimbra south Annual Damage - No industrial fixed assets - Basement (Permillage)", 
		"Coimbra south Annual Damage - No industrial fixed assets - Ground floor (Permillage)", 
		"Coimbra south Annual Damage - Residential Inventory - Basement (Permillage)", 
		"Coimbra south Annual Damage - Residential Inventory - Ground floor (Permillage)", 
		"Coimbra south Annual Damage - Stocks - Basement (Permillage)", 
		"Coimbra south Annual Damage - Stocks - Ground floor (Permillage)", 
		"Coimbra south Annual Damage - Structure (Permillage)", 
	],

	[
		"Lisbon 100 year flood", 
		"Lisbon 50 year flood", 
		"Lisbon 500 year flood", 
		"Lisbon Annual Damage - Industrial fixed assets - Basement (Permillage)", 
		"Lisbon Annual Damage - Industrial fixed assets - Ground floor (Permillage)", 
		"Lisbon Annual Damage - No industrial fixed assets - Basement (Permillage)", 
		"Lisbon Annual Damage - No industrial fixed assets - Ground floor (Permillage)", 
		"Lisbon Annual Damage - Residential Inventory - Basement (Permillage)", 
		"Lisbon Annual Damage - Residential Inventory - Ground floor (Permillage)", 
		"Lisbon Annual Damage - Stocks - Basement (Permillage)", 
		"Lisbon Annual Damage - Stocks - Ground floor (Permillage)", 
		"Lisbon Annual Damage - Structure (Permillage)", 
	],

	[
		"Oporto 100 year flood", 
		"Oporto 50 year flood", 
		"Oporto 500 year flood", 
		"Oporto Annual Damage - Industrial fixed assets - Basement (Permillage)", 
		"Oporto Annual Damage - Industrial fixed assets - Ground floor (Permillage)", 
		"Oporto Annual Damage - No industrial fixed assets - Basement (Permillage)", 
		"Oporto Annual Damage - No industrial fixed assets - Ground floor (Permillage)", 
		"Oporto Annual Damage - Residential Inventory - Basement (Permillage)", 
		"Oporto Annual Damage - Residential Inventory - Ground floor (Permillage)", 
		"Oporto Annual Damage - Stocks - Basement (Permillage)", 
		"Oporto Annual Damage - Stocks - Ground floor (Permillage)", 
		"Oporto Annual Damage - Structure (Permillage)", 
	],

	[
		"Annual Average Losses (Permillage)", 
		"Number of Claims", 
		"Number of Flood Events", 
		"Total Claims Cost", 
		"Total Claims Cost (Eur)",
		"Default Polygon", 
	]

];




var baseLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ", {
	id: "mapbox.streets",
	opacity: 0.6
});

map.addLayer(baseLayer);

var ciracWMSUrl = "http://195.23.53.30:8080/geoserver/wms";

var array, wmsLayers = [], wmsLegends = [];

for(var i=0; i<layerTitles.length; i++){

	array = layerTitles[i];
	wmsLayers.push({});
	wmsLegends.push({});
	
	for(var j=0; j<array.length; j++){

		wmsLayers[i][array[j]] = L.tileLayer.wms(ciracWMSUrl, {
			layers: array[j],
			format: "image/png",
			transparent: true,
		});

		wmsLayers[i][array[j]].arrayIndex = i;

		var legendUrl = (ciracWMSUrl + "?" + 
							"request=GetLegendGraphic&" + 
							"format=image/png&" + 
							"layer=" + array[j]
						).replace(" ", "+");


		wmsLegends[i][array[j]] = new L.Control.WMSLegend({uri: legendUrl});
		

	}
}

for(i=0; i<wmsLayers.length; i++){
	map.addControl(L.control.layers(wmsLayers[i], undefined));	
}

//map.addControl(wmsLegends[0]["Basic Flood Vulnerability Index (BGRI)"]);

// var wms = L.tileLayer.wms("http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer", {
// 			layers: "31",
// 			format: "image/png",
// 			transparent: true,
// 		});
// map.addLayer(wms);

map.on("layeradd", function(e){

	if(e.layer instanceof L.TileLayer && e.layer.wmsParams){

		var layerName = e.layer.wmsParams.layers;
		var i = e.layer.arrayIndex;

		map.addControl(wmsLegends[i][layerName])
	}
});

map.on("layerremove", function(e){

	if(e.layer instanceof L.TileLayer && e.layer.wmsParams){

		var layerName = e.layer.wmsParams.layers;
		var i = e.layer.arrayIndex;

		map.removeControl(wmsLegends[i][layerName])
	}
});




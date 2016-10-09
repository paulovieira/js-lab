var layers = [
    new ol.layer.Tile({
        opacity: 0.4,
        source: new ol.source.OSM({
          url: "http://{a-c}.tile.osm.org/{z}/{x}/{y}.png"

        })
    }),
    new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer',
            params: { 'LAYERS': '153,144' },
            //serverType: 'geoserver'
        })
    })
];
var map = new ol.Map({
    layers: layers,
    target: 'map',
    view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([-25.5, 37.78]),
        
        // projection: 'EPSG:4326',
        // center: [-25.5, 37.78],

        zoom: 12
    })
});

//console.log(ol.proj)
var t1 = ol.proj.transform([-25.856712, 37.699594], 'EPSG:4326', 'EPSG:3857')
var t2 = ol.proj.transform([-25.131539, 37.911326], 'EPSG:4326', 'EPSG:3857')
console.log(t1)
console.log(t2)

//-2878356.01343, 4537075.0089
//-2797630.12433, 4566906.71293


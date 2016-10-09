var map;
function init(){
    var mapOptions = {
    projection: new OpenLayers.Projection('EPSG:3857'),
    maxResolution: 156543.033928,
    units: 'm',
    numZoomLevels: 19,
    maxExtent: new OpenLayers.Bounds(-20037508.3428, -20037508.3428, 20037508.3428,
20037508.3428)
    };

    map = new OpenLayers.Map('map', mapOptions);

    var layer = new OpenLayers.Layer.TMS('TMS my_wms_test', 'http://localhost:8082/tms/',
        {layername: 'my_wms_test/EPSG3857', type: 'png',
         tileSize: new OpenLayers.Size(256, 256)
    });

    map.addLayer(layer)
    map.zoomToExtent(new OpenLayers.Bounds(-2878356.01, 4537075.01, -2797630.12,
4566906.71));
}
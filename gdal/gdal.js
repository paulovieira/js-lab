var gdal = require("gdal");
var shape = "/home/pvieira/prac/dados_gis/clima/referencia/Raster/Azo_Cor/1990/Stats/2188_new/rain_annual_2188/rain_annual.shp";

var dataset = gdal.open(shape);
var layer = dataset.layers.get(0);

console.log("number of features: " + layer.features.count());
console.log("fields: " + layer.fields.getNames());
console.log("extent: " + JSON.stringify(layer.getExtent()) );
console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'));

console.log(Object.keys(layer))


//driver = gdal.drivers.get('ESRI Shapefile');
var ds = gdal.open(shape);
var layer = ds.layers.get(0);
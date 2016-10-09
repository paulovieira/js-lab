var Path = require("path");
var Crypto = require("crypto");
var Glob = require("glob");
var Shell = require("shelljs");
var Fs = require("fs-extra");
var Chalk = require("chalk");

var random = Crypto.createHash("md5").update(Date.now().toString()).digest("hex");

var variables = [], directories = [];

var gdal_polygonize_program = "/home/pvieira/github/gdal_polygonize.js/index.js";



//referencia (anual)
/*
variables.push("rain_annual");
//variables.push("rhmax_annual");
// variables.push("rhmin_annual");
// variables.push("tmax_annual.max");
// variables.push("tmax_annual");
// variables.push("tmed_annual");
// variables.push("tmin_annual.min");
// variables.push("tmin_annual");



directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Cor/1990/Stats");
//directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Fai/1990/Stats");
// directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Flo/1990/Stats");
// directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Gra/1990/Stats");
// directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Pic/1990/Stats");
// directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Sjo/1990/Stats");
// directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Sma/1990/Stats");
// directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Smg/1990/Stats");
// directories.push("/home/pvieira/prac/dados_gis/Clima/Referencia/Raster/Azo_Ter/1990/Stats");

var outputDirectory = "/home/pvieira/prac/dados_gis/Clima/Referencia/SHP/Stats_temp";


*/



// cenários (anual)

variables.push("rain_sum_anomalia");
variables.push("rhmax_annual_anomalia");
variables.push("rhmin_annual_anomalia");
variables.push("tmax_annual_anomalia");
variables.push("tmed_annual_anomalia");
variables.push("tmin_annual_anomalia");

directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Corvo/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Faial/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Flores/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Graciosa/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Pico/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Jorge/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Maria/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Miguel/4.5_2010-2039/2039/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Terceira/4.5_2010-2039/2039/Stats");


var outputDirectory = "/home/pvieira/prac/dados_gis/Clima/Cenarios/SHP/4.5_2010-2039/Stats";
/**/


// pre-requisites

// create a temporary postgis table

variables.forEach(function(variable){

	var variable2 = variable.replace(".", "_");
	var tempTable = "a_" + variable2 + "_" + random.substring(0,5);

	// number of decimal place to keep
	var precision = 1;

	var psql_drop_table = `
		psql --dbname=150608 --command="DROP TABLE IF EXISTS geo.${ tempTable };"
	`;
	console.log(Chalk.green("[shelljs] ") + psql_drop_table.trim());
	Shell.exec(psql_drop_table.trim());
	var firstRun = true;

	directories.forEach(function(directory){


		var epsg = 0;

		if(isOcidental(directory)){
			epsg = 2188;
		}
		else if(isCentral(directory)){
			epsg = 3063;
		}
		else if(isOriental(directory)){
			epsg = 3062;
		}
		else{
			throw new Error("Unknown group")
		}

		var inputRaster = Path.join(directory, variable + ".tif");
		var tempRaster = Path.join(directory, epsg.toString(), variable2 + ".tif");
		Fs.ensureDirSync(Path.join(directory, epsg.toString()));

		// step 1 - call gdal_translate.py (convert the raster CRS to 1288)	
		var gdal_translate = `
			gdal_translate \
				-co COMPRESS=LZW \
				-stats \
				-a_srs EPSG:${ epsg } \
				${ inputRaster } \
				${ tempRaster }
		`;

		console.log(Chalk.green("[shelljs] ") + gdal_translate.trim());
		Shell.exec(gdal_translate.trim());
		//console.log(gdal_translate)


		var tempShape = Path.join(directory, epsg.toString(), "shapes", variable2 + ".shp");
		Fs.ensureDirSync(Path.join(directory, epsg.toString(), "shapes"));

		// step 2 - call gdal_polygonize.js (create the shape)
		var gdal_polygonize = `
			node \
				${ gdal_polygonize_program } \
				--input ${ tempRaster } \
				--output ${ tempShape } \
				--round 0.1\
				--precision ${ precision } \
				--format "ESRI Shapefile" \
				--fieldname "value"
		`;

		console.log(Chalk.green("[shelljs] ") + gdal_polygonize.trim());
		var output = Shell.exec(gdal_polygonize.trim());
		if(output.code!==0){
			throw new Error("Error running gdal_polygonize.js");
		}


		// step 3 - call shp2pgsql (append to the postgis database)
		
		var shp2pgsql = `
			shp2pgsql \
			${ firstRun ? "" : "-a" } \
			-s ${ epsg }:4326 \
			${ tempShape } \
			geo.${ tempTable }  \
			|  psql --dbname=150608 --quiet 
		`;

		//console.log(shp2pgsql);

		console.log(Chalk.green("[shelljs] ") + shp2pgsql.trim());
		Shell.exec(shp2pgsql.trim());
		firstRun = false;


	});

	// step 4 - postprocessing

	// step 4.1 - remove geometries with no-value
	var psql_delete_no_value = `
		psql --dbname=150608 --command="DELETE FROM geo.${ tempTable } WHERE abs(value) > 1000000;"
	`;

	console.log(Chalk.green("[shelljs] ") + psql_delete_no_value.trim());
	Shell.exec(psql_delete_no_value.trim());


	// step 4.2 - round the values (use the same precision as in gdal_polygonize)
	var psql_round = `
		psql --dbname=150608 --command="UPDATE geo.${ tempTable } SET value = round(value, ${ precision });"
	`;

	console.log(Chalk.green("[shelljs] ") + psql_round.trim());
	Shell.exec(psql_round.trim());


	// step 4.3 - call pgsql2shp (save in a final 4326 shape)
	var outputDir = Path.join(outputDirectory, variable2 + "_4326");
	Shell.rm("-rf", outputDir);
	Fs.ensureDirSync(outputDir);

	var pgsql2shp = `
		pgsql2shp -f ${ Path.join(outputDir, variable2 + ".shp") } 150608 geo.${ tempTable }
	`;
	console.log(Chalk.green("[shelljs] ") + pgsql2shp.trim());
	Shell.exec(pgsql2shp.trim());


	// step 4.4 - delete tempTable
	console.log(Chalk.green("[shelljs] ") + psql_drop_table.trim());
	Shell.exec(psql_drop_table.trim());

});




// Grupo Ocidental: Corvo, Flores
function isOcidental(directory){

	return directory.indexOf("Azo_Cor")!==-1 
		|| directory.indexOf("Azo_Flo")!==-1

		|| directory.indexOf("Corvo") !==-1
		|| directory.indexOf("Flores")!==-1;
}

// Grupo Central: Faial, Graciosa, Pico, São Jorge, Terceira
function isCentral(directory){

	return directory.indexOf("Azo_Fai")!==-1 
		|| directory.indexOf("Azo_Gra")!==-1
		|| directory.indexOf("Azo_Pic")!==-1
		|| directory.indexOf("Azo_Sjo")!==-1
		|| directory.indexOf("Azo_Ter")!==-1

		|| directory.indexOf("Faial")   !==-1 
		|| directory.indexOf("Graciosa")!==-1
		|| directory.indexOf("Pico")    !==-1
		|| directory.indexOf("S_Jorge") !==-1
		|| directory.indexOf("Terceira")!==-1;
}

// Grupo Oriental: Santa Maria, São Miguel
function isOriental(directory){

	return directory.indexOf("Azo_Sma")!==-1 
		|| directory.indexOf("Azo_Smg")!==-1

		|| directory.indexOf("S_Maria") !==-1 
		|| directory.indexOf("S_Miguel")!==-1;
}


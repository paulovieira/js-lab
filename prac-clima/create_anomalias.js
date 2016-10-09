var Path = require("path");
var Shell = require("shelljs");
var Chalk = require("chalk");

var variables = [], directories = [], directoriesFuturo = [];


// cenários (anual)

variables.push("rain_sum");
variables.push("rhmax_annual");
variables.push("rhmin_annual");
variables.push("tmax_annual");
variables.push("tmed_annual");
variables.push("tmin_annual");

directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Corvo/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Faial/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Flores/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Graciosa/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Pico/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Jorge/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Maria/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Miguel/Normal_Observado/1990/Stats");
directories.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Terceira/Normal_Observado/1990/Stats");

directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Corvo/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Faial/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Flores/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Graciosa/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Pico/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Jorge/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Maria/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/S_Miguel/4.5_2070-2099/2099/Stats");
directoriesFuturo.push("/home/pvieira/prac/dados_gis/Clima/Cenarios/Corridas_1000x1000/Terceira/4.5_2070-2099/2099/Stats");

variables.forEach(function(variable){

	directories.forEach(function(directory, i){

		var reference = Path.join(directory, variable);
		var projected = Path.join(directoriesFuturo[i], variable);

		var gdal_calc = `
gdal_calc.py --overwrite --creation-option="COMPRESS=LZW" -A ${ reference }.tif -B ${ projected }.tif --outfile=${ projected}_anomalia.tif  --calc="${ variable==='rain_sum' ? "(B - A)/A*100" : "B - A" } "
		`;

		console.log(Chalk.green("[shelljs] ") + gdal_calc.trim());
		Shell.exec(gdal_calc.trim());
	});

});


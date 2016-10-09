var Fs = require("fs-extra");

var time     = Fs.readJsonSync("./json/time.json").time;
var timeBnds = Fs.readJsonSync("./json/time_bnds.json").time_bnds;
var tasmax   = Fs.readJsonSync("./json/tasmax.json").tasmax;
var lat      = Fs.readJsonSync("./json/lat.json").lat;
var lon      = Fs.readJsonSync("./json/lon.json").lon;


if(lat.length !== lon.length){
    throw new Error("lat.length !== lon.length");
}

var input = "";
var initialTime = 0;
var numPoints = lat.length;

for(var t=initialTime; t<time.length; t++){
    for(var y=0; y<lat.length; y++){

        var value = tasmax[t*numPoints + y];
        if(value === null){
            continue;
        }

        // time
        input += formatTime(time[t]) + " | ";

        // time_bnds
        input += "[" + formatTime(timeBnds[t*2]) + ", " + formatTime(timeBnds[t*2 + 1]) + "] | ";

        // value of the main variable (convert from K to ºC)
        input += (value - 273.15) + " | ";

        // geojson of the coordinate
        input += '{"type": "Point", "coordinates": [' + lon[y] + ',' + lat[y] + ' ]}\n';

    }
}

Fs.writeFileSync("./json/input_tasmax.txt", input);


// function isInBox(lon, lat){
//     var minLat = 36.8928,
//         maxLat = 42.2244,
//         minLon = -9.5691,
//         maxLon = -6.1194;


//     if(lat > maxLat || lat < minLat || lon > maxLon || lon < minLon){
//         return false;
//     }

//     return true;
// }


// if the time string is in the format "2006-01-16 12", return "2006-01-16 12:"
function formatTime(t){

    if((t.split("-")[2]).split(" ").length === 2){
        return t + ":";
    }

    return t;
}

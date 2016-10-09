var Path = require("path");
var Shell = require("shelljs")
var Nes = require('nes');

var internals = {};

internals.humidityThreshold = 100;

internals.open = function(){
    //Shell.exec("echo 'open'");
    console.log("open");
    Shell.exec("echo 1 > /sys/class/gpio/gpio4/value");
}

internals.close = function(){
    //Shell.exec("echo 'close'");
    console.log("close");
    Shell.exec("echo 0 > /sys/class/gpio/gpio4/value");
}

internals.handler = function (data) {

    console.log("data: ", data)

/*
    if(data.humidity){
        if(data.humidity > internals.humidityThreshold){
            internals.open();
        }
        else{
            internals.close();
        }        
    }
*/
    if(data.action){
        if(data.action === "open"){
            internals.open();
        }
        else{
            internals.close();
        }        
    }

};

exports.register = function(server, options, next) {

    var host = process.env.NODE_ENV === "dev" ? "localhost:8000" : "spinon.paulovieira.net";
    console.log("host: ", host)

    var client = new Nes.Client('ws://' + host);
    client.connect(function (err) {

        client.subscribe('/ws/actions', internals.handler, function (err) { });
    });

    return next();
};

exports.register.attributes = {
    name: Path.parse(__dirname).name, // use the name of the file
    dependencies: []
};




var Radio = require("backbone.radio");

var internals = {};

// all the available views
internals.applications = {
    MainApp: require("./main-app"),
    MapsApp: require("./maps-app"),
    SourcesApp: require("./sources-app")
};

var channel = Radio.channel("applications");

channel.reply("start", function(options){

    //debugger;
    var App = internals.applications[options.app];
    if(!App){
        throw new Error("The application class does not exist: " + options.vapp);
    }
    
    var app = new App(options.appOptions || {});
    app.start();
    
});

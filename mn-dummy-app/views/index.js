var Radio = require("backbone.radio");

var internals = {};

// all the available views
internals.views = {
    MenuLV: require("./menu-lv/menu-lv"),
    MapsLV: require("./maps-lv/maps-lv"),
    SourcesLV: require("./sources-lv/sources-lv")
};

var channel = Radio.channel("views");

channel.reply("show", function(options){

    //debugger;
    var View = internals.views[options.view];
    if(!View){
        throw new Error("The view class does not exist: " + options.view);
    }

    var v = new View(options.viewOptions || {});
    options.region.show(v);
    
});

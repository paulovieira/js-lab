var Radio = require("backbone.radio");
var Mn = require("backbone.marionette");

var internals = {};

internals.channel = Radio.channel('maps');
Radio.tuneIn('maps');

var MapsAppState = Mn.State.extend({

    defaultState: {},

    componentEvents: {
        'foo': 'onFoo',
    },

    onFoo: function() {
        console.log("foo @ maps app")
        debugger;
    },

});

var MapsApp = Mn.Application.extend({
    state: new MapsAppState({
        component: internals.channel,
    }),

    channel: internals.channel,

    onBeforeStart: function() {
        //debugger;
    },

    onStart: function(options) {
        // debugger;
        options = options || {};
        this.attachOptions(options);

        if(!this.region){
            throw new Error("This application requires a region");
        }

        Radio.channel("views").request("show", {
            region: this.region, 
            view: "MapsLV", 
            options: {

            }
        });
    },

    onBeforeStop: function() {
        //debugger;
    },

    onStop: function() {
        // debugger;
        this.detachOptions();
    }
});

module.exports = MapsApp;

var Radio = require("backbone.radio");
var Mn = require("backbone.marionette");

var internals = {};

internals.channel = Radio.channel('sources');
Radio.tuneIn('sources');

var SourcesAppState = Mn.State.extend({

    defaultState: {},

    componentEvents: {
        'foo': 'onFoo',
    },

    onFoo: function() {
        console.log("foo @ sources app")
        debugger;
    },

});

var SourcesApp = Mn.Application.extend({
    state: new SourcesAppState({
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
            view: "SourcesLV", 
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

module.exports = SourcesApp;

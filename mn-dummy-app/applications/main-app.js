var Radio = require("backbone.radio");
var Mn = require("backbone.marionette");

var internals = {};

internals.channel = Radio.channel('main');
Radio.tuneIn('main');

var MainAppState = Mn.State.extend({

    defaultState: {},

    componentEvents: {
        'foo': 'onFoo'
    },

    onFoo: function() {
        var now = Date.now();
        console.log("foo @ main app")
        //debugger;
        this.set("foo", now)
    },

});

var MainApp = Mn.Application.extend({

    initialize: function(options){
    },

    name: "main-app",
    stateClass: MainAppState,
    stateEvents: {
        "change:foo": "onChangeFoo"
    },
    onChangeFoo: function(arg1, arg2, arg3){
        //debugger;
    }

    // TODO: what to do about the state and the events?
    // state: we should emit the "destroy" event so that the state will unbind 
    // channel: reset (but then we will have problems if we want the same app started two times,
        // at the same time)

});


module.exports = MainApp;

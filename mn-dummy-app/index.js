
require("./_config/config");

var $ = require("jquery");
var Mn = require("backbone.marionette");
var Radio = require("backbone.radio");
var MainApp = require("./applications/main-app");

debugger;
Radio.channel("applications").request("start", {
    app: "MainApp",
    appOptions: {
        region: new Mn.Region({ el: $("<div id='mn-r-main'>").prependTo("body") }),
        channel: Radio.channel("main"),
        initialView: "MenuLV",
        initialViewOptions: {
            className: "xxx",
            model: new Backbone.Model({ name: "paulo"})
        },        
    }

});



if (NODE_ENV === "dev") {
//    window.mainApp = mainApp;
////    window.mainAppState = mainApp.state;
}

/*
*/



/*
var AppState = Mn.State.extend({

    defaultState: {
        xyz: 2,
        bbb: 3
    },

    componentEvents: {
        'foo': 'onFoo'
    },

    onFoo: function(arg1, arg2, arg3) {
        debugger;
        this.set("xyz", Date.now())
    },

});



var MainApp = Mn.Application.extend({

    start: function(arg1, arg2){
        debugger;
    },

    destroy: function(){
        debugger
        this.channel.trigger("destroy");
    },

    // the state object will listen to the events triggered by the appChannel
    // (events listed in the componentEvents hash)
    stateClass: AppState,
    stateEvents: {
        "change:xyz": "onXyz"
    },

    onXyz: function(arg1, arg2, arg3){

        debugger;
    },


});

var app = new MainApp({
    region: new Mn.Region({el: "body"}),
    channel: Radio.channel("main"),
});

window.app = app;
window.appChannel = app.channel;
window.appState = app.state;

// todo: the logic to show the initial view should be in the initialize method, along with a getInitialView


//app.start();
//debugger;

*/

/*
var ViewState = Mn.State.extend({

    defaultState: {
        xyz: 1
    },

    // the state object will listen to the events triggered by the view object (the component)
    componentEvents: {
        'button:clicked': 'onButtonClicked'
    },
    onButtonClicked: function(arg1, arg2, arg3) {
        debugger;
        this.set("xyz", Date.now())
    },

});

var View = Mn.ItemView.extend({
    initialize: function(){
        // this.state = new ViewState({ component: this })
        // Mn.State.syncEntityEvents(this, this.state, this.stateEvents)
    },
    template: _.template("<button>click me </button>"),
    events: {
        "click": function(e){
            debugger;
            this.trigger("button:clicked")
        }
    },

    // the view object will listen to the events triggered by the state object
    stateClass: ViewState,
    stateEvents: {
        "change:xyz": "onXyz"
    },
    onXyz: function(arg1, arg2, arg3){
        debugger;
    },

})


var view = window.view = new View;
var r = new Mn.Region({el: "body"})
r.show(view)
*/

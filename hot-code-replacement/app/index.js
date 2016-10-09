var $ = require("jquery");
window.$ = $;

var _ = require("underscore");

// the following require calls are necessary so that the plugin attach to the respective objects
// (example: Marionette.Service)

// backbone.marionette will require: backbone, underscore
// backbone will require: underscore, jquery
var Mn = require("backbone.marionette");

// marionette.state will require: underscore, backbone, backbone.marionette
var State = require("marionette.state");
Mn.State = State;


// register the radio services into the radio
require('./services');

/*
var Radio = require('backbone.radio');

Radio.channel("log").request("log", "aaa");
Radio.channel("log").request("logError", "bbb");
Radio.channel("log").request("logWarning", "ccc");


Radio.channel("other").request("foo");
Radio.channel("other").trigger("bar");

var MainView = require("./main/main");


var mainRegion = new Mn.Region({
    el: "#mn-r-main"
});

var mainView = new MainView({
});


mainRegion.show(mainView); 
*/




// Listens to view events and updates view state attributes.
var ButtonState = Mn.State.extend({
    defaultState: {
        active: false
    },

    componentEvents: {
        'togglex': 'onToggle'
    },

    onToggle() {

        var active = this.get('active');
        this.set('active', !active);
    }
});


// A toggle button that is alternately "active" or not.
var ButtonIV = Mn.ItemView.extend({
    template: _.template('<button class="js-toggle">Toggle Me <%= now %></button>'),

    ui: {
        "btn": "button.js-toggle"
    },

    triggers: {
        'click @ui.btn': 'togglex'
    },

    stateEvents: {
        'change:active': 'onChangeActive'
    },

    // Create and sync with my own State.
    initialize: function() {
        this.state = new ButtonState({ 
            component: this 
        });
        window.buttonState = this.state;

        Mn.State.syncEntityEvents(this, this.state, this.stateEvents, 'render');
    },

    onBeforeRender: function(){
        
        debugger;

        console.log(this.model.get("now"))
        this.model.set("now", Date.now())
        
    },

    // Active class will be added/removed on render and on 'active' change.
    onChangeActive(state, active) {
        debugger;
        
        if (active) {
            this.$(".js-toggle").addClass('is-active');
        } else {
            this.$(".js-toggle").removeClass('is-active');
        }
    }
});

var model = new Backbone.Model({
    now: Date.now()
});
var buttonIV = new ButtonIV({
    model: model
});

var mainRegion = new Mn.Region({
    el: "#mn-r-main"
});

mainRegion.show(buttonIV);

var Mn = require("backbone.marionette");
var Radio = require("backbone.radio");
var _ = require("underscore");

// marionette.toolkit will require: backbone.marionette, underscore, backbone
var ToolkitAbstractApp = require("marionette.toolkit").AbstractApp;

// override Mn.Application
Mn.Application = ToolkitAbstractApp.extend({

    constructor: function(options) {
//debugger;
        this.mergeOptions(options, ['region', 'channel', 'initialView', 'initialViewOptions', 'name']);

        if (!this.region) {
            throw new Error('The application instance requires a region');
        }
        if (!(this.region instanceof Mn.Region)) {
            throw new Error('The region property must be an instance of Mn.Region');
        }

        if (this.channel) {
            if (!(this.channel instanceof Radio.Channel)) {
                throw new Error('The channel property must be an instance of Radio.Channel');
            }

            var stateClass = this.getOption("stateClass");
            if (stateClass && stateClass.prototype instanceof Mn.State) {

                this.state = new stateClass({ 
                    component: this.channel,
                    initialState: stateClass.prototype.initialState
                });

                if (!this.stateEvents) {
                    console.warn("stateEvents is missing");
                } else {
                    Mn.State.syncEntityEvents(this, this.state, this.stateEvents);
                }
            }

        }

        ToolkitAbstractApp.call(this, options);
    },

    stop: function(){

        // destroy the region
        this.region.empty();
        ToolkitAbstractApp.prototype.stop.apply(this, arguments);        
    },

    onStart: function(){
        //debugger;
        if(this.initialView){
            this.show();            
        }

    },

    show: function() {
        //debugger;
        if(this.initialView){
            Radio.channel("views").request("show", {
                region: this.region, 
                view: this.initialView, 
                viewOptions: _.extend({ 
                    "js-app-initial-view": "js-" + (this.name || "app-initial-view") 
                }, this.initialViewOptions)
            });            
        }
    },


    destroy: function(){
        //debugger;

        // destroy the region
        this.region.reset();
        this.region.destroy();

        // the state will delete the event handlers after the "destroy" event (on the component)
        if(this.channel){
            this.channel.trigger("destroy");
        }

        ToolkitAbstractApp.prototype.destroy.apply(this, arguments);
    }

});

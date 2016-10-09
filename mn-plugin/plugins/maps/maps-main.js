require("./maps-main.css");

var Mn = require("backbone.marionette");

var MapsMainState = Mn.State.extend({

    initialize: function(){
    },

    defaultState: {
        selectedMap: null
    },

    componentEvents: {
        "change:selectedMap": "onChangeSelectedMap"
    },

    onChangeSelectedMap: function(value) {
//debugger;
        this.set("selectedMap", value);
    },

});

var MapsMain = window.MapsMain = Mn.LayoutView.extend({

    initialize: function(options){
    },

    template: require('./maps-main.html'),

    ui: {
        "selection": "select.maps-selection"
    },

    events: {
        "change @ui.selection": function(e){
            //debugger;
            var value = $(e.target).val();
            value = value.substring("map-".length);
            this.trigger("change:selectedMap", value);
        }
    },

    onAttach: function(){
    },

    regions: {
        content: "div#mn-r-maps-main"
    },

    onBeforeAttach: function(){
    },

    stateClass: MapsMainState,
    stateEvents: {
        'change:selectedMap': 'onChangeSelectedMap'
    },

    onChangeSelectedMap: function(state, value, options){

        //debugger;
        if(!value){ return; }

        var region = this.getRegion("content");
        
        if(value==="none"){
            region.reset();
            return;
        }

        // the view's channel is the channel of the plugin where the view was added
        this.channel.request("show", {
            region: region,
            view: "map-selection",
            viewOptions: {
                model: this.state.getModel()
            }
        });
    }



});

if(NODE_ENV==="dev"){
//    window.Menu = Menu;
}

module.exports = MapsMain;

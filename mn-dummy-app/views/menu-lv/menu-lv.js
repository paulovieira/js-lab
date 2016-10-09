var $ = require("jquery");
var _ = require("underscore");
var Mn = require("backbone.marionette");
var Radio = require("backbone.radio");

var pic = require("../../_images/pic.png");

var MenuState = Mn.State.extend({

    initialize: function(){
    },

    defaultState: {},

    componentEvents: {
        "item:clicked": "onItemClicked"
    },

    onItemClicked: function(item) {

        this.set("item", item);

        if(item==="maps"){
            this.set("menuApp", "MapsApp");
        }
        if(item==="sources"){
            this.set("menuApp", "SourcesApp");
        }
        else{
            throw new Error("unknown item")
        }
        // who should now start the app relative to the clicked item?
        // by default we use the state associated to the view where the
        // event happened; if at a later time we realize that we need to 
        // start from some other application above, we change the logic to that
        // other application and trigger a radio event
    },

});


var MenuLV = Mn.LayoutView.extend({

    initialize: function(options){

    },

    template: require('./menu-lv.html'),

    ui: {
        item: "li",
    },

    events: {
        "click @ui.item": function(e){

            var id = $(e.target).prop("id");
            id = id.substring("js-menu-".length);
            this.trigger("item:clicked", id);
        }
    },

    stateClass: MenuState,
    stateEvents: {
        //'change:item': 'onChangeItem'
        'change:menuApp': 'onChangeMenuApp'
    },

    onChangeMenuApp: function(state, value, options){
        if(!value){ return; }
        debugger;

        var previous = state.previousAttributes();

        if(previous.menuApp){
            //Radio.channel("applications").request("stop", previous.item)
        }

        //Radio.channel("applications").request("stop", previous.item)
    },

    onChangeItem: function(state, value, options){
        
        if(!value){ return; }
        debugger;
    /*
        var previous = state.previousAttributes();

        if(previous.item){
            Radio.channel("applications").request("stop", previous.item)
        }

        var appOptions = {
            app: 
        };
        Radio.channel("applications").request("start", )
*/
    },

    onAttach: function(){
    },

    regions: {
        content: "div#mn-r-content"
    },

    onBeforeAttach: function(){

        //this.state.set("item", "maps");
        this.state.set("menuApp", "MapsApp");
    }


});

if(NODE_ENV==="dev"){
//    window.MenuLV = MenuLV;
}

module.exports = MenuLV;

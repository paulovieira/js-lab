var Mn = require("backbone.marionette");

var SourcesMain = window.SourcesMain = Mn.LayoutView.extend({

    initialize: function(options){

    },

    template: require('./sources-main.html'),


    onAttach: function(){
    },

    regions: {
        content: "div#mn-r-sources-a"
    },

    onBeforeAttach: function(){

        //this.state.set("item", "maps");
        //this.state.set("menuApp", "MapsApp");
    }


});

if(NODE_ENV==="dev"){
//    window.Menu = Menu;
}

module.exports = SourcesMain;

var Mn = require("backbone.marionette");
var _ = require("underscore");

var MapsLV = Mn.LayoutView.extend({

    initialize: function(options){

    },

    template: _.template(`
        <div>
            maps
        </div>

    `),

    regions: {
    },

    onAttach: function(){
    }


});

if(NODE_ENV==="dev"){
    window.MapsLV = MapsLV;
}


module.exports = MapsLV;

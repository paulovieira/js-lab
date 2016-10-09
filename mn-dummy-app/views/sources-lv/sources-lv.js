var Mn = require("backbone.marionette");
var _ = require("underscore");


var SourcesLV = Mn.LayoutView.extend({

    initialize: function(options){

    },

    template: _.template(`
        <div>
            sources
        </div>

    `),

    regions: {
    },

    onAttach: function(){
    }


});

if(NODE_ENV==="dev"){
    window.SourcesLV = SourcesLV;
}

module.exports = SourcesLV;

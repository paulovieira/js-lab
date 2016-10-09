var Mn = require("backbone.marionette");

var MapSelection = Mn.LayoutView.extend({

    initialize: function(options){
    },

    template: require('./map-selection.html'),

});

module.exports = MapSelection;

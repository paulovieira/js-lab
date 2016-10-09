//var $ = require('jquery');
//var Backbone = require('backbone');
var Mn = require('backbone.marionette');
//var Initiatives = require('../initiatives/initiatives');

var RootV = Mn.LayoutView.extend({

    template: require('./root.html'),
    
    ui: {
        'root-left': 'div[data-mn-region-id="root-left"]',
        'root-right': 'div[data-mn-region-id="root-right"]'
    },
    
    events: {
    },
    
    regions: {
        left: '@ui.root-left',
        right: '@ui.root-right'
    },

    onAttach: function(){
    }

});

module.exports = RootV;



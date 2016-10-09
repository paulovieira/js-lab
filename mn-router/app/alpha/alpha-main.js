//var $ = require('jquery');
//var Backbone = require('backbone');
var Mn = require('backbone.marionette');
//var Radio = require('backbone.radio');

var AlphaMainV = Mn.LayoutView.extend({

    template: require('./alpha-main.html'),

    ui: {
        'alphaTabContainer': 'div[data-mn-region-id="alpha-tab"]'
    },
   
    regions: {
        alphaTab: '@ui.alphaTabContainer'
    },
});

module.exports = AlphaMainV;



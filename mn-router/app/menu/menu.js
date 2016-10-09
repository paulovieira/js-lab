var Radio = require("backbone.radio");
var Mn = require('backbone.marionette');

var MenuV = Mn.LayoutView.extend({

    initialize: function(){

        //Radio.channel("public").on("menu:change", this.render);
    },

    template: require('./menu.html'),

});

module.exports = MenuV;



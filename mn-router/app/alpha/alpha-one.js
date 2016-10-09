//var $ = require('jquery');
//var Backbone = require('backbone');
var Mn = require('backbone.marionette');
//var Radio = require('backbone.radio');

var AlphaOneV = Mn.LayoutView.extend({

    modelEvents: {
        'change': 'render'
    },

    initialize: function(){

        this.model.set('_isReady', false, { silent: true });
    },
    template: require('./alpha-one.html'),
    onAttach: function(){

        console.timeEnd('total')
    },
    xonAttach: function(){
        console.log("alpha one - onAttach");

        // do some async task to obtain data
        var p = new Promise(window.getExecutor(Math.random() + 1000));
        p.then(function(){

            debugger;
            // data is available in this callback
            this.model.set('_isReady', true, { silent: true });
            var data = {x: 123, y: 456};
            this.model.set(data, { silent: true });
            this.render();
        }.bind(this))
    },
    xonRender: function(){
        debugger;
        console.log("alpha one - onRender");  
    },
    onDestroy: function(){

        clearInterval(this.timer);
    }
});

module.exports = AlphaOneV;

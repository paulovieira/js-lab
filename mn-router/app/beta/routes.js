var Radio = require("backbone.radio");

var rootR = Radio.channel("public").request("rootR");
var RootV = require('../root/root');
var MenuV = require('../menu/menu');

var BetaV = require('./beta');


var routes = [
    {
        path: 'b-new',
        handler: function(request, reply) {
    debugger;
            console.log('route: ' + request.uriFragment);
            reply(this.tree);

            //menuM.set(request.uriFragment, true)
            Radio.channel('public').trigger('menu:change', request.uriFragment);
        },

        tree: {
            // the top-level region must be given as a reference;
            // the regions in the children are given as strings (names of the region in the parent view)
            region: rootR,
            viewClass: RootV,
            children: [
                {
                    region: 'left',
                    viewClass: MenuV,
                },
                {
                    region: 'right',
                    viewClass: BetaV,
                    pre: function(){

                        var p = new Promise(window.getExecutor(Math.random() + 1000));
                        return p;
                    }
                }

            ]
        }
    }
];

module.exports = routes;

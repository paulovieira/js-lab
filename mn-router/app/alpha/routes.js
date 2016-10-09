var Backbone = require('backbone');
var Radio = require('backbone.radio');

var rootR = Radio.channel('public').request('rootR');
var RootV = require('../root/root');
var MenuV = require('../menu/menu');

var AlphaMainV = require('./alpha-main');
var AlphaOneV = require('./alpha-one');
var AlphaTwoV = require('./alpha-two');


var routes = [
    {
        path: 'a-new',
        handler: function(request, reply) {
    //debugger;
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
                    forceRender: true,
                },
                {
                    region: 'right',
                    viewClass: AlphaMainV,
                    //forceRender: true,
                    pre: function(){

                        //debugger;
                        var p = new Promise(window.getExecutor(Math.random() + 1000));
                        return p;
                    }
                }

            ]
        }
    },

    {
        path: 'a-new/one',
        handler: function(request, reply) {
    //debugger;
            console.log('route: ' + request.uriFragment);
            console.time('total');
            reply(this.tree);

            //menuM.set(request.uriFragment, true)
            Radio.channel('public').trigger('menu:change', request.uriFragment);
        },

        tree: {
            // rootR is the only region in the tree that is already in the DOM
            // all the other regions are detached from the DOM when the tree is being
            // rendered (with the call to `reply`); this is so because we are creating
            // new instances of the views, so the regions in those views are not in the DOM
            region: rootR,
            viewClass: RootV,
            children: [
                {
                    region: 'left',
                    viewClass: MenuV,
                    //forceRender: true,
                },
                {
                    region: 'right',
                    viewClass: AlphaMainV,
                    // forceRender: true
                    pre: function(){

                        //debugger;
                        var p = new Promise(window.getExecutor(Math.random() + 1000));
                        return p;
                    },
                    children: [
                        {
                            region: 'alphaTab',
                            viewClass: AlphaOneV,
                            pre: function(){

                                //debugger;
                                var p = new Promise(window.getExecutor(Math.random() + 2000));
                                return p;
                            },
                            viewOptions: {
                                model: new Backbone.Model()
                            }
                        }
                    ]
                }

            ]
        }
    },

    {
        path: 'a-new/two',
        handler: function(request, reply) {
    debugger;
            console.log('route: ' + request.uriFragment);
            reply(this.tree);

            //menuM.set(request.uriFragment, true)
            Radio.channel('public').trigger('menu:change', request.uriFragment);
        },

        tree: {

            region: rootR,
            viewClass: RootV,
            children: [
                {
                    region: 'left',
                    viewClass: MenuV,
                },
                {
                    region: 'right',
                    viewClass: AlphaMainV,
                    //forceRender: true,
                    children: [
                        {
                            region: 'alphaTab',
                            viewClass: AlphaTwoV
                        }
                    ]
                }

            ]
        }
    }
];

module.exports = routes;

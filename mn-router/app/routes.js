//var Backbone = require("backbone");
//var Mn = require('backbone.marionette');
//var Radio = require("backbone.radio");

//var RootV = require('./root/root');

//var MenuV = require('./menu/menu');
// var AlphaMainV = require('./alpha/alpha-main');
// var AlphaOneV = require('./alpha/alpha-one');
// var AlphaTwoV = require('./alpha/alpha-two');
//var BetaV = require('./beta/beta');

// similar to a selectable collection, but only at the level of the
// attributes of the model; 

/*
var MenuM = require('./entities/menu').MenuM;
var menuM = new MenuM();
Radio.channel("public").reply("menuM", menuM);
*/


//var rootR = Radio.channel("public").request("rootR");
/*
var routes = [];

routes.push({
    path: 'a-new',
    handler: function(request, reply) {
debugger;
        console.log('route a-new');
        reply(this.tree);

        menuM.set(request.uriFragment, true)
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
                viewClass: AlphaMainV,
            }

        ]
    }
});

routes.push({
    path: 'a-new/one',
    handler: function(request, reply) {
debugger;
        console.log('route a-new');
        reply(this.tree);

        menuM.set(request.uriFragment, true)
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
                viewClass: AlphaMainV,
                children: [
                    {
                        region: 'alphaTab',
                        viewClass: AlphaOneV
                    }
                ]
            }

        ]
    }
});


routes.push({
    path: 'a-new/two',
    handler: function(request, reply) {
debugger;
        console.log('route a-two');
        reply(this.tree);

        menuM.set(request.uriFragment, true)
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
                viewClass: AlphaMainV,
                children: [
                    {
                        region: 'alphaTab',
                        viewClass: AlphaTwoV
                    }
                ]
            }

        ]
    }
});


routes.push({
    path: 'b-new',
    handler: function(request, reply) {
debugger;
        console.log('route b-new');
        reply(this.tree);

        menuM.set(request.uriFragment, true)
        Radio.channel('public').trigger('menu:change', request.uriFragment);
    },

    //region: rootR,
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
            }

        ]
    }
});

routes.push({
    path: 'a',
    handler: function(request) {

        console.log('route a')
        var rootR = Radio.channel("public").request("rootR");

        //debugger;
        if(!(rootR.currentView instanceof RootV)){
            rootR.show(new RootV());
        }

        var leftR = rootR.currentView.getRegion('left');
        var rightR = rootR.currentView.getRegion('right');

        if(!(leftR.currentView instanceof MenuV)){
            leftR.show(new MenuV({ model: menuM }));   
        }

        if(!(rightR.currentView instanceof AlphaMainV)){
            rightR.show(new AlphaMainV());   
        }

        menuM.set(request.uriFragment, true)
        Radio.channel('public').trigger('menu:change', request.uriFragment);
    }
});


routes.push({
    path: 'a/:submenu',
    handler: function(request) {

        console.log('route a/:submenu')
        var rootR = Radio.channel("public").request("rootR");
        //debugger;

        //debugger;
        if(!(rootR.currentView instanceof RootV)){
            rootR.show(new RootV());
        }

        var leftR = rootR.currentView.getRegion('left');
        var rightR = rootR.currentView.getRegion('right');

        if(!(leftR.currentView instanceof MenuV)){
            leftR.show(new MenuV({ model: menuM }));   
        }

        if(!(rightR.currentView instanceof AlphaMainV)){
            rightR.show(new AlphaMainV());   
        }

        //TODO: add the subview here

        menuM.set(request.uriFragment, true)
        Radio.channel('public').trigger('menu:change', request.uriFragment);

    }
});


routes.push({
    path: 'b',
    handler: function(request) {
        
        console.log('route b')
        var rootR = Radio.channel("public").request("rootR");

        //debugger;
        if(!(rootR.currentView instanceof RootV)){
            rootR.show(new RootV());
        }

        var leftR = rootR.currentView.getRegion('left');
        var rightR = rootR.currentView.getRegion('right');
        
        if(!(leftR.currentView instanceof MenuV)){
            leftR.show(new MenuV({ model: menuM }));   
        }

        if(!(rightR.currentView instanceof BetaV)){
            rightR.show(new BetaV());   
        }

        menuM.set(request.uriFragment, true)
        Radio.channel('public').trigger('menu:change', request.uriFragment);
    }
});
    
menuM.set('b', false, { silent: true });
*/



//module.exports = routes;

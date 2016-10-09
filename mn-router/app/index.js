function getExecutor(l){

    //console.log('timeout: '+ l)
    return function(resolve, reject){

        //console.log('begin executor')
        setTimeout(function(){
            //debugger;
            return resolve({ type: 'success' });

            //console.log('async task terminated')
            var lastDigit = Number(l.toString().slice(-1));
            console.log("lastDigit: ", lastDigit)

            if(lastDigit % 2 === 0){
                return resolve({ type: 'even', l: l})
            }
            else{
                return reject(new Error('not even'))
            }
        }, l)

        //console.log('end executor')
    }
};

window.getExecutor = getExecutor;

/*
console.log("hello index @ " + Date.now());



var p1 = new Promise(getExecutor(Math.random() + 1));
var p2 = new Promise(getExecutor(Math.random() + 2));

var p3 = Promise.all([p1, p2])
    .then(function(data){

        console.log('data: ', data)
    });

p4 = p3.catch(function(err){

        console.log('err: ', err)
    });
*/


/**/
// load styles
require('./css/styles.css');

// load all libs
require('./_config/config');

var $ = require('jquery');
var Mn = require('backbone.marionette');
var Radio = require("backbone.radio");

var Router = require('./_config/router');

$('body').prepend('<div data-mn-region-id="root"></div>')

var rootR = new Mn.Region({
    el: '[data-mn-region-id=root]'
});

Radio.channel("public").reply("rootR", rootR);


// router must be started after the root region has been defined and set in the public channel
var router = new Router();
router.addRoutes(require('./alpha/routes'));
router.addRoutes(require('./beta/routes'));
router.start();




/*
console.log("hello index @ " + Date.now());

*/

/*
$('body').prepend('<div data-mn-region-id="root"></div>')

window.rootR = new Mn.Region({
    el: '[data-mn-region-id=root]'
});


window.ViewA = Mn.LayoutView.extend({
    template: require("./apagar/view-a.html"),

    ui: {
        regionA1: 'div#region-a-1',
        regionA2: 'div#region-a-2'
    },

    regions: {
        a1R: '@ui.regionA1',
        a2R: '@ui.regionA2'
    }
})

window.ViewB = Mn.LayoutView.extend({
    template: require("./apagar/view-b.html"),

    ui: {
        regionB1: 'div#region-b-1',
        regionB2: 'div#region-b-2'
    },
})
*/


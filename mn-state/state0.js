/*
var dummyV = new Marionette.ItemView()

var DummyS = Mn.State.extend({

    componentEvents: {
        'xyz': 'onXyz'
    },

    onXyz: function() {
        var now = Date.now();
        console.log("xyz at the dummy state  " + now)
        this.set("xyz", now)
    }
});

var dummyS = new DummyS({
    component: dummyV
});

// trigger the event in the view; the corresponding handler in the state will be executed

dummyV.trigger("xyz")
*/


/*
var DummyS = Mn.State.extend({

    componentEvents: {
        'xyz': 'onXyz'
    },

    onXyz: function() {
        var now = Date.now();
        console.log("xyz at the dummy state  " + now)
        this.set("xyz", now)
    }
});

var dummyS = new DummyS({
    component: Backbone.Radio.channel("main")
});

// trigger the event in the channel; the corresponding handler in the state will be executed
// (because the component is the channel)

Backbone.Radio.channel("main").trigger("xyz")
*/

/*
var DummyS = Mn.State.extend({

    initialize: function(options) {
        this.syncEntityEvents(options.channel1, this.fooEvents);
        this.syncEntityEvents(options.channel2, this.barEvents);
    },

    fooEvents: {
        'xyz': 'onXyz'
    },

    barEvents: {
        'abc': 'onAbc'
    },

    onXyz: function() {
        var now = Date.now();
        console.log("xyz at the dummy state  " + now)
        this.set("xyz", now)
    },

    onAbc: function(){
        var now = Date.now();
        console.log("abc at the dummy state  " + now)
        this.set("abc", now)
    },

});

var dummyS = new DummyS({
    channel1: Backbone.Radio.channel("main"),
    channel2: Backbone.Radio.channel("other")
});

// trigger events in the channels; the corresponding handlers in the state will be executed
// (because the component is the channel)

Backbone.Radio.channel("main").trigger("xyz")
Backbone.Radio.channel("other").trigger("abc")
*/


var ParentS = Mn.State.extend({

    initialize: function(){
        this.set("something2", "initial something 2")
    },

    componentEvents: {
        'something': 'onSomething',
        'something2': 'onSomething2'
    },

    onSomething: function() {
        var now = Date.now();
        console.log("something at the parent state  " + now)
        this.set("something", now)
    },

    onSomething2: function() {
        var now = Date.now();
        console.log("something2 at the parent state  " + now)
        this.set("something2", now)
    },

});


var DummyS = Mn.State.extend({


    initialize: function(options) {
        this.parentState = options.parentState;
        this.syncEntityEvents(options.parentState, this.parentEvents);
    },

    componentEvents: {
        "xyz": "onXyz"
    },

    parentEvents: {
        'change:something': 'onSomething'
    },


    onXyz: function() {
        var now = Date.now();
        console.log("xyz at the dummy state  " + now)
        this.set("xyz", now)
    },

    onSomething: function(arg1, arg2) {
        debugger;
        var now = Date.now();
        console.log("something at the dummy state  " + now)
        this.set("something", now)
    },


});

var parentS = new ParentS({
    component: Backbone.Radio.channel("main"),
});

var dummyV = new Marionette.ItemView()


var dummyS = new DummyS({
    component: dummyV,
    parentState: parentS
});

//dummyV.trigger("xyz")
//Backbone.Radio.channel("main").trigger("something")


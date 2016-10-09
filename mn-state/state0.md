An instance of Marionette.State is an object that is used to keep the state of some other object (or more generally, some other "component").

Usually these components are views, but they can be any evented object (that is, any object that includes Backbone.Events).

A simple usage:

```js
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
```

State objects for views are always temporary. They should exist only for the duration of the view. If we call `dummyV.destroy()` the state object will also call its destroy method (which unbinds the `onXyz` handler). 

If we want a state object to live beyond the view, that state should have something else as the `component`. For instance, we can a Radio's channel as the component.

In the next example the state changes due to events triggered in a specific channel of Backbone.Radio. This works because a Radio's channel is an evented object (just like a view is):

```js
var DummyS = Mn.State.extend({

    componentEvents: {
        'xyz': 'onXyz'
    },

    onXyz: function() {
        console.log("xyz at the dummy state  " + Date.now())
    }
});

var dummyS = new DummyS({
    component: Backbone.Radio.channel("main")
});

// trigger the event in the channel; the corresponding handler in the state 
// will be executed (because the component is the channel)

Backbone.Radio.channel("main").trigger("xyz")
```

We don't have to limit the state to only one channel. In the next example we have a state that changes in reaction to events triggered in 2 different channels. 

Here we don't use the "component" property when creating the state instance, so we have to manually syncronize the state with the evented object by calling "syncEntityEvents" (this is done automatically when we use `component` and `componentEvents`).

So in this case the state is "shared", in the sense that the state is mutated by what happens in different external objects.


```js
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
        console.log("xyz at the dummy state  " + Date.now())
    },

    onAbc: function(){
        console.log("abc at the dummy state  " + Date.now())  
    },

});

var dummyS = new DummyS({
    channel1: Backbone.Radio.channel("main"),
    channel2: Backbone.Radio.channel("other")
});

// trigger events in the channels; the corresponding handlers in the state
// will be executed 

Backbone.Radio.channel("main").trigger("xyz")
Backbone.Radio.channel("other").trigger("abc")
```







```js

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
        console.log("xyz at the dummy state  " + Date.now())
    },

    onAbc: function(){
        console.log("abc at the dummy state  " + Date.now())  
    },

});

var dummyS = new DummyS({
    channel1: Backbone.Radio.channel("main"),
    channel2: Backbone.Radio.channel("other")
});

// trigger events in the channels; the corresponding handlers in the state
// will be executed 

Backbone.Radio.channel("main").trigger("xyz")
Backbone.Radio.channel("other").trigger("abc")
```


In the final example we have 2 states: the parent state, whose component is the "main" channel in the radio, and the dummy state, whose component is a dummy view. However this dummy state also requires the state from the parent, so we pass it when creating the instance. We still have to call "syncEntityEvents", but only for "parentState" (for "components" it is done automatically)

In this case part of the state resides in the parent state. If we need to access the parent states attributes, we can reach them via  `dummyS.parentState.get("something2")`.

If the state changes in the parent state, we should have a handler for the change event in the dummy state which will set/updatet that same attribute in the dummy state. That is, that specific attribute will be syncronized between those 2 states. The change in that attribute in the dummy state will now give rise to some DOM update in the view (the dummy state's component   )
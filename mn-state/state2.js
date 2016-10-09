var Radio = Backbone.Radio;
Radio.DEBUG = true;

console.log("state 2")

// main app

var MainAppState = Mn.State.extend({
    defaultState: {
        authenticated: false
    },

    component: Radio.channel('main'),

    componentEvents: {
        'login': 'onLogin',
        'logout': 'onLogout'
    },

    onLogin: function() {
        debugger;
        this.set('authenticated', true);
    },

    onLogout: function() {
        debugger;
        this.set('authenticated', false);
    }
});

var MainApp = Marionette.Toolkit.App.extend({
    state: new MainAppState()
});

var mainApp = new MainApp();

mainApp.on("start", function() {
    console.log("mainApp: do something at start 1")

    var toggleAuthView = new ToggleAuthView({ 
        appState: this.state
    });

    new Mn.Region({ 
        el: 'body' 
    }).show(toggleAuthView);


})

mainApp.on("start", function() {
    console.log("mainApp: do something at start 2")
    this.getChildApp("childApp1").start();
})

mainApp.on("stop", function() {
    console.log("mainApp: do something at stop")
})


// child app 1

var ChildApp1State = Mn.State.extend({
    defaultState: {
    },

    componentEvents: {
    },
});

var ChildApp1 = Marionette.Toolkit.App.extend({
    state: new ChildApp1State(),
});

var childApp1 = mainApp.addChildApp("childApp1", ChildApp1, {})

childApp1.on("start", function() {
    console.log("childApp1: do something at start 1")
})

childApp1.on("start", function() {
    console.log("childApp1: do something at start 2")
})

childApp1.on("stop", function() {
    console.log("childApp1: do something at stop")
})


//mainApp.start();




// Alternately a login or logout button depending on app authentication state.
var ButtonView = Mn.ItemView.extend({

    template: _.template(`
        <button class="js-btn">click me to change the state</button>
    `),

    triggers: {
        'click': 'toggleLoginState'
    },

    appStateEvents: {
        'change:authenticated': 'onChangeAuthenticated'
    },

    // Bind to app State.
    initialize: function(options) {
        options = options || {};
        this.appState = options.appState;
        Mn.State.syncEntityEvents(this, this.appState, this.appStateEvents, 'render');
    },

    // Button text will be updated on every render and `action` change.
    onChangeAuthenticated(appState, authenticated) {
        if (authenticated) {
            this.$(".js-btn").text('Logout');
        } else {
            this.$(".js-btn").text('Login');
        }
    },

    // Login/logout toggle will always fire the appropriate action.
    toggleLoginState() {
        if (this.appState.get('authenticated')) {
            Radio.channel("main").trigger('main', 'logout');
        } else {
            Radio.channel("main").trigger('main', 'login');
        }
    }
});




var DummyS = Mn.State.extend({

    componentEvents: {
        'xyz': 'onXyz'
    },

    onXyz: function() {
        console.log("xyz at the dummy state  " + Date.now())
    }
});

var DummyObj = Mn.Object.extend({

    initialize: function(){

        this.state = new DummyS({
            component: this
        });
    },


})

var dummyObj = new DummyObj;



// var state2 = new DummyS({
//     component: Radio.channel("xxx")
// });

var m = new Backbone.Model();

var eventedObj = _.extend({}, Backbone.Events);

var state2 = new DummyS({
    component: eventedObj
});
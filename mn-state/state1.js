// Listens to view events and updates view state attributes.
var ToggleButtonS = Mn.State.extend({
    defaultState: {
        active: false
    },

    componentEvents: {
        'toggle': 'onToggle'
    },

    onToggle: function() {
        debugger;
        var active = this.get('active');
        this.set('active', !active);
    }
});


// A toggle button that when clicked will alternate its "active" state
var ToggleButtonIV = Mn.ItemView.extend({
    // Create and sync with my own State.
    initialize() {
        this.state = new ToggleButtonS({
            component: this
        });
        Mn.State.syncEntityEvents(this, this.state, this.stateEvents, 'render');
    },

    template: _.template(`
      <button class="js-btn">click me to change the state</button>
    `),

    triggers: {
        'click .js-btn': 'toggle'
    },

    stateEvents: {
        'change:active': 'onChangeActive'
    },

    onToggle: function(x1, x2) {
        debugger;
    },

    // Active class will be added/removed on render and on 'active' change.
    onChangeActive(state, active, options) {
        debugger;
        if (active) {
            this.$('.js-btn').addClass('example-1-is-active');
        } else {
            this.$('.js-btn').removeClass('example-1-is-active');
        }
    },

});

var toggleButtonIV = new ToggleButtonIV();

new Mn.Region({
    el: 'body'
}).show(toggleButtonIV);

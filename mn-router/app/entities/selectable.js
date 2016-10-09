var Backbone = require('backbone');

var SelectableM = Backbone.Model.extend({
    initialize: function() {

        Backbone.Select.Me.applyTo(this);
    }
});

// A collection type allowing only one selection at a time
var SelectableC = Backbone.Collection.extend({
    initialize: function(models, options) {

        Backbone.Select.One.applyTo(this, models, options);
    },
    model: SelectableM
});

module.exports.SelectableM = SelectableM;
module.exports.SelectableC = SelectableC;

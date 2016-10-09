// marionette-service will require: backbone.marionette, backbone.radio, underscore
// backbone.radio will require: underscore, backbone

var Service = require('marionette-service');

var OtherService = Service.extend({

    radioEvents: {
        "other bar": "bar"
    },

    radioRequests: {
        'other foo': 'foo',
    },

    foo: function(message) {
        console.log("foo request");
    },

    bar: function(message) {
        console.log("bar event");
    },

});

new OtherService();

/*
The "other" channel is now available in the radio:

Radio.channel("other").request("foo");
Radio.channel("other").trigger("bar");

*/
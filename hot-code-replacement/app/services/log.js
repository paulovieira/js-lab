// marionette-service will require: backbone.marionette, backbone.radio, underscore
// backbone.radio will require: underscore, backbone

var Service = require('marionette-service');

var LoggingService = Service.extend({

    radioRequests: {
        'log log': 'logMessage',
        'log logError': 'logError',
        'log logWarning': 'logWarning',
    },

    logMessage: function(message) {
        console.log(message);
    },

    logError: function(message) {
        console.error(message);
    },

    logWarning: function(message) {
        console.warn(message);
    },
});

new LoggingService();

/*
The "log" channel is now available in the radio:

Radio.channel("log").request("log", "aaa");
Radio.channel("log").request("logError", "bbb");
Radio.channel("log").request("logWarning", "ccc");

*/
var Hoek = require("hoek");
var Glue = require("glue");


var manifest = {

    server: {
        //  default connections configuration
        connections: {

            // default configuration for every route.
            routes: {

                // disable node socket timeouts (useful for debugging)
                timeout: {
                    server: false,
                    socket: false
                }
            }
        },

    },

    connections: [
        {
            host: "localhost",
            port: 8001
        }
    ],

    registrations: [
        {
            plugin: {
                register: "nes",
                options: {}
            },
        },

        {
            plugin: {
                register: "good",
                options: require("./config/plugins/good")
            },
        },

        {
            plugin: {
                register: "./server/routes-websocket/routes-websocket.js",
                options: {}
            }

        }

    ]


};

// TODO: remove good console if not in production
var options = {
    relativeTo: __dirname
};

Glue.compose(manifest, options, function (err, server) {

    Hoek.assert(!err, 'Failed registration of one or more plugins: ' + err);

    // start the server and finish the initialization process
    server.start(function(err) {
    
        Hoek.assert(!err, 'Failed server start: ' + err);
        
        console.log('Server started at: ' + server.info.uri);
        console.log("Hapi version: " + server.version);
    });
});


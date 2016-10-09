process.title = "test-huzzah";

var Hoek = require("hoek");
var Glue = require("glue");

var internals = {};

var manifest = {

    server: {
        //  default connections configuration
        connections: {

            // controls how incoming request URIs are matched against the routing table
            router: {
                isCaseSensitive: false,
                stripTrailingSlash: true
            },

            // default configuration for every route.
            routes: {
                state: {
                    // determines how to handle cookie parsing errors ("ignore" = take no action)
                    failAction: "ignore"
                },

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
            port: 8080
        }
    ],

    plugins: [

        {
            "good": require("./config/plugins/good")
        },

        {   
            "./server/routes-api/routes-api.js": require("./config/plugins/routes-api")
        },

    ]
};

// TODO: remove good console if not in production
var options = {
    relativeTo: __dirname,
    prePlugins: function(server, next){
        next();
    }
};

Glue.compose(manifest, options, function (err, server) {

    Hoek.assert(!err, 'Failed registration of one or more plugins: ' + err);

    // start the server and finish the initialization process
    server.start(function(err) {

        Hoek.assert(!err, 'Failed server start: ' + err);
        
        console.log('Server started at: ' + server.info.uri);
        console.log("Hapi version: " + server.version);
        console.log("NODE_ENV: ", process.env.NODE_ENV);
    });
});


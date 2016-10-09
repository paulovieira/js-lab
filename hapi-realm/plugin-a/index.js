var Path = require("path");

var internals = {};

exports.register = function(server, options, next){

    console.log("\n--- \nregistering plugin-a")

    server.setHelloWorld("pt");
    server.realm.plugins["hello-world"].obj.something = "stuff @ plugin-a";
    server.expose("xyz", 123);

    console.log('server.realm.plugins: \n', server.realm.plugins);
    console.log('server.plugins: \n', server.plugins);

    server.route({
        path: "/plugin-a",
        method: "GET",
        config: {
            handler: function(request, reply) {

                return reply.hello();
            },
            cors: true
        }
    });

    server.route({
        path: "/api/users",
        method: "GET",
        config: {
            handler: function(request, reply){

                return reply([
                {
                    id: 1,
                    name: "paulo"
                }
                ])
            },
            cors: true
            // cors: {
            //     origin: ["https://frontendmasters.com", "http://jquery.com"] 
            // }
        }
    });


    /*
    server.ext({
        type: "onPreHandler",
        method: function(request, reply){

            console.log("prePreHandler @ plugin-a")
            reply.continue();
        },
        options: {
            sandbox: "plugin"
        }
    })
*/
    
    return next();
};

exports.register.attributes = {
    name: "plugin-a",  // use the name of the dir
    dependencies: []
};

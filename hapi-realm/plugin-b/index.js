var Path = require("path");

var internals = {};

exports.register = function(server, options, next){

    console.log("\n--- \nregistering plugin-b")

    server.setHelloWorld("en");
    server.realm.plugins["hello-world"].obj.something = "stuff @ plugin-b";

    console.log('server.realm.plugins: \n', server.realm.plugins);
    console.log('server.plugins: \n', server.plugins);

    server.route({
        path: "/plugin-b",
        method: "GET",
        config: {
            handler: function(request, reply) {

                return reply.hello();
            }
        }
    });


    /*
    server.ext({
        type: "onPreHandler",
        method: function(request, reply){

            console.log("prePreHandler @ plugin-b")
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
    name: "plugin-b",  // use the name of the dir
    dependencies: []
};

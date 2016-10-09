var internals = {};

exports.register = function(server, options, next){

    server.route({
        path: "/my-view-sync",
        method: "GET",
        config: {
            handler: function(request, reply){

                return reply.view("hello-world-sync.html", {
                    something: 123,
                    name: "paulo"
                });
            }
        }
    });

    server.route({
        path: "/my-view-async",
        method: "GET",
        config: {
            handler: function(request, reply){

                return reply.view("hello-world-async.html", {
                    something: 456,
                    name: "Paulo"
                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: "test_view",
    dependencies: ["vision"]
};


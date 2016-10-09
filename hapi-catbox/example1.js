var Hapi = require("hapi");
var Boom = require('boom');

var server = new Hapi.Server({

});

server.connection({
    port: 8000
});

var cachedSum = function(a, b){
    var timestamp = Date.now();
    return Number(a) + Number(b) + "_" + timestamp;
};

// create a new policy
var memoryCachePolicy = server.cache({
    expiresIn: 3*1000,
    segment: "mem-segment"
});

server.route({
    path: "/add_without_cache/{a}/{b}",
    method: "GET",
    handler: function (request, reply) {

        var sum = cachedSum(request.params.a, request.params.b);
        return reply(sum);
    }
});

server.route({
    path: "/add_with_cache/{a}/{b}",
    method: "GET",
    handler: function (request, reply) {

        var id = request.params.a + ":" + request.params.b;

        // retrieve an item from the cache; if the item is not found and the generateFunc 
        // method was provided (when creating the policy), a new value is generated, stored in the cache,
        // and returned
        memoryCachePolicy.get(id, function(err, value, cachedData, report){

            console.log("cachedData: \n", cachedData);
            console.log("\nreport: \n", report);
            console.log("--------------")

            if(err){
                return reply(Boom.badImplementation());
            }

            if(cachedData){
                return reply(value);                
            }

            // the data is not cached; store it in the cache and send the cached data
            var sum = cachedSum(request.params.a, request.params.b);
            memoryCachePolicy.set(id, sum, 0, function(err){
                if(err){
                    return reply(Boom.badImplementation());
                }

                return reply(sum);
            });

        });
    }
});

server.start(function () {
    console.log("Server running at:", server.info.uri);
});



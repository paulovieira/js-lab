var Hapi = require('hapi');
var Fs = require("fs");
//var Tilelive = require('tilelive');
//require('mbtiles').registerProtocols(Tilelive);
var CatboxMemory = require("hapi/node_modules/catbox-memory");


var port = 8001;
var mbtilesUri = "mbtiles:///home/pvieira/tilemill-files/export/mapa-base-freguesias.mbtiles";

var server = new Hapi.Server({
    // 1) add catbox cache clients
    cache: [{
            name: "memoryCache",    
            engine: CatboxMemory,
            partition: "filesCache",
            allowMixedContent: true
        }]  
});

server.connection({
    port: port,


});

// 2) create catbox policy
// server.cache creates a new policy, which is then used in the route handler.
var memoryPolicy = server.cache({
//    cache: "memoryCache",  // cache tells hapi which client to use.
//    segment: 'filesSegment',
    expiresIn: 5 * 1000,
    generateFunc: function(id, next){

        Fs.readFile(id, function(err, image){

            if(err){
                return next(err);
            }

            next(null, image);
        });

    },
    generateTimeout: 100000,
}, "memoryCache", "filesSegment");
/*
Tilelive.load(mbtilesUri, function(err, source) {

    var getTile = function (z, x, y, next) {

        source.getTile(z, x, y, function(err, tile, headers) {

            console.log("server method");
            return next(err, tile, headers);
        });
    };

    server.method('getTile', getTile
    // ,
    // {
    //     cache: {
    //         cache: 'memoryCache',
    //         expiresIn: 30 * 1000,
    //         generateTimeout: 100
    //     }
    // }
    );

    server.route({
        method: 'GET',
        path: '/{z}/{x}/{y}',
        handler: function(request, reply) {

            var z = request.params.z | 0;
            var x = request.params.x | 0;
            var y = request.params.y | 0;

            server.methods.getTile(z, x, y, function (err, tile, headers) {

                if (err) {
                    // if the tile does not exist, the message will be "Tile does not exist"
                    if (err.message && err.message.indexOf("exist") !== -1) {
                        return reply(err.message).code(404);
                    }

                    return reply(err);
                }

                var response = reply(tile);
                for (var key in headers) {
                    // the headers object provided by tilelive has the correct "content-type", as well
                    // as "etag" and "last-modified"
                    // by default the .header method uses the option {override: true}
                    response.header(key, headers[key]);
                }

                console.log("served tile @ " + Date.now());
                return;

            });

            // source.getTile(z, x, y, function(err, tile, headers) {

            //     if (err) {
            //      // if the tile does not exist, the message will be "Tile does not exist"
            //         if (err.message && err.message.indexOf("exist") !== -1) {
            //             return reply(err.message).code(404);
            //         }

            //         return reply(err);
            //     }

            //     var response = reply(tile);
            //     for (var key in headers) {
            //      // the headers object provided by tilelive has the correct "content-type", as well
            //      // as "etag" and "last-modified"
            //      // by default the .header method uses the option {override: true}
            //         response.header(key, headers[key]);
            //     }

            //     console.log("served tile @ " + Date.now());
            //     return;
            // });
        },

    });

    server.start(function() {
        console.log('Server running at:', server.info.uri);
    });
})
*/

//var filePath = "/home/pvieira/Downloads/20150908_175210_.jpg";
var filePath = "/home/pvieira/Downloads/20150908_175210.jpg";


server.route({
    method: 'GET',
    path: '/load_from_cache',
    handler: function(request, reply) {

        memoryPolicy.get(filePath, function(err, value, cached, report){

            if(err){
                return reply(err);
            }

            // if the value is in cached, cached.item === value
            return reply(value).header("content-type", "image/jpeg");
        });
    }
});

server.route({
    method: 'GET',
    path: '/load_from_disk',
    handler: function(request, reply) {

        Fs.readFile(filePath, function(err, image){

            if(err){
                return reply(err);
            }

            return reply(image).header("content-type", "image/jpeg");
        });


    }
});


var goodOptions =  {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
};

server.register({
    register: require('good'),
    options: goodOptions
}, function (err) {

    if (err) {
        throw err;
    }

    server.start(function(err) {

        if(err){
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });

});

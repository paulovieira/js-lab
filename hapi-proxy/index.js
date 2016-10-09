var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello ' + request.params.name + '!');
    }
});

server.route({
    method: 'GET',
    path: '/proxy',
    handler: {
        proxy: {
            host: '127.0.0.1',
            port: 7777,
            protocol: "http",
            timeout: 1002,
            onResponse: function(err, res, request, reply, settings, ttl){
            	return reply(JSON.stringify(settings));

            }
        }
    }
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});


'use strict';

const Hapi = require('hapi');
const localAddress = '192.168.1.199';

const server = new Hapi.Server();
server.connection({
    address: localAddress,
    port: 7000
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {

        return reply('pi in on! @ ' + Date.now());
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

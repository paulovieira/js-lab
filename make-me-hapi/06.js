var Hapi = require('hapi');
var Path = require('path');


var port = Number(process.argv[2]) || 8080;

var server = new Hapi.Server('localhost', port);


server.route({
	method: "GET",
	path: "/proxy",
	handler: {
		proxy: {
			host: "127.0.0.1",
			port: 65535
		}
	}
})

server.start();
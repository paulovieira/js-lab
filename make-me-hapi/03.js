var Hapi = require('hapi');
var port = Number(process.argv[2]) || 8080;


var server = new Hapi.Server('localhost', port);

console.log();

server.route({
	method: "GET",
	path: "/",
	handler: {
		file: __dirname + "/files/index.html"
	}
})

server.start();
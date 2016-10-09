var Hapi = require('hapi');
var port = Number(process.argv[2]) || 8080;


var server = new Hapi.Server('localhost', port);

server.route({
	method: "GET",
	path: "/{name}",
	handler: function(request, reply){
		reply("Hello " + request.params.name);
	}
})

server.start();
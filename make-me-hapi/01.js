var Hapi = require('hapi');
var port = Number(process.argv[2]);


var server = new Hapi.Server('localhost', port);

server.route({
	method: "GET",
	path: "/",
	handler: function(request, reply){
		reply("Hello Hapi");
	}
})

server.start();
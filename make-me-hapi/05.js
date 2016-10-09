var Hapi = require('hapi');
var Path = require('path');
var Handlebars = require('handlebars');

var port = Number(process.argv[2]) || 8080;
var templatesPath = Path.join(__dirname, "templates");

var server = new Hapi.Server('localhost', port);

console.log();

server.views({
	engines: {
		html: Handlebars
	},
	path: templatesPath
});

server.route({
	method: "GET",
	path: "/",
	handler: {
		view: {
			template: "index.html",
//			context: 

		}
	}
})

server.start();
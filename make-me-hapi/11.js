var Hapi = require('hapi');
var Path = require('path');
var Handlebars = require('handlebars');
var fs = require('fs');


var port = Number(process.argv[2]) || 8080;

var server = new Hapi.Server('localhost', port);

var templatesPath = Path.join(__dirname, "templates");
server.views({
	engines: {
		html: Handlebars
	},
	path: templatesPath
});

server.route({
	method: "GET",
	path: "/upload",
	handler: function(request, reply){
		reply.view("uploadForm");
	}
})


server.route({
	method: "POST",
	path: "/upload",
	handler: function(request, reply){
debugger;
		var ws = fs.createWriteStream("/home/pvieira/jsLab/makemehapi/uploads_xyz/" + "out_daata");
		request.payload.fileA.pipe(ws);

debugger;
		ws.on("finish", function(){
			debugger;
			var fileA = request.payload.fileA;

			reply("file was was saved in the server")

		});

		ws.on("error", function(err){
			debugger;
		});
	},
	config: {
		payload: {
			output: "stream",
			parse: true,
			maxBytes: 1048576000
		}

	}
});

server.start();
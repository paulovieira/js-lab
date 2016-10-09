var Hapi = require('hapi');
var Path = require('path');
var rot13 = require('rot13-stream')();
var fs = require('fs');


var port = Number(process.argv[2]) || 8080;

var server = new Hapi.Server('localhost', port);


server.route({
	method: "GET",
	path: "/",
	handler: function(request, reply){
		var rs = fs.createReadStream("pursuit.txt");

		rs.on("open", function(){
			//rs.pipe(rot13).pipe(reply);
			//rs.pipe(rot13).pipe(reply);
			var response = reply(rs.pipe(rot13));
		});

		rs.on("error", function(err){
			console.log(err);
		});

	}
})

server.start();
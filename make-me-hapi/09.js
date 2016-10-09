var Hapi = require('hapi');
var Path = require('path');
var fs = require('fs');
var Joi = require('joi');


var port = Number(process.argv[2]) || 8080;

var server = new Hapi.Server('localhost', port);


server.route({
	method: "GET",
	path: "/chickens/{breed}",
	handler: function(request, reply){
	},
	config: {
		validate: {
			params: {
				with: Joi.string().required(),
				parameters: Joi.string().required()
			}
		}
	}
})

server.start();
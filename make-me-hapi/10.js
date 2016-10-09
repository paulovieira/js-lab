var Hapi = require('hapi');
var Path = require('path');
var Handlebars = require('handlebars');
var Joi = require('joi');


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
	path: "/login",
	handler: function(request, reply){
		reply.view("loginForm");
	}
})


server.route({
	method: "POST",
	path: "/login",
	handler: function(request, reply){

		debugger;
		reply("ok" + request.payload.username)
	},
	config: {
		validate: {
			payload: {
				username: Joi.string(),
				password: Joi.string().alphanum(),
				isGuest: Joi.string().alphanum(),
				accessToken: Joi.string().alphanum()
			}
		}
/*
		validate: {


login endpoint will accept 
	-isGuest (boolean), 
	-username (string), 
	-accessToken (alphanumeric),
	-password (alphanumeric)
in the post request body.

Validation rules:
i)   if isGuest is false then username is required.
ii)  password cannot appear together with accessToken.
iii) if any parameters (besides the ones specified above) are sent, they should be allowed



			params: {
				with: Joi.string().required(),
				parameters: Joi.string().required()
			}
		}
*/
	}
});

server.start();
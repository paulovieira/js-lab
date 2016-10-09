var Path = require("path");
var Boom = require("boom");
//var Hoek = require("hoek");
//var Config = require("config");
//var Utils = require("./common/utils");

var Joi = require("joi");

var internals = {};

exports.register = function(server, options, next){

    // note that the path of the api endpoints will be prepended with a prefix (given in the 
    // plugin configuration)
    var endpoints = [

        // example: /test?id=2&temp=23.5
        { 
            method: "GET",     
            path: "/test",
            config: {
                handler: internals.testRead,
                query: {
                    temp: Joi.number()
                }
            },
        },
        { 
            method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            path: "/{any*}",        
            config: {
                handler: function(request, reply){
                    
                    return reply(Boom.notFound("Invalid API endpoint."));
                }
            } 
        },

    ];

    server.route(endpoints);

    return next();
};

exports.register.attributes = {
    name: Path.parse(__dirname).name,  // use the name of the file
    dependencies: []
};

internals.testRead = function(request, reply){

    console.log(Date.now());
    console.log(request.query);

    return reply({ hello: "world" });
};

'use strict';

var myPlugin = {

}

myPlugin.register = function (server, options, next) {

    debugger;

    // Add the route
    server.route({
        method: 'GET',
        path:'/hello', 
        handler: function (request, reply) {

            return reply('hello world');
        }
    });

    next();
};

myPlugin.register.attributes = {
    pkg: require('./package.json'),
    name: "xyz"
};

myPlugin.options = {
    x: 111
};

var now = Date.now();
myPlugin.foo = function(){
    debugger;
    var x = now;
    return now;
};

module.exports = myPlugin;

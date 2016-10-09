
const Hapi = require('hapi');
// Create a server with a host and port
const server = new Hapi.Server();

var P = require('./my-plugin')

debugger;
var x = 1;
var y = 2;
var n = P.foo();
debugger;
var z = 3;


server.connection({ 
    host: 'localhost', 
    port: 8000 
});


debugger;
server.register(P, (err) => {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    debugger;
    // Start the server
    server.start((err) => {

        debugger;
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

/**/

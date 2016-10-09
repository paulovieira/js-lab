const Glue = require('glue');

const manifest = {
    connections: [
        {
            port: 8000,
            labels: ['web']
        },
        {
            port: 8001,
            labels: ['admin']
        }
    ],
    registrations: [
        {
            plugin: {
                register: './hello-world',
                options: {}
            }
        },

        {
            plugin:  {
                register: './plugin-a',
                options: {}
            },
            options: {
                select: ['web']
            }
        },
        {
            plugin: {
                register: './plugin-b',
                options: {
                    sessiontime: 500
                }
            },
            options: {
                select: ['web'],
                routes: {
                    prefix: '/admin'
                }
            }
        }

    ]
};

const options = {
    relativeTo: __dirname
};

Glue.compose(manifest, options, (err, server) => {

    if (err) {
        throw err;
    }

     // catch ctrl+c event and exit normally
     process.on('SIGINT', function () {
        server.stop({
            timeout: 100
        });

     });

    server.ext({
        type: "onPostStop",
        method: function(server, next){

            console.log("\nonPostStop")
            console.log("Server is stopped. Goodbye!")
            next();
        },
        options: {
        }
    });

    server.start(() => {

        console.log('\n---\nserver.plugins (from the root server): \n', server.plugins);
        console.log('server started');
    });
});
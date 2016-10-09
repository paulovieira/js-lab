const Glue = require('glue');
const GoodConsole = require('good-console');

const internals = {};

internals.goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        'foo': [
            new GoodConsole(),
            'stdout'
        ]
    }
};

internals.manifest = {
    connections: [{ port: 8888 }],
    registrations: [{
        plugin: {
            register: 'good',
            options: internals.goodOptions
        }
    }]
};

Glue.compose(internals.manifest, (err, server) => {

    server.start();
});

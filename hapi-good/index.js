'use strict';

const Hapi = require('hapi');
const GoodConsole = require('good-console');
const GoodSqueeze = require('good-squeeze');
const LogRotate = require('rotating-file-stream');

const internals = {}

internals.goodOptions = {
    ops: {
        interval: 2147483647
    },
    reporters: {
        'ops-console': [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*' }]
            }, 
            {
                module: 'good-console'
            },
            process.stdout
        ],
        'log-console': [
            new GoodSqueeze.Squeeze({ log: '*' }),
            new GoodConsole(),
            process.stdout
        ],
        'ops-file': [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*' }]
            }, 
            {
                module: 'good-squeeze',
                name: 'SafeJson',
                args: [null]
            },
            // {
            //     module: 'rotating-file-stream',
            //     args: ['ops']  
            // },
            new LogRotate('ops2')
        ],

    }
}

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register({
    register: require('good'),
    options: internals.goodOptions
}, (err) => {

    server.start((err) => {

        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

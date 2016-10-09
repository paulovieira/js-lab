var Promise = require('bluebird');
var PgPromise = require('pg-promise');
var PgMonitor = require('pg-monitor');

var configOptions = {
    promiseLib: Promise,
};

var Pgp = PgPromise(configOptions);
PgMonitor.attach(configOptions);

var db = Pgp({
    database: 'postgres'
});

db.query('SELECT * FROM version()')
    .then(function(result){

        console.log('version: ', result[0].version);
        Pgp.end();
    });

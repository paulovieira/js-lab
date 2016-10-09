var postgrator = require('postgrator');

postgrator.setConfig({
    migrationDirectory: __dirname + '/database',
    schemaTable: 'postgrator', // optional. default is 'schemaversion'
    driver: 'pg', // or mysql, mssql
    host: '127.0.0.1',
    port: 5432, // optionally provide port
    database: 'temp',
    username: '...',
    password: '...'
});

postgrator.migrate('max', function (err, migrations) {
    if (err) {
        console.log(err)
    } else {
        console.log(migrations)
    }
    postgrator.endConnection(function () {
        // connection is closed, or will close in the case of SQL Server
    });
});
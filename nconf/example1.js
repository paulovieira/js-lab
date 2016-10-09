require('./config/load');
var Nconf = require('nconf');

console.log(Nconf.get('database:xyz'));

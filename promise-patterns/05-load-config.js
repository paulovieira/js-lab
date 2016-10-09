var Promise = require('bluebird');
var Fs = require("fs");

Promise.promisifyAll(Fs);


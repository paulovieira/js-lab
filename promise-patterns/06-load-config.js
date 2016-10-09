var Promise = require('bluebird');
var Fs = require("fs");

Promise.promisifyAll(Fs);

// note: for some methods, the callback might take more than 2 parameters
// those methods should be promisified separately using the option { multiArgs: true }
Fs.readAsync = Promise.promisify(Fs.read, {multiArgs: true});

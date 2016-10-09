// promisify a method whose callback takes more than 2 parameters (example: Fs.)

// tip saw at: http://bluebirdjs.com/docs/api/promise.join.html

require("./06-load-config.js");

var Promise = require('bluebird');
var Fs = require("fs");


// callback api
Fs.open("package.json", "r", function(err, fd){

    var buffer = new Buffer(1000).fill(0);

    Fs.read(fd, buffer, 0, 1000, 0, function(err, bytesRead, buffer2){

        // note: buffer === buffer2

        console.log("bytesRead: ", bytesRead)
        console.log(buffer2.toString("utf8"))
    });

});


// promise api - we know the callback given Fs.read taken 3 arguments, so we should do this:
//  - use "multiArgs" option when calling Promise.promisify
//  - use .spread instead of .then, to automatically expand the arguments

Fs.openAsync("package.json", "r")
    .then(function(fd){

        var buffer = new Buffer(1000).fill(0);
        return Fs.readAsync(fd, buffer, 0, 1000, 0)
    })
    .spread(function(bytesRead, buffer2){

        // note: buffer === buffer2

        console.log("bytesRead: ", bytesRead)
        console.log(buffer2.toString("utf8"))
    })
    .catch(function(err){

        console.log(err.message);
    });

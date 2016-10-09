// promisifyAll: we have to do it only once (for instance, in the configuration code 
// that is executed first); after that we have the *Async methods available everywhere

// tip saw at: http://bluebirdjs.com/docs/api/promise.join.html

require("./05-load-config.js");

var Promise = require('bluebird');
var Fs = require("fs");

Fs.readFileAsync("./package.json", "utf8")
    .then(function(contents){

        console.log(contents);
    })
    .catch(function(err){

        console.log(err.message);
    });

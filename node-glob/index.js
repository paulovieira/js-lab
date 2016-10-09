var Glob = require("glob")
var Dir = require("node-dir")
var Fs = require("fs");

// var options = {};

// Glob("./views/**/dash*.html", options, function(err, files){
// 	console.log(files);
// });


// Dir.files("./views", function(err, files) {
//     if (err) throw err;
//     console.log(files);
// });

// Dir.subdirs("./views", function(err, subdirs) {
//     if (err) throw err;
//     console.log(subdirs);
// });


var files = Fs.readdirSync("./views");
console.log(files);
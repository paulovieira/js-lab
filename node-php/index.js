
var express = require('express');
var php = require("node-php"); 
var path = require("path"); 

var app = express();

app.use("/", php.cgi(path.join(__dirname, 'php'))); 
//app.use("/", php.cgi(path.join(__dirname, 'php/spinon'))); 

app.listen(9000);

console.log("http://localhost:9000");
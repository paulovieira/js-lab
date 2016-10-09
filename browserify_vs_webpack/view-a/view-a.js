console.log("this is view-a, time is" + Date.now());


var css = require('./css/view-a.css');

var $ = require('../_libs/jquery.js');
var Backbone = require('../_libs/backbone.js');
var Q = require('../_libs/q.js');
var Nunjucks = require('../_libs/nunjucks-slim.js')

debugger;
var x = 1;
var yyuy = x + 5;

//dfdcbaxyzw;

console.log(Nunjucks.render("map/templates/map-container.html"))

var t = $("#container-2-a").text();
console.log(t);

module.exports = {
    name: "view-a"
}
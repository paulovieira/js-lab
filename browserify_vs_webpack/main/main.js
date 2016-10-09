console.log("this is the main, time is " + Date.now());

require('./css/main.css');

//require("!style!css!./css/style.css");
var $ = require('../_libs/jquery.js');
var ViewA = require('../view-a/view-a.js');

window.$ = $;

console.log(ViewA.name)
console.log(window)


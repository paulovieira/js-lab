console.log("the y module")
var html = "";
debugger;
var tpl = require('./temp/page1.html');
var html = tpl.render({ name: 'paulo2' });

module.exports.html = html;


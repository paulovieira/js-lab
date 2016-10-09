console.log("the x module")
var html = "";
debugger;
var tpl = require('./temp/page1.html');

var ctx = { 
    name: 'paulo', 
    data: {x:1, y: 'a'} 
};

var html = tpl.render(ctx);

module.exports.html = html;


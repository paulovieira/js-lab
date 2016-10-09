console.log("this is module A");

var moduleB;
if(typeof require === "function"){
    moduleB = require("./module-b");    
}


var a = "a";
var b = "b";
debugger;
console.log(moduleB.sum(1,1));


module.exports.a = a;
module.exports.b = b;
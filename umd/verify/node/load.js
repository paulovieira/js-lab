// verify that the modules built with umd are working

var Path = require("path");
var rootDir = Path.resolve(__dirname, "../..");

var ModuleA = require(Path.join(rootDir, "_build/module-a.js"));

console.log(ModuleA.a);
console.log(ModuleA.b);

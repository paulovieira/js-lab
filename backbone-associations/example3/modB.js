var modA = require("./modA.js");
var b = "I'm module B. The value of module A is: " + modA.a;

module.exports = {
	b: b
}

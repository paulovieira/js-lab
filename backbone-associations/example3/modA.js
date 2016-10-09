var modB = require("./modB.js");
var a = "I'm module A. The value of module B is: " + modB.b;

module.exports = {
	a: a
}

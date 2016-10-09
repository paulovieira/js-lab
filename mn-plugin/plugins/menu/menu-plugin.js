var Mn = require("backbone.marionette");

var MenuPlugin = Mn.Plugin.extend({
	name: "menu-plugin",
	dependencies: [],
	views: [
		{
			viewClass: require("./menu"),
			viewName: "menu"
		},

	]
});

module.exports = MenuPlugin;


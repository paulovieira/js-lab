require("./_config/config");

var $ = require("jquery");
var Mn = require("backbone.marionette");
var Radio = require("backbone.radio");

var MenuPlugin = require("./plugins/menu/menu-plugin.js");
var MapsPlugin = require("./plugins/maps/maps-plugin.js");
var SourcesPlugin = require("./plugins/sources/sources-plugin.js");
console.log("xxxyyyz")
Mn.register([
	// {
	// 	plugin: require("./plugins/plugin-a/plugin-a.js"),
	// 	name: 'xyz'
	// }
    new MenuPlugin(),
    new MapsPlugin(),
    new SourcesPlugin()

]);

// TODO: here we have define the name of the plugin in the plugin's class;
// this forces the user to check it; we could also define the plugin name
// in at register time: { name: "plugin-a", plugin: new PluginA }; this would override
// the "name" property in the plugin class; this is useful is we want to register the plugin
// more than once (with different options?)

Radio.channel("plugins").request("start", {
    plugin: "menu-plugin",
    region: new Mn.Region({ el: $("<div id='mn-r-main'>").prependTo("body") }),

    // we can override the following state options: initialState and syncEvent
    // stateOptions: {
    //     initialState: {
    //         menuItem: "sources"
    //     },
    //     syncEvent: "before:attach"
    // }

});

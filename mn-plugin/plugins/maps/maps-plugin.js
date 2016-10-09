var Mn = require("backbone.marionette");

var MapsPlugin = Mn.Plugin.extend({
    name: "maps-plugin",
    dependencies: [],
    views: [
        {
            viewClass: require("./maps-main"),
            viewName: "maps-main"
        },
        {
            viewClass: require("./map-selection"),
            viewName: "map-selection"
        }
    ]
});

module.exports = MapsPlugin;
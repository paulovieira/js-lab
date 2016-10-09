var Mn = require("backbone.marionette");

var SourcesPlugin = Mn.Plugin.extend({
    name: "sources-plugin",
    dependencies: [],
    views: [
        {
            viewClass: require("./sources-main"),
            viewName: "sources-main"
        },
    ]
});

module.exports = SourcesPlugin;
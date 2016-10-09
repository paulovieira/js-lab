var Path = require("path");

process.env.NODE_ENV = "dev";

module.exports = {
    entry: {
        app: ["./app/index.js"]
    },

    output: {

        // path and name of the bundle; note that the bundle file won't actually be
        //  created; instead, the bundle will be created in-memory only and served
        // directly to the browser (available at /public/app.js)
        path: Path.resolve(__dirname, "_build"),
        filename: "app.js",
        publicPath: "/public",
    },

    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    },

    resolve: {
        alias: {
            "jquery": Path.join(__dirname, "_lib/jquery-1.11.2.js"),
            "underscore": Path.join(__dirname, "_lib/underscore-1.8.3"),
            "backbone": Path.join(__dirname, "_lib/backbone-1.2.3.js"),
            "backbone.marionette": Path.join(__dirname, "_lib/backbone.marionette-2.4.4.js"),
            "marionette-service": Path.join(__dirname, "_lib/marionette-service-0.0.7.js"),
            "marionette.state": Path.join(__dirname, "_lib/marionette.state-1.0.1.js"),
            "backbone.radio": Path.join(__dirname, "_lib/backbone.radio-1.0.2.js"),
        }
    },

    devtool: process.env.NODE_ENV === "dev" ? "inline-source-map" : "",

    proxy: {
        '/api/users': {
            target: 'http://localhost:8000/api/users',
            secure: false,
        },
    }
};

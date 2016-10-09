var webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "dev";
//process.env.NODE_ENV = "production";

module.exports = {

    entry: {
        app: "./main/main.js",  

        // explicit vendor chunk (split your code into vendor and application);
        // we must list here the modules that will be in ./_bundles/webpack_lib.js
        // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        lib: [
            "./_libs/jquery",
            "./_libs/backbone",
            "./_libs/nunjucks-slim",
            "./_libs/q"
        ]

    },

    output: {
        path: __dirname,
        filename: "./_bundles/webpack_main.js"
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            filename: "./_bundles/webpack_lib.js"
        })
    ],

    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    },

    devtool: process.env.NODE_ENV === "dev" ? "inline-source-map" : "",
};

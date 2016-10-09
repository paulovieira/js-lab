var Path = require("path");
var webpack = require("webpack");
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')

var libDir = Path.resolve("_lib");

process.env.NODE_ENV = "dev";

var config = {
    entry: {
        app: Path.resolve("index.js"),

        // "explicit vendor chunk (split your code into vendor and application);"
        // we must list here the modules that will be place in _build/temp/lib.js
        // more info at:
        // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        lib: [
            Path.resolve(libDir, "jquery-1.11.2.js"),
            Path.resolve(libDir, "underscore-1.8.3"),
            Path.resolve(libDir, "backbone-1.2.3.js"),
            Path.resolve(libDir, "backbone.marionette-2.4.4.js"),
            Path.resolve(libDir, "marionette.state-1.0.1.js"),
            Path.resolve(libDir, "backbone.radio-1.0.2.js"),
        ]
    },

    output: {

        // path and name of the bundle; note that if we are using webpack-dev-server,
        // the bundle won't actually be created; instead, the bundle will be created 
        // in-memory only and served directly to the browser (in this case available 
        // at /_buildx/app.js and /_buildx/lib.js)
        path: Path.resolve("_build"),
        filename: "app.js",
        publicPath: "/_buildx/",
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            filename: "lib.js"
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')
        }),
        // new webpack.ProvidePlugin({
        //     "window.xyzw": "jquery"
        // }),
        new BellOnBundlerErrorPlugin()
    ],


    resolve: {
        alias: {
            "jquery": Path.resolve(libDir, "jquery-1.11.2.js"),
            "underscore": Path.resolve(libDir, "underscore-1.8.3"),
            "backbone": Path.resolve(libDir, "backbone-1.2.3.js"),
            "backbone.marionette": Path.resolve(libDir, "backbone.marionette-2.4.4.js"),
            "marionette.state": Path.resolve(libDir, "marionette.state-1.0.1.js"),
            "backbone.radio": Path.resolve(libDir, "backbone.radio-1.0.2.js"),
        }
    },


    module: {
        loaders: [
        {
            test: /\.css$/,
            loader: "style!css"
        },
        { 
            // inline base64 URLs for <=8k images, direct URLs for the rest
            test: /\.(png|jpg)$/, 
            loader: 'url-loader?limit=1024' 
        },
        {
            test: /\.(html|nunjucks)$/,
            loader: 'nunjucks-loader',
            query: {
                config: Path.resolve('nunjucks.config.js')
            }
        },

        ]
    },

    proxy: {
        '/api/users': {
            target: 'http://localhost:8000/api/users',
            secure: false,
        },
    }
};


if (process.env.NODE_ENV === "dev") {
    config.plugins.push(
        new webpack.SourceMapDevToolPlugin({

            // output filename of the SourceMap; if no value is provided the SourceMap 
            //is inlined            
            filename: undefined,
        })
    )
}

module.exports = config;


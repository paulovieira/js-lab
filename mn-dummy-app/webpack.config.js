var Path = require("path");
var webpack = require("webpack");
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')

var appDir = __dirname;
var libDir = Path.join(appDir, "_lib");

process.env.NODE_ENV = "dev";

var config = {
    entry: {
        app: Path.join(appDir, "index.js"),

        // "explicit vendor chunk (split your code into vendor and application);"
        // we must list here the modules that will be place in _build/temp/lib.js
        // more info at:
        // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        lib: [
            Path.join(libDir, "jquery-1.11.2.js"),
            Path.join(libDir, "underscore-1.8.3"),
            Path.join(libDir, "backbone-1.2.3.js"),
            Path.join(libDir, "backbone.marionette-2.4.4.js"),
            Path.join(libDir, "marionette-service-0.0.7.js"),
            Path.join(libDir, "marionette.state-1.0.1.js"),
            Path.join(libDir, "marionette.toolkit-0.4.1.js"),
            Path.join(libDir, "backbone.radio-1.0.2.js"),
            //"nunjucks",
        ]
    },

    output: {

        // path and name of the bundle; note that the bundle file won't actually be
        // created; instead, the bundle will be created in-memory only and served
        // directly to the browser (available at /public/app.js in this case)
        path: Path.resolve(appDir, "_build"),
        filename: "app.js",
        publicPath: "/_build/",
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
            "jquery": Path.join(__dirname, "_lib/jquery-1.11.2.js"),
            "underscore": Path.join(__dirname, "_lib/underscore-1.8.3"),
            "backbone": Path.join(__dirname, "_lib/backbone-1.2.3.js"),
            "backbone.marionette": Path.join(__dirname, "_lib/backbone.marionette-2.4.4.js"),
            "marionette.service": Path.join(__dirname, "_lib/marionette-service-0.0.7.js"),
            "marionette.state": Path.join(__dirname, "_lib/marionette.state-1.0.1.js"),
            "marionette.toolkit": Path.join(__dirname, "_lib/marionette.toolkit-0.4.1.js"),
            "backbone.radio": Path.join(__dirname, "_lib/backbone.radio-1.0.2.js"),
            //"nunjucks": Path.join(__dirname, "_lib/nunjucks-slim-2.3.0.js"),
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
                config: Path.join(appDir, 'views/nunjucks.config.js')
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


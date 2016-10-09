'use strict';

const Path = require("path");
const Webpack = require("webpack");
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

const appDir = Path.join(__dirname, "app");
const buildDir = Path.join(__dirname, "_build");
const libDir = Path.join(__dirname, "web_modules");

const config = {

    entry: {

        'app': Path.join(appDir, "index.js"),

        // "explicit vendor chunk (split your code into vendor and application);"
        // we must list here the modules that will be placed in lib.js
        // more info at:
        // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin

        // the strings in the array refer to the keys defined in resolve.alias (below)
        'lib': [
            /*
            'jquery',
            
            'underscore',
            
            'backbone',
            
            'backbone.marionette',
            'backbone.select',
            
            'backbone.radio'
            */
        ]
    },

    output: {

        path: Path.join(buildDir),
        filename: "[name].js",
        //filename: "[name].[chunkhash].js",

        // is 'chunkFilename' necessary? it was taken from this example:
        // https://github.com/webpack/webpack/tree/master/examples/chunkhash
        chunkFilename: "[name].js", 
        //chunkFilename: "[name].[chunkhash].js", 

        // In dev mode: Webpack Dev Server uses publicPath to determine the path where
        // the output files are expected to be served from
        // "to make requests to the webpack-dev-server you need to provide a full URL in the 
        // output.publicPath"


        // if webpack-dev-server is running, the chunk file won't actually be
        // created; instead, it will be created in-memory only and is available via 
        // a local server created by webpack

        // if webpack-dev-server is not running, public path is used internally 
        // to reference resources that are not part of the chunks (such as fonts and images), 
        // but that have been copied to the output.path directory
        publicPath: "http://localhost:8081/dev-server-build/" 
    },
  
    plugins: [
        new Webpack.optimize.OccurrenceOrderPlugin(),
        
        new Webpack.optimize.CommonsChunkPlugin({
            name: "lib",  // should be same as the key in the "entry" section
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: "manifest"
        }),

        new BellOnBundlerErrorPlugin(),
    ],

    module: {
        loaders: [
        {
            test: /\.css$/,
            loader: "style!css"
        },
        { 
            // inline base64 URLs for images that are <= 1k; direct URLs for the others 
            // (the files will be copied to the output dir: _build)
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            query: {
                limit: 1024,
                name: 'images/[name].[ext]'
            }
        },
        {
            // fonts loaded in stylesheets (via "src: url('...')" ); 
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 1,
                name: 'fonts/[name].[ext]'
            }
        },
        {
            test: /\.(html|nunjucks)$/,
            loader: 'nunjucks-loader',
            query: {
                config: Path.join(__dirname, 'nunjucks.config.js')
            }
        },
        ]
    },

    resolve: {

        // by default webpack will search first in web_modules, then in node_modules;
        // this can be customized with the resolve.modulesDirectories option
        alias: {
            //"_": Path.join(libDir, "underscore/underscore-1.8.3"),
            "underscore": Path.join(libDir, "underscore/underscore-1.8.3"),
            "jquery": Path.join(libDir, "jquery/jquery-1.11.2.js"),

            // bootstrap has to imported using the "imports-loader", passing a reference
            // to jquery; see ./config/config.js
            //"bootstrap": "bootstrap/3.3.5/js/bootstrap.js",
            

            "backbone": Path.join(libDir, "backbone/backbone-1.3.3.js"),
            "backbone.marionette": Path.join(libDir, "backbone/backbone.marionette-2.4.7.js"),
            "backbone.radio": Path.join(libDir, "backbone/backbone.radio-2.0.0.js"),
            "backbone.base-router": Path.join(libDir, "backbone/backbone.base-router-1.3.0.js"),
            "backbone.select": Path.join(libDir, "backbone/backbone.select-1.5.5"),
            
            /*
            "marionette.state": "backbone/marionette.state-1.0.1.js",

            */
        }
    }

};

module.exports = config;

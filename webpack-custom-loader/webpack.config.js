'use strict';

const Path = require("path");
const Webpack = require("webpack");
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

const appDir   = Path.join(__dirname, "src");
const buildDir = Path.join(__dirname, "build");

const config = {

    entry: {

        'app': Path.join(appDir, "index.js"),

        // "explicit vendor chunk (split your code into vendor and application);"
        // we must list here the modules that will be placed in lib.js
        // more info at:
        // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin

        'lib': [
            'nunjucks'
            //'jquery',
            //'nunjucks-browser'
        ]
    },

    output: {

        path: buildDir,
        filename: "[name].js",

        // is 'chunkFilename' really necessary? it was taken from this example:
        // https://github.com/webpack/webpack/tree/master/examples/chunkhash
        chunkFilename: "[name].js", 

        // path to resources that are not part of the chunks (such as fonts and images), 
        // but that have been copied to the output.path directory
        publicPath: "/Areas/Agency/ClientApp/build/" 
    },
  
    plugins: [
        new Webpack.optimize.OccurrenceOrderPlugin(),
        
        new Webpack.optimize.CommonsChunkPlugin({
            name: "lib",  // should be same as the key in the "entry" section
        }),

        new BellOnBundlerErrorPlugin(),

/*
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })

*/

    ],

    module: {
        // load/include stylesheets

        loaders: [
/*
        {
            test: /\.(xyz)$/,
            loader: 'url-loader',
            query: {
                limit: 100000,
                name: 'files/[name].[ext]',
            }
        },

        {
            test: /\.js$/,
            loader: 'babel',
            query: {
                // https://github.com/babel/babel-loader#options
                cacheDirectory: true,
                presets: ['es2015']
            }
        }
*/
        ]
    },

    resolve: {

        // by default webpack will search first in web_modules, then in node_modules;
        alias: {
            // use the bunded version of bootstrap.js (instead of the individual modules)
            'nunjucks-slim': 'nunjucks/browser/nunjucks-slim.js',
            'nunjucks': 'nunjucks/browser/nunjucks.js',
        }
    }

};

module.exports = config;

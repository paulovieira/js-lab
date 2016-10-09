var Path = require("path");
var Fs = require('fs');
var webpack = require("webpack");

var appDir = __dirname;

process.env.NODE_ENV = "dev";

var nodeModules = {};
Fs.readdirSync('./node_modules/hapi/node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


var config = {
    target: 'node',
    entry: {
        app: Path.join(appDir, "index.js"),
    },

    output: {

        path: Path.resolve(appDir, "_build"),
        filename: "app.js",
        publicPath: "/_build/",
    },

    // resolve: {
    //   extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json']
    // },

    // resolve: {
    //     alias: {
    //         // "jquery": Path.join(__dirname, "_lib/jquery-1.11.2.js"),
    //         // "underscore": Path.join(__dirname, "_lib/underscore-1.8.3"),
    //         // "backbone": Path.join(__dirname, "_lib/backbone-1.2.3.js"),
    //         // "backbone.marionette": Path.join(__dirname, "_lib/backbone.marionette-2.4.4.js"),
    //         // "marionette.service": Path.join(__dirname, "_lib/marionette-service-0.0.7.js"),
    //         // "marionette.state": Path.join(__dirname, "_lib/marionette.state-1.0.1.js"),
    //         // "marionette.toolkit": Path.join(__dirname, "_lib/marionette.toolkit-0.4.1.js"),
    //         // "backbone.radio": Path.join(__dirname, "_lib/backbone.radio-1.0.2.js"),
    //         //"nunjucks": Path.join(__dirname, "_lib/nunjucks-slim-2.3.0.js"),
    //     }
    // },


    module: {
      preLoaders: [
          { test: /\.json$/, loader: 'json'},
      ]
    },

    externals: nodeModules

};

module.exports = config;


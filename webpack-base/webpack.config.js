var Path = require('path');
var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var rootDir = Path.join(__dirname, '.');
var appDir = Path.join(rootDir, '.');

var webpackConfig = {
    entry: {
        app: Path.join(appDir, './main.js'),
        lib: [
            'jquery',
            'kendo-ui-core',
            'backbone',
            'backbone.marionette',
            'underscore'
        ]
    },
    output: {
        path: Path.join(appDir, './_build'),
        filename: '[name].[chunkhash].js',
        publicPath: '/public/something/'
    },
    plugins: []
};

webpackConfig.plugins.push(new Webpack.optimize.OccurrenceOrderPlugin());

webpackConfig.plugins.push(new Webpack.optimize.CommonsChunkPlugin({
    name: ['lib', 'manifest'],  // should be same as the key in the 'entry' section
}));

// create HTML files (or includes) to serve the bundles (useful because the filenames have hashes)
webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: Path.join(appDir, '_build/scripts.include.html'),
    template: Path.join(appDir, '_build/scripts.include.ejs')
}));

// remove contents in the build directory before building
webpackConfig.plugins.push(new CleanWebpackPlugin('_build', {
    root: appDir,
    exclude: ['scripts.include.ejs'],
}));

module.exports = webpackConfig;

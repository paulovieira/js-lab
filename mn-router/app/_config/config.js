var $ = require('jquery');
var _ = require('underscore');

var Backbone = require('backbone');
var Mn = require('backbone.marionette');
var Radio = require("backbone.radio");
require("backbone.select");


// override the default renderer (this works because Marionette.renderer has been
// changed according to pr #2911 (add a custom renderer
Mn.View.prototype.renderer = function(template, data) {
    //debugger;
    if (!template) {
        throw new Mn.Error({
            name: 'TemplateNotFoundError',
            message: 'Cannot render the template since its false, null or undefined.'
        });
    }

    try {
        // nunjucks will look for the pre-compiled template at window.nunjucksPrecompiled;
        // more details here: https://mozilla.github.io/nunjucks/api.html#browser-usage
        // however here we are using webpack's "nunjucks-loader"
        output = template.render(data);

        return output;
    } catch (err) {
        throw new Mn.Error({
            name: 'NunjucksError',
            message: err.message
        });
    }
};


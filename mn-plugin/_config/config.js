var $ = require("jquery");
var _ = require("underscore");

// initial configuration

// the following require calls are necessary to call the code that makes the plugin 
// attach to the respective objects (example: Marionette.Service)

// backbone.marionette will require: backbone, underscore
// backbone will require: underscore, jquery
var Mn = require("backbone.marionette");
var Radio = require("backbone.radio");

// marionette.state will require: underscore, backbone, backbone.marionette
var State = require("marionette.state");
Mn.State = State;


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

    var output = "";
    try {
        // nunjucks will look for the pre-compiled template at window.nunjucksPrecompiled;
        // more details here: https://mozilla.github.io/nunjucks/api.html#browser-usage
        // however here we are using webpack's "nunjucks-loader"
        output = template.render(data);

        return output;
    } 
    catch (err) {
        throw new Mn.Error({
            name: 'NunjucksError',
            message: err.message
        });
    }
};


require("./plugin");

if (NODE_ENV === "dev") {
     window.$ = $;
    // window._ = _;
    // window.Mn = Mn;
    // window.Radio = Radio;
    // Radio.DEBUG = true;
}


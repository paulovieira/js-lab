require("./style.css");

var Mn = require("backbone.marionette");
var _ = require("underscore");

var templateHtml = `
    <div>this is subview 2</div>
    <button class='subview-2-v btn-sub'>button 2</button>
    <br>
    <textarea></textarea>
`;

var SubView2 = Mn.LayoutView.extend({
    template: _.template(templateHtml),
    className: "subview-2-v",
    ui: {
        button: "button.subview-2-v.btn-sub"
    },

    events: {
        "click @ui.button": "clickButton"
    },
    clickButton: function(e){
        console.log("xbutton in subview 2 @ " + Date.now());
    }
});

module.exports = SubView2;


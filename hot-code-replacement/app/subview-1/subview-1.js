require("./style.css");

var $ = require("jquery");
var Mn = require("backbone.marionette");
var _ = require("underscore");

var templateHtml = `
    <div>this is subview 1</div>
    <button class='subview-1-v btn-sub'>button 1</button>
    <br>
    <textarea></textarea>
`;

var SubView1 = Mn.LayoutView.extend({
    template: _.template(templateHtml),
    className: "subview-1-v",
    ui: {
        button: "button.subview-1-v.btn-sub"
    },

    events: {
        "click @ui.button": "clickButton"
    },
    clickButton: function(e){
        console.log("yybutton in subview 1 @ " + Date.now())
        $.ajax({
            method: "GET",
            url: "/api/users",
            success: function(x,y,z){
                var w = 1;
                debugger;
            },
            error: function(x,y,z){
                var w = 2;
                debugger;
            }
        });
    }
});

module.exports = SubView1;
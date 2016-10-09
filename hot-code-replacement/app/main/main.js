require("./style.css");
var $ = require("jquery");
var Mn = require("backbone.marionette");
var _ = require("underscore");

var SubView1 = require("../subview-1/subview-1"); 
var SubView2 = require("../subview-2/subview-2"); 

var templateHtml = `
    <input type='radio' name='abc' value='opt1'>opt1
    <br>
    <input type='radio' name='abc' value='opt2'>opt2
    <br>
    <input type='radio' name='abc' value='opt3'>opt3

    <button class='main-v btn-sub'>button main</button>
    <br><br>
    <div id="mn-r-sub"></div>
`;

var MainLV = Mn.LayoutView.extend({
    template: _.template(templateHtml),
    ui: {
        radioOpt: "input[type='radio'][name='abc']",
        button: "button.main-v.btn-sub"
    },
    regions: {
        subRegion: "#mn-r-sub"
    },
    events: {
        "click @ui.radioOpt": "clickOptions",
        "click @ui.button": "clickButton"
    },
    clickOptions: function(e){
        var value = $(e.target).val();
        this.showSubView(value);
    },
    clickButton: function(e){
        console.log("button in main view @ " + Date.now())
    },
    showSubView: function(value){

        var subView;

        if(value==="opt1"){
            subView = new SubView1();
        }
        else if(value==="opt2"){
            subView = new SubView2();
        }
        else{
            throw new Error("invalid value")
        }

        this.subRegion.show(subView);
    }
});

module.exports = MainLV;
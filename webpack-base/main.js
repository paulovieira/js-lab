var $ = require('jquery');
var Kendo = require('kendo-ui-core');
var Mn = require('backbone.marionette')
var _ = require('underscore');

var mainR = new Mn.Region({
    el: 'main'
});

var html = `
<div width="100px;">
    <input data-app-id="combo-container" />
</div>
`;

var HostDropdown = Mn.View.extend({
    initialize: function(x){

        
    },
    template: _.template(html),
    onRender: function(){
        debugger;
        var comboOptions = this.getOption('data');
        this.$('[data-app-id=combo-container]')
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: comboOptions,
                //index: 0,
                //change: onChange
            });
                    

    },
    events: {
    },

});

var myHostDropdown = new HostDropdown({
    data: [
        { text: "Black", value: "1" },
        { text: "Orange", value: "2" },
        { text: "Grey", value: "3" },
        { text: "Greyxxx", value: "7" }
    ]
});

mainR.show(myHostDropdown);



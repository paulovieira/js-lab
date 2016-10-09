var Backbone = require('backbone');


var MenuM = Backbone.Model.extend({

    initialize: function(){

        this.on('change', this.setFalse)
    },

    setFalse: function(){

        var changedAttr = Object.keys(this.changed)[0];
        
        for(var key in this.attributes){
            if(key !== changedAttr){
                this.attributes[key] = false;    
            }
        }
    }

});

module.exports.MenuM = MenuM;


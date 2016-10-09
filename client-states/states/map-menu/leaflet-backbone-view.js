L.Control.BackboneView = L.Control.extend({
    options: {
        position: "bottomright"             
    },

    initialize: function(options){
        console.log("control initialize");
//debugger;
        L.Util.setOptions(this, options);

        if(options.view){
            this._view = options.view;  
        }
        
    },

    onAdd: function (map) {
        console.log("control onAdd");
//debugger;

        if(this._view){
            this._view.map = this._map;
        }

        return this._view.el;
    },

    onRemove: function(map){
        console.log("control onRemove");
//debugger;
        //this.view.destroy();
        //this.view = undefined;
    },

    getView: function(){
        return this._view;
    },
/*
    // this is essentially the locally already implemented in the addTo method in L.Control
    resetView: function(view){
//debugger;
        var map = this._map,
            container, pos, corner;

        if (map) {
            this._view = view;  
            view.map = map;
            pos = this.getPosition();
            corner = map._controlCorners[pos];

            // remove the current element
            corner.removeChild(this._container);

            // update the element to the the one relative to the passed view
            container = this._container = view.el;
            L.DomUtil.addClass(container, 'leaflet-control');

            if (pos.indexOf('bottom') !== -1) {
                corner.insertBefore(container, corner.firstChild);
            } else {
                corner.appendChild(container);
            }
        }

        return this;
    }
*/
});

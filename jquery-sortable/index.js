// var menu = $('ul.map-groups').sortable({
//     group: 'map-groups'
// });

var menu2 = $('ul.map-elems').sortable({
    group: 'map-elems'
});


// var menu = $('ul.map-menu').sortable({
//     group: 'map-ids'
// });

// var mapGroups = $('div.map-group').sortable({
//     group: 'map-groupsx',
// });


console.log(menu2.sortable("serialize").get());



/*
- given an array od the previously serialized map menu, we have to construct the menu (easy)
- when the button is clicked, save the serialization to the database (config table)

-mapId, mapName


*/
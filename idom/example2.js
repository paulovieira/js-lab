IncrementalDOM.attributes.value = IncrementalDOM.applyProp;
var collection = [];

var n = 3;

for(var i=0; i<n; i++){
  collection.push({
    id: i,
    content: "content " + i,
    updatedAt: Date.now()
  });
}

var el = document.getElementById('main');

// Initial render
update({
  element: el,
  collection: collection,
  render: renderList
});

function update(options) {
    patch(options.element, options.render, options.data);
}

function renderList(data){
  
  elementOpen('div');

    elementOpen('button', null, null,
        'onclick', handleClick);
      text('click to re-render the list');
    elementClose('button');

    elementOpen('ul');
      for(var i=0, l=collection.length; i<l; i++){
        //debugger;
        if(collection[i].span === true){
          elementOpen('span', collection[i].id, null,
              'id', collection[i].id);
            text(collection[i].content + ", last updated at " + collection[i].updatedAt);

            elementVoid('input', null, null,
              'type', 'text');


          elementClose('span');
        }
        else {
          elementOpen('li', collection[i].id, null,
              'id', collection[i].id);
            text(collection[i].content + ", last updated at " + collection[i].updatedAt);

            elementVoid('input', null, null,
              'type', 'text');


          elementClose('li');
        }
      }
    elementClose('ul');
  elementClose('div');

}

/*
function renderList2(data){

  // swap elements at the end of the list
  var temp = collection[1];
  collection[1] = collection[2];
  collection[1].updatedAt = Date.now();
  
  collection[2] = temp;
  collection[2].updatedAt = Date.now();

  elementOpen('div');
    elementOpen('button', null, null,
        'onclick', handleClick);
      text('click to re-render the list');
    elementClose('button');

    elementOpen('ul');
      collection.forEach(function(item){
        elementOpen('li', item.id, null,
            'id', item.id);

          text(item.firstName + ", created at " + item.updatedAt);
          elementVoid('input', null, null,
            'type', 'text')

        elementClose('li');
      })
    elementClose('ul');
  elementClose('div');

}

setInterval(function(){

  update({
    element: el,
    collection: collection,
    render: renderList2
  });

},1000)
*/

function handleClick(e){
  
  var i=1;
  collection[i].updatedAt = Date.now();
  collection[i].content = "changed";
  //collection[i].span = true;

  var newId = 3;
  var newElem = {
    id: newId,
    content: "new content " + newId,
    updatedAt: Date.now()
  }
  //debugger;
  collection.splice(1, 0, newElem);

  update({
    element: el,
    collection: collection,
    render: renderList
  });
  
}
/**/
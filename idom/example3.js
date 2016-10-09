
// Initial render

// we use the div#main that comes with in the initial html but we could also
// pass an element created dynamically document.createElement (but then we would
// have to append the rendered element with something like 
// document.getElementById('main').appendChild(el) after the call to patch

update({
  element: document.getElementById('main'),
  render: renderParent,
});


// we now have the region placeholder
update({
  element: document.getElementById('region'),
  render: renderChildren,
});


function update(options) {
    patch(options.element, options.render, options.ctx);
}

function renderParent(ctx){

  elementOpen('div', null, null, 'class', 'container', 'style', { border: 'solid 1px blue', padding: '2px' });
debugger;
    elementOpen('button', null, null,
        'onclick', handleClick);
      text('click to re-render the parent');
    elementClose('button');
    elementOpen('div', null, null);
      text('content in the parent element, @ ' + Date.now());
    elementClose('div');
    elementOpen('div', null, null);
      text('more content in the parent element, @ ' + Date.now());
    elementClose('div');

    // we can use either elementPlaceholder...
    //elementPlaceholder('div', 'some-key', null, 'id', 'region');

    // or elementVoid with symbols.placeholder...
    //elementVoid('div', 'some-key', [symbols.placeholder, true], 'id', 'region');

    // or it could also be done by giving the attribute directly as a dynamic attribute
    elementVoid('div', 'some-key', null, 'id', 'region', symbols.placeholder, true);

  elementClose('div');

}

function renderChildren(ctx){

  elementOpen('span', null, null, 'style', { border: 'solid 1px green', padding: '2px' });
    text('content at the child element, @ ' + Date.now());
  elementClose('span');

}

function handleClick(e){

  update({
    element: document.getElementById('main'),
    render: renderParent
  });

}

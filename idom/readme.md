## Introduction 
Incremental DOM is a library for expressing and applying updates to DOM trees. JavaScript can be used to extract, iterate over and transform data into calls generating HTMLElements and Text nodes. 

It differs from Virtual DOM approaches in that a diff operation is performed incrementally (that is one node at a time) against the DOM, rather than on a virtual DOM tree.

Rather than targeting direct usage, Incremental DOM aims to provide a platform for higher level libraries or frameworks. As you might notice from the examples, Incremental DOM-style markup can be somewhat challenging to write and read. 


## Quick example

Incremental DOM embraces the ugliness of Real World HTML™ by breaking its API into pairs:
- One API to open a tag (elementOpen) 
- one to close it (elementClose):

```js
data.items.forEach(function(item, index) {
  elementOpen('x-item', index);
  text('item' + index);
  elementClose('x-item');
});
```

For similar reasons the API has dedicated support for attribute creation for those cases where your template wraps entire attributes in if-statements (or loops for which ever reason that may be a good idea)

The DOM to be rendered is described with the "incremental node functions": `elementOpen`, `elementClose` and `text`.

For example, the following function:

```js
function renderPart(ctx) {
  elementOpen('div');
    text('Hello world');
  elementClose('div');
}
```

would correspond to

```html
<div>
  Hello world
</div>
```

Using the `renderPart` function from above, the `patch` function can be used to render the desired structure into an existing Element or Document (which includes Shadow DOM).

```js
var ctx = {}
patch(document.getElementById('someId'), renderPart, ctx);
```

Calling the `patch` function again will patch the DOM tree with any changes, updating attributes, and creating/removing DOM nodes as needed:


## Attributes and Properties

In addition to creating DOM nodes, you can also add/update attributes and properties on Elements. 

They are specified as variable arguments, alternating between name and value.

Values that are Objects or Functions are set as properties, with all others being set as attributes:

typeof value: 
 - object
 - function

Set as property (that is, as a property in the DOM element object)

typeof value:
 - undefined      
 - boolean    
 - number     
 - string     

Set as attribute (that is, directly in the html)

Example:

```js
elementOpen('div', null, null,
    'class', 'someClass',
    'onclick', someFunction);
    ...
elementClose('div');
```

## Statics Array

Often times, you know that some properties on a DOM node will not change. One example would be the type attribute in `<input type="text">`. 

Incremental DOM provides a shortcut to avoid comparing attributes/properties you know will not change. The third argument to elementOpen is an array of unchanging attributes. 

If the statics array is provided, you must also provide a key. This ensures that an Element with the same tag but different statics array is never re-used by Incremental DOM.

```js
var render = (function() {
  var statics = [ 'type', 'text', 'placeholder', '...'];

  return function(isDisabled) {
    elementOpen('input', '1', statics,
        'disabled', isDisabled);
    elementClose('input');
  };
})();
```

## Applying Styles

Styles for an element can be set either using a string or an object. 

When setting styles using an object, the names should be _camelCase_ as they are set on the Element's style property.

### As a string

```js
elementOpen('div', null, null,
    'style', 'color: white; background-color: red;');
    ...  
elementClose('div');
```

### As an object

```js
elementOpen('div', null, null,
    'style', {
      color: 'white',
      backgroundColor: 'red'
    });
    ...
elementClose('div');
```


## Conditional Rendering

### If/else

As you can mix node declarations and JavaScript, rendering conditional branches is fairly straightforward. Simply place the node declarations inside a branch. This works with switch statements too!

```js
function renderGreeting(date, name) {
  if (date.getHours() < 12) {
    elementOpen('strong');
      text('Good morning, ');
    elementClose('strong');
  } else {
    text('Hello ');
  }

  text(name);
}
```

### Array of Items

You can use your favorite way to render an array (or any sort of iterable) of items. 

When rendering an array of items, you will want to specify a `key` as the second argument to the `elementOpen` function. Incremental DOM uses the key in order to:

1) prevent the treating of newly added or moved items as a diff that needs to be reconciled.
2) correctly maintain focus on any input fields, buttons or other items that may receive focus and that have moved.

As Incremental DOM does not know when you are rendering an array of items, there is no warning relative to a missing key (when one should have been specified but is not present). If you are compiling from a template or transpiling, it might be a good idea to statically check to make sure a key is specified.

```js
elementOpen('ul');
  items.forEach(function(item) {
    elementOpen('li', item.id);
      text(item.text);
    elementClose('li');
  });
elementClose('ul');
```


## Logic in Attributes

Incremental DOM provides some helpers to give some additional control over how attributes are specified. 

The `elementOpenStart`, `attr` and `elementOpenEnd` functions act as a helper for calling `elementOpen`, allowing you to mix logic and attributes or call other functions.

```js
var obj = {};
elementOpenStart('div');
  for (var key in obj) {
    attr(key, obj[key]);
  }
elementOpenEnd('div');
```


## Passing Functions

The incremental node functions are evaluated when they are called. If you do not want to have them appear in the current location (e.g. to pass them to another function), simply wrap the statements in a function which can be called later.

```js
function renderStatement(content, isStrong) {
  if (isStrong) {
    elementOpen('strong');
      content();
    elementClose('strong');
  } else {
    content();
  }
}

function renderGreeting(name) {
  function content() {
    text('Hello ');
    text(name);
  }

  elementOpen('div');
    renderStatement(content, true);
  elementClose('div');
}
```


## Hooks

#### Setting Values

Incremental DOM provides hooks to allow customization of how values are set. 

The `attributes` object allows you to provide a function to decide what to do when an attribute passed to `elementOpen` or similar functions changes. 

Example: always set value as a property.

```js
IncrementalDOM.attributes.value = IncrementalDOM.applyProp;
```

Example: if you would like to have a bit more control over how the value is set, you can specify your own function for applying the update.

```js
IncrementalDOM.attributes.value = function(element, name, value) {
    ...
};
```

If no function is specified for a given name, a default function is used that applies values as described in Attributes and Properties. This can be changed by specifying the function for `symbols.default`:

```js
var someFunction = function(){ ... }
IncrementalDOM.attributes[IncrementalDOM.symbols.default] = someFunction;
```

## Added/Removed Nodes

You can be notified when Nodes are added or removed by Incremental DOM by specifying functions for `notifications.nodesCreated` and `notifications.nodesDeleted`. 

If there are added or removed nodes during a patch operation, the appropriate function will be called at the end of the patch with the added or removed nodes.

```js
IncrementalDOM.notifications.nodesCreated = function(nodes) {
  nodes.forEach(function(node) {
    // node may be an Element or a Text
  });
};
```

## API

#### elementOpen

#### elementClose

#### text


#### skip 

The thing that skip buys you is that you can take a look at the element and then make your decision if you want to skip rather than needing to know beforehand (say by looking at the state of its parent). As far as modifying the tree goes, they all do the same thing.




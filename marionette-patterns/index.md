#### The the ui hash to identify the parts of the template that involve interactions

If an element in the template is used for some sort of interaction (click, hover, etc), that element should be explicitely listed in the `ui` hash. The events or triggers hash should the `@ui` syntax instead of using the the jquery selector.

Advantages: this way we can immediatelly identify which parts of the template involve interaction. If we have to change the template in the future, we can see right away which parts of the template are safe to change (because they are used only for presentional purposes) and which parts must be changed with case (because there is some event associated with them).

#### The jquery selectors should not leak into subviews

The selectors should be done in such a way that they don't select by mistake elements in some subview. 

Note that the subview might be added to the application later in time and we might not be aware of the selectors in the parent view.

Example: in the parent view
```js
the parent view
<button class="mn-btn-save">save button</button>
<button class="xyz">some other button</button>

var Parent = Mn.LayoutView.extend({
    template: require("parent.html")
    ui: {
        saveButtonParent: "button.mn-btn-save"
    },
    onAttatch: function(){
        console.log(this.ui.saveButtonParent.length)
    },
    regions: {
        someRegion: "div.some-region"
    }

});

the child view
<button class="mn-btn-save">save button in the child</button>
<button class="xyz">some other button in the child</button>

var Child = Mn.ItemView.extend({
    template: require("child.html")
    ui: {
        saveButtonChild: "button.mn-btn-save"
    },
    onAttatch: function(){
        console.log(this.ui.saveButtonChild.length)
    },

});
```

#### use a separate state object

A change in the view (be it simple add/remove of a css class, showing a subview or a complete re-render) should always happen in consequence of a change in the view's state, not in consequence of the user interaction (click, hover, etc).

Of course, the change in the state will happen in consequence of the user interaction. But we are abstracting "the thing that makes the view change". This way we can start implementing the nesting of the subviews, independently of the thing that will trigger the display of those subviews.

For a desktop it might be click. For a mobile device it might be a drag. For something else it might be a global keyshortcut combination. Or it might happen repeadtly after x seconds (setInterval). We don't care about those details. They will probably change. But the organization of the subviews will always work, because it is the view's state that dictates the change in the view.

This also facilitates the usage of behaviors. The behavior could implement a generic set of events triggered by the view:

```js
ui: {
    "saveButton" : "button.mn-save-button"
},

events: {
    "click @ui.saveButton": function(e){
        
        this.trigger("click:saveButton", $(e.target).data("xyz") )
    },
    "dblclick @ui.saveButton": function(e){
        
        this.trigger("dblclick:saveButton", $(e.target).data("xyz") )
    }
}
```

If a view has a button with class "mn-save-button", then we know that a click in the button will always trigger the "click:saveButton" (passing some associated data). In the view's state we have listen for this event and change the state accordingly.

The view state would then also listen for events from some other object that handles keyboard shortcuts, and again change the state accordingly.



#### when creating an instance of a view, don't send the actual model; instead send a clone, or set a new property with the model's attributes

Using the model

```js
new View({
    model: model
})
```

Using a clone
```js
new View({
    model: new Backbone.Model(model.toJSON())
})
```

Using a new property
```js
new View({
    templateContext: model.toJSON(),
    templateHelpers: function(){
        return _.extend(this.options.templateContext, {
            fullName: this.options.templateContext.firstName + " " + this.options.templateContext.lastName
        });
    }
})
```
In the 3rd case we are explicitely saying that we shouldn't attach computed properties to the model. If we have to change the model we should (after a click in the save button, for instance), then we should explicitely get the model from the id.


#### identifiers for regions and ui elements

Instead of polluting the "id" attribute, use the "data-region" attribute:

Wrong:
```js
<div id="cats-region"></div>
<div id="dogs-region"></div>
```

Correct:
```js
<div data-region="cats"></div>
<div data-region="dogs"></div>
```


The same applies to ui elements (buttons, inputs, etc)

Wrong:
```js
<button class="btn btn-primary" id="js-save"></div>
```

Correct:
```js
<button class="btn btn-primary" data-ui="save"></div>
```

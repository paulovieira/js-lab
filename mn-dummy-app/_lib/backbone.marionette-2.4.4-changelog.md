### 16.03.09: the user code places new properties in the Mn object

It's done in the configuration file (config.js)

```js
var State = require("marionette.state");
Mn.State = State;

var ToolkitAbstractApp = require("marionette.toolkit").AbstractApp;
Mn.Application = ToolkitAbstractApp.extend({ ... })
```


### 16.03.09: constructor of Marionette.View should handle state

This change allows to pass a "stateClass" property to the view. The constructor will take care of creating the state instance and sync the state with the view (Mn.State.syncEntityEvents)

Example:

```js
var MyState = Mn.State.extend({
  componentEvents: {
    "btnClicked": "onBtnClicked"
  },
  onBtnClicked: function(){
    this.set("xyz", Date.now());
  }
});

var MyView = Mn.ItemView.extend({
  stateClass: MyState
});
```


### 16.03.10: add a custom renderer (pr #2911)

This is the same as the pull request.#2911:
https://github.com/marionettejs/backbone.marionette/pull/2911

It allows to add a custom renderer function by attaching it directly to the view prototype (so we can have a specific renderer for each view). 

If we attach it to Mn.View.prototype, then it becomes the new default renderer.

Example:

```js
var MyView = Mn.View.extend({

    template: "something/templates/hello-world.html",

    renderer: function(template, data) {

        if (!template) {
            throw new Marionette.Error({
                name: 'TemplateNotFoundError',
                message: 'Cannot render the template since its false, null or undefined.'
            });
        }

        var output = "";
        try {
            // nunjucks will look for the pre-compiled template at window.nunjucksPrecompiled;
            // more details here: https://mozilla.github.io/nunjucks/api.html#browser-usage
            // NOTE: if using webpack, check nunjucks-loader
            output = nunjucks.render(template, data);
            return output;
        } catch (err) {
            throw new Marionette.Error({
                name: 'NunjucksError',
                message: err.message
            });
        }
    }
});
```

This is done in the the configuration file.

### 16.03.12: if a view is the initial view for a given app, add a js-flag class to quickly identify it

Added at the end of the Marionette.View.constructor function:

```js
if(this.options["js-app-initial-view"]){
  this.$el.addClass(this.options["js-app-initial-view"]);  
}
```


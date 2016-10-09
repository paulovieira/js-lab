Apologies for my late reply. 

I finally had some time to think about how to implement this new feature. The suggestion from @StevenLangbroek makes sense. However one of the main objectives is to be able to use different templating engines in the same application, so instead of `setRenderer` I'd prefer `addRenderer`. 

This way we could reuse views written for previous applications, which might use different engines. This applies in particular to views used in behaviours. 

I come up with a very simple implementation that is backwards compatible. It is done with 3 simple changes/additions:

1) the essential change is in the `Marionette.Renderer` object: it is generalized to hold more than 1 renderer. So instead of having the current form, which is

```js
Marionette.Renderer = {
  render: function(template, data) { ... }
};
```

it will be like this

```js
Marionette.Renderer = {

  // renderer for underscore templates - the default renderer
  underscore: {
    render: function(template, data) { ... }
  },

  // renderer for nunjucks templates
  nunjucks: {
    render: function(template, data) { ... }
  },

  // renderer for handlebars templates
  handlebars: {
    render: function(template, data) { ... }
  }
};
```

2) By default `Marionette.Renderer` would have only the renderer for underscore templates. We could add more with the new `Marionette.addRenderer` helper. Example:

```js
// we add a new renderer at the application startup
var nunjucksRenderer = {
    render: function(template, data) { ... }
};

Mn.addRenderer("nunjucks", nunjucksRenderer);
```

The `addRenderer` would simply add a new property to the `Marionette.Renderer` object at run-time. All very simple.

3) The views would have support for a new property `templateOptions`, which is where the engine to be used would be choosen:

```js
var HelloWorldIV = Mn.ItemView.extend({
    template: "templates/hello-word.html",
    templateOptions: {
        engine: "nunjucks"
    }
});
```

If `templateOptions` is missing, the default renderer is used (which is defined by another new helper: `Marionette.setDefaultRenderer`).


The application is build with webpack. We can use webpack in 2 ways:

1) normal webpack bundling (explicit bundles are created)

Simply run `webpack` in the root directory. The configuration file `webpack.config.js` will be used. It will bundle 2 files:

- `_build/lib.js`
- `_build/app.js`

The start an http server on the same directory: `http-server ./ -p 8080`. The file `index.html` is prepared to serve those 2 bundles. The application will be available at http://localhost:8080

We have do the normal bundling to serve the file to production. We can also bundle in "watch mode" with `webpack --watch`.

2) webpack dev server (implicit, no bundles are created)

This will do the bundling and start an http server automatically, a well as refresh the application when there are changes (hot module replacement)

```bash
webpack-dev-server --inline --hot --port 8081 --content-base ./
```

The application will be available at http://localhost:8081

Using webpack-dev-server with these options is equivalent to the two steps done in 1) (that is, start webpack in watch mode + start the http server).

The `--hot` option will automatically update the modules (would be useful if we were using react or something similar). But it's still useful for css changes because it will inject/update the `<style>` tag in the page without a full reload.

Note that webpack-dev-server will not create the bundles on the disk. They will exist in memory only and are served directly to the browser. So the `_build` will be empty but we are able to open the application in the browser.

Conclusion:
For development: use webpack dev server
For production: use normal webpack bundling




ideias:
-there are no "child apps", but there is a special "mainApp"; this is always the first app that is started
-the mainApp knows about the other apps; there is a reply handler in its channel similar to the "show" reply in the "views" channel
-implement getInitialView
-when the app closes, it should emit "destroy" and reset the channel (?)
    -the channel name can be given in the options?
-when a view starts an app in response to a change in its state, it shouldn't have a direct reference to the app; it will call a special handler in the main app channel

Radio.channel("mainApp").request("start", "otherApp", {})
Radio.channel("mainApp").request("stop", "otherApp")
Radio.channel("mainApp").request("show", "SomeView", {}, someRegion)



new myApp({
    region: ...
    channel: ...
}).start()





Application:

1) define the state class for the application:

```js
var MainAppState = Mn.State.extend({

    defaultState: {},

    componentEvents: {
        'foo': 'onFoo'
    },

    onFoo: function() {
        debugger;
        var now = Date.now();
        this.set("foo", now)
    }
});
```

the componentEvents hash has the events triggered by this states component, which in the case of applications is the respective channel (while in the case of views is the view itself)

2) define the application class:

```js
var MainApp = Mn.Application.extend({

    stateClass: MainAppState,
    stateEvents: {
        "change:foo": "onChangeFoo"
    },
    onChangeFoo: function(arg1, arg2, arg3){
        debugger;
    }
});
```

In the class we can give the stateClass (and the corresponding stateEvents). 

If so, and if the application has been given a channel (either in the class directly or in the constructor options), then the code in the constructor will create an instance of the stateClass (using the channel as the component). 

It will also syncronize the application with the state (Mn.State.syncEntityEvents), that is, the application will listen to the events triggered by the state (usually "change" events relative to some of its attributes).

In the constructor options we can give the following options: region, channel, initialView, initialViewOptions and name:

```js
var mainApp = new MainApp({
    region: new Mn.Region({ el: "body" }),
    channel: Radio.channel("main"),
    initialView: "MenuLV",
    initialViewOptions: {
        className: "xxx",
        //model: new Backbone.Model({ name: "paulo"})
    },
    name: "main-app"
});
```

Note that these properties can always be given in the application class (thus becoming properties in the prototype of the application instance). But if they are defined as constructor properties they will override the prototype properties (because they are placed directly in the object instance).

After the application instance is created we should start the application
```js
mainApp.start();
```

This will call the "onStart" method. The default implementation is just a call to the "show" method (if "initialView" has been given). 

The show method makes the request to the "views" channel.

If we have something more complex than this, we should override the "onStart" and/or the "show" methods and place there the logic to show the initial view.





todo:

override default renderer
use the underscore renderer for a view

function(template, data) {
      if (!template) {
        throw new Marionette.Error({
          name: 'TemplateNotFoundError',
          message: 'Cannot render the template since its false, null or undefined.'
        });
      }
 
      return template(data);
    }




webpack - insert templates from nunjucks
Started the dev server with:
```bash
webpack-dev-server --inline --hot --content-base ./_html
```

All webpack CLI options are valid for the webpack-dev-server CLI too, but there is no <output> default argument. We can also use a webpack.config.js (or the file passed by the --config option) is accepted as well.

There are some additional options:
http://webpack.github.io/docs/webpack-dev-server.html



marionette.state - Uni-directional state architecture for a Marionette.js app.
https://github.com/Squareknot/marionette.state#reasoning

Separating state into its own entity and then maintaining that entity with one-way data binding solves each of these problems without the side effects of other solutions. 

It is a pattern simple enough to implement using pure Marionette code, but this library seeks to simplify the implementation further by providing a state toolset.

Mn.State allows a view to seamlessly depend on any source of state while keeping state logic self-contained and eliminates the temptation to pollute core content models with view-specific state. 

Best of all, Mn.State does this by providing declarative and expressive tools rather than over-engineering for every use case, much like the Marionette library itself.


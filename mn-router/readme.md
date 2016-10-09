A starting point for the webpack configuration using a marionette application.

Build should be executed with the CLI, either via `webpack` or `webpack-dev-server`.

#### using webpack: chunks are saved to files in the build directory
```bash
webpack --watch --display-chunks --config ./webpack.config.js
```

Open `index-chunks.html`.(can be opened directly from the file system, that is, using a 'file://...' url).

#### using webpack-dev-server: chunks are created in memory and served directly from a local server
```bash
webpack-dev-server --inline  --host 127.0.0.1 --port 8081 --config ./webpack.config.js 
```

Open `index-dev-server.html`. In this case the html file can't be opened via a 'file://...' url because webpack dev server uses ajax requests (via sockJS) to detect when the page should be reloaded. The files must be loaded using a local http server.

the `inline` option will automatically do a live reload everytime the chunks are updated (that is, each time some file is saved with changes).

We can have live reload in other devices on the same local network (useful for tablets and smartphones) by settings the `host` option with the local ip. Use `ifconfig` or other similar tool to check the local ip. 

Example:
```bash
webpack-dev-server --inline  --host 192.168.1.66 --port 8081 --config ./webpack.config.js 
```
In this case the html file `index-dev-server.html` must be updated as well with the local ip.






changes
-backbone: in the the umd wrapper, we first first check for commonjs, and then for amd
-marionette: remove references to wreqc
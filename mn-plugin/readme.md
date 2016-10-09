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


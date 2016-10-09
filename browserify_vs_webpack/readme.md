A small experiment to compare browserify and webpack. The main objectives are the following:

1) add source maps to the output bundles
2) work with css stylesheets as if they were a js module (that is, require css files, process less/sass/stylus, etc)
3) create 2 bundles: "app.js" and "lib.js"

#### browserify 

```bash
sudo npm install browserify watchify -g
npm install factor-bundle browserify-css
mkdir _bundles

# use the factor-bundle plugin to create the main and the lib bundles
# watchify has the same options of browserify
watchify main/main.js main/browserify_dummy.js  \
    --transform browserify-css \
    --plugin [ factor-bundle -o _bundles/browserify_main.js -o _bundles/browserify_dummy.js  ]  \
    --outfile _bundles/browserify_lib.js \
    --debug
```

Some details on objective 3:
- `main/main.js` is the initial module (the starting point of the application)
- `main/browserify_dummy.js` is a dummy module that does nothing; it simply requires the modules that we want to be included in a separate bundle (that is, libraries that we won't be changing, like jquery or Q)
- the factor-bundle plugin will find the modules that are common to `main/main.js` and `main/browserify_dummy.js` (think of it as a set intersection) and place those common modules in `_bundles/browserify_lib.js`
- the application itself will be in `_bundles/browserify_main.js`
  
#### webpack

```bash
sudo npm install webpack -g
npm install css-loader style-loader

# start webpack in watch mode
webpack --config ./webpack.config.js --watch
```

The configuration goes into the a configuration file (by default is the `webpack.config.js` file in the root dir).

With webpack we don't need to use the dummy module trick. We can simply tell webpack to create a "common chunk" and give an explicit list of modules.

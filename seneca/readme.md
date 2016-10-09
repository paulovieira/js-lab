## Example 1 - initial example

Taken from the homepage.

## Example 2 - a seneca plugin

Taken from http://senecajs.org/write-a-plugin.html

A Seneca plugin is just a function that gets passed an options object, and has a Seneca instance as its this variable.  

Then we add action patterns in the body of the function, and that's it. There is no callback. Plugins provide you with a way to organize your own code.

### The context of the plugin

The context object of the plugin function (`this`) is a Seneca instance that you can use to define actions. This Seneca instance provides the standard API, but the logging methods are special - they append infomation about the plugin (output will contain extra fields identifying the plugin, such as its name)

### Registering (loading) the plugin

We can use the plugin by calling the `use` method of the Seneca object. This loads the plugin into Seneca, after which the action patterns defined by the plugin are available. 

### Loading the plugin as a separate node module

The `seneca.use` can also accept a string insead of a direct reference to the function value that defines the plugin. In that case it will automatically call `require` using the given string (can be a relative path or a module installed in node_modules, just like we do with `require`).

### Loading the plugin multiple times

We can load the plugin more than once using tags:

```javascript
seneca.use('./my-plugin.js$tag1');
seneca.use('./my-plugin.js$tag2');
```

### Default options for the plugin

Seneca provides a utility method to handle default options: `seneca.util.deepextend` (works much the same as `_.extend`, except that it can handle properties at any level)
.

### Load plugin options from configuration files

Seneca looks for a file named `seneca.options.js` in the current folder, and requires the file if it exists. This file should be a Node.js module that exports a JSON object. Top level properties that match the name of a plugin are used to provide options to plugins when they are loaded.

### Initialize a plugin

We can define a special action to handle initialization, and make sure it happens in the proper order. These initialization functions can be executed asyncronously. NOte however many plugins don't even need to initialize because all they do is define a set of action patterns.

A special initialization action can be added with `seneca.add({init: name-of-the-plugin}, initAction)`. This action will be executed as soon as the plugin is loaded (`seneca.use("./name-of-the-plugin", {})`).

Note that the name of the plugin can defined in several ways. The most clear way is to return an object from the plugin definition function with a "name" property

```javascript
module.exports = function myPlugin(options){

    var seneca = this;
    seneca.add({role: "simple", cmd: "foo"}, fooAction);

    seneca.add({init: "my-plugin-xyz"}, initAction);

    return {
        name: "my-plugin-xyz"
    }
};
```

## Other good references

See also:


Monolithic Node.js
http://www.richardrodger.com/monolithic-nodejs

Falling in Love with Technical Debt
http://livestream.com/websummit/DeveloperStage2013/videos/33539894

More:
http://www.richardrodger.com/speaking/#.VXYT83UViko
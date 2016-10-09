When we register a Hapi plugin we have `server.plugins` and `server.realm.plugins`.

1) server.plugins

`server.plugins` holds properties exposed by a plugin via the `server.expose` method. These properties will be available globally to the app. From the docs:

http://hapijs.com/api#serverplugins
"server.plugins - An object containing the values exposed by each plugin registered where each key is a plugin name and the values are the exposed properties by each plugin using server.expose()."

Example: 

```js
// plugin-a.js
exports.register = function(server, options, next){

    server.expose("xyz", 123);
    return next();
};

exports.register.attributes = {
    name: "plugin-a"
};
```

After registering `plugin-a.js`, we can acess the "xyz" property exposed by the plugin anywhere in the application using

```js
var xyz = server.plugins["plugin-a"].xyz;
```

2) server.realm.plugins

The `server.realm` object works like a small sandbox for the plugin. Each plugin has it own `server.realm` object. From the docs:

http://hapijs.com/api#serverrealm
"server.realm - The realm object contains plugin-specific state that can be shared across various methods. Realms are a limited version of a sandbox where plugins can maintain state used by the framework when adding routes, extensions, and other properties."

The `server.realm` object has the following keys:

- "modifiers"
- "plugin"
- "pluginOptions"
- "plugins"
- "settings"

All these properties should not be changed directly by the plugin, except for "plugins". Example:

```js
// plugin-a.js
exports.register = function(server, options, next){

    server.realm.plugins["foo"] = 456;
    server.realm.plugins["bar"] = { id: 789 }

    return next();
};

exports.register.attributes = {
    name: "plugin-a"
};
```

If we are inside another plugin these properties will not be available because each plugin has its own `server.realm.plugins` (in fact each plugin has its own `server.realm`). This way we can mantain state inside a plugin, without leaking into other plugins.

Realms are also used internally by Hapi when adding request extension functions. If the `sandbox` option is set to "plugin" when calling `server.ext`, then the extension function will be added only to the routes added by the plugin. 

The real concept can be used to add customized functionality to each plugin. This is done in the `vision` plugin: if we initialize a views manager inside a plugin (using `server.views`), that view manager will not be available inside any other plugin. Instead we have to explicitely initialize a new views manager inside the other plugin. This allows us to use different template engines for different parts of the application.

The essence of the idea implemented in the `vision` plugin is reproduced in the `hello-world` plugin:

a) the `hello-world` plugin decorates the server and the reply interface with a new functionality
b) `plugin-a` will use that new functionality by calling `server.setHelloWorld` (with some specific options)
c) `plugin-b` will also use the new functionality by calling `server.setHelloWorld` (with some different specific options)
d) the "hello world" functionality will be available to both plugins, but each one has a custom version of it


3) the root server's realm

TO BE DONE
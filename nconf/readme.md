## Configuration with the nconf module

Configuration can come from different sources:
    - environment variables
    - command-line arguments
    - configuration files 

The main idea of this module is that the user can define a "hierarchy" in these sources:

"The order in which you attach these configuration sources determines their priority in the hierarchy."

So suppose we want to the hierarchy like this:

1) first, if the setting is given in the command line, that will be one to be used

2) if the setting is not given in the command line but is present in some object (which is the exports value of some module), than use than 

3) if the setting is also missing in that object, use some other default object (which should also be a reference to all the available options)

The order of the calls to the Nconf methods determine the hierarchy. We want the command line to have priority, so that will be the first call:

```js
Nconf.argv();
```

Then we want to use the object, so that will be the second call

```js
Nconf.overrides(require("./config/production"));
```

Finally we want to use another object with default properties (will be used only if the 2 previous sources haven't set already that property):

```js
Nconf.defaults(require("./config/default"));
```

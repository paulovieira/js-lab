### 16.03.09: removed the code relative to the App and Component classes;

We only use the AbstractApp class, so the other can be deleted. However we have to add the AbstractApp to the exports: 

```js
  Toolkit.StateClass = state_class;

  Toolkit.AbstractApp = abstract_app;  // <- new

  var marionette_toolkit = Toolkit;

  return marionette_toolkit;
```

The "Toolkit.App" and "Toolkit.Component" exports have been removed.


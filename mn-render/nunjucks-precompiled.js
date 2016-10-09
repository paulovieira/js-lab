(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["index.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<html>\n    <head>\n        \n    </head>\n    <body>\n        \n\n        <script src=\"lib/underscore-1.6.0.js\"></script>\n        <script src=\"lib/jquery-1.11.2.js\"></script>\n        <script src=\"lib/nunjucks-slim-1.3.3.js\"></script>\n        <script src=\"lib/backbone-1.1.2.js\"></script>\n        <script src=\"lib/backbone.marionette-2.4.1.js\"></script>\n\n        <script src=\"nunjucks-precompiled.js\"></script>\n        <script src=\"index.js\"></script>\n    </body>\n</html>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["nunjucks-templates/hello-world-tpl.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "Hello ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "libName"), env.opts.autoescape);
output += "!";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["nunjucks-templates/macros.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();


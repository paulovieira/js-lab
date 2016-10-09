/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/_build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Hapi = __webpack_require__(1)
	console.log("xuz")

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Server = __webpack_require__(2);


	// Declare internals

	var internals = {};


	exports.Server = Server;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Events = __webpack_require__(3);
	var Catbox = __webpack_require__(4);
	var CatboxMemory = __webpack_require__(5);
	var H2o2 = __webpack_require__(6);
	var Heavy = __webpack_require__(7);
	var Hoek = __webpack_require__(8);
	var Inert = __webpack_require__(9);
	var Items = __webpack_require__(10);
	var Mimos = __webpack_require__(11);
	var Vision = __webpack_require__(12);
	var Connection = __webpack_require__(13);
	var Defaults = __webpack_require__(28);
	var Methods = __webpack_require__(30);
	var Plugin = __webpack_require__(35);
	var Reply = __webpack_require__(38);
	var Request = __webpack_require__(39);
	var Schema = __webpack_require__(24);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Server = function (options) {

	    Hoek.assert(this instanceof internals.Server, 'Server must be instantiated using new');

	    options = Schema.assert('server', options || {});

	    this._settings = Hoek.applyToDefaultsWithShallow(Defaults.server, options, ['connections.routes.bind']);
	    this._settings.connections = Hoek.applyToDefaultsWithShallow(Defaults.connection, this._settings.connections || {}, ['routes.bind']);
	    this._settings.connections.routes.cors = Hoek.applyToDefaults(Defaults.cors, this._settings.connections.routes.cors);
	    this._settings.connections.routes.security = Hoek.applyToDefaults(Defaults.security, this._settings.connections.routes.security);

	    this._caches = {};                                                  // Cache clients
	    this._handlers = {};                                                // Registered handlers
	    this._methods = new Methods(this);                                  // Server methods

	    this._events = new Events.EventEmitter();                           // Server-only events
	    this._dependencies = [];                                            // Plugin dependencies
	    this._afters = null;                                                // Plugin after() dependencies
	    this._heavy = new Heavy(this._settings.load);
	    this._mime = new Mimos(this._settings.mime);
	    this._replier = new Reply();
	    this._requestor = new Request();
	    this._decorations = {};
	    this._plugins = {};                                                 // Exposed plugin properties by name
	    this._app = {};

	    if (options.cache) {
	        var caches = [].concat(options.cache);
	        for (var i = 0, il = caches.length; i < il; ++i) {
	            this._createCache(caches[i]);
	        }
	    }

	    if (!this._caches._default) {
	        this._createCache({ engine: CatboxMemory });                    // Defaults to memory-based
	    }

	    Plugin.call(this, this, [], '');

	    if (!this._settings.minimal) {
	        this.register([Vision, Inert, H2o2], Hoek.ignore);              // Safe to ignore
	    }
	};

	Hoek.inherits(internals.Server, Plugin);


	internals.Server.prototype._createCache = function (options) {

	    if (typeof options === 'function') {
	        options = { engine: options };
	    }

	    var name = options.name || '_default';
	    Hoek.assert(!this._caches[name], 'Cannot configure the same cache more than once: ', name === '_default' ? 'default cache' : name);

	    var client = null;
	    if (typeof options.engine === 'object') {
	        client = new Catbox.Client(options.engine);
	    }
	    else {
	        var settings = Hoek.clone(options);
	        settings.partition = settings.partition || 'hapi-cache';
	        delete settings.name;
	        delete settings.engine;
	        delete settings.shared;

	        client = new Catbox.Client(options.engine, settings);
	    }

	    this._caches[name] = {
	        client: client,
	        segments: {},
	        shared: options.shared || false
	    };
	};


	internals.Server.prototype.connection = function (options) {

	    var settings = Hoek.applyToDefaultsWithShallow(this._settings.connections, options || {}, ['listener', 'routes.bind']);
	    settings.routes.cors = Hoek.applyToDefaults(this._settings.connections.routes.cors || Defaults.cors, settings.routes.cors);
	    settings.routes.security = Hoek.applyToDefaults(this._settings.connections.routes.security || Defaults.security, settings.routes.security);

	    settings = Schema.assert('connection', settings);       // Applies validation changes (type cast)

	    var connection = new Connection(this, settings);
	    this.connections.push(connection);
	    this.addEmitter(connection);

	    if (this.connections.length === 1) {
	        this._single();
	    }

	    return this._clone([connection]);
	};


	internals.Server.prototype.start = function (callback) {

	    var self = this;

	    callback = callback || Hoek.ignore;

	    Hoek.assert(this.connections.length, 'No connections to start');

	    // Assert dependencies

	    for (var i = 0, il = this._dependencies.length; i < il; ++i) {
	        var dependency = this._dependencies[i];
	        for (var s = 0, sl = dependency.connections.length; s < sl; ++s) {
	            var connection = dependency.connections[s];
	            for (var d = 0, dl = dependency.deps.length; d < dl; ++d) {
	                var dep = dependency.deps[d];
	                Hoek.assert(connection._registrations[dep], 'Plugin', dependency.plugin, 'missing dependency', dep, 'in connection:', connection.info.uri);
	            }
	        }
	    }

	    // Start cache

	    var caches = Object.keys(self._caches);
	    Items.parallel(caches, function (cache, next) {

	        self._caches[cache].client.start(next);
	    },
	    function (err) {

	        if (err) {
	            return callback(err);
	        }

	        // After hooks

	        var finalize = function (err) {

	            if (err) {
	                return callback(err);
	            }

	            // Load measurements

	            self._heavy.start();

	            // Start connections

	            Items.serial(self.connections, function (connectionItem, next) {

	                connectionItem._start(next);
	            },
	            function (err) {

	                self._events.emit('start');
	                return callback(err);
	            });
	        };

	        var exts = self._afters;
	        if (!exts) {
	            return process.nextTick(finalize);
	        }

	        Items.serial(exts.nodes, function (ext, next) {

	            ext.func(ext.plugin, next);
	        },
	        function (err) {

	            return finalize(err);
	        });
	    });
	};


	internals.Server.prototype.stop = function (/*[options], [callback]*/) {

	    var self = this;

	    var callback = (arguments.length === 1 ? (typeof arguments[0] === 'function' ? arguments[0] : null) : arguments[1]);
	    var options = (arguments.length === 1 ? (typeof arguments[0] === 'function' ? null : arguments[0]) : arguments[0]);

	    Items.serial(this.connections, function (connection, next) {

	        connection._stop(options, next);
	    },
	    function (err) {

	        var caches = Object.keys(self._caches);
	        for (var i = 0, il = caches.length; i < il; ++i) {
	            self._caches[caches[i]].client.stop();
	        }

	        self._events.emit('stop');
	        self._heavy.stop();

	        if (callback) {
	            callback(err);
	        }
	    });
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("catbox");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("catbox-memory");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("h2o2");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("heavy");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("hoek");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("inert");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("items");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("mimos");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("vision");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Events = __webpack_require__(3);
	var Http = __webpack_require__(14);
	var Https = __webpack_require__(15);
	var Os = __webpack_require__(16);
	var Path = __webpack_require__(17);
	var Boom = __webpack_require__(18);
	var Call = __webpack_require__(19);
	var Hoek = __webpack_require__(8);
	var Shot = __webpack_require__(20);
	var Statehood = __webpack_require__(21);
	var Topo = __webpack_require__(22);
	var Auth = __webpack_require__(23);
	var Route = __webpack_require__(26);


	// Declare internals

	var internals = {
	    counter: {
	        min: 10000,
	        max: 99999
	    }
	};


	exports = module.exports = internals.Connection = function (server, options) {

	    var now = Date.now();

	    Events.EventEmitter.call(this);

	    this.settings = options;                                                        // options cloned in server.connection()
	    this.server = server;

	    // Normalize settings

	    this.settings.labels = Hoek.unique(this.settings.labels || []);                 // Remove duplicates
	    if (this.settings.port === undefined) {
	        this.settings.port = 0;
	    }

	    this.type = (typeof this.settings.port === 'string' ? 'socket' : 'tcp');
	    if (this.type === 'socket') {
	        this.settings.port = (this.settings.port.indexOf('/') !== -1 ? Path.resolve(this.settings.port) : this.settings.port.toLowerCase());
	    }

	    if (this.settings.autoListen === undefined) {
	        this.settings.autoListen = true;
	    }

	    Hoek.assert(this.settings.autoListen || !this.settings.port, 'Cannot specify port when autoListen is false');
	    Hoek.assert(this.settings.autoListen || !this.settings.address, 'Cannot specify address when autoListen is false');

	    this.settings.query = this.settings.query || {};

	    // Connection facilities

	    this._started = false;
	    this._connections = {};
	    this._onConnection = null;          // Used to remove event listener on stop
	    this._registrations = {};           // Tracks plugin for dependency validation

	    this._extensions = {
	        onRequest: null,            // New request, before handing over to the router (allows changes to the request method, url, etc.)
	        onPreAuth: null,            // After cookie parse and before authentication (skipped if state error)
	        onPostAuth: null,           // After authentication (and payload processing) and before validation (skipped if auth or payload error)
	        onPreHandler: null,         // After validation and body parsing, before route handler (skipped if auth or validation error)
	        onPostHandler: null,        // After route handler returns, before sending response (skipped if onPreHandler not called)
	        onPreResponse: null         // Before response is sent (always called)
	    };

	    this._requestCounter = { value: internals.counter.min, min: internals.counter.min, max: internals.counter.max };
	    this._load = server._heavy.policy(this.settings.load);
	    this.states = new Statehood.Definitions(this.settings.state);
	    this.auth = new Auth(this);
	    this._router = new Call.Router(this.settings.router);
	    this._defaultRoutes();

	    this.plugins = {};                  // Registered plugin APIs by plugin name
	    this.app = {};                      // Place for application-specific state without conflicts with hapi, should not be used by plugins

	    // Create listener

	    this.listener = this.settings.listener || (this.settings.tls ? Https.createServer(this.settings.tls) : Http.createServer());
	    this.listener.on('request', this._dispatch());
	    this._init();

	    // Connection information

	    this.info = {
	        created: now,
	        started: 0,
	        host: this.settings.host || Os.hostname() || 'localhost',
	        port: this.settings.port,
	        protocol: this.type === 'tcp' ? (this.settings.tls ? 'https' : 'http') : this.type,
	        id: Os.hostname() + ':' + process.pid + ':' + now.toString(36)
	    };

	    this.info.uri = (this.settings.uri || (this.info.protocol + ':' + (this.type === 'tcp' ? '//' + this.info.host + (this.info.port ? ':' + this.info.port : '') : this.info.port)));
	};

	Hoek.inherits(internals.Connection, Events.EventEmitter);


	internals.Connection.prototype._init = function () {

	    var self = this;

	    // Setup listener

	    this.listener.once('listening', function () {

	        // Update the address, port, and uri with active values

	        if (self.type === 'tcp') {
	            var address = self.listener.address();
	            self.info.address = address.address;
	            self.info.port = address.port;
	            self.info.uri = (self.settings.uri || (self.info.protocol + '://' + self.info.host + ':' + self.info.port));
	        }

	        self._onConnection = function (connection) {

	            var key = connection.remoteAddress + ':' + connection.remotePort;
	            self._connections[key] = connection;

	            connection.once('close', function () {

	                delete self._connections[key];
	            });
	        };

	        self.listener.on('connection', self._onConnection);
	    });
	};


	internals.Connection.prototype._start = function (callback) {

	    var self = this;

	    if (this._started) {
	        return process.nextTick(callback);
	    }

	    this._started = true;
	    this.info.started = Date.now();

	    if (!this.settings.autoListen) {
	        return process.nextTick(callback);
	    }

	    var onError = function (err) {

	        self._started = false;
	        return callback(err);
	    };

	    this.listener.once('error', onError);

	    var finalize = function () {

	        self.listener.removeListener('error', onError);
	        callback();
	    };

	    if (this.type !== 'tcp') {
	        this.listener.listen(this.settings.port, finalize);
	    }
	    else {
	        var address = this.settings.address || this.settings.host || '0.0.0.0';
	        this.listener.listen(this.settings.port, address, finalize);
	    }
	};


	internals.Connection.prototype._stop = function (options, callback) {

	    var self = this;

	    options = options || {};
	    options.timeout = options.timeout || 5000;                                              // Default timeout to 5 seconds

	    if (!this._started) {
	        return process.nextTick(callback);
	    }

	    this._started = false;
	    this.info.started = 0;

	    var timeoutId = setTimeout(function () {

	        Object.keys(self._connections).forEach(function (key) {

	            self._connections[key].destroy();
	        });


	        self._connections = {};
	    }, options.timeout);

	    this.listener.close(function () {

	        self.listener.removeListener('connection', self._onConnection);
	        clearTimeout(timeoutId);

	        self._init();
	        return callback();
	    });
	};


	internals.Connection.prototype._dispatch = function (options) {

	    var self = this;

	    options = options || {};

	    return function (req, res) {

	        if (!self._started &&
	            req.connection) {

	            return req.connection.end();
	        }

	        // Create request

	        var request = self.server._requestor.request(self, req, res, options);

	        // Check load

	        var overload = self._load.check();
	        if (overload) {
	            self.server._log(['load'], self.server.load);
	            request._reply(overload);
	        }
	        else {

	            // Execute request lifecycle

	            request._protect.domain.run(function () {

	                request._execute();
	            });
	        }
	    };
	};


	internals.Connection.prototype.inject = function (options, callback) {

	    var settings = options;
	    if (settings.credentials ||
	        settings.artifacts) {

	        settings = Hoek.shallow(options);               // options can be reused
	        delete settings.credentials;
	        delete settings.artifacts;
	    }

	    var needle = this._dispatch({
	        credentials: options.credentials,
	        artifacts: options.artifacts
	    });

	    Shot.inject(needle, settings, function (res) {

	        if (res.raw.res._hapi) {
	            res.result = res.raw.res._hapi.result;
	            res.request = res.raw.res._hapi.request;
	            delete res.raw.res._hapi;
	        }

	        if (res.result === undefined) {
	            res.result = res.payload;
	        }

	        return callback(res);
	    });
	};


	internals.Connection.prototype.table = function (host) {

	    return this._router.table(host);
	};


	internals.Connection.prototype.lookup = function (id) {

	    Hoek.assert(id && typeof id === 'string', 'Invalid route id:', id);

	    var record = this._router.ids[id];
	    if (!record) {
	        return null;
	    }

	    return record.route.public;
	};


	internals.Connection.prototype.match = function (method, path, host) {

	    Hoek.assert(method && typeof method === 'string', 'Invalid method:', method);
	    Hoek.assert(path && typeof path === 'string' && path[0] === '/', 'Invalid path:', path);
	    Hoek.assert(!host || typeof host === 'string', 'Invalid host:', host);

	    var match = this._router.route(method.toLowerCase(), path, host);
	    if (match.route.method === 'notfound') {
	        return null;
	    }

	    Hoek.assert(match.route.method !== 'badrequest', 'Invalid path:', path);

	    return match.route.public;
	};


	internals.Connection.prototype._ext = function (event, func, options, realm) {

	    options = options || {};

	    Hoek.assert(this._extensions[event] !== undefined, 'Unknown event type', event);

	    var settings = {
	        before: options.before,
	        after: options.after,
	        group: realm.plugin
	    };

	    var nodes = [];
	    ([].concat(func)).forEach(function (fn, i) {

	        var node = {
	            func: fn,               // function (request, next) { next(); }
	            realm: realm,
	            bind: options.bind
	        };

	        nodes.push(node);
	    });

	    this._extensions[event] = this._extensions[event] || new Topo();
	    this._extensions[event].add(nodes, settings);
	};


	internals.Connection.prototype._route = function (configs, realm) {

	    configs = [].concat(configs);
	    for (var i = 0, il = configs.length; i < il; ++i) {
	        var config = configs[i];

	        if (Array.isArray(config.method)) {
	            for (var m = 0, ml = config.method.length; m < ml; ++m) {
	                var method = config.method[m];

	                var settings = Hoek.shallow(config);
	                settings.method = method;
	                this._addRoute(settings, realm);
	            }
	        }
	        else {
	            this._addRoute(config, realm);
	        }
	    }
	};


	internals.Connection.prototype._addRoute = function (config, realm) {

	    var route = new Route(config, this, realm);                // Do no use config beyond this point, use route members
	    var vhosts = [].concat(route.settings.vhost || '*');

	    for (var i = 0, il = vhosts.length; i < il; ++i) {
	        var vhost = vhosts[i];
	        var record = this._router.add({ method: route.method, path: route.path, vhost: vhost, analysis: route._analysis, id: route.settings.id }, route);
	        route.fingerprint = record.fingerprint;
	        route.params = record.params;
	    }
	};


	internals.Connection.prototype._defaultRoutes = function () {

	    this._router.special('notFound', new Route({
	        method: 'notFound',
	        path: '/{p*}',
	        config: {
	            auth: false,                            // Override any defaults
	            handler: function (request, reply) {

	                return reply(Boom.notFound());
	            }
	        }
	    }, this, this.server.realm));

	    this._router.special('badRequest', new Route({
	        method: 'badRequest',
	        path: '/{p*}',
	        config: {
	            auth: false,                            // Override any defaults
	            handler: function (request, reply) {

	                return reply(Boom.badRequest());
	            }
	        }
	    }, this, this.server.realm));

	    if (this.settings.routes.cors) {
	        this._router.special('options', new Route({
	            path: '/{p*}',
	            method: 'options',
	            config: {
	                auth: false,                         // Override any defaults
	                cors: this.settings.routes.cors,
	                handler: function (request, reply) {

	                    return reply();
	                }
	            }
	        }, this, this.server.realm));
	    }
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("boom");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("call");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("shot");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("statehood");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("topo");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Boom = __webpack_require__(18);
	var Hoek = __webpack_require__(8);
	var Schema = __webpack_require__(24);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Auth = function (connection) {

	    this.connection = connection;
	    this._schemes = {};
	    this._strategies = {};
	    this.settings = {
	        default: null           // Strategy used as default if route has no auth settings
	    };
	};


	internals.Auth.prototype.scheme = function (name, scheme) {

	    Hoek.assert(name, 'Authentication scheme must have a name');
	    Hoek.assert(!this._schemes[name], 'Authentication scheme name already exists:', name);
	    Hoek.assert(typeof scheme === 'function', 'scheme must be a function:', name);

	    this._schemes[name] = scheme;
	};


	internals.Auth.prototype.strategy = function (name, scheme /*, mode, options */) {

	    var hasMode = (typeof arguments[2] === 'string' || typeof arguments[2] === 'boolean');
	    var mode = (hasMode ? arguments[2] : false);
	    var options = (hasMode ? arguments[3] : arguments[2]) || null;

	    Hoek.assert(name, 'Authentication strategy must have a name');
	    Hoek.assert(name !== 'bypass', 'Cannot use reserved strategy name: bypass');
	    Hoek.assert(!this._strategies[name], 'Authentication strategy name already exists');
	    Hoek.assert(scheme, 'Authentication strategy', name, 'missing scheme');
	    Hoek.assert(this._schemes[scheme], 'Authentication strategy', name, 'uses unknown scheme:', scheme);

	    var server = this.connection.server._clone([this.connection], '');
	    var strategy = this._schemes[scheme](server, options);

	    Hoek.assert(strategy.authenticate, 'Invalid scheme:', name, 'missing authenticate() method');
	    Hoek.assert(typeof strategy.authenticate === 'function', 'Invalid scheme:', name, 'invalid authenticate() method');
	    Hoek.assert(!strategy.payload || typeof strategy.payload === 'function', 'Invalid scheme:', name, 'invalid payload() method');
	    Hoek.assert(!strategy.response || typeof strategy.response === 'function', 'Invalid scheme:', name, 'invalid response() method');
	    strategy.options = strategy.options || {};
	    Hoek.assert(strategy.payload || !strategy.options.payload, 'Cannot require payload validation without a payload method');

	    this._strategies[name] = {
	        methods: strategy,
	        realm: server.realm
	    };

	    if (mode) {
	        this.default({ strategies: [name], mode: mode === true ? 'required' : mode });
	    }
	};


	internals.Auth.prototype.default = function (options) {

	    Schema.assert('auth', options, 'default strategy');
	    Hoek.assert(!this.settings.default, 'Cannot set default strategy more than once');

	    var settings = Hoek.clone(options);             // options can be reused

	    if (typeof settings === 'string') {
	        settings = {
	            strategies: [settings],
	            mode: 'required'
	        };
	    }
	    else if (settings.strategy) {
	        settings.strategies = [settings.strategy];
	        delete settings.strategy;
	    }

	    Hoek.assert(settings.strategies && settings.strategies.length, 'Default authentication strategy missing strategy name');

	    this.settings.default = settings;
	};


	internals.Auth.prototype.test = function (name, request, next) {

	    Hoek.assert(name, 'Missing authentication strategy name');
	    var strategy = this._strategies[name];
	    Hoek.assert(strategy, 'Unknown authentication strategy:', name);

	    var transfer = function (response, data) {

	        return next(response, data && data.credentials);
	    };

	    var reply = request.server._replier.interface(request, strategy.realm, transfer);
	    strategy.methods.authenticate(request, reply);
	};


	internals.Auth.prototype._setupRoute = function (options, path) {

	    var self = this;

	    if (!options) {
	        return options;         // Preseve the difference between undefined and false
	    }

	    if (typeof options === 'string') {
	        options = { strategies: [options] };
	    }
	    else if (options.strategy) {
	        options.strategies = [options.strategy];
	        delete options.strategy;
	    }

	    if (!options.strategies) {
	        Hoek.assert(this.settings.default, 'Route missing authentication strategy and no default defined:', path);
	        options = Hoek.applyToDefaults(this.settings.default, options);
	    }

	    if (options.scope) {
	        if (typeof options.scope === 'string') {
	            options.scope = [options.scope];
	        }

	        for (var i = 0, il = options.scope.length; i < il; ++i) {
	            if (/{([^}]+)}/.test(options.scope[i])) {
	                options.hasScopeParameters = true;
	                break;
	            }
	        }
	    }

	    Hoek.assert(options.strategies.length, 'Route missing authentication strategy:', path);

	    options.mode = options.mode || 'required';
	    if (options.payload === true) {
	        options.payload = 'required';
	    }

	    var hasAuthenticatePayload = false;
	    options.strategies.forEach(function (name) {

	        var strategy = self._strategies[name];
	        Hoek.assert(strategy, 'Unknown authentication strategy:', name, 'in path:', path);
	        Hoek.assert(strategy.methods.payload || options.payload !== 'required', 'Payload validation can only be required when all strategies support it in path:', path);
	        hasAuthenticatePayload = hasAuthenticatePayload || strategy.methods.payload;
	        Hoek.assert(!strategy.methods.options.payload || options.payload === undefined || options.payload === 'required', 'Cannot set authentication payload to', options.payload, 'when a strategy requires payload validation', path);
	    });

	    Hoek.assert(!options.payload || hasAuthenticatePayload, 'Payload authentication requires at least one strategy with payload support in path:', path);

	    return options;
	};


	internals.Auth.prototype._routeConfig = function (request) {

	    if (request.route.settings.auth === false) {
	        return false;
	    }

	    return request.route.settings.auth || this.settings.default;
	};


	internals.Auth.authenticate = function (request, next) {

	    var auth = request.connection.auth;
	    return auth._authenticate(request, next);
	};


	internals.Auth.prototype._authenticate = function (request, next) {

	    var self = this;

	    var config = this._routeConfig(request);
	    if (!config) {
	        return next();
	    }

	    request.auth.mode = config.mode;

	    var authErrors = [];
	    var strategyPos = 0;

	    var authenticate = function () {

	        // Find next strategy

	        if (strategyPos >= config.strategies.length) {
	            var err = Boom.unauthorized('Missing authentication', authErrors);

	            if (config.mode === 'optional' ||
	                config.mode === 'try') {

	                request.auth.isAuthenticated = false;
	                request.auth.credentials = null;
	                request.auth.error = err;
	                request._log(['auth', 'unauthenticated']);
	                return next();
	            }

	            return next(err);
	        }

	        var name = config.strategies[strategyPos];
	        ++strategyPos;

	        request._protect.run('auth:request:' + name, validate, function (exit) {

	            var transfer = function (response, data) {

	                exit(response, name, data);
	            };

	            var strategy = self._strategies[name];
	            var reply = request.server._replier.interface(request, strategy.realm, transfer);
	            strategy.methods.authenticate(request, reply);
	        });
	    };

	    var validate = function (err, name, result) {           // err can be Boom, Error, or a valid response object

	        if (!name) {
	            return next(err);
	        }

	        result = result || {};

	        // Unauthenticated

	        if (!err &&
	            !result.credentials) {

	            return next(Boom.badImplementation('Authentication response missing both error and credentials'));
	        }

	        if (err) {
	            if (err instanceof Error === false) {
	                request._log(['auth', 'unauthenticated', 'response', name], err.statusCode);
	                return next(err);
	            }

	            if (err.isMissing) {

	                // Try next name

	                request._log(['auth', 'unauthenticated', 'missing', name], err);
	                authErrors.push(err.output.headers['WWW-Authenticate']);
	                return authenticate();
	            }

	            if (config.mode === 'try') {
	                request.auth.isAuthenticated = false;
	                request.auth.strategy = name;
	                request.auth.credentials = result.credentials;
	                request.auth.artifacts = result.artifacts;
	                request.auth.error = err;
	                request._log(['auth', 'unauthenticated', 'try', name], err);
	                return next();
	            }

	            request._log(['auth', 'unauthenticated', 'error', name], err);
	            return next(err);
	        }

	        // Authenticated

	        var credentials = result.credentials;
	        request.auth.strategy = name;
	        request.auth.credentials = credentials;
	        request.auth.artifacts = result.artifacts;

	        // Check scope

	        if (config.scope) {
	            var scopes = config.scope;
	            if (config.hasScopeParameters) {
	                scopes = [];
	                var context = { params: request.params, query: request.query };
	                for (var i = 0, il = config.scope.length; i < il; ++i) {
	                    scopes[i] = Hoek.reachTemplate(context, config.scope[i]);
	                }
	            }

	            if (!credentials.scope ||
	                (typeof credentials.scope === 'string' ? scopes.indexOf(credentials.scope) === -1 : !Hoek.intersect(scopes, credentials.scope).length)) {

	                request._log(['auth', 'scope', 'error', name], { got: credentials.scope, need: scopes });
	                return next(Boom.forbidden('Insufficient scope, expected any of: ' + scopes));
	            }
	        }

	        // Check entity

	        var entity = config.entity || 'any';

	        // Entity: 'any'

	        if (entity === 'any') {
	            request._log(['auth', name]);
	            request.auth.isAuthenticated = true;
	            return next();
	        }

	        // Entity: 'user'

	        if (entity === 'user') {
	            if (!credentials.user) {
	                request._log(['auth', 'entity', 'user', 'error', name]);
	                return next(Boom.forbidden('Application credentials cannot be used on a user endpoint'));
	            }

	            request._log(['auth', name]);
	            request.auth.isAuthenticated = true;
	            return next();
	        }

	        // Entity: 'app'

	        if (credentials.user) {
	            request._log(['auth', 'entity', 'app', 'error', name]);
	            return next(Boom.forbidden('User credentials cannot be used on an application endpoint'));
	        }

	        request._log(['auth', name]);
	        request.auth.isAuthenticated = true;
	        return next();
	    };

	    // Injection bypass

	    if (request.auth.credentials) {
	        return validate(null, 'bypass', { credentials: request.auth.credentials, artifacts: request.auth.artifacts });
	    }

	    // Authenticate

	    authenticate();
	};


	internals.Auth.payload = function (request, next) {

	    if (!request.auth.isAuthenticated ||
	        request.auth.strategy === 'bypass') {

	        return next();
	    }

	    var auth = request.connection.auth;
	    var strategy = auth._strategies[request.auth.strategy];

	    if (!strategy.methods.payload) {
	        return next();
	    }

	    var config = auth._routeConfig(request);
	    var setting = config.payload || (strategy.methods.options.payload ? 'required' : false);
	    if (!setting) {
	        return next();
	    }

	    var finalize = function (response) {

	        if (response &&
	            response.isBoom &&
	            response.isMissing) {

	            return next(setting === 'optional' ? null : Boom.unauthorized('Missing payload authentication'));
	        }

	        return next(response);
	    };

	    request._protect.run('auth:payload:' + request.auth.strategy, finalize, function (exit) {

	        var reply = request.server._replier.interface(request, strategy.realm, exit);
	        strategy.methods.payload(request, reply);
	    });
	};


	internals.Auth.response = function (request, next) {

	    var auth = request.connection.auth;
	    var config = auth._routeConfig(request);
	    if (!config ||
	        !request.auth.isAuthenticated ||
	        request.auth.strategy === 'bypass') {

	        return next();
	    }

	    var strategy = auth._strategies[request.auth.strategy];
	    if (!strategy.methods.response) {
	        return next();
	    }

	    request._protect.run('auth:response:' + request.auth.strategy, next, function (exit) {

	        var reply = request.server._replier.interface(request, strategy.realm, exit);
	        strategy.methods.response(request, reply);
	    });
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Joi = __webpack_require__(25);
	var Hoek = __webpack_require__(8);


	// Declare internals

	var internals = {};


	exports.assert = function (type, options, message) {

	    var result = Joi.validate(options, internals[type]);
	    Hoek.assert(!result.error, 'Invalid', type, 'options', message ? '(' + message + ')' : '', result.error && result.error.annotate());
	    return result.value;
	};


	internals.cache = Joi.object({
	    name: Joi.string().invalid('_default'),
	    partition: Joi.string(),
	    shared: Joi.boolean(),
	    engine: Joi.alternatives([
	        Joi.object(),
	        Joi.func()
	    ])
	        .required()
	}).unknown();


	internals.auth = Joi.alternatives([
	    Joi.string(),
	    Joi.object({
	        mode: Joi.string().valid('required', 'optional', 'try'),
	        scope: Joi.alternatives([
	            Joi.string(),
	            Joi.array()
	        ])
	            .allow(false),
	        entity: Joi.string().valid('user', 'app', 'any'),
	        strategy: Joi.string(),
	        strategies: Joi.array().min(1),
	        payload: [
	            Joi.string().valid('required', 'optional'),
	            Joi.boolean()
	        ]
	    })
	        .without('strategy', 'strategies')
	]);


	internals.routeBase = Joi.object({
	    app: Joi.object().allow(null),
	    auth: internals.auth.allow(false),
	    bind: Joi.object().allow(null),
	    cache: Joi.object({
	        expiresIn: Joi.number(),
	        expiresAt: Joi.string(),
	        privacy: Joi.string().valid('default', 'public', 'private'),
	        statuses: Joi.array().items(Joi.number().integer().min(200)).min(1)
	    }),
	    cors: Joi.object({
	        origin: Joi.array(),
	        matchOrigin: Joi.boolean(),
	        isOriginExposed: Joi.boolean(),
	        maxAge: Joi.number(),
	        headers: Joi.array(),
	        additionalHeaders: Joi.array(),
	        methods: Joi.array(),
	        additionalMethods: Joi.array(),
	        exposedHeaders: Joi.array(),
	        additionalExposedHeaders: Joi.array(),
	        credentials: Joi.boolean(),
	        override: Joi.boolean()
	    })
	        .allow(null, false, true),
	    files: Joi.object({
	        relativeTo: Joi.string().regex(/^([\/\.])|([A-Za-z]:\\)|(\\\\)/).required()
	    }),
	    json: Joi.object({
	        replacer: Joi.alternatives(Joi.func(), Joi.array()).allow(null),
	        space: Joi.number().allow(null),
	        suffix: Joi.string().allow(null)
	    }),
	    jsonp: Joi.string(),
	    payload: Joi.object({
	        output: Joi.string().valid('data', 'stream', 'file'),
	        parse: Joi.boolean().allow('gunzip'),
	        allow: [
	            Joi.string(),
	            Joi.array()
	        ],
	        override: Joi.string(),
	        maxBytes: Joi.number(),
	        uploads: Joi.string(),
	        failAction: Joi.string().valid('error', 'log', 'ignore'),
	        timeout: Joi.number().integer().positive().allow(false),
	        qs: Joi.object()
	    }),
	    plugins: Joi.object(),
	    response: Joi.object({
	        schema: Joi.alternatives(Joi.object(), Joi.func()).allow(true, false),
	        status: Joi.object().pattern(/\d\d\d/, Joi.alternatives(Joi.object(), Joi.func()).allow(true, false)),
	        sample: Joi.number().min(0).max(100),
	        failAction: Joi.string().valid('error', 'log'),
	        modify: Joi.boolean(),
	        options: Joi.object()
	    })
	        .without('modify', 'sample'),
	    security: Joi.object({
	        hsts: [
	            Joi.object({
	                maxAge: Joi.number(),
	                includeSubdomains: Joi.boolean()
	            }),
	            Joi.boolean(),
	            Joi.number()
	        ],
	        xframe: [
	            Joi.boolean(),
	            Joi.string().valid('sameorigin', 'deny'),
	            Joi.object({
	                rule: Joi.string().valid('sameorigin', 'deny', 'allow-from'),
	                source: Joi.string()
	            })
	        ],
	        xss: Joi.boolean(),
	        noOpen: Joi.boolean(),
	        noSniff: Joi.boolean()
	    })
	        .allow(null, false, true),
	    state: Joi.object({
	        parse: Joi.boolean(),
	        failAction: Joi.string().valid('error', 'log', 'ignore')
	    }),
	    timeout: Joi.object({
	        socket: Joi.number().integer().positive().allow(false),
	        server: Joi.number().integer().positive().allow(false).required()
	    }),
	    validate: Joi.object({
	        headers: Joi.alternatives(Joi.object(), Joi.func()).allow(null, false, true),
	        params: Joi.alternatives(Joi.object(), Joi.func()).allow(null, false, true),
	        query: Joi.alternatives(Joi.object(), Joi.func()).allow(null, false, true),
	        payload: Joi.alternatives(Joi.object(), Joi.func()).allow(null, false, true),
	        failAction: [
	            Joi.string().valid('error', 'log', 'ignore'),
	            Joi.func()
	        ],
	        errorFields: Joi.object(),
	        options: Joi.object()
	    })
	});


	internals.connectionBase = Joi.object({
	    app: Joi.object().allow(null),
	    load: Joi.object(),
	    plugins: Joi.object(),
	    query: Joi.object({
	        qs: Joi.object()
	    }),
	    router: Joi.object({
	        isCaseSensitive: Joi.boolean(),
	        stripTrailingSlash: Joi.boolean()
	    }),
	    routes: internals.routeBase,
	    state: Joi.object()                                     // Cookie defaults
	});


	internals.server = Joi.object({
	    app: Joi.object().allow(null),
	    cache: Joi.alternatives([
	        Joi.func(),
	        internals.cache,
	        Joi.array().items(internals.cache).min(1)
	    ]).allow(null),
	    connections: internals.connectionBase,
	    debug: Joi.object({
	        request: Joi.array().allow(false),
	        log: Joi.array().allow(false)
	    }).allow(false),
	    files: Joi.object({
	        etagsCacheMaxSize: Joi.number().min(0)
	    }),
	    load: Joi.object(),
	    mime: Joi.object(),
	    minimal: Joi.boolean(),
	    plugins: Joi.object()
	});


	internals.connection = internals.connectionBase.keys({
	    autoListen: Joi.boolean(),
	    host: Joi.string().hostname(),
	    address: Joi.string().hostname(),
	    labels: Joi.array().items(Joi.string()).single(),
	    listener: Joi.any(),
	    port: Joi.alternatives([
	        Joi.number().integer().min(0),          // TCP port
	        Joi.string().regex(/\//),               // Unix domain socket
	        Joi.string().regex(/^\\\\\.\\pipe\\/)   // Windows named pipe
	    ])
	        .allow(null),
	    tls: Joi.alternatives([
	        Joi.object().allow(null),
	        Joi.boolean()
	    ]),
	    uri: Joi.string().regex(/[^/]$/)
	});


	internals.vhost = Joi.alternatives([
	    Joi.string().hostname(),
	    Joi.array().items(Joi.string().hostname()).min(1)
	]);


	internals.route = Joi.object({
	    method: Joi.string().required(),
	    path: Joi.string().required(),
	    vhost: internals.vhost,
	    handler: Joi.any(),                         // Validated in route.config
	    config: Joi.object().allow(null)
	});


	internals.pre = [
	    Joi.string(),
	    Joi.func(),
	    Joi.object({
	        method: Joi.alternatives(Joi.string(), Joi.func()).required(),
	        assign: Joi.string(),
	        mode: Joi.string().valid('serial', 'parallel'),
	        failAction: Joi.string().valid('error', 'log', 'ignore')
	    })
	];


	internals.routeConfig = internals.routeBase.keys({
	    id: Joi.string(),
	    pre: Joi.array().items(internals.pre.concat(Joi.array().items(internals.pre).min(1))),
	    handler: [
	        Joi.func(),
	        Joi.string(),
	        Joi.object().length(1)
	    ],
	    description: Joi.string(),
	    notes: [
	        Joi.string(),
	        Joi.array().items(Joi.string())
	    ],
	    tags: [
	        Joi.string(),
	        Joi.array().items(Joi.string())
	    ]
	});


	internals.cachePolicy = Joi.object({
	    cache: Joi.string().allow(null).allow(''),
	    segment: Joi.string(),
	    shared: Joi.boolean()
	})
	    .options({ allowUnknown: true });               // Catbox validates other keys


	internals.method = Joi.object({
	    bind: Joi.object().allow(null),
	    generateKey: Joi.func(),
	    cache: internals.cachePolicy,
	    callback: Joi.boolean()
	});


	internals.register = Joi.object({
	    routes: Joi.object({
	        prefix: Joi.string().regex(/^\/.+/),
	        vhost: internals.vhost
	    }),
	    select: Joi.array().items(Joi.string()).single()
	});

	internals.dependencies = Joi.array().items(Joi.string()).single();


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("joi");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Boom = __webpack_require__(18);
	var Catbox = __webpack_require__(4);
	var Hoek = __webpack_require__(8);
	var Joi = __webpack_require__(25);
	var Subtext = __webpack_require__(27);
	var Auth = __webpack_require__(23);
	var Defaults = __webpack_require__(28);
	var Handler = __webpack_require__(29);
	var Validation = __webpack_require__(34);
	var Schema = __webpack_require__(24);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Route = function (options, connection, realm) {

	    // Apply plugin environment (before schema validation)

	    if (realm.modifiers.route.vhost ||
	        realm.modifiers.route.prefix) {

	        options = Hoek.cloneWithShallow(options, ['config']);       // config is left unchanged
	        options.path = (realm.modifiers.route.prefix ? realm.modifiers.route.prefix + (options.path !== '/' ? options.path : '') : options.path);
	        options.vhost = realm.modifiers.route.vhost || options.vhost;
	    }

	    // Setup and validate route configuration

	    Hoek.assert(options.path, 'Route missing path');
	    Hoek.assert(options.handler || (options.config && options.config.handler), 'Missing or undefined handler:', options.method, options.path);
	    Hoek.assert(!!options.handler ^ !!(options.config && options.config.handler), 'Handler must only appear once:', options.method, options.path);            // XOR
	    Hoek.assert(options.path === '/' || options.path[options.path.length - 1] !== '/' || !connection.settings.router.stripTrailingSlash, 'Path cannot end with a trailing slash when connection configured to strip:', options.method, options.path);
	    Hoek.assert(/^[a-zA-Z0-9!#\$%&'\*\+\-\.^_`\|~]+$/.test(options.method), 'Invalid method name:', options.method, options.path);

	    Schema.assert('route', options, options.path);

	    var handler = options.handler || options.config.handler;
	    var method = options.method.toLowerCase();
	    Hoek.assert(method !== 'head', 'Method name not allowed:', options.method, options.path);

	    // Apply settings in order: {connection} <- {handler} <- {realm} <- {route}

	    var handlerDefaults = Handler.defaults(method, handler, connection.server);
	    var base = Hoek.applyToDefaultsWithShallow(connection.settings.routes, handlerDefaults, ['bind']);
	    base = Hoek.applyToDefaultsWithShallow(base, realm.settings, ['bind']);
	    this.settings = Hoek.applyToDefaultsWithShallow(base, options.config || {}, ['bind']);
	    this.settings.handler = handler;

	    Schema.assert('routeConfig', this.settings, options.path);

	    var socketTimeout = (this.settings.timeout.socket === undefined ? 2 * 60 * 1000 : this.settings.timeout.socket);
	    Hoek.assert(!this.settings.timeout.server || !socketTimeout || this.settings.timeout.server < socketTimeout, 'Server timeout must be shorter than socket timeout:', options.path);
	    Hoek.assert(!this.settings.payload.timeout || !socketTimeout || this.settings.payload.timeout < socketTimeout, 'Payload timeout must be shorter than socket timeout:', options.path);

	    this.connection = connection;
	    this.server = connection.server;
	    this.path = options.path;
	    this.method = method;

	    this.public = {
	        method: this.method,
	        path: this.path,
	        vhost: this.vhost,
	        realm: realm,
	        settings: this.settings
	    };

	    this.settings.vhost = options.vhost;
	    this.settings.plugins = this.settings.plugins || {};            // Route-specific plugins settings, namespaced using plugin name
	    this.settings.app = this.settings.app || {};                    // Route-specific application settings

	    // Path parsing

	    this._analysis = this.connection._router.analyze(this.path);
	    this.params = this._analysis.params;
	    this.fingerprint = this._analysis.fingerprint;

	    // Validation

	    var validation = this.settings.validate;
	    if (this.method === 'get') {

	        // Assert on config, not on merged settings

	        Hoek.assert(!options.config || !options.config.payload, 'Cannot set payload settings on HEAD or GET request:', options.path);
	        Hoek.assert(!options.config || !options.config.validate || !options.config.validate.payload, 'Cannot validate HEAD or GET requests:', options.path);

	        validation.payload = null;
	    }

	    ['headers', 'params', 'query', 'payload'].forEach(function (type) {

	        validation[type] = internals.compileRule(validation[type]);
	    });

	    if (this.settings.response.schema !== undefined ||
	        this.settings.response.status) {

	        var rule = this.settings.response.schema;
	        this.settings.response.status = this.settings.response.status || {};
	        var statuses = Object.keys(this.settings.response.status);

	        if ((rule === true && !statuses.length) ||
	            this.settings.response.sample === 0) {

	            this.settings.response = null;
	        }
	        else {
	            this.settings.response.schema = internals.compileRule(rule);
	            for (var i = 0, il = statuses.length; i < il; ++i) {
	                var code = statuses[i];
	                this.settings.response.status[code] = internals.compileRule(this.settings.response.status[code]);
	            }
	        }
	    }
	    else {
	        this.settings.response = null;
	    }

	    // Payload parsing

	    if (this.method === 'get') {

	        this.settings.payload = null;
	    }
	    else {
	        if (this.settings.payload.allow) {
	            this.settings.payload.allow = [].concat(this.settings.payload.allow);
	        }
	    }

	    Hoek.assert(!this.settings.validate.payload || this.settings.payload.parse, 'Route payload must be set to \'parse\' when payload validation enabled:', options.method, options.path);
	    Hoek.assert(!this.settings.jsonp || typeof this.settings.jsonp === 'string', 'Bad route JSONP parameter name:', options.path);

	    // Authentication configuration

	    this.settings.auth = this.connection.auth._setupRoute(this.settings.auth, options.path);

	    // Cache

	    if (this.method === 'get' &&
	        (this.settings.cache.expiresIn || this.settings.cache.expiresAt)) {

	        this.settings.cache._statuses = Hoek.mapToObject(this.settings.cache.statuses);
	        this._cache = new Catbox.Policy({ expiresIn: this.settings.cache.expiresIn, expiresAt: this.settings.cache.expiresAt });
	    }

	    // CORS

	    if (this.settings.cors) {
	        this.settings.cors = Hoek.applyToDefaults(Defaults.cors, this.settings.cors);

	        var cors = this.settings.cors;
	        cors._headers = cors.headers.concat(cors.additionalHeaders).join(', ');
	        cors._methods = cors.methods.concat(cors.additionalMethods).join(', ');
	        cors._exposedHeaders = cors.exposedHeaders.concat(cors.additionalExposedHeaders).join(', ');

	        if (cors.origin.length) {
	            cors._origin = {
	                any: false,
	                qualified: [],
	                qualifiedString: '',
	                wildcards: []
	            };

	            if (cors.origin.indexOf('*') !== -1) {
	                Hoek.assert(cors.origin.length === 1, 'Cannot specify cors.origin * together with other values');
	                cors._origin.any = true;
	            }
	            else {
	                for (var c = 0, cl = cors.origin.length; c < cl; ++c) {
	                    var origin = cors.origin[c];
	                    if (origin.indexOf('*') !== -1) {
	                        cors._origin.wildcards.push(new RegExp('^' + Hoek.escapeRegex(origin).replace(/\\\*/g, '.*').replace(/\\\?/g, '.') + '$'));
	                    }
	                    else {
	                        cors._origin.qualified.push(origin);
	                    }
	                }

	                Hoek.assert(cors.matchOrigin || !cors._origin.wildcards.length, 'Cannot include wildcard origin values with matchOrigin disabled');
	                cors._origin.qualifiedString = cors._origin.qualified.join(' ');
	            }
	        }
	    }

	    // Security

	    if (this.settings.security) {
	        this.settings.security = Hoek.applyToDefaults(Defaults.security, this.settings.security);

	        var security = this.settings.security;
	        if (security.hsts) {
	            if (security.hsts === true) {
	                security._hsts = 'max-age=15768000';
	            }
	            else if (typeof security.hsts === 'number') {
	                security._hsts = 'max-age=' + security.hsts;
	            }
	            else {
	                security._hsts = 'max-age=' + (security.hsts.maxAge || 15768000);
	                if (security.hsts.includeSubdomains) {
	                    security._hsts += '; includeSubdomains';
	                }
	            }
	        }

	        if (security.xframe) {
	            if (security.xframe === true) {
	                security._xframe = 'DENY';
	            }
	            else if (typeof security.xframe === 'string') {
	                security._xframe = security.xframe.toUpperCase();
	            }
	            else if (security.xframe.rule === 'allow-from') {
	                if (!security.xframe.source) {
	                    security._xframe = 'SAMEORIGIN';
	                }
	                else {
	                    security._xframe = 'ALLOW-FROM ' + security.xframe.source;
	                }
	            }
	            else {
	                security._xframe = security.xframe.rule.toUpperCase();
	            }
	        }
	    }

	    // Handler

	    this.settings.handler = Handler.configure(this.settings.handler, this);
	    this._prerequisites = Handler.prerequisites(this.settings.pre, this.server);

	    // Route lifecycle

	    this._cycle = this.lifecycle();
	};


	internals.compileRule = function (rule) {

	    // null, undefined, true - anything allowed
	    // false - nothing allowed
	    // {...} - ... allowed

	    return (rule === false ? Joi.object({}).allow(null)
	                           : typeof rule === 'function' ? rule
	                                                        : !rule || rule === true ? null                     // false tested earlier
	                                                                                 : Joi.compile(rule));
	};


	internals.Route.prototype.lifecycle = function () {

	    var cycle = [];

	    // 'onRequest'

	    if (this.settings.jsonp) {
	        cycle.push(internals.parseJSONP);
	    }

	    if (this.settings.state.parse) {
	        cycle.push(internals.state);
	    }

	    cycle.push('onPreAuth');

	    var authenticate = (this.settings.auth !== false);                          // Anything other than 'false' can still require authentication
	    if (authenticate) {
	        cycle.push(Auth.authenticate);
	    }

	    if (this.method !== 'get') {

	        cycle.push(internals.payload);

	        if (authenticate) {
	            cycle.push(Auth.payload);
	        }
	    }

	    cycle.push('onPostAuth');

	    if (this.settings.validate.headers) {
	        cycle.push(Validation.headers);
	    }

	    if (this.settings.validate.params) {
	        cycle.push(Validation.params);
	    }

	    if (this.settings.jsonp) {
	        cycle.push(internals.cleanupJSONP);
	    }

	    if (this.settings.validate.query) {
	        cycle.push(Validation.query);
	    }

	    if (this.settings.validate.payload) {
	        cycle.push(Validation.payload);
	    }

	    cycle.push('onPreHandler');
	    cycle.push(Handler.execute);                                     // Must not call next() with an Error
	    cycle.push('onPostHandler');                                     // An error from here on will override any result set in handler()

	    if (this.settings.response) {
	        cycle.push(Validation.response);
	    }

	    // 'onPreResponse'

	    return cycle;
	};


	internals.state = function (request, next) {

	    request.state = {};

	    var req = request.raw.req;
	    var cookies = req.headers.cookie;
	    if (!cookies) {
	        return next();
	    }

	    request.connection.states.parse(cookies, function (err, state, failed) {

	        request.state = state;

	        // Clear cookies

	        for (var i = 0, il = failed.length; i < il; ++i) {
	            var item = failed[i];

	            if (item.settings.clearInvalid) {
	                request._clearState(item.name);
	            }
	        }

	        // failAction: 'error', 'log', 'ignore'

	        if (!err ||
	            request.route.settings.state.failAction === 'ignore') {

	            return next();
	        }

	        request._log(['state', 'error'], { header: cookies, errors: err.data });
	        return next(request.route.settings.state.failAction === 'error' ? err : null);
	    });
	};


	internals.payload = function (request, next) {

	    if (request.method === 'get' ||
	        request.method === 'head') {            // When route.method is '*'

	        return next();
	    }

	    var onParsed = function (err, parsed) {

	        request.mime = parsed.mime;
	        request.payload = parsed.payload || null;

	        if (!err) {
	            return next();
	        }

	        var failAction = request.route.settings.payload.failAction;         // failAction: 'error', 'log', 'ignore'
	        if (failAction !== 'ignore') {
	            request._log(['payload', 'error'], err);
	        }

	        if (failAction === 'error') {
	            return next(err);
	        }

	        return next();
	    };

	    Subtext.parse(request.raw.req, request._tap(), request.route.settings.payload, function (err, parsed) {

	        if (!err ||
	            !request._isPayloadPending) {

	            request._isPayloadPending = false;
	            return onParsed(err, parsed);
	        }

	        // Flush out any pending request payload not consumed due to errors

	        var stream = request.raw.req;

	        var read = function () {

	            stream.read();
	        };

	        var end = function () {

	            stream.removeListener('readable', read);
	            stream.removeListener('error', end);
	            stream.removeListener('end', end);

	            request._isPayloadPending = false;
	            return onParsed(err, parsed);
	        };

	        stream.on('readable', read);
	        stream.once('error', end);
	        stream.once('end', end);
	    });
	};


	internals.parseJSONP = function (request, next) {

	    var jsonp = request.query[request.route.settings.jsonp];
	    if (jsonp) {
	        if (/^[\w\$\[\]\.]+$/.test(jsonp) === false) {
	            return next(Boom.badRequest('Invalid JSONP parameter value'));
	        }

	        request.jsonp = jsonp;
	    }

	    return next();
	};


	internals.cleanupJSONP = function (request, next) {

	    if (request.jsonp) {
	        delete request.query[request.route.settings.jsonp];
	    }

	    return next();
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("subtext");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Os = __webpack_require__(16);


	// Declare internals

	var internals = {};


	exports.server = {
	    debug: {
	        request: ['implementation'],
	        log: ['implementation']
	    },
	    load: {
	        sampleInterval: 0
	    },
	    mime: null,                                     // Mimos options
	    minimal: false,
	    files: {
	        etagsCacheMaxSize: 10000                    // Maximum number of etags in the cache
	    }
	};


	exports.connection = {
	    router: {
	        isCaseSensitive: true,                      // Case-sensitive paths
	        stripTrailingSlash: false                   // Remove trailing slash from incoming paths
	    },
	    routes: {
	        cache: {
	            statuses: [200]                         // Array of HTTP status codes for which cache-control header is set
	        },
	        cors: false,                                // CORS headers
	        files: {
	            relativeTo: '.'                         // Determines what file and directory handlers use to base relative paths off
	        },
	        json: {
	            replacer: null,
	            space: null,
	            suffix: null
	        },
	        payload: {
	            failAction: 'error',
	            maxBytes: 1024 * 1024,
	            output: 'data',
	            parse: true,
	            timeout: 10 * 1000,                     // Determines how long to wait for receiving client payload. Defaults to 10 seconds
	            uploads: Os.tmpDir()
	        },
	        response: {
	            options: {}                             // Joi validation options
	        },
	        security: false,                            // Security headers on responses: false -> null, true -> defaults, {} -> override defaults
	        state: {
	            parse: true,                            // Parse content of req.headers.cookie
	            failAction: 'error'                     // Action on bad cookie - 'error': return 400, 'log': log and continue, 'ignore': continue
	        },
	        timeout: {
	            socket: undefined,                      // Determines how long before closing request socket. Defaults to node (2 minutes)
	            server: false                           // Determines how long to wait for server request processing. Disabled by default
	        },
	        validate: {
	            options: {}                             // Joi validation options
	        }
	    }
	};


	exports.security = {
	    hsts: 15768000,
	    xframe: 'deny',
	    xss: true,
	    noOpen: true,
	    noSniff: true
	};


	exports.cors = {
	    origin: ['*'],
	    isOriginExposed: true,                          // Return the list of supported origins if incoming origin does not match
	    matchOrigin: true,                              // Attempt to match incoming origin against allowed values and return narrow response
	    maxAge: 86400,                                  // One day
	    headers: [
	        'Authorization',
	        'Content-Type',
	        'If-None-Match'
	    ],
	    additionalHeaders: [],
	    methods: [
	        'GET',
	        'HEAD',
	        'POST',
	        'PUT',
	        'PATCH',
	        'DELETE',
	        'OPTIONS'
	    ],
	    additionalMethods: [],
	    exposedHeaders: [
	        'WWW-Authenticate',
	        'Server-Authorization'
	    ],
	    additionalExposedHeaders: [],
	    credentials: false,
	    override: true
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Hoek = __webpack_require__(8);
	var Items = __webpack_require__(10);
	var Methods = __webpack_require__(30);
	var Response = __webpack_require__(31);


	// Declare internals

	var internals = {};


	exports.execute = function (request, next) {

	    var finalize = function (err, result) {

	        request._setResponse(err || result);
	        return next();                              // Must not include an argument
	    };

	    request._protect.run('handler', finalize, function (exit) {

	        if (request._route._prerequisites) {
	            internals.prerequisites(request, Hoek.once(exit));
	        }
	        else {
	            internals.handler(request, exit);
	        }
	    });
	};


	internals.prerequisites = function (request, callback) {

	    Items.serial(request._route._prerequisites, function (set, nextSet) {

	        Items.parallel(set, function (pre, next) {

	            pre(request, function (err, result) {

	                if (err) {
	                    return next(err);
	                }

	                if (!result._takeover) {
	                    return next();
	                }

	                return callback(null, result);
	            });
	        }, nextSet);
	    },
	    function (err) {

	        if (err) {
	            return callback(err);
	        }

	        return internals.handler(request, callback);
	    });
	};


	internals.handler = function (request, callback) {

	    var timer = new Hoek.Bench();
	    var finalize = function (response, data) {

	        if (response === null) {                            // reply.continue()
	            response = Response.wrap(null, request);
	            return response._prepare(null, finalize);
	        }

	        // Check for Error result

	        if (response.isBoom) {
	            request._log(['handler', 'error'], { msec: timer.elapsed(), error: response.message, data: response });
	            return callback(response);
	        }

	        request._log(['handler'], { msec: timer.elapsed() });
	        return callback(null, response);
	    };

	    // Decorate request

	    var reply = request.server._replier.interface(request, request.route.realm, finalize);
	    var bind = request.route.settings.bind;

	    // Execute handler

	    request.route.settings.handler.call(bind, request, reply);
	};


	exports.defaults = function (method, handler, server) {

	    var defaults = null;

	    if (typeof handler === 'object') {
	        var type = Object.keys(handler)[0];
	        var serverHandler = server._handlers[type];

	        Hoek.assert(serverHandler, 'Unknown handler:', type);

	        if (serverHandler.defaults) {
	            defaults = (typeof serverHandler.defaults === 'function' ? serverHandler.defaults(method) : serverHandler.defaults);
	        }
	    }

	    return defaults || {};
	};


	exports.configure = function (handler, route) {

	    if (typeof handler === 'object') {
	        var type = Object.keys(handler)[0];
	        var serverHandler = route.server._handlers[type];

	        Hoek.assert(serverHandler, 'Unknown handler:', type);

	        return serverHandler(route.public, handler[type]);
	    }

	    if (typeof handler === 'string') {
	        var parsed = internals.fromString('handler', handler, route.server);
	        return parsed.method;
	    }

	    return handler;
	};


	exports.prerequisites = function (config, server) {

	    if (!config) {
	        return null;
	    }

	    /*
	        [
	            [
	                function (request, reply) { },
	                {
	                    method: function (request, reply) { }
	                    assign: key1
	                },
	                {
	                    method: function (request, reply) { },
	                    assign: key2
	                }
	            ],
	            'user(params.id)'
	        ]
	    */

	    var prerequisites = [];

	    for (var i = 0, il = config.length; i < il; ++i) {
	        var pres = [].concat(config[i]);

	        var set = [];
	        for (var p = 0, pl = pres.length; p < pl; ++p) {
	            var pre = pres[p];
	            if (typeof pre !== 'object') {
	                pre = { method: pre };
	            }

	            var item = {
	                method: pre.method,
	                assign: pre.assign,
	                failAction: pre.failAction || 'error'
	            };

	            if (typeof item.method === 'string') {
	                var parsed = internals.fromString('pre', item.method, server);
	                item.method = parsed.method;
	                item.assign = item.assign || parsed.name;
	            }

	            set.push(internals.pre(item));
	        }

	        prerequisites.push(set);
	    }

	    return prerequisites.length ? prerequisites : null;
	};


	internals.fromString = function (type, notation, server) {

	    //                                  1:name            2:(        3:arguments
	    var methodParts = notation.match(/^([\w\.]+)(?:\s*)(?:(\()(?:\s*)(\w+(?:\.\w+)*(?:\s*\,\s*\w+(?:\.\w+)*)*)?(?:\s*)\))?$/);
	    Hoek.assert(methodParts, 'Invalid server method string notation:', notation);

	    var name = methodParts[1];
	    Hoek.assert(name.match(Methods.methodNameRx), 'Invalid server method name:', name);

	    var method = server._methods._normalized[name];
	    Hoek.assert(method, 'Unknown server method in string notation:', notation);

	    var result = { name: name };
	    var argsNotation = !!methodParts[2];
	    var methodArgs = (argsNotation ? (methodParts[3] || '').split(/\s*\,\s*/) : null);

	    result.method = function (request, reply) {

	        if (!argsNotation) {
	            return method(request, reply);                      // Method is already bound to context
	        }

	        var finalize = function (err, value, cached, report) {

	            if (report) {
	                request._log([type, 'method', name], report);
	            }

	            return reply(err, value);
	        };

	        var args = [];
	        for (var i = 0, il = methodArgs.length; i < il; ++i) {
	            var arg = methodArgs[i];
	            if (arg) {
	                args.push(Hoek.reach(request, arg));
	            }
	        }

	        args.push(finalize);
	        method.apply(null, args);
	    };

	    return result;
	};


	internals.pre = function (pre) {

	    /*
	        {
	            method: function (request, next) { }
	            assign:     'key'
	            failAction: 'error'* | 'log' | 'ignore'
	        }
	    */

	    return function (request, next) {

	        var timer = new Hoek.Bench();
	        var finalize = function (response, data) {

	            if (response === null) {                            // reply.continue()
	                response = Response.wrap(null, request);
	                return response._prepare(null, finalize);
	            }

	            if (response instanceof Error) {
	                if (pre.failAction !== 'ignore') {
	                    request._log(['pre', 'error'], { msec: timer.elapsed(), assign: pre.assign, error: response });
	                }

	                if (pre.failAction === 'error') {
	                    return next(response);
	                }
	            }
	            else {
	                request._log(['pre'], { msec: timer.elapsed(), assign: pre.assign });
	            }

	            if (pre.assign) {
	                request.pre[pre.assign] = response.source;
	                request.preResponses[pre.assign] = response;
	            }

	            return next(null, response);
	        };

	        // Setup environment

	        var reply = request.server._replier.interface(request, request.route.realm, finalize);
	        var bind = request.route.settings.bind;

	        // Execute handler

	        pre.method.call(bind, request, reply);
	    };
	};


	exports.invoke = function (request, event, callback) {

	    var exts = request.connection._extensions[event];
	    if (!exts) {
	        return Hoek.nextTick(callback)();
	    }

	    if (event === 'onPreResponse') {
	        request._protect.reset();
	    }

	    request._protect.run('ext:' + event, callback, function (exit) {

	        Items.serial(exts.nodes, function (ext, next) {

	            var reply = request.server._replier.interface(request, ext.realm, next);
	            var bind = (ext.bind || ext.realm.settings.bind);

	            ext.func.call(bind, request, reply);
	        }, exit);
	    });
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Boom = __webpack_require__(18);
	var Hoek = __webpack_require__(8);
	var Schema = __webpack_require__(24);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Methods = function (server) {

	    this.server = server;
	    this.methods = {};
	    this._normalized = {};
	};


	internals.Methods.prototype.add = function (name, method, options, realm) {

	    if (typeof name !== 'object') {
	        return this._add(name, method, options, realm);
	    }

	    // {} or [{}, {}]

	    var items = [].concat(name);
	    for (var i = 0, il = items.length; i < il; ++i) {
	        var item = items[i];
	        this._add(item.name, item.method, item.options, realm);
	    }
	};


	exports.methodNameRx = /^[_$a-zA-Z][$\w]*(?:\.[_$a-zA-Z][$\w]*)*$/;


	internals.Methods.prototype._add = function (name, method, options, realm) {

	    Hoek.assert(typeof method === 'function', 'method must be a function');
	    Hoek.assert(typeof name === 'string', 'name must be a string');
	    Hoek.assert(name.match(exports.methodNameRx), 'Invalid name:', name);
	    Hoek.assert(!Hoek.reach(this.methods, name, { functions: false }), 'Server method function name already exists');

	    options = options || {};
	    Schema.assert('method', options, name);

	    var settings = Hoek.cloneWithShallow(options, ['bind']);
	    settings.generateKey = settings.generateKey || internals.generateKey;
	    var bind = settings.bind || realm.settings.bind || null;

	    var apply = function () {

	        return method.apply(bind, arguments);
	    };

	    var bound = bind ? apply : method;

	    // Normalize methods

	    var normalized = bound;
	    if (settings.callback === false) {                                          // Defaults to true
	        normalized = function (/* arg1, arg2, ..., argn, methodNext */) {

	            var args = [];
	            for (var i = 0, il = arguments.length; i < il - 1; ++i) {
	                args.push(arguments[i]);
	            }

	            var methodNext = arguments[il - 1];

	            var result = null;
	            var error = null;

	            try {
	                result = method.apply(bind, args);
	            }
	            catch (err) {
	                error = err;
	            }

	            if (result instanceof Error) {
	                error = result;
	                result = null;
	            }

	            if (error ||
	                typeof result !== 'object' ||
	                typeof result.then !== 'function') {

	                return methodNext(error, result);
	            }

	            // Promise object

	            var onFulfilled = function (outcome) {

	                return methodNext(null, outcome);
	            };

	            var onRejected = function (err) {

	                return methodNext(err);
	            };

	            result.then(onFulfilled, onRejected);
	        };
	    }

	    // Not cached

	    if (!settings.cache) {
	        return this._assign(name, bound, normalized);
	    }

	    // Cached

	    Hoek.assert(!settings.cache.generateFunc, 'Cannot set generateFunc with method caching');

	    settings.cache.generateFunc = function (id, next) {

	        id.args.push(next);                     // function (err, result, ttl)
	        normalized.apply(bind, id.args);
	    };

	    var cache = this.server.cache(settings.cache, '#' + name);

	    var func = function (/* arguments, methodNext */) {

	        var args = [];
	        for (var i = 0, il = arguments.length; i < il - 1; ++i) {
	            args.push(arguments[i]);
	        }

	        var methodNext = arguments[il - 1];

	        var key = settings.generateKey.apply(bind, args);
	        if (key === null ||                                 // Value can be ''
	            typeof key !== 'string') {                      // When using custom generateKey

	            return Hoek.nextTick(methodNext)(Boom.badImplementation('Invalid method key when invoking: ' + name, { name: name, args: args }));
	        }

	        cache.get({ id: key, args: args }, methodNext);
	    };

	    func.cache = {
	        drop: function (/* arguments, callback */) {

	            var args = [];
	            for (var i = 0, il = arguments.length; i < il - 1; ++i) {
	                args.push(arguments[i]);
	            }

	            var methodNext = arguments[il - 1];

	            var key = settings.generateKey.apply(null, args);
	            if (key === null) {                             // Value can be ''
	                return Hoek.nextTick(methodNext)(Boom.badImplementation('Invalid method key'));
	            }

	            return cache.drop(key, methodNext);
	        }
	    };

	    this._assign(name, func, func);
	};


	internals.Methods.prototype._assign = function (name, method, normalized) {

	    var path = name.split('.');
	    var ref = this.methods;
	    for (var i = 0, il = path.length; i < il; ++i) {
	        if (!ref[path[i]]) {
	            ref[path[i]] = (i + 1 === il ? method : {});
	        }

	        ref = ref[path[i]];
	    }

	    this._normalized[name] = normalized;
	};


	internals.generateKey = function () {

	    var key = '';
	    for (var i = 0, il = arguments.length; i < il; ++i) {
	        var arg = arguments[i];
	        if (typeof arg !== 'string' &&
	            typeof arg !== 'number' &&
	            typeof arg !== 'boolean') {

	            return null;
	        }

	        key += (i ? ':' : '') + encodeURIComponent(arg.toString());
	    }

	    return key;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Stream = __webpack_require__(32);
	var Events = __webpack_require__(3);
	var Boom = __webpack_require__(18);
	var Hoek = __webpack_require__(8);
	var Peekaboo = __webpack_require__(33);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Response = function (source, request, options) {

	    Events.EventEmitter.call(this);

	    options = options || {};

	    this.request = request;
	    this.statusCode = null;
	    this.headers = {};                          // Incomplete as some headers are stored in flags
	    this.variety = null;
	    this.app = {};
	    this.plugins = {};
	    this.send = null;                           // Set by reply()
	    this.hold = null;                           // Set by reply()

	    this.settings = {
	        encoding: 'utf8',
	        charset: 'utf-8',                       // '-' required by IANA
	        ttl: null,
	        stringify: null,                        // JSON.stringify options
	        passThrough: true,
	        varyEtag: false
	    };

	    this._payload = null;                       // Readable stream
	    this._takeover = false;
	    this._contentEncoding = null;               // Set during transmit
	    this._error = null;                         // The boom object when created from an error

	    this._processors = {
	        marshal: options.marshal,
	        prepare: options.prepare,
	        close: options.close
	    };

	    this._setSource(source, options.variety);
	};

	Hoek.inherits(internals.Response, Events.EventEmitter);


	internals.Response.wrap = function (result, request) {

	    return (result instanceof Error ? Boom.wrap(result)
	                                    : (result instanceof internals.Response ? result
	                                                                            : new internals.Response(result, request)));
	};


	internals.Response.prototype._setSource = function (source, variety) {

	    // Method must not set any headers or other properties as source can change later

	    this.variety = variety || 'plain';

	    if (source === null ||
	        source === undefined ||
	        source === '') {

	        source = null;
	    }
	    else if (Buffer.isBuffer(source)) {
	        this.variety = 'buffer';
	    }
	    else if (source instanceof Stream) {
	        this.variety = 'stream';
	    }
	    else if (typeof source === 'object' &&
	        typeof source.then === 'function') {                // Promise object

	        this.variety = 'promise';
	    }

	    this.source = source;
	};


	internals.Response.prototype.code = function (statusCode) {

	    Hoek.assert(Hoek.isInteger(statusCode), 'Status code must be an integer');

	    this.statusCode = statusCode;
	    return this;
	};


	internals.Response.prototype.header = function (key, value, options) {

	    key = key.toLowerCase();
	    if (key === 'vary') {
	        return this.vary(value);
	    }

	    return this._header(key, value, options);
	};


	internals.Response.prototype._header = function (key, value, options) {

	    options = options || {};
	    options.append = options.append || false;
	    options.separator = options.separator || ',';
	    options.override = options.override !== false;

	    if ((!options.append && options.override) ||
	        !this.headers[key]) {

	        this.headers[key] = value;
	    }
	    else if (options.override) {
	        if (key === 'set-cookie') {
	            this.headers[key] = [].concat(this.headers[key], value);
	        }
	        else {
	            this.headers[key] = this.headers[key] + options.separator + value;
	        }
	    }

	    return this;
	};


	internals.Response.prototype.vary = function (value) {

	    if (value === '*') {
	        this.headers.vary = '*';
	    }
	    else if (!this.headers.vary) {
	        this.headers.vary = value;
	    }
	    else if (this.headers.vary !== '*') {
	        this._header('vary', value, { append: true });
	    }

	    return this;
	};


	internals.Response.prototype.etag = function (tag, options) {

	    Hoek.assert(tag !== '*', 'ETag cannot be *');

	    options = options || {};
	    this._header('etag', (options.weak ? 'W/' : '') + '"' + tag + '"');
	    this.settings.varyEtag = options.vary !== false && !options.weak;       // vary defaults to true
	    return this;
	};


	internals.Response.prototype.type = function (type) {

	    this._header('content-type', type);
	    return this;
	};


	internals.Response.prototype.bytes = function (bytes) {

	    this._header('content-length', bytes);
	    return this;
	};


	internals.Response.prototype.location = function (uri) {

	    this._header('location', uri);
	    return this;
	};


	internals.Response.prototype.created = function (location) {

	    Hoek.assert(this.request.method === 'post' || this.request.method === 'put', 'Cannot create resource on GET');

	    this.statusCode = 201;
	    this.location(location);
	    return this;
	};


	internals.Response.prototype.replacer = function (method) {

	    this.settings.stringify = this.settings.stringify || {};
	    this.settings.stringify.replacer = method;
	    return this;
	};


	internals.Response.prototype.spaces = function (count) {

	    this.settings.stringify = this.settings.stringify || {};
	    this.settings.stringify.space = count;
	    return this;
	};


	internals.Response.prototype.suffix = function (suffix) {

	    this.settings.stringify = this.settings.stringify || {};
	    this.settings.stringify.suffix = suffix;
	    return this;
	};


	internals.Response.prototype.passThrough = function (enabled) {

	    this.settings.passThrough = (enabled !== false);    // Defaults to true
	    return this;
	};


	internals.Response.prototype.redirect = function (location) {

	    this.statusCode = 302;
	    this.location(location);
	    this.temporary = this._temporary;
	    this.permanent = this._permanent;
	    this.rewritable = this._rewritable;
	    return this;
	};


	internals.Response.prototype._temporary = function (isTemporary) {

	    this._setTemporary(isTemporary !== false);           // Defaults to true
	    return this;
	};


	internals.Response.prototype._permanent = function (isPermanent) {

	    this._setTemporary(isPermanent === false);           // Defaults to true
	    return this;
	};


	internals.Response.prototype._rewritable = function (isRewritable) {

	    this._setRewritable(isRewritable !== false);         // Defaults to true
	    return this;
	};


	internals.Response.prototype._isTemporary = function () {

	    return this.statusCode === 302 || this.statusCode === 307;
	};


	internals.Response.prototype._isRewritable = function () {

	    return this.statusCode === 301 || this.statusCode === 302;
	};


	internals.Response.prototype._setTemporary = function (isTemporary) {

	    if (isTemporary) {
	        if (this._isRewritable()) {
	            this.statusCode = 302;
	        }
	        else {
	            this.statusCode = 307;
	        }
	    }
	    else {
	        if (this._isRewritable()) {
	            this.statusCode = 301;
	        }
	        else {
	            this.statusCode = 308;
	        }
	    }
	};


	internals.Response.prototype._setRewritable = function (isRewritable) {

	    if (isRewritable) {
	        if (this._isTemporary()) {
	            this.statusCode = 302;
	        }
	        else {
	            this.statusCode = 301;
	        }
	    }
	    else {
	        if (this._isTemporary()) {
	            this.statusCode = 307;
	        }
	        else {
	            this.statusCode = 308;
	        }
	    }
	};


	internals.Response.prototype.encoding = function (encoding) {

	    this.settings.encoding = encoding;
	    return this;
	};


	internals.Response.prototype.charset = function (charset) {

	    this.settings.charset = charset || null;
	    return this;
	};


	internals.Response.prototype.ttl = function (ttl) {

	    this.settings.ttl = ttl;
	    return this;
	};


	internals.Response.prototype.state = function (name, value, options) {          // options: see Defaults.state

	    this.request._setState(name, value, options);
	    return this;
	};


	internals.Response.prototype.unstate = function (name, options) {

	    this.request._clearState(name, options);
	    return this;
	};


	internals.Response.prototype.takeover = function () {

	    this._takeover = true;
	    return this;
	};


	internals.Response.prototype._prepare = function (data, next) {

	    var self = this;

	    this._passThrough();

	    if (this.variety !== 'promise') {
	        return this._processPrepare(data, next);
	    }

	    var onDone = function (source) {

	        if (source instanceof Error) {
	            return next(Boom.wrap(source), data);
	        }

	        if (source instanceof internals.Response) {
	            return source._processPrepare(data, next);
	        }

	        self._setSource(source);
	        self._passThrough();
	        self._processPrepare(data, next);
	    };

	    this.source.then(onDone, onDone);
	};


	internals.Response.prototype._passThrough = function () {

	    if (this.variety === 'stream' &&
	        this.settings.passThrough) {

	        if (this.source.statusCode &&
	            !this.statusCode) {

	            this.statusCode = this.source.statusCode;                        // Stream is an HTTP response
	        }

	        if (this.source.headers) {
	            var headerKeys = Object.keys(this.source.headers);

	            if (headerKeys.length) {
	                var localHeaders = this.headers;
	                this.headers = {};

	                for (var i = 0, il = headerKeys.length; i < il; ++i) {
	                    var key = headerKeys[i];
	                    this.header(key.toLowerCase(), Hoek.clone(this.source.headers[key]));     // Clone arrays
	                }

	                headerKeys = Object.keys(localHeaders);
	                for (i = 0, il = headerKeys.length; i < il; ++i) {
	                    key = headerKeys[i];
	                    this.header(key, localHeaders[key], { append: key === 'set-cookie' });
	                }
	            }
	        }
	    }

	    this.statusCode = this.statusCode || 200;
	};


	internals.Response.prototype._processPrepare = function (data, next) {

	    if (!this._processors.prepare) {
	        return next(this, data);
	    }

	    this._processors.prepare(this, function (prepared) {

	        return next(prepared, data);
	    });
	};


	internals.Response.prototype._marshal = function (next) {

	    var self = this;

	    if (!this._processors.marshal) {
	        return this._streamify(this.source, next);
	    }

	    this._processors.marshal(this, function (err, source) {

	        if (err) {
	            return next(err);
	        }

	        return self._streamify(source, next);
	    });
	};


	internals.Response.prototype._streamify = function (source, next) {

	    if (source instanceof Stream) {
	        if (typeof source._read !== 'function' || typeof source._readableState !== 'object') {
	            return next(Boom.badImplementation('Stream must have a streams2 readable interface'));
	        }

	        if (source._readableState.objectMode) {
	            return next(Boom.badImplementation('Cannot reply with stream in object mode'));
	        }

	        this._payload = source;
	        return next();
	    }

	    var payload = source;
	    if (this.variety === 'plain' &&
	        source !== null &&
	        typeof source !== 'string') {

	        var options = this.settings.stringify || {};
	        var space = options.space || this.request.route.settings.json.space;
	        var replacer = options.replacer || this.request.route.settings.json.replacer;
	        var suffix = options.suffix || this.request.route.settings.json.suffix || '';
	        try {
	            payload = JSON.stringify(payload, replacer, space);
	        }
	        catch (err) {
	            return next(err);
	        }

	        if (suffix) {
	            payload += suffix;
	        }
	    }
	    else if (this.settings.stringify) {
	        return next(Boom.badImplementation('Cannot set formatting options on non object response'));
	    }

	    this._payload = new internals.Payload(payload, this.settings);
	    return next();
	};


	internals.Response.prototype._tap = function () {

	    return (this.listeners('finish').length || this.listeners('peek').length ? new Peekaboo(this) : null);
	};


	internals.Response.prototype._close = function () {

	    if (this._processors.close) {
	        this._processors.close(this);
	    }

	    var stream = this._payload || this.source;
	    if (stream instanceof Stream) {
	        if (stream.close) {
	            stream.close();
	        }
	        else if (stream.destroy) {
	            stream.destroy();
	        }
	        else {
	            var read = function () {

	                stream.read();
	            };

	            var end = function () {

	                stream.removeListener('readable', read);
	                stream.removeListener('error', end);
	                stream.removeListener('end', end);
	            };

	            stream.on('readable', read);
	            stream.once('error', end);
	            stream.once('end', end);
	        }
	    }
	};


	internals.Response.prototype._isPayloadSupported = function () {

	    return (this.request.method !== 'head' && this.statusCode !== 304 && this.statusCode !== 204);
	};


	internals.Response.Payload = internals.Payload = function (payload, options) {

	    Stream.Readable.call(this);
	    this._data = payload;
	    this._prefix = null;
	    this._suffix = null;
	    this._sizeOffset = 0;
	    this._encoding = options.encoding;
	};

	Hoek.inherits(internals.Payload, Stream.Readable);


	internals.Payload.prototype._read = function (/* size */) {

	    if (this._prefix) {
	        this.push(this._prefix, this._encoding);
	    }

	    if (this._data) {
	        this.push(this._data, this._encoding);
	    }

	    if (this._suffix) {
	        this.push(this._suffix, this._encoding);
	    }

	    this.push(null);
	};


	internals.Payload.prototype.size = function () {

	    if (!this._data) {
	        return this._sizeOffset;
	    }

	    return (Buffer.isBuffer(this._data) ? this._data.length : Buffer.byteLength(this._data, this._encoding)) + this._sizeOffset;
	};


	internals.Payload.prototype.jsonp = function (variable) {

	    this._sizeOffset += variable.length + 7;
	    this._prefix = '/**/' + variable + '(';                 // '/**/' prefix prevents CVE-2014-4671 security exploit
	    this._data = Buffer.isBuffer(this._data) ? this._data : this._data.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
	    this._suffix = ');';
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("peekaboo");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Boom = __webpack_require__(18);
	var Hoek = __webpack_require__(8);
	var Joi = __webpack_require__(25);


	// Declare internals

	var internals = {};


	exports.query = function (request, next) {

	    return internals.input('query', request, next);
	};


	exports.payload = function (request, next) {

	    if (request.method === 'get' ||
	        request.method === 'head') {                // When route.method is '*'

	        return next();
	    }

	    return internals.input('payload', request, next);
	};


	exports.params = function (request, next) {

	    return internals.input('params', request, next);
	};


	exports.headers = function (request, next) {

	    return internals.input('headers', request, next);
	};


	internals.input = function (source, request, next) {

	    if (typeof request[source] !== 'object') {
	        return next(Boom.unsupportedMediaType(source + ' must represent an object'));
	    }

	    var postValidate = function (err, value) {

	        request.orig[source] = request[source];
	        if (value !== undefined) {
	            request[source] = value;
	        }

	        if (!err) {
	            return next();
	        }

	        if (err.isDeveloperError) {
	            return next(err);
	        }

	        // failAction: 'error', 'log', 'ignore', function (source, err, next)

	        if (request.route.settings.validate.failAction === 'ignore') {
	            return next();
	        }

	        // Prepare error

	        var error = Boom.badRequest(err.message, err);
	        error.output.payload.validation = { source: source, keys: [] };
	        if (err.details) {
	            for (var i = 0, il = err.details.length; i < il; ++i) {
	                error.output.payload.validation.keys.push(Hoek.escapeHtml(err.details[i].path));
	            }
	        }

	        if (request.route.settings.validate.errorFields) {
	            var fields = Object.keys(request.route.settings.validate.errorFields);
	            for (var f = 0, fl = fields.length; f < fl; ++f) {
	                var field = fields[f];
	                error.output.payload[field] = request.route.settings.validate.errorFields[field];
	            }
	        }

	        request._log(['validation', 'error', source], error);

	        // Log only

	        if (request.route.settings.validate.failAction === 'log') {
	            return next();
	        }

	        // Return error

	        if (typeof request.route.settings.validate.failAction !== 'function') {
	            return next(error);
	        }

	        // Custom handler

	        request._protect.run('validate:input:failAction', next, function (exit) {

	            var reply = request.server._replier.interface(request, request.route.realm, exit);
	            request.route.settings.validate.failAction(request, reply, source, error);
	        });
	    };

	    var localOptions = {
	        context: {
	            headers: request.headers,
	            params: request.params,
	            query: request.query,
	            payload: request.payload,
	            auth: {
	                isAuthenticated: request.auth.isAuthenticated,
	                credentials: request.auth.credentials
	            }
	        }
	    };

	    delete localOptions.context[source];
	    Hoek.merge(localOptions, request.route.settings.validate.options);

	    var schema = request.route.settings.validate[source];
	    if (typeof schema !== 'function') {
	        return Joi.validate(request[source], schema, localOptions, postValidate);
	    }

	    request._protect.run('validate:input', postValidate, function (exit) {

	        return schema(request[source], localOptions, exit);
	    });
	};


	exports.response = function (request, next) {

	    if (request.route.settings.response.sample) {
	        var currentSample = Math.ceil((Math.random() * 100));
	        if (currentSample > request.route.settings.response.sample) {
	            return next();
	        }
	    }

	    var response = request.response;
	    var statusCode = response.isBoom ? response.output.statusCode : response.statusCode;
	    var source = response.isBoom ? response.output.payload : response.source;

	    var statusSchema = request.route.settings.response.status[statusCode];
	    if (statusCode >= 400 &&
	        !statusSchema) {

	        return next();          // Do not validate errors by default
	    }

	    var schema = statusSchema || request.route.settings.response.schema;
	    if (schema === null) {
	        return next();          // No rules
	    }

	    if ((!response.isBoom && request.response.variety !== 'plain') ||
	        typeof source !== 'object') {

	        return next(Boom.badImplementation('Cannot validate non-object response'));
	    }

	    var postValidate = function (err, value) {

	        if (!err) {
	            if (value !== undefined &&
	                request.route.settings.response.modify) {

	                if (response.isBoom) {
	                    response.output.payload = value;
	                }
	                else {
	                    response.source = value;
	                }
	            }

	            return next();
	        }

	        // failAction: 'error', 'log'

	        if (request.route.settings.response.failAction === 'log') {
	            request._log(['validation', 'response', 'error'], err.message);
	            return next();
	        }

	        return next(Boom.badImplementation(err.message));
	    };

	    var localOptions = {
	        context: {
	            headers: request.headers,
	            params: request.params,
	            query: request.query,
	            payload: request.payload,
	            auth: {
	                isAuthenticated: request.auth.isAuthenticated,
	                credentials: request.auth.credentials
	            }
	        }
	    };

	    Hoek.merge(localOptions, request.route.settings.response.options);

	    if (typeof schema !== 'function') {
	        return Joi.validate(source, schema, localOptions, postValidate);
	    }

	    request._protect.run('validate:response', postValidate, function (exit) {

	        return schema(source, localOptions, exit);
	    });
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Catbox = __webpack_require__(4);
	var Hoek = __webpack_require__(8);
	var Items = __webpack_require__(10);
	var Kilt = __webpack_require__(36);
	var Topo = __webpack_require__(22);
	var Connection = __webpack_require__(13);
	var Package = __webpack_require__(37);
	var Schema = __webpack_require__(24);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Plugin = function (server, connections, env, options) {            // env can be a realm or plugin name

	    var self = this;

	    Kilt.call(this, connections, server._events);

	    // Validate options

	    options = options || {};
	    Schema.assert('register', options);

	    // Public interface

	    this.root = server;
	    this.app = this.root._app;
	    this.connections = connections;
	    this.load = this.root._heavy.load;
	    this.methods = this.root._methods.methods;
	    this.mime = this.root._mime;
	    this.plugins = this.root._plugins;
	    this.settings = this.root._settings;
	    this.version = Package.version;

	    this.realm = typeof env !== 'string' ? env : {
	        modifiers: {
	            route: {
	                prefix: options.routes && options.routes.prefix,
	                vhost: options.routes && options.routes.vhost
	            }
	        },
	        plugin: env,
	        plugins: {},
	        settings: {
	            files: {
	                relativeTo: undefined
	            },
	            bind: undefined
	        }
	    };

	    this.auth = {
	        default: function (opts) {

	            self._applyChild('auth.default', 'auth', 'default', [opts]);
	        },
	        scheme: function (name, scheme) {

	            self._applyChild('auth.scheme', 'auth', 'scheme', [name, scheme]);
	        },
	        strategy: function (name, scheme, mode, opts) {

	            self._applyChild('auth.strategy', 'auth', 'strategy', [name, scheme, mode, opts]);
	        },
	        test: function (name, request, next) {

	            return request.connection.auth.test(name, request, next);
	        }
	    };

	    if (this.connections.length === 1) {
	        this._single();
	    }
	    else {
	        this.info = null;
	        this.inject = null;
	        this.listener = null;
	        this.lookup = null;
	        this.match = null;
	    }

	    // Decorations

	    var methods = Object.keys(this.root._decorations);
	    for (var i = 0, il = methods.length; i < il; ++i) {
	        var method = methods[i];
	        this[method] = this.root._decorations[method];
	    }
	};

	Hoek.inherits(internals.Plugin, Kilt);


	internals.Plugin.prototype._single = function () {

	    this.info = this.connections[0].info;
	    this.inject = internals.inject;
	    this.listener = this.connections[0].listener;
	    this.lookup = internals.lookup;
	    this.match = internals.match;
	};


	internals.Plugin.prototype.select = function (/* labels */) {

	    var labels = [];
	    for (var i = 0, il = arguments.length; i < il; ++i) {
	        labels.push(arguments[i]);
	    }

	    labels = Hoek.flatten(labels);
	    return this._select(labels);
	};


	internals.Plugin.prototype._select = function (labels, plugin, options) {

	    var connections = this.connections;

	    if (labels &&
	        labels.length) {            // Captures both empty arrays and empty strings

	        Hoek.assert(typeof labels === 'string' || Array.isArray(labels), 'Bad labels object type (undefined or array required)');
	        labels = [].concat(labels);

	        connections = [];
	        for (var i = 0, il = this.connections.length; i < il; ++i) {
	            var connection = this.connections[i];
	            if (Hoek.intersect(connection.settings.labels, labels).length) {
	                connections.push(connection);
	            }
	        }

	        if (!plugin &&
	            connections.length === this.connections.length) {

	            return this;
	        }
	    }

	    var env = (plugin !== undefined ? plugin : this.realm);                     // Allow empty string
	    return new internals.Plugin(this.root, connections, env, options);
	};


	internals.Plugin.prototype._clone = function (connections, plugin) {

	    var env = (plugin !== undefined ? plugin : this.realm);                     // Allow empty string
	    return new internals.Plugin(this.root, connections, env);
	};


	internals.Plugin.prototype.register = function (plugins /*, [options], callback */) {

	    var self = this;

	    var options = (typeof arguments[1] === 'object' ? arguments[1] : {});
	    var callback = (typeof arguments[1] === 'object' ? arguments[2] : arguments[1]);

	    Hoek.assert(typeof callback === 'function', 'A callback function is required to register a plugin');

	    if (this.realm.modifiers.route.prefix ||
	        this.realm.modifiers.route.vhost) {

	        options = Hoek.clone(options);
	        options.routes = options.routes || {};

	        options.routes.prefix = (this.realm.modifiers.route.prefix || '') + (options.routes.prefix || '') || undefined;
	        options.routes.vhost = this.realm.modifiers.route.vhost || options.routes.vhost;
	    }

	    /*
	        var register = function (server, options, next) { return next(); };
	        register.attributes = {
	            pkg: require('../package.json'),
	            name: 'plugin',
	            version: '1.1.1',
	            multiple: false
	        };

	        var item = {
	            register: register,
	            options: options        // -optional--
	        };

	        - OR -

	        var item = function () {}
	        item.register = register;
	        item.options = options;

	        var plugins = register, items, [register, item]
	    */

	    var registrations = [];
	    plugins = [].concat(plugins);
	    for (var i = 0, il = plugins.length; i < il; ++i) {
	        var plugin = plugins[i];
	        var hint = (plugins.length > 1 ? '(' + i + ')' : '');

	        if (typeof plugin === 'function' &&
	            !plugin.register) {

	            plugin = { register: plugin };
	        }

	        if (plugin.register.register) {                             // Required plugin
	            plugin.register = plugin.register.register;
	        }

	        Hoek.assert(typeof plugin.register === 'function', 'Invalid plugin object - invalid or missing register function ', hint);
	        var attributes = plugin.register.attributes;
	        Hoek.assert(typeof plugin.register.attributes === 'object', 'Invalid plugin object - invalid or missing register function attributes property', hint);

	        var registration = {
	            register: plugin.register,
	            name: attributes.name || (attributes.pkg && attributes.pkg.name),
	            version: attributes.version || (attributes.pkg && attributes.pkg.version) || '0.0.0',
	            multiple: attributes.multiple || false,
	            options: plugin.options,
	            dependencies: attributes.dependencies
	        };

	        Hoek.assert(registration.name, 'Missing plugin name', hint);
	        Schema.assert('dependencies', registration.dependencies, 'must be a string or an array of strings');

	        registrations.push(registration);
	    }

	    Items.serial(registrations, function (item, next) {

	        var selection = self._select(options.select, item.name, options);

	        // Protect against multiple registrations

	        for (var j = 0, jl = selection.connections.length; j < jl; ++j) {
	            var connection = selection.connections[j];
	            Hoek.assert(item.multiple || !connection._registrations[item.name], 'Plugin', item.name, 'already registered in:', connection.info.uri);
	            connection._registrations[item.name] = item;
	        }

	        if (item.dependencies) {
	            selection.dependency(item.dependencies);
	        }

	        // Register

	        item.register(selection, item.options || {}, next);
	    }, callback);
	};


	internals.Plugin.prototype.after = function (method, dependencies) {

	    this.root._afters = this.root._afters || new Topo();
	    this.root._afters.add({ func: method, plugin: this }, { after: dependencies, group: this.realm.plugin });
	};


	internals.Plugin.prototype.bind = function (context) {

	    Hoek.assert(typeof context === 'object', 'bind must be an object');
	    this.realm.settings.bind = context;
	};


	internals.Plugin.prototype.cache = function (options, _segment) {

	    Schema.assert('cachePolicy', options);

	    var segment = options.segment || _segment || (this.realm.plugin ? '!' + this.realm.plugin : '');
	    Hoek.assert(segment, 'Missing cache segment name');

	    var cacheName = options.cache || '_default';
	    var cache = this.root._caches[cacheName];
	    Hoek.assert(cache, 'Unknown cache', cacheName);
	    Hoek.assert(!cache.segments[segment] || cache.shared || options.shared, 'Cannot provision the same cache segment more than once');
	    cache.segments[segment] = true;

	    return new Catbox.Policy(options, cache.client, segment);
	};


	internals.Plugin.prototype.decorate = function (type, property, method) {

	    Hoek.assert(['reply', 'request', 'server'].indexOf(type) !== -1, 'Unknown decoration type:', type);
	    Hoek.assert(property, 'Missing decoration property name');
	    Hoek.assert(typeof property === 'string', 'Decoration property must be a string');
	    Hoek.assert(property[0] !== '_', 'Property name cannot begin with an underscore:', property);

	    // Request

	    if (type === 'request') {
	        return this.root._requestor.decorate(property, method);
	    }

	    // Reply

	    if (type === 'reply') {
	        return this.root._replier.decorate(property, method);
	    }

	    // Server

	    Hoek.assert(!this.root._decorations[property], 'Server decoration already defined:', property);
	    Hoek.assert(this[property] === undefined && this.root[property] === undefined, 'Cannot override the built-in server interface method:', property);

	    this.root._decorations[property] = method;

	    this.root[property] = method;
	    this[property] = method;
	};


	internals.Plugin.prototype.dependency = function (dependencies, after) {

	    Hoek.assert(this.realm.plugin, 'Cannot call dependency() outside of a plugin');
	    Hoek.assert(!after || typeof after === 'function', 'Invalid after method');

	    dependencies = [].concat(dependencies);
	    this.root._dependencies.push({ plugin: this.realm.plugin, connections: this.connections, deps: dependencies });

	    if (after) {
	        this.after(after, dependencies);
	    }
	};


	internals.Plugin.prototype.expose = function (key, value) {

	    Hoek.assert(this.realm.plugin, 'Cannot call expose() outside of a plugin');

	    var plugin = this.realm.plugin;
	    this.root.plugins[plugin] = this.root.plugins[plugin] || {};
	    if (typeof key === 'string') {
	        this.root.plugins[plugin][key] = value;
	    }
	    else {
	        Hoek.merge(this.root.plugins[plugin], key);
	    }
	};


	internals.Plugin.prototype.ext = function (event, func, options) {

	    this._apply('ext', Connection.prototype._ext, [event, func, options, this.realm]);
	};


	internals.Plugin.prototype.handler = function (name, method) {

	    Hoek.assert(typeof name === 'string', 'Invalid handler name');
	    Hoek.assert(!this.root._handlers[name], 'Handler name already exists:', name);
	    Hoek.assert(typeof method === 'function', 'Handler must be a function:', name);
	    Hoek.assert(!method.defaults || typeof method.defaults === 'object' || typeof method.defaults === 'function', 'Handler defaults property must be an object or function');
	    this.root._handlers[name] = method;
	};


	internals.inject = function (options, callback) {

	    return this.connections[0].inject(options, callback);
	};


	internals.Plugin.prototype.log = function (tags, data, timestamp, _internal) {

	    tags = (Array.isArray(tags) ? tags : [tags]);
	    var now = (timestamp ? (timestamp instanceof Date ? timestamp.getTime() : timestamp) : Date.now());

	    var event = {
	        timestamp: now,
	        tags: tags,
	        data: data,
	        internal: !!_internal
	    };

	    var tagsMap = Hoek.mapToObject(event.tags);
	    this.root._events.emit('log', event, tagsMap);

	    if (this.root._settings.debug &&
	        this.root._settings.debug.log &&
	        Hoek.intersect(tagsMap, this.root._settings.debug.log, true)) {

	        console.error('Debug:', event.tags.join(', '), (data ? '\n    ' + (data.stack || (typeof data === 'object' ? Hoek.stringify(data) : data)) : ''));
	    }
	};


	internals.Plugin.prototype._log = function (tags, data) {

	    return this.log(tags, data, null, true);
	};


	internals.lookup = function (id) {

	    return this.connections[0].lookup(id);
	};


	internals.match = function (method, path, host) {

	    return this.connections[0].match(method, path, host);
	};


	internals.Plugin.prototype.method = function (name, method, options) {

	    return this.root._methods.add(name, method, options, this.realm);
	};


	internals.Plugin.prototype.path = function (relativeTo) {

	    Hoek.assert(relativeTo && typeof relativeTo === 'string', 'relativeTo must be a non-empty string');
	    this.realm.settings.files.relativeTo = relativeTo;
	};


	internals.Plugin.prototype.route = function (options) {

	    Hoek.assert(arguments.length === 1, 'Method requires a single object argument or a single array of objects');
	    Hoek.assert(typeof options === 'object', 'Invalid route options');
	    Hoek.assert(this.connections.length, 'Cannot add a route without any connections');

	    this._apply('route', Connection.prototype._route, [options, this.realm]);
	};


	internals.Plugin.prototype.state = function (name, options) {

	    this._applyChild('state', 'states', 'add', [name, options]);
	};


	internals.Plugin.prototype.table = function (host) {

	    var table = [];
	    for (var i = 0, il = this.connections.length; i < il; ++i) {
	        var connection = this.connections[i];
	        table.push({ info: connection.info, labels: connection.settings.labels, table: connection.table(host) });
	    }

	    return table;
	};


	internals.Plugin.prototype._apply = function (type, func, args) {

	    Hoek.assert(this.connections.length, 'Cannot add ' + type + ' without a connection');

	    for (var i = 0, il = this.connections.length; i < il; ++i) {
	        func.apply(this.connections[i], args);
	    }
	};


	internals.Plugin.prototype._applyChild = function (type, child, func, args) {

	    Hoek.assert(this.connections.length, 'Cannot add ' + type + ' without a connection');

	    for (var i = 0, il = this.connections.length; i < il; ++i) {
	        var obj = this.connections[i][child];
	        obj[func].apply(obj, args);
	    }
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("kilt");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = {
		"name": "hapi",
		"description": "HTTP Server framework",
		"homepage": "http://hapijs.com",
		"version": "8.8.1",
		"repository": {
			"type": "git",
			"url": "git://github.com/hapijs/hapi.git"
		},
		"main": "lib/index.js",
		"keywords": [
			"framework",
			"http",
			"api",
			"router"
		],
		"engines": {
			"node": ">=0.10.32"
		},
		"dependencies": {
			"accept": "1.x.x",
			"ammo": "1.x.x",
			"boom": "^2.5.x",
			"call": "2.x.x",
			"catbox": "^4.2.x",
			"catbox-memory": "1.x.x",
			"cryptiles": "2.x.x",
			"h2o2": "4.x.x",
			"heavy": "3.x.x",
			"hoek": "^2.14.x",
			"inert": "2.x.x",
			"iron": "2.x.x",
			"items": "1.x.x",
			"joi": "6.x.x",
			"kilt": "^1.1.x",
			"mimos": "2.x.x",
			"peekaboo": "1.x.x",
			"qs": "4.x.x",
			"shot": "1.x.x",
			"statehood": "2.x.x",
			"subtext": "1.x.x",
			"topo": "1.x.x",
			"vision": "2.x.x"
		},
		"devDependencies": {
			"bluebird": "2.x.x",
			"code": "1.x.x",
			"handlebars": "2.x.x",
			"lab": "5.x.x",
			"wreck": "6.x.x"
		},
		"scripts": {
			"test": "lab -a code -t 100 -L",
			"test-tap": "lab -a code -r tap -o tests.tap",
			"test-cov-html": "lab -a code -r html -o coverage.html",
			"changelog": "mdchangelog --no-prologue --sanitize --no-orphan-issues --overwrite --order-milestones semver --order-issues closed_at --dependents --remote hapijs/hapi --same-org --timeout 120000"
		},
		"license": "BSD-3-Clause",
		"gitHead": "bc722ef68407c398178e72b104c4ee7e8eb4c696",
		"bugs": {
			"url": "https://github.com/hapijs/hapi/issues"
		},
		"_id": "hapi@8.8.1",
		"_shasum": "c7066fe9322e41b9e0e08315fd79f2d9985fa2ea",
		"_from": "hapi@>=8.0.0 <9.0.0",
		"_npmVersion": "2.10.0",
		"_nodeVersion": "0.10.38",
		"_npmUser": {
			"name": "hueniverse",
			"email": "eran@hammer.io"
		},
		"dist": {
			"shasum": "c7066fe9322e41b9e0e08315fd79f2d9985fa2ea",
			"tarball": "http://registry.npmjs.org/hapi/-/hapi-8.8.1.tgz"
		},
		"maintainers": [
			{
				"name": "hueniverse",
				"email": "eran@hueniverse.com"
			}
		],
		"directories": {},
		"_resolved": "https://registry.npmjs.org/hapi/-/hapi-8.8.1.tgz",
		"readme": "ERROR: No README data found!"
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Hoek = __webpack_require__(8);
	var Response = __webpack_require__(31);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Reply = function () {

	    this._decorations = null;
	};


	internals.Reply.prototype.decorate = function (property, method) {

	    Hoek.assert(!this._decorations || !this._decorations[property], 'Reply interface decoration already defined:', property);
	    Hoek.assert(['request', 'response', 'close', 'state', 'unstate', 'redirect', 'continue'].indexOf(property) === -1, 'Cannot override built-in reply interface decoration:', property);

	    this._decorations = this._decorations || {};
	    this._decorations[property] = method;
	};


	/*
	    var handler = function (request, reply) {

	        reply(error, result, ignore);   -> error || result (continue)
	        reply(...).takeover();          -> ... (continue)

	        reply.continue(ignore);         -> null (continue)
	    };

	    var ext = function (request, reply) {

	        reply(error, result, ignore);   -> error || result (respond)
	        reply(...).takeover();          -> ... (respond)

	        reply.continue(ignore);         -> (continue)
	    };

	    var pre = function (request, reply) {

	        reply(error);                   -> error (respond)  // failAction override
	        reply(null, result, ignore);    -> result (continue)
	        reply(...).takeover();          -> ... (respond)

	        reply.continue(ignore);         -> null (continue)
	    };

	    var auth = function (request, reply) {

	        reply(error, result, data);     -> error || result (respond) + data
	        reply(...).takeover();          -> ... (respond) + data

	        reply.continue(data);           -> (continue) + data
	    };
	*/

	internals.Reply.prototype.interface = function (request, realm, next) {       // next(err || response, data);

	    var reply = function (err, response, data) {

	        reply._data = data;                 // Held for later
	        return reply.response(err !== null && err !== undefined ? err : response);
	    };

	    reply._replied = false;
	    reply._next = Hoek.once(next);

	    reply.realm = realm;
	    reply.request = request;

	    reply.response = internals.response;
	    reply.close = internals.close;
	    reply.state = internals.state;
	    reply.unstate = internals.unstate;
	    reply.redirect = internals.redirect;
	    reply.continue = internals.continue;

	    if (this._decorations) {
	        var methods = Object.keys(this._decorations);
	        for (var i = 0, il = methods.length; i < il; ++i) {
	            var method = methods[i];
	            reply[method] = this._decorations[method];
	        }
	    }

	    return reply;
	};


	internals.close = function (options) {

	    options = options || {};
	    this._next({ closed: true, end: options.end !== false });
	};


	internals.continue = function (data) {

	    this._next(null, data);
	    this._next = null;
	};


	internals.state = function (name, value, options) {

	    this.request._setState(name, value, options);
	};


	internals.unstate = function (name) {

	    this.request._clearState(name);
	};


	internals.redirect = function (location) {

	    return this.response('').redirect(location);
	};


	internals.response = function (result) {

	    var self = this;

	    Hoek.assert(!this._replied, 'reply interface called twice');
	    this._replied = true;

	    var response = Response.wrap(result, this.request);
	    if (response.isBoom) {
	        this._next(response, this._data);
	        this._next = null;
	        return response;
	    }

	    response.hold = function () {

	        this.hold = undefined;
	        this.send = function () {

	            this.send = undefined;
	            this._prepare(self._data, self._next);
	            this._next = null;
	        };

	        return this;
	    };

	    process.nextTick(function () {

	        response.hold = undefined;

	        if (!response.send &&
	            self._next) {

	            response._prepare(self._data, self._next);
	            self._next = null;
	        }
	    });

	    return response;
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Events = __webpack_require__(3);
	var Url = __webpack_require__(40);
	var Accept = __webpack_require__(41);
	var Boom = __webpack_require__(18);
	var Hoek = __webpack_require__(8);
	var Items = __webpack_require__(10);
	var Peekaboo = __webpack_require__(33);
	var Qs = __webpack_require__(42);
	var Handler = __webpack_require__(29);
	var Protect = __webpack_require__(43);
	var Response = __webpack_require__(31);
	var Transmit = __webpack_require__(45);


	// Declare internals

	var internals = {
	    properties: ['connection', 'server', 'url', 'query', 'path', 'method', 'mime', 'setUrl', 'setMethod', 'headers', 'id', 'app', 'plugins', 'route', 'auth', 'session', 'pre', 'preResponses', 'info', 'orig', 'params', 'paramsArray', 'payload', 'state', 'jsonp', 'response', 'raw', 'tail', 'addTail', 'domain', 'log', 'getLog', 'generateResponse']
	};


	exports = module.exports = internals.Generator = function () {

	    this._decorations = null;
	};


	internals.Generator.prototype.request = function (connection, req, res, options) {

	    var request = new internals.Request(connection, req, res, options);

	    // Decorate

	    if (this._decorations) {
	        var methods = Object.keys(this._decorations);
	        for (var i = 0, il = methods.length; i < il; ++i) {
	            var method = methods[i];
	            request[method] = this._decorations[method];
	        }
	    }

	    return request;
	};


	internals.Generator.prototype.decorate = function (property, method) {

	    Hoek.assert(!this._decorations || !this._decorations[property], 'Request interface decoration already defined:', property);
	    Hoek.assert(internals.properties.indexOf(property) === -1, 'Cannot override built-in request interface decoration:', property);

	    this._decorations = this._decorations || {};
	    this._decorations[property] = method;
	};


	internals.Request = function (connection, req, res, options) {

	    var self = this;

	    Events.EventEmitter.call(this);

	    // Take measurement as soon as possible

	    this._bench = new Hoek.Bench();
	    var now = Date.now();

	    // Public members

	    this.connection = connection;
	    this.server = connection.server;

	    this.url = null;
	    this.query = null;
	    this.path = null;
	    this.method = null;
	    this.mime = null;                       // Set if payload is parsed

	    this.setUrl = this._setUrl;             // Decoration removed after 'onRequest'
	    this.setMethod = this._setMethod;

	    this._setUrl(req.url, this.connection.settings.router.stripTrailingSlash);      // Sets: this.url, this.path, this.query
	    this._setMethod(req.method);                                                    // Sets: this.method
	    this.headers = req.headers;

	    this.id = now + ':' + connection.info.id + ':' + connection._requestCounter.value++;
	    if (connection._requestCounter.value > connection._requestCounter.max) {
	        connection._requestCounter.value = connection._requestCounter.min;
	    }

	    this.app = {};                          // Place for application-specific state without conflicts with hapi, should not be used by plugins
	    this.plugins = {};                      // Place for plugins to store state without conflicts with hapi, should be namespaced using plugin name

	    this._route = this.connection._router.specials.notFound.route;    // Used prior to routing (only settings are used, not the handler)
	    this.route = this._route.public;

	    this.auth = {
	        isAuthenticated: false,
	        credentials: null,                  // Special keys: 'app', 'user', 'scope'
	        artifacts: null,                    // Scheme-specific artifacts
	        session: null                       // Used by cookie auth { set(), clear() }
	    };

	    this.session = null;                    // Special key reserved for plugins implementing session support

	    this.pre = {};                          // Pre raw values
	    this.preResponses = {};                 // Pre response values

	    this.info = {
	        received: now,
	        responded: 0,
	        remoteAddress: req.connection ? req.connection.remoteAddress : '',
	        remotePort: req.connection ? req.connection.remotePort : '',
	        referrer: req.headers.referrer || req.headers.referer || '',
	        host: req.headers.host ? req.headers.host.replace(/\s/g, '') : '',
	        acceptEncoding: Accept.encoding(this.headers['accept-encoding'], ['identity', 'gzip', 'deflate'])
	    };

	    this.info.hostname = this.info.host.split(':')[0];

	    // Apply options

	    if (options.credentials) {
	        this.auth.credentials = options.credentials;
	    }

	    if (options.artifacts) {
	        this.auth.artifacts = options.artifacts;
	    }

	    // Assigned elsewhere:

	    this.orig = {};
	    this.params = {};
	    this.paramsArray = [];              // Array of path parameters in path order
	    this.payload = null;
	    this.state = null;
	    this.jsonp = null;
	    this.response = null;

	    // Semi-public members

	    this.raw = {
	        req: req,
	        res: res
	    };

	    this.tail = this.addTail = this._addTail;       // Removed once wagging

	    // Private members

	    this._states = {};
	    this._logger = [];
	    this._isPayloadPending = true;      // false when incoming payload fully processed
	    this._isBailed = false;             // true when lifecycle should end
	    this._isReplied = false;            // true when response processing started
	    this._isFinalized = false;          // true when request completed (may be waiting on tails to complete)
	    this._tails = {};                   // tail id -> name (tracks pending tails)
	    this._tailIds = 0;                  // Used to generate a unique tail id
	    this._protect = new Protect(this);
	    this.domain = this._protect.domain;

	    // Listen to request state

	    this._onEnd = function () {

	        self._isPayloadPending = false;
	    };

	    this.raw.req.once('end', this._onEnd);

	    this._onClose = function () {

	        self._log(['request', 'closed', 'error']);
	        self._isPayloadPending = false;
	        self._isBailed = true;
	    };

	    this.raw.req.once('close', this._onClose);

	    this._onError = function (err) {

	        self._log(['request', 'error'], err);
	        self._isPayloadPending = false;
	    };

	    this.raw.req.once('error', this._onError);

	    // Log request

	    var about = {
	        id: this.id,
	        method: this.method,
	        url: this.url.href,
	        agent: this.raw.req.headers['user-agent']
	    };

	    this._log(['received'], about, now);     // Must be last for object to be fully constructed
	};

	Hoek.inherits(internals.Request, Events.EventEmitter);


	internals.Request.prototype._setUrl = function (url, stripTrailingSlash, parserOptions) {

	    this.url = Url.parse(url, false);
	    this.url.query = Qs.parse(this.url.query, this.connection.settings.query.qs || parserOptions);      // Override parsed value
	    this.query = this.url.query;
	    this.path = this.url.pathname || '';                                                            // pathname excludes query

	    if (stripTrailingSlash &&
	        this.path.length > 1 &&
	        this.path[this.path.length - 1] === '/') {

	        this.path = this.path.slice(0, -1);
	        this.url.pathname = this.path;
	    }

	    this.path = this.connection._router.normalize(this.path);
	};


	internals.Request.prototype._setMethod = function (method) {

	    Hoek.assert(method && typeof method === 'string', 'Missing method');
	    this.method = method.toLowerCase();
	};


	internals.Request.prototype.log = function (tags, data, timestamp, _internal) {

	    tags = (Array.isArray(tags) ? tags : [tags]);
	    var now = (timestamp ? (timestamp instanceof Date ? timestamp.getTime() : timestamp) : Date.now());

	    var event = {
	        request: this.id,
	        timestamp: now,
	        tags: tags,
	        data: data,
	        internal: !!_internal
	    };

	    var tagsMap = Hoek.mapToObject(event.tags);

	    // Add to request array

	    this._logger.push(event);
	    this.connection.emit(_internal ? 'request-internal' : 'request', this, event, tagsMap);

	    if (this.server._settings.debug &&
	        this.server._settings.debug.request &&
	        Hoek.intersect(tagsMap, this.server._settings.debug.request, true)) {

	        console.error('Debug:', event.tags.join(', '), (data ? '\n    ' + (data.stack || (typeof data === 'object' ? Hoek.stringify(data) : data)) : ''));
	    }
	};


	internals.Request.prototype._log = function (tags, data) {

	    return this.log(tags, data, null, true);
	};


	internals.Request.prototype.getLog = function (tags, internal) {

	    if (typeof tags === 'boolean') {
	        internal = tags;
	        tags = [];
	    }

	    tags = [].concat(tags || []);
	    if (!tags.length &&
	        internal === undefined) {

	        return this._logger;
	    }

	    var filter = tags.length ? Hoek.mapToObject(tags) : null;
	    var result = [];

	    for (var i = 0, il = this._logger.length; i < il; ++i) {
	        var event = this._logger[i];
	        if (internal === undefined || event.internal === internal) {
	            if (filter) {
	                for (var t = 0, tl = event.tags.length; t < tl; ++t) {
	                    var tag = event.tags[t];
	                    if (filter[tag]) {
	                        result.push(event);
	                        break;
	                    }
	                }
	            }
	            else {
	                result.push(event);
	            }
	        }
	    }

	    return result;
	};


	internals.Request.prototype._execute = function () {

	    var self = this;

	    // Execute onRequest extensions (can change request method and url)

	    Handler.invoke(this, 'onRequest', function (err) {

	        // Undecorate request

	        self.setUrl = undefined;
	        self.setMethod = undefined;

	        if (err) {
	            return self._reply(err);
	        }

	        if (!self.path || self.path[0] !== '/') {
	            return self._reply(Boom.badRequest('Invalid path'));
	        }

	        // Lookup route

	        var match = self.connection._router.route(self.method, self.path, self.info.hostname);
	        self._route = match.route;
	        self.route = self._route.public;
	        self.params = match.params;
	        self.paramsArray = match.paramsArray;

	        // Setup timeout

	        if (self.raw.req.socket &&
	            self.route.settings.timeout.socket !== undefined) {

	            self.raw.req.socket.setTimeout(self.route.settings.timeout.socket || 0);     // Value can be false or positive
	        }

	        var serverTimeout = self.route.settings.timeout.server;
	        if (serverTimeout) {
	            serverTimeout = Math.floor(serverTimeout - self._bench.elapsed());      // Calculate the timeout from when the request was constructed
	            var timeoutReply = function () {

	                self._log(['request', 'server', 'timeout', 'error'], { timeout: serverTimeout, elapsed: self._bench.elapsed() });
	                self._reply(Boom.serverTimeout());
	            };

	            if (serverTimeout <= 0) {
	                return timeoutReply();
	            }

	            self._serverTimeoutId = setTimeout(timeoutReply, serverTimeout);
	        }

	        Items.serial(self._route._cycle, function (func, next) {

	            if (self._isReplied ||
	                self._isBailed) {

	                return next(Boom.internal('Already closed'));                       // Error is not used
	            }

	            if (typeof func === 'string') {                                         // Extension point
	                return Handler.invoke(self, func, next);
	            }

	            func(self, next);
	        },
	        function (err) {

	            self._reply(err);
	        });
	    });
	};


	internals.Request.prototype._reply = function (exit) {

	    var self = this;

	    if (this._isReplied) {                                  // Prevent any future responses to this request
	        return;
	    }

	    this._isReplied = true;

	    clearTimeout(this._serverTimeoutId);

	    if (this._isBailed) {
	        return this._finalize();
	    }

	    if (this.response &&                                    // Can be null if response coming from exit
	        this.response.closed) {

	        if (this.response.end) {
	            this.raw.res.end();                             // End the response in case it wasn't already closed
	        }

	        return this._finalize();
	    }

	    if (exit) {
	        this._setResponse(Response.wrap(exit, this));
	    }

	    Handler.invoke(this, 'onPreResponse', function (err) {

	        if (err) {                                          // err can be valid response or error
	            self._setResponse(Response.wrap(err, self));
	        }

	        Transmit.send(self, function () {

	            return self._finalize();
	        });
	    });
	};


	internals.Request.prototype._finalize = function () {

	    this.info.responded = Date.now();

	    if (this.response &&
	        this.response.statusCode === 500 &&
	        this.response._error) {

	        this.connection.emit('request-error', this, this.response._error);
	        this._log(this.response._error.isDeveloperError ? ['internal', 'implementation', 'error'] : ['internal', 'error'], this.response._error);
	    }

	    this.connection.emit('response', this);

	    this._isFinalized = true;
	    this.addTail = undefined;
	    this.tail = undefined;

	    if (Object.keys(this._tails).length === 0) {
	        this.connection.emit('tail', this);
	    }

	    // Cleanup

	    this.raw.req.removeListener('end', this._onEnd);
	    this.raw.req.removeListener('close', this._onClose);
	    this.raw.req.removeListener('error', this._onError);

	    if (this.response &&
	        this.response._close) {

	        this.response._close();
	    }

	    this._protect.logger = this.server;
	};


	internals.Request.prototype._setResponse = function (response) {

	    if (this.response &&
	        !this.response.isBoom &&
	        this.response !== response &&
	        (response.isBoom || this.response.source !== response.source)) {

	        this.response._close();
	    }

	    if (this._isFinalized) {
	        if (response._close) {
	            response._close();
	        }

	        return;
	    }

	    this.response = response;
	};


	internals.Request.prototype._addTail = function (name) {

	    var self = this;

	    name = name || 'unknown';
	    var tailId = this._tailIds++;
	    this._tails[tailId] = name;
	    this._log(['tail', 'add'], { name: name, id: tailId });

	    var drop = function () {

	        if (!self._tails[tailId]) {
	            self._log(['tail', 'remove', 'error'], { name: name, id: tailId });             // Already removed
	            return;
	        }

	        delete self._tails[tailId];

	        if (Object.keys(self._tails).length === 0 &&
	            self._isFinalized) {

	            self._log(['tail', 'remove', 'last'], { name: name, id: tailId });
	            self.connection.emit('tail', self);
	        }
	        else {
	            self._log(['tail', 'remove'], { name: name, id: tailId });
	        }
	    };

	    return drop;
	};


	internals.Request.prototype._setState = function (name, value, options) {          // options: see Defaults.state

	    var state = {
	        name: name,
	        value: value
	    };

	    if (options) {
	        Hoek.assert(!options.autoValue, 'Cannot set autoValue directly in a response');
	        state.options = Hoek.clone(options);
	    }

	    this._states[name] = state;
	};


	internals.Request.prototype._clearState = function (name, options) {

	    var state = {
	        name: name
	    };

	    state.options = Hoek.clone(options || {});
	    state.options.ttl = 0;

	    this._states[name] = state;
	};


	internals.Request.prototype._tap = function () {

	    return (this.listeners('finish').length || this.listeners('peek').length ? new Peekaboo(this) : null);
	};


	internals.Request.prototype.generateResponse = function (source, options) {

	    return new Response(source, this, options);
	};


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("accept");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("qs");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Domain = __webpack_require__(44);
	var Boom = __webpack_require__(18);
	var Hoek = __webpack_require__(8);


	// Declare internals

	var internals = {};


	exports = module.exports = internals.Protect = function (request) {

	    var self = this;

	    this._error = null;
	    this._at = '';
	    this.logger = request;                          // Replaced with server when request completes

	    this.domain = Domain.create();
	    this.domain.on('error', function (err) {

	        var handler = self._error;
	        if (handler) {
	            self._error = null;
	            return handler(err);
	        }

	        self.logger._log(['internal', 'implementation', 'error'], err);
	    });
	};


	internals.Protect.prototype.run = function (at, next, enter) {          // enter: function (exit)

	    var self = this;

	    Hoek.assert(!this._error, 'Invalid nested use of protect.run() during: ' + this._at + ' while trying: ' + at);

	    var finish = function (arg0, arg1, arg2) {

	        self._error = null;
	        self._at = '';
	        return next(arg0, arg1, arg2);
	    };

	    finish = Hoek.once(finish);

	    this._at = at;
	    this._error = function (err) {

	        return finish(Boom.badImplementation('Uncaught error', err));
	    };

	    enter(finish);
	};


	internals.Protect.prototype.reset = function () {

	    this._error = null;
	    this._at = '';
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("domain");

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Http = __webpack_require__(14);
	var Stream = __webpack_require__(32);
	var Zlib = __webpack_require__(46);
	var Ammo = __webpack_require__(47);
	var Boom = __webpack_require__(18);
	var Hoek = __webpack_require__(8);
	var Items = __webpack_require__(10);
	var Shot = __webpack_require__(20);
	var Auth = __webpack_require__(23);
	var Response = __webpack_require__(31);


	// Declare internals

	var internals = {};


	exports.send = function (request, callback) {

	    var response = request.response;
	    if (response.isBoom) {
	        return internals.fail(request, response, callback);
	    }

	    internals.marshal(request, function (err) {

	        if (err) {
	            request._setResponse(err);
	            return internals.fail(request, err, callback);
	        }

	        return internals.transmit(response, callback);
	    });
	};


	internals.marshal = function (request, next) {

	    var response = request.response;

	    internals.cors(response);
	    internals.content(response);
	    internals.security(response);

	    if (response.statusCode !== 304 &&
	        (request.method === 'get' || request.method === 'head')) {

	        if (response.headers.etag &&
	            request.headers['if-none-match']) {

	            // Strong verifier

	            var ifNoneMatch = request.headers['if-none-match'].split(/\s*,\s*/);
	            for (var i = 0, il = ifNoneMatch.length; i < il; ++i) {
	                var etag = ifNoneMatch[i];
	                if (etag === response.headers.etag) {
	                    response.code(304);
	                    break;
	                }
	                else if (response.settings.varyEtag) {
	                    var etagBase = response.headers.etag.slice(0, -1);
	                    if (etag === etagBase + '-gzip"' ||
	                        etag === etagBase + '-deflate"') {

	                        response.headers.etag = etag;
	                        response.code(304);
	                        break;
	                    }
	                }
	            }
	        }
	        else {
	            var ifModifiedSinceHeader = request.headers['if-modified-since'];
	            var lastModifiedHeader = response.headers['last-modified'];

	            if (ifModifiedSinceHeader &&
	                lastModifiedHeader) {

	                // Weak verifier

	                var ifModifiedSince = Date.parse(ifModifiedSinceHeader);
	                var lastModified = Date.parse(lastModifiedHeader);

	                if (ifModifiedSince &&
	                    lastModified &&
	                    ifModifiedSince >= lastModified) {

	                    response.code(304);
	                }
	            }
	        }
	    }

	    internals.state(response, function (err) {

	        if (err) {
	            request._log(['state', 'response', 'error'], err);
	            request._states = {};                                           // Clear broken state
	            return next(err);
	        }

	        internals.cache(response);

	        if (!response._isPayloadSupported()) {

	            // Close unused file streams

	            response._close();

	            // Set empty stream

	            response._payload = new internals.Empty();
	            if (request.method !== 'head') {
	                delete response.headers['content-length'];
	            }

	            return Auth.response(request, next);               // Must be last in case requires access to headers
	        }

	        response._marshal(function (err) {

	            if (err) {
	                return next(Boom.wrap(err));
	            }

	            if (request.jsonp &&
	                response._payload.jsonp) {

	                response._header('content-type', 'text/javascript' + (response.settings.charset ? '; charset=' + response.settings.charset : ''));
	                response._header('x-content-type-options', 'nosniff');
	                response._payload.jsonp(request.jsonp);
	            }

	            if (response._payload.size &&
	                typeof response._payload.size === 'function') {

	                response._header('content-length', response._payload.size(), { override: false });
	            }

	            return Auth.response(request, next);               // Must be last in case requires access to headers
	        });
	    });
	};


	internals.fail = function (request, boom, callback) {

	    var error = boom.output;
	    var response = new Response(error.payload, request);
	    response._error = boom;
	    response.code(error.statusCode);
	    response.headers = error.headers;
	    request.response = response;                            // Not using request._setResponse() to avoid double log

	    internals.marshal(request, function (err) {

	        if (err) {

	            // Failed to marshal an error - replace with minimal representation of original error

	            var minimal = {
	                statusCode: error.statusCode,
	                error: Http.STATUS_CODES[error.statusCode],
	                message: boom.message
	            };

	            response._payload = new Response.Payload(JSON.stringify(minimal), {});
	        }

	        return internals.transmit(response, callback);
	    });
	};


	internals.transmit = function (response, callback) {

	    // Setup source

	    var request = response.request;
	    var source = response._payload;
	    var length = response.headers['content-length'] ? parseInt(response.headers['content-length'], 10) : 0;      // In case value is a string

	    // Compression

	    var mime = request.server.mime.type(response.headers['content-type'] || 'application/octet-stream');
	    var encoding = (mime.compressible && !response.headers['content-encoding'] ? request.info.acceptEncoding : null);
	    encoding = (encoding === 'identity' ? null : encoding);

	    // Range

	    if (request.method === 'get' &&
	        response.statusCode === 200 &&
	        length &&
	        !encoding) {

	        if (request.headers.range) {

	            // Check If-Range

	            if (!request.headers['if-range'] ||
	                request.headers['if-range'] === response.headers.etag) {            // Ignoring last-modified date (weak)

	                // Parse header

	                var ranges = Ammo.header(request.headers.range, length);
	                if (!ranges) {
	                    var error = Boom.rangeNotSatisfiable();
	                    error.output.headers['content-range'] = 'bytes */' + length;
	                    return internals.fail(request, error, callback);
	                }

	                // Prepare transform

	                if (ranges.length === 1) {                                          // Ignore requests for multiple ranges
	                    var range = ranges[0];
	                    var ranger = new Ammo.Stream(range);
	                    response.code(206);
	                    response.bytes(range.to - range.from + 1);
	                    response._header('content-range', 'bytes ' + range.from + '-' + range.to + '/' + length);
	                }
	            }
	        }

	        response._header('accept-ranges', 'bytes');
	    }

	    // Content-Encoding

	    if (encoding &&
	        length &&
	        response._isPayloadSupported()) {

	        delete response.headers['content-length'];
	        response._header('content-encoding', encoding);
	        response.vary('accept-encoding');

	        var compressor = (encoding === 'gzip' ? Zlib.createGzip() : Zlib.createDeflate());
	    }

	    if (response.headers['content-encoding'] &&
	        response.headers.etag &&
	        response.settings.varyEtag) {

	        response.headers.etag = response.headers.etag.slice(0, -1) + '-' + response.headers['content-encoding'] + '"';
	    }

	    // Write headers

	    var headers = Object.keys(response.headers);
	    for (var h = 0, hl = headers.length; h < hl; ++h) {
	        var header = headers[h];
	        request.raw.res.setHeader(header, response.headers[header]);
	    }

	    request.raw.res.writeHead(response.statusCode);

	    // Generate tap stream

	    var tap = response._tap();

	    // Write payload

	    var hasEnded = false;
	    var end = function (err, event) {

	        if (!hasEnded) {
	            hasEnded = true;

	            if (event !== 'aborted') {
	                request.raw.res.end();
	            }

	            source.removeListener('error', end);

	            request.raw.req.removeListener('aborted', onAborted);
	            request.raw.req.removeListener('close', onClose);

	            request.raw.res.removeListener('close', onClose);
	            request.raw.res.removeListener('error', end);
	            request.raw.res.removeListener('finish', end);

	            var tags = (err ? ['response', 'error']
	                            : (event ? ['response', 'error', event]
	                                     : ['response']));

	            if (event || err) {
	                request.emit('disconnect');
	            }

	            request._log(tags, err);
	            callback();
	        }
	    };

	    source.once('error', end);

	    var onAborted = function () {

	        end(null, 'aborted');
	    };

	    var onClose = function () {

	        end(null, 'close');
	    };

	    request.raw.req.once('aborted', onAborted);
	    request.raw.req.once('close', onClose);

	    request.raw.res.once('close', onClose);
	    request.raw.res.once('error', end);
	    request.raw.res.once('finish', end);

	    var preview = (tap ? source.pipe(tap) : source);
	    var compressed = (compressor ? preview.pipe(compressor) : preview);
	    var ranged = (ranger ? compressed.pipe(ranger) : compressed);
	    ranged.pipe(request.raw.res);

	    // Injection

	    if (Shot.isInjection(request.raw.req)) {
	        request.raw.res._hapi = {
	            request: request
	        };

	        if (response.variety === 'plain') {
	            request.raw.res._hapi.result = response._isPayloadSupported() ? response.source : null;
	        }
	    }
	};


	internals.Empty = function () {

	    Stream.Readable.call(this);
	};

	Hoek.inherits(internals.Empty, Stream.Readable);


	internals.Empty.prototype._read = function (/* size */) {

	    this.push(null);
	};


	internals.cors = function (response) {

	    var request = response.request;
	    var cors = request.route.settings.cors;
	    if (cors) {
	        if (cors._origin &&
	            (!response.headers['access-control-allow-origin'] || cors.override)) {

	            if (cors.matchOrigin) {
	                response.vary('origin');
	                if (internals.matchOrigin(request.headers.origin, cors)) {
	                    response._header('access-control-allow-origin', request.headers.origin);
	                }
	                else if (cors.isOriginExposed) {
	                    response._header('access-control-allow-origin', cors._origin.any ? '*' : cors._origin.qualifiedString);
	                }
	            }
	            else if (cors._origin.any) {
	                response._header('access-control-allow-origin', '*');
	            }
	            else {
	                response._header('access-control-allow-origin', cors._origin.qualifiedString);
	            }
	        }

	        response._header('access-control-max-age', cors.maxAge, { override: cors.override });
	        response._header('access-control-allow-methods', cors._methods, { override: cors.override });
	        response._header('access-control-allow-headers', cors._headers, { override: cors.override });

	        if (cors._exposedHeaders.length !== 0) {
	            response._header('access-control-expose-headers', cors._exposedHeaders, { override: cors.override });
	        }

	        if (cors.credentials) {
	            response._header('access-control-allow-credentials', 'true', { override: cors.override });
	        }
	    }
	};


	internals.matchOrigin = function (origin, cors) {

	    if (!origin) {
	        return false;
	    }

	    if (cors._origin.any) {
	        return true;
	    }

	    if (cors._origin.qualified.indexOf(origin) !== -1) {
	        return true;
	    }

	    for (var i = 0, il = cors._origin.wildcards.length; i < il; ++i) {
	        if (origin.match(cors._origin.wildcards[i])) {
	            return true;
	        }
	    }

	    return false;
	};


	internals.cache = function (response) {

	    if (response.headers['cache-control']) {
	        return;
	    }

	    var request = response.request;
	    if ((request._route._cache && request.route.settings.cache._statuses[response.statusCode]) ||
	        response.settings.ttl) {

	        var ttl = (response.settings.ttl !== null ? response.settings.ttl : request._route._cache.ttl());
	        var privacy = (request.auth.isAuthenticated || response.headers['set-cookie'] ? 'private' : request.route.settings.cache.privacy || 'default');
	        response._header('cache-control', 'max-age=' + Math.floor(ttl / 1000) + ', must-revalidate' + (privacy !== 'default' ? ', ' + privacy : ''));
	    }
	    else {
	        response._header('cache-control', 'no-cache');
	    }
	};


	internals.security = function (response) {

	    var request = response.request;

	    var security = request.route.settings.security;
	    if (security) {
	        if (security._hsts) {
	            response._header('strict-transport-security', security._hsts, { override: false });
	        }

	        if (security._xframe) {
	            response._header('x-frame-options', security._xframe, { override: false });
	        }

	        if (security.xss) {
	            response._header('x-xss-protection', '1; mode=block', { override: false });
	        }

	        if (security.noOpen) {
	            response._header('x-download-options', 'noopen', { override: false });
	        }

	        if (security.noSniff) {
	            response._header('x-content-type-options', 'nosniff', { override: false });
	        }
	    }
	};


	internals.content = function (response) {

	    var type = response.headers['content-type'];
	    if (!type) {
	        var charset = (response.settings.charset ? '; charset=' + response.settings.charset : '');

	        if (typeof response.source === 'string') {
	            response.type('text/html' + charset);
	        }
	        else if (Buffer.isBuffer(response.source)) {
	            response.type('application/octet-stream');
	        }
	        else if (response.variety === 'plain' &&
	            response.source !== null) {

	            response.type('application/json' + charset);
	        }
	    }
	    else if (response.settings.charset &&
	        type.match(/^(?:text\/)|(?:application\/(?:json)|(?:javascript))/)) {

	        var hasParams = (type.indexOf(';') !== -1);
	        if (!hasParams ||
	            !type.match(/[; ]charset=/)) {

	            response.type(type + (hasParams ? ', ' : '; ') + 'charset=' + (response.settings.charset));
	        }
	    }
	};


	internals.state = function (response, next) {

	    var request = response.request;

	    var names = {};
	    var states = [];

	    var keys = Object.keys(request._states);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var keyName = keys[i];
	        names[keyName] = true;
	        states.push(request._states[keyName]);
	    }

	    keys = Object.keys(request.connection.states.cookies);
	    Items.parallel(keys, function (name, nextKey) {

	        var autoValue = request.connection.states.cookies[name].autoValue;
	        if (!autoValue || names[name]) {
	            return nextKey();
	        }

	        names[name] = true;

	        if (typeof autoValue !== 'function') {
	            states.push({ name: name, value: autoValue });
	            return nextKey();
	        }

	        autoValue(request, function (err, value) {

	            if (err) {
	                return nextKey(err);
	            }

	            states.push({ name: name, value: value });
	            return nextKey();
	        });
	    },
	    function (err) {

	        if (err) {
	            return next(Boom.wrap(err));
	        }

	        if (!states.length) {
	            return next();
	        }

	        request.connection.states.format(states, function (err, header) {

	            if (err) {
	                return next(Boom.wrap(err));
	            }

	            var existing = response.headers['set-cookie'];
	            if (existing) {
	                header = (Array.isArray(existing) ? existing : [existing]).concat(header);
	            }

	            response._header('set-cookie', header);
	            return next();
	        });
	    });
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("zlib");

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("ammo");

/***/ }
/******/ ]);
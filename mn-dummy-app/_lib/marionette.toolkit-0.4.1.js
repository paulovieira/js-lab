
/**
 * marionette.toolkit - A collection of opinionated Backbone.Marionette extensions for large scale application architecture.
 * @version v0.4.1
 * @link https://github.com/RoundingWellOS/marionette.toolkit
 * @license MIT
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("backbone.marionette"), require("underscore"), require("backbone")) : typeof define === "function" && define.amd ? define(["backbone.marionette", "underscore", "backbone"], factory) : global.Marionette.Toolkit = factory(global.Marionette, global._, global.Backbone);
})(this, function (Marionette, _, Backbone) {
  "use strict";

  var StateClass = Marionette.Object.extend({

    /**
     * The model class for _stateModel.
     * @type {Backbone.Model}
     * @default Backbone.Model
     */
    StateModel: Backbone.Model,

    /**
     * @public
     * @constructs StateClass
     * @param {Object} [options] - Settings for the stateClass.
     * @param {Object} [options.stateEvents] - Event hash bound from _stateModel to stateClass.
     * @param {Backbone.Model} [options.StateModel] - Model class for _stateModel.
     */
    constructor: function constructor(options) {

      options = _.extend({}, options);

      // Make defaults available to this
      _.extend(this, _.pick(options, ["StateModel", "stateEvents", "stateDefaults"]));

      var StateModel = this._getStateModel(options);

      this._stateModel = new StateModel(_.result(this, "stateDefaults"));

      // Bind events from the _stateModel defined in stateEvents hash
      this.bindEntityEvents(this._stateModel, _.result(this, "stateEvents"));

      Marionette.Object.call(this, options);
    },

    /**
     * Get the StateClass StateModel class.
     * Checks if the `StateModel` is a model class (the common case)
     * Then check if it's a function (which we assume that returns a model class)
     *
     * @private
     * @method _getStateModel
     * @param {Object} [options] - Options that can be used to determine the StateModel.
     * @memberOf StateClass
     * @returns {Backbone.Model}
     */
    _getStateModel: function _getStateModel(options) {
      var StateModel = this.getOption("StateModel");

      if (StateModel.prototype instanceof Backbone.Model || StateModel === Backbone.Model) {
        return StateModel;
      } else if (_.isFunction(StateModel)) {
        return StateModel.call(this, options);
      } else {
        throw new Marionette.Error({
          name: "InvalidStateModelError",
          message: "\"StateModel\" must be a model class or a function that returns a model class"
        });
      }
    },

    /**
     * Set a property on the _stateModel.
     *
     * @public
     * @method setState
     * @memberOf StateClass
     * @param {String|Object} key - Attribute name or Hash of any number of key value pairs.
     * @param {*} [value] - Attribute value if key is String, replaces options param otherwise.
     * @param {Object} [options] - Backbone.Model options.
     * @returns {Backbone.Model} - The _stateModel
     */
    setState: function setState() {
      return this._stateModel.set.apply(this._stateModel, arguments);
    },

    /**
     * Get a property from the _stateModel, or return the _stateModel
     *
     * @public
     * @method getState
     * @memberOf StateClass
     * @param {String} [attr] - Attribute name of stateModel.
     * @returns {Backbone.Model|*} - The _stateModel or the attribute value of the _stateModel
     */
    getState: function getState(attr) {
      if (!attr) {
        return this._stateModel;
      }

      return this._stateModel.get.apply(this._stateModel, arguments);
    },

    /**
     * Destroy the stateClass and clean up any listeners on the _stateModel.
     *
     * @public
     * @method destroy
     * @memberOf StateClass
     */
    destroy: function destroy() {
      this._stateModel.stopListening();

      Marionette.Object.prototype.destroy.apply(this, arguments);
    }
  });

  var state_class = StateClass;

  var AbstractApp = state_class.extend({

    /**
     * Internal flag indiciate when `App` has started but has not yet stopped.
     *
     * @private
     * @type {Boolean}
     * @default false
     */
    _isRunning: false,

    /**
     * Internal flag indiciate when `App` has been destroyed
     *
     * @private
     * @type {Boolean}
     * @default false
     */
    _isDestroyed: false,

    /**
     * Set to true if a parent `App` should not be able to destroy this `App`.
     *
     * @type {Boolean|Function}
     * @default false
     */
    preventDestroy: false,

    /**
     * Set to true if `App` should be started after it is initialized.
     *
     * @type {Boolean|Function}
     * @default false
     */
    startAfterInitialized: false,

    /**
     * Set to true if `App` should be started after its parent starts.
     *
     * @type {Boolean|Function}
     * @default false
     */
    startWithParent: false,

    /**
     * Set to false if `App` should not stop after its parent stops.
     *
     * @type {Boolean|Function}
     * @default true
     */
    stopWithParent: true,

    /**
     * @public
     * @constructs AbstractApp
     * @param {Object} [options] - Settings for the App.
     * @param {Boolean} [options.startWithParent]
     * @param {Boolean} [options.stopWithParent]
     * @param {Boolean} [options.startAfterInitialized]
     * @param {Boolean} [options.preventDestroy]
     */
    constructor: function constructor(options) {

      options = _.extend({}, options);

      _.bindAll(this, "start", "stop");

      var pickOptions = ["startWithParent", "stopWithParent", "startAfterInitialized", "preventDestroy"];

      _.extend(this, _.pick(options, pickOptions));

      // Will call initialize
      state_class.call(this, options);

      if (_.result(this, "startAfterInitialized")) {
        this.start(options);
      }
    },

    /**
     * Internal helper to verify if `App` has been destroyed
     *
     * @private
     * @method _ensureAppIsIntact
     * @memberOf AbstractApp
     * @throws AppDestroyedError - Thrown if `App` has already been destroyed
     */
    _ensureAppIsIntact: function _ensureAppIsIntact() {
      if (this._isDestroyed) {
        throw new Marionette.Error({
          name: "AppDestroyedError",
          message: "App has already been destroyed and cannot be used."
        });
      }
    },

    /**
     * Gets the value of internal `_isRunning` flag
     *
     * @public
     * @method isRunning
     * @memberOf AbstractApp
     * @returns {Boolean}
     */
    isRunning: function isRunning() {
      return this._isRunning;
    },

    /**
     * Sets the app lifecycle to running.
     *
     * @public
     * @method start
     * @memberOf AbstractApp
     * @param {Object} [options] - Settings for the App passed through to events
     * @event AbstractApp#before:start - passes options
     * @returns {AbstractApp}
     */
    start: function start(options) {
      this._ensureAppIsIntact();

      if (this._isRunning) {
        return this;
      }

      this.triggerMethod("before:start", options);

      this._isRunning = true;

      this.triggerStart(options);

      return this;
    },

    /**
     * Triggers start event.
     * Override to introduce async start
     *
     * @public
     * @method triggerStart
     * @memberOf AbstractApp
     * @param {Object} [options] - Settings for the App passed through to events
     * @event AbstractApp#start - passes options
     * @returns
     */
    triggerStart: function triggerStart(options) {
      this.triggerMethod("start", options);
    },

    /**
     * Sets the app lifecycle to not running.
     * Removes any listeners added during the running state
     *
     * @public
     * @method stop
     * @memberOf AbstractApp
     * @param {Object} [options] - Settings for the App passed through to events
     * @event AbstractApp#before:stop - passes options
     * @event AbstractApp#stop - passes options
     * @returns {AbstractApp}
     */
    stop: function stop(options) {
      if (!this._isRunning) {
        return this;
      }

      this.triggerMethod("before:stop", options);

      this._isRunning = false;

      this.triggerMethod("stop", options);

      this._stopRunningListeners();
      this._stopRunningEvents();

      return this;
    },

    /**
     * Gets the value of internal `_isDestroyed` flag
     *
     * @public
     * @method isDestroyed
     * @memberOf AbstractApp
     * @returns {Boolean}
     */
    isDestroyed: function isDestroyed() {
      return this._isDestroyed;
    },

    /**
     * Stops the `App` and sets it destroyed.
     *
     * @public
     * @method destroy
     * @memberOf AbstractApp
     */
    destroy: function destroy() {
      debugger;
      if (this._isDestroyed) {
        return;
      }

      this._isDestroyed = true;

      this.stop();

      state_class.prototype.destroy.apply(this, arguments);
    },

    /**
     * Internal method to stop any registered events.
     *
     * @private
     * @method _stopRunningEvents
     * @memberOf AbstractApp
     */
    _stopRunningEvents: function _stopRunningEvents() {
      _.each(this._runningEvents, function (args) {
        this.off.apply(this, args);
      }, this);
    },

    /**
     * Internal method to stop any registered listeners.
     *
     * @private
     * @method _stopRunningListeners
     * @memberOf AbstractApp
     */
    _stopRunningListeners: function _stopRunningListeners() {
      _.each(this._runningListeningTo, function (args) {
        this.stopListening.apply(this, args);
      }, this);
    },

    /**
     * Overrides `Backbone.Event.on()`
     * If this `App` is running it will register the event for removal `onStop`
     *
     * @public
     * @method on
     * @memberOf AbstractApp
     * @returns {AbstractApp}
     */
    on: function on() {
      if (this._isRunning) {
        this._runningEvents = this._runningEvents || [];
        this._runningEvents.push(arguments);
      }
      return state_class.prototype.on.apply(this, arguments);
    },

    /**
     * Overrides `Backbone.Event.listenTo()`
     * If this `App` is running it will register the listener for removal `onStop`
     *
     * @public
     * @method listenTo
     * @memberOf AbstractApp
     * @returns {AbstractApp}
     */
    listenTo: function listenTo() {
      if (this._isRunning) {
        this._runningListeningTo = this._runningListeningTo || [];
        this._runningListeningTo.push(arguments);
      }
      return state_class.prototype.listenTo.apply(this, arguments);
    },

    /**
     * Overrides `Backbone.Event.listenToOnce()`
     * If this `App` is running it will register the listener for removal `onStop`
     *
     * @public
     * @method listenToOnce
     * @memberOf AbstractApp
     * @returns {AbstractApp}
     */
    listenToOnce: function listenToOnce() {
      if (this._isRunning) {
        this._runningListeningTo = this._runningListeningTo || [];
        this._runningListeningTo.push(arguments);
      }

      return state_class.prototype.listenToOnce.apply(this, arguments);
    }
  });

  var abstract_app = AbstractApp;

  /* CHANGED 16.03.09: remove the code relative to the App and Component classes;
    we only care about the AbstractApp; note that we have to add the AbstractApp
    to the exports: "Toolkit.AbstractApp = abstract_app;"
    (the "Toolkit.App" and "Toolkit.Component" exports can be removed)
  */

  var previousToolkit = Marionette.Toolkit;

  var Toolkit = Marionette.Toolkit = {};

  Toolkit.noConflict = function () {
    Marionette.Toolkit = previousToolkit;
    return this;
  };

  Toolkit.VERSION = "0.4.1";

  Toolkit.StateClass = state_class;

  Toolkit.AbstractApp = abstract_app;  // <- new

  var marionette_toolkit = Toolkit;

  return marionette_toolkit;
});

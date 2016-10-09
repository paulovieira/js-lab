var _ = require('underscore');
var Backbone = require('backbone');
var Mn = require('backbone.marionette');
var BaseRouter = require('backbone.base-router');

var Router = BaseRouter.extend({

    constructor: function(routesConfig){

        this.routes = {};

        if(_.isObject(routesConfig) && !_.isArray(routesConfig)){
            routesConfig = [routesConfig];
        }
        _.each(routesConfig, this._addRoute, this);

        BaseRouter.prototype.constructor.apply(this, arguments);
    },

    addRoutes: function(routesConfig){

        if(!_.isObject(routesConfig)){
            throw new Error('routes config must be an object or array of objects');
        }

        if(_.isObject(routesConfig) && !_.isArray(routesConfig)){
            routesConfig = [routesConfig];
        }

        _.each(routesConfig, this._addRoute, this);
        this._bindRoutes();
    },

    _addRoute: function(routeObj){

        this.routes[routeObj.path] = routeObj;
    },

    onNavigate: function(routeData) {

        //debugger;
        var keys = ['query', 'params', 'uriFragment', 'originalRoute'];
        var isValid = true;

        routeData.linked.validate = routeData.linked.validate || {};
        if (routeData.linked.validate.query){
            if(!routeData.linked.validate.query(routeData.query)){
                return new Error('invalid query string');
            }
        }

        if (routeData.linked.validate.params){
            if(!routeData.linked.validate.params(routeData.params)){
                return new Error('invalid path parameters');
            }
        }

        routeData.linked.handler(_.pick(routeData, keys), _.bind(this.renderTree, this));
    },

    renderTree: function(tree){
        //debugger;
        console.time('renderTree');
        if(!_.isObject(tree)){
            throw new Error('route tree must be an object or array of objects');
        }

        if(_.isObject(tree) && !_.isArray(tree)){
            tree = [tree];
        }

        var i, l = tree.length;
        for(i = 0; i < l; ++i){
            this._renderTree(
                null, 
                tree[i].region, 
                tree[i].viewClass,
                tree[i].viewOptions, 
                tree[i].forceRender,
                tree[i].pre, 
                tree[i].children
            );
        }
        console.timeEnd('renderTree');
    },

    _renderTree: function(parentV, region, viewClass, viewOptions, forceRender, pre, children){
            
        //debugger;

        var label = '_renderTree@' + (region instanceof Mn.Region ? 'root' : region);
        console.time(label);

        if(parentV){
            region = parentV.getRegion(region);
        }

        // the initial call to showView doesn't have a parentV; in that case the region
        // property should be a reference to a region (the 'root' region of the tree)
        if(!(region instanceof Mn.Region)){
            throw new Error('region must be an instance of Mn.Region');
        }

        children = children || [];

        var i, l = children.length;
        var view;

        //debugger;
        if(!pre){

            if(region.currentView instanceof viewClass && !!forceRender === false){

                // no nothing on this view, just proceed straight to the children
                for(i = 0; i < l; ++i){
                    this._renderTree(
                        region.currentView, 
                        children[i].region, 
                        children[i].viewClass,
                        children[i].viewOptions, 
                        children[i].forceRender,
                        children[i].pre, 
                        children[i].children
                    );
                }

                console.timeEnd(label);
                return;
            }

            view = new viewClass(viewOptions);
            view.render();

            for(i = 0; i < l; ++i){

                this._renderTree(
                    view, 
                    children[i].region, 
                    children[i].viewClass, 
                    children[i].viewOptions, 
                    children[i].forceRender,
                    children[i].pre, 
                    children[i].children
                );
            }
            
            //debugger;
            region.show(view, { preventRender: true });
            console.timeEnd(label);
            return;
        }

        //debugger;
        view = new viewClass(viewOptions);
        Mn.triggerMethodOn(view, 'before:pre', view);
        
        pre().then(function(data){

            // 'pre' view event will be triggered before 'render' and 'attach'
            Mn.triggerMethodOn(view, 'pre', view, data);
            view.render();
            
            for(i = 0; i < l; ++i){
                this._renderTree(
                    view, 
                    children[i].region, 
                    children[i].viewClass, 
                    children[i].viewOptions, 
                    children[i].forceRender,
                    children[i].pre, 
                    children[i].children
                );
            }

            // show this view right away, even if the child views also have
            // async pre-requisites
            region.show(view, { preventRender: true });
            console.timeEnd(label);
            return;

        }.bind(this));

    },

    start: function(options){

        // debugger;
        options = options || {}
        Backbone.history.start(options);
    }
})

module.exports = Router;

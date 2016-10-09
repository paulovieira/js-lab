var Fs = require("fs-extra");
var Path = require("path");
var JSON5 = require("json5");
var Cheerio = require("cheerio");
var Glob = require("glob");
var _s = require("underscore.string");
var _ = require("underscore");
var Nunjucks = require("nunjucks");



var internals = {};

// ENGINES

Nunjucks.configure(__dirname, {
    autoescape: true,
    watch: false
});


internals.engines = {
    "nunjucks": Nunjucks
};

internals.supportedEngines = [];
internals.supportedEngines.push("nunjucks");
internals.supportedEngines.push("hogan");
internals.supportedEngines.push("hogan.js");

internals.defaultEngineKey = "nunjucks";

internals.renderTemplateNunjucks = function(name, source, ctx){

    var nunjucks = internals.engines["nunjucks"];
    var html = "";

    if(_.isArray(ctx)){
        ctx.forEach(function(obj){
            html = html + nunjucks.renderString(source, obj);
        });
    }
    else if(_.isObject(ctx)){
        html = nunjucks.renderString(source, ctx);
    }
    else{
        throw new Error("context for the '" + name + "' engine must be an object or array");
    }    

    return html;
};

internals.renderTemplateHogan = function(name, source, ctx){

    var hogan = internals.engines["hogan"];
    var html = "";

    if(_.isArray(ctx)){
        ctx.forEach(function(obj){
            html = html + hogan.compile(source).render(obj);
        });
    }
    else if(_.isObject(ctx)){
        html = hogan.compile(source).render(ctx);
    }
    else{
        throw new Error("context for the '" + name + "' engine must be an object or array");
    }

    return html;
};

// register one (or more) engines
module.exports.registerEngine = function(obj, engine){

    if(_.isString(obj)){
        var engineName = obj;
        (obj = {})[engineName] = engine;
    }

    Object.keys(obj).forEach(function(key){

        if(!_.contains(internals.supportedEngines, key)){
            throw new Error("Engine '" + key + "' is not supported.");
        }

        internals.engines[key] = obj[key];
    });

};

module.exports.setDefaultEngine = function(name){

    if(! _.isString(name)) {
        throw new Error("the argument to setDefaultEngine must be a string");
    }

    if(!internals.engines[name]){
        throw new Error("engine '" + name + "' is not registered");
    }

    internals.defaultEngineKey = name;
};


internals.renderTemplate = function(name, source, ctx){

    if(name === "nunjucks"){
        return internals.renderTemplateNunjucks(name, source, ctx);
    }
    else if(name === "hogan" || name === "hogan.js"){
        return internals.renderTemplateHogan(name, source, ctx);
    }
    else{
        throw new Error("template engine '" + name + "' is not loaded");
    }
};



// STATES

internals.outputRenderInfo = function( obj, level ) {

    if(_.isString(obj)) {
        console.log(obj);
        return;
    }

    var spacePrefix = "";
    for(var i=0; i<level; i++){
        spacePrefix = spacePrefix + "   ";
    }

    var prefix = level > 0 ? (spacePrefix + "[") : "";
    var suffix = level > 0 ? "]" : "";
    console.log(prefix + "Rendered state at '" + obj.path + "'" + suffix);
    
};

internals.outputStateInfo = function(obj){

    console.log("Loaded state at '" + obj.path + "'");
};

internals.renderState = function(current, parent, ctxKey, level){

    // if we have a container, append it to the html (Cheerio will take care of the closing tag)
    var html = current.container ? "\n" + current.container : "\n";
    var html2 = "";
//     debugger;

    // the object in the tree can have either a template or a state
    var path;
    var engine = current.engine || internals.defaultEngineKey;
    var overrideCtx = current.ctx;
    if(current.template){

        html = html + internals.loadTemplate(current.template, current.ctx, {engine: engine, ctxKey: ctxKey});

    }
    else if(current.state){

        var tempState = this.init();
        html = html + tempState.load(current.state).render({level: level+1}).get()[0].html();    
    }
    else if(current.html){

        html = html + internals.loadTemplate(current.html, current.ctx, {engine: engine, ctxKey: ctxKey, inlineHtml: true});
    }
    else{
        throw new Error("an object in the state tree must have either a template or a state");
    }
    

    // create the respective Cheerio in the "$" property of the tree object; if current.container
    // is defined, the closing tag will be missing, however Cheerio will take care of closing it;
    current.$ = Cheerio.load(html);

    // verify that insertIn exists in the parent object in the tree (if there is parent, then 
    // we know the "parent.$" property exists)
    if(parent && parent.$(current.insertIn).length===0){
        throw new Error("the 'insertIn' selector " + current.insertIn + " was not found in the parent template");
    }

    (current.children || []).forEach(function(child){
        internals.renderState.call(this, child, current, ctxKey, level);
    });

    // get the html; at this point it will include the html from all the children (because html html
    // of leaves has been rendered already through the recursive call above
    
    if(parent){
        html2 = "\n" + current.$.html();
        parent.$(current.insertIn).last().prepend(html2);
    }
    
};

module.exports.load = function(pattern){

    var statePaths = Glob.sync(pattern)
        .filter(function(path){

            return Path.extname(path) === ".json";
        });

    if(statePaths.length === 0){
        throw new Error("the pattern '" + pattern + "' didn\'t match any file");
    }

    for(var i=0, l=statePaths.length; i<l; i++){
        var path = statePaths[i];

        // the state object is essentially the parsed json + some decorations
        var obj = {};
        try {
            obj = JSON5.parse(Fs.readFileSync(path, "utf8"));
        }
        catch(e) {
            //throw new Error("xxerror parsing JSON in file '" + path + "'");
            // create a fake state object with the error message:
            debugger;
            errMsg = "Error rendering state '" + path + "' - malformed JSON, " + e.message + " (skipping)";
            obj.tree = {
                html: "<html><body>" + errMsg +"</body></html>"
            };
            obj.description = "?";
        }

        if(obj.skip){
            continue;
        }

        obj.path = path;
        
        // return the html of the top-level object in the tree
        obj.tree.$ = Cheerio.load("");
        obj.html = function(){
            return this.tree.$.html();
        };

        obj.scripts = obj.scripts || [];
        obj.css = obj.css || [];

        this.states.push(obj);
        internals.outputStateInfo(obj);

    }

    return this;
};

module.exports.init = function(){
//    debugger;
//    var x = module.exports;
    var s = Object.create(module.exports);
    s.states = [];

    return s;
}



module.exports.get = function(pattern){

    if(!pattern){
        return this.states;    
    }

    var paths = Glob.sync(pattern);
    return _.filter(this.states, function(state){
        return _.contains(paths, state.path);
    });
};



module.exports.render = function(options){

    options = options || {};
    var ctxKey = options.ctxKey || "default";
    var level = options.level || 0;
 //debugger;
    //var states = this.get(options.path);
    var states = this.get(options.path);
    states.forEach(function(state){
// //debugger;
        //var state = module.exports.getState(statePath);
        //var ctxKey = options.ctxKey;
        //var level = options.level;

        // the insertIn property can be overriden (if we specify a custom document when calling
        // rendeStates, it makes sense to allow to specify the insertIn property as well)
        //state.tree.insertIn = options.insertIn || state.tree.insertIn;

        //state.documentHtml = state.documentHtml || {};

        if(level===0){
            console.log("-------------")
        }

        var errMsg;
        try{
            internals.renderState.call(this, state.tree, null, ctxKey, level);

            // append the scripts and css tags (if defined in the state configuration)
            state.scripts.forEach(function(scriptPath){
                var tag = '\n<script src="' + scriptPath + '"></script>\n';
                state.tree.$("body").append(tag);
            });

            state.css.forEach(function(cssPath){
                var tag = '\n<link href="' + cssPath + '" rel="stylesheet">\n';
                state.tree.$("head").append(tag);
            });
        }
        catch(e){
            // create a basic document with the error message
            errMsg = "Error rendering state '" + state.path + "' - " + e.message + " (skipping)";
            state.tree.$ = Cheerio.load("<html><body>" + errMsg + "</body></html>");
        }

        internals.outputRenderInfo(errMsg || state, level);

        if(level===0){
            console.log("-------------\n\n")
        }

    }, this);

    return this;

};

module.exports.report = function(outputDir){

    var allStates = this
        .get()
        .map(function(s){

            return {
                path: s.path,
                description: s.description,
                html: s.html(),
                fileName: _s(s.path).slugify().slice(0,-5).value() + ".html"
            };
        });


    // temporary file - used only as context for one of the templates in the "reporter" state (state-item.html)
    Fs.writeFileSync("resources/templates/reporter/state-item.context.json", JSON5.stringify(allStates));

    var reporterState = this.init();
//debugger;
    reporterState
        .load("resources/states/reporter.json")
        .render();

    Fs.removeSync("resources/templates/reporter/state-item.context.json");

    // make sure the output dir is empty (don't delete it if already exists because that will
    // mess with with watcher)
    Fs.ensureDirSync(outputDir);
    Fs.removeSync(Path.join(outputDir, "index.html"));

    Fs.ensureDirSync(Path.join(outputDir, "rendered-states"));
    Fs.removeSync(Path.join(outputDir, "rendered-states", "*"));

    Fs.writeFileSync(Path.join(outputDir, "index.html"), reporterState.get()[0].html());
    allStates.forEach(function(obj){
        Fs.writeFileSync(Path.join(outputDir, "rendered-states", obj.fileName), obj.html);
    });

};


// TEMPLATES

// internals.outputTemplateInfo = function(obj){

//     console.log("Loaded template at " + obj.path);
//     console.log("    Template engine: " + obj.engine);
//     var ctxKeys = Object.keys(obj.ctx);
//     if(ctxKeys.length===0){
//         console.log("    WARNING: no associated context file was found.")
//     }
//     else{
//         console.log("    " + ctxKeys.length + " context files were found: " + ctxKeys.join(", "));
//     }
// };

internals.resolveDefaultTemplates = function(str){

    var defaultTpl = {
        "document-basic":     "resources/templates/documents/document-basic.html",
        "document-bootstrap": "resources/templates/documents/document-bootstrap.html"
    };

    return defaultTpl[str] || str;
};


internals.loadTemplate = function(path, ctx, opt){

//internals.loadTemplate = function(path, engine, overrideCtx, ctxKey){

// debugger;
    var source = "";
    var ctxObj = {};

    if(opt.inlineHtml){
        source = path;
    }
    else{
        path = internals.resolveDefaultTemplates(path);
        source = Fs.readFileSync(path, "utf8");

        // make a gloab pattern from the path of the html filename; 
        // example: "my-template.html" -> "my-template.*.json"
        var array = path.split(".");
        array.pop(); 
        var basePattern = array.join("");

        // try to load a files wth a name "my-template.context.en.json" (or "my-template.ctx.en.json")
        var ctxPaths = Glob.sync(basePattern + ".c*." + opt.ctxKey + ".json");

        // if none was found and if the context key is "default", try also "my-template.context.json"
        if(ctxPaths.length===0 && opt.ctxKey==="default"){
            ctxPaths = Glob.sync(basePattern + ".*.json");
        }

        // load the context file

        if(ctxPaths.length > 0){
            try {
                ctxObj = JSON5.parse(Fs.readFileSync(ctxPaths[0], "utf8"));
            }
            catch(e) {
                throw new Error("error parsing JSON in file '" + ctxPaths[0] + "'");
            }        
        }

    }
    

    // if a ctx key was given in the tree's object (inline context), flat-merge those 
    // properties 
    if(ctx && !Array.isArray(ctxObj)){
        ctxObj = _.extend(ctxObj, ctx);
    }

    //var source = Fs.readFileSync(path, "utf8");

    return internals.renderTemplate(opt.engine, source, ctxObj);
};

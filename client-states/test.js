var Nunjucks = require('nunjucks');
var Hogan = require('hogan.js');

//var states = require("./lib/index.js");
var Chokidar = require('chokidar');
var HtmlState = require("./lib");

Nunjucks.configure(__dirname, {
    autoescape: true, 
    watch: false
});

// states.registerEngine({
//     nunjucks: Nunjucks,  
//     hogan: Hogan
// });

// var Nunjucks = states.getEngine("nunjucks");
// var Hogan = states.getEngine("hogan");

HtmlState.registerEngine({
    nunjucks: Nunjucks,  
    hogan: Hogan
});


var update = function(){
    HtmlState.init()
        .load("states/map-menu/*.json")
        .render()
        .report("./output");

    console.log("Watching for changes...")
};


var monitoredFiles = [];
monitoredFiles.push('templates/**/*.html');
monitoredFiles.push('templates/**/*.context.json');
monitoredFiles.push('templates/**/*.ctx.json');
monitoredFiles.push('states/**/*.json');
monitoredFiles.push('states/**/*.js');
monitoredFiles.push('states/**/*.css');

var watcher = Chokidar.watch(monitoredFiles, {
//    ignored: /[\/\\]\./,
});


watcher
  .on('change', update)

setTimeout(function(){
    watcher.on('add', update);
}, 1000);
  
update();


// HtmlState.init()
//     .load("states/123/state*.json")
//     .render()
//     .report("./output");



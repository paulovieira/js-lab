var Path = require("path");
var Fs = require("fs");
var Superviews = require('superviews.js')
var Slug = require('slugg');
var Umd = require("umd");



var templates = [
{
    input: "./template1.html",
//    output: "./_build/template1.html",
},
{
    input: "./template2.superviews.html",
//    output: "./_build/template2.html",
}
];
var compiled;

var args;
var args = "ctx";
var outputDir = "./_build";

templates.forEach(function(t){

    Fs.readFile(t.input, "utf8", function(err, contents){

        if(err){
            throw err;
        }
//        console.log("------");
//        console.log(contents);
//        console.log("------");


        var defaultFnName = Slug(t.input, "_");
        compiled = Superviews(contents, defaultFnName, args).slice(1)

        // the functions from incremental dom that are used by superviews
        var moduleCode = `
// var IncrementalDOM = require("incremental-dom");
var IncrementalDOM = window.IncrementalDOM;

var elementOpen = IncrementalDOM.elementOpen;
var elementClose = IncrementalDOM.elementClose;
var elementPlaceholder = IncrementalDOM.elementPlaceholder;
var text = IncrementalDOM.text;
var skip = IncrementalDOM.skip;
        `;

        moduleCode += `
module.exports = /* begin idom template */ ${ compiled }
/* end idom template */
`;

//        console.log("******");
//        console.log(moduleCode);
//        console.log("******");

        moduleCode = Umd(defaultFnName, moduleCode, {commonJS: true});

        var output = Path.join(outputDir, Path.parse(t.input).name + ".js");
        Fs.writeFile(output, moduleCode, function(err){

            if(err){
                throw err;
            }
        });

    });

});


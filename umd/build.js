var Umd = require("umd");
var Fs = require("fs");

var modules = [
    // {
    //     input: "./module-a.js",
    //     output: "./_build/module-a.js",
    //     name: "module-a"
    // },
    {
        input: "./module-b.js",
        output: "./_build/module-b.js",
        name: "module-b"
    },
    {
        input: "./module-c.js",
        output: "./_build/module-c.js",
        name: "module-c"
    }
];

modules.forEach(function(m){

    Fs.readFile(m.input, "utf8", function(err, code){

        var options = {};
        if(m.name === 'module-b'){
            options = {commonJS: true }
        }
        if(m.name === 'module-c'){
            options = {commonJS: false }
        }

        Fs.writeFile(m.output, Umd(m.name, code, options), function(err){})
    });
});

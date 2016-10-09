var Glue = require("glue");
var Hoek = require("hoek");
var Nunjucks = require("./hapi-nunjucks");

var manifest = {

    server: {

    },
    connections: [
        {
            host: "localhost",
            port: 7070
        }
    ],
    plugins: [
        {
            "vision": {

            }
        },
        {
            "./test_view": {

            }
        }
    ]
}

var options = {
    relativeTo: __dirname,
    prePlugins: function(server, next){
        next();
    }
};


Glue.compose(manifest, options, function (err, server) {

    Hoek.assert(!err, 'Failed registration of one or more plugins: ' + err);

    var env = Nunjucks.configure("./x/z", {
        //noCache: false,
        throwOnUndefined: false,
        autoescape: true
    });

    env.addFilter('asyncFilter', function myAsyncFilter(str, cb) {

        console.log("       asyncFilter started...");
        setTimeout(function insideAsyncFilter(){

            console.log("       asyncFilter finished");
            //return cb(new Error("dummy error"));

            return cb(null, str + " + async filter");

        }, 2000);

    }, true);

    env.addFilter("logTimestamp", function(str){

        console.log("           dummy syncronous filter @ " + new Date().toISOString());
        return str;
    });

    env.addFilter("syncFilter", function(str){

        console.log("           syncFilter filter @ " + new Date().toISOString());

        //throw new Error("dummy err")
        if(str === null || str === undefined){
            return "";
        }

        throw Error("dummy err");

        return str + " + sync filter";
    });



    server.views({
        engines: {
            html: Nunjucks
        },
        path: './x/z',
        compileOptions: {
            compileOptA: "ccc"
        },
        
        compileMode: "async",
        context: {
            globalKey: "<xyz>",
            something: 789
        },
        //isCached: false
    });

    // start the server and finish the initialization process
    server.start(function(err) {

        Hoek.assert(!err, 'Failed start server: ' + err);
        
        console.log('Server started at: ' + server.info.uri);
        console.log("Hapi version: " + server.version);
    });
});
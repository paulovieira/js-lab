var Path = require("path");
var Hoek = require("hoek");

var internals = {};

internals.HelloWorldManager = function(langCode){
    var message;
    if(langCode === "pt"){
        message = "olá mundo!";
    }
    else if(langCode === "en"){
        message = "hello world!";
    }
    else{
        throw new Error("invalid lang code")
    }

    this.message = message;
    this.something = "default stuff";
};

exports.register = function(server, options, next){

    console.log("\n--- \nregistering the hello-world plugin")

    server.decorate("server", "setHelloWorld", function(langCode){

        // "this" is the context of the plugin that calls server.setHelloWorld()
        this.realm.plugins["hello-world"] = this.realm.plugins["hello-world"] || {};
        Hoek.assert(!this.realm.plugins["hello-world"].obj, 'HelloWorldManager is already set in plugin ' + this.realm.plugin);

        this.realm.plugins["hello-world"].obj = new internals.HelloWorldManager(langCode);

    });

    server.decorate("reply", "hello", function(){

        // "this" is the context of the plugin that calls reply.hello()
        var realm = this.realm.plugins["hello-world"] || {};
        Hoek.assert(realm.obj, 'Cannot reply a Hello World without having a HelloWorldManager configured');

        return this.response(realm.obj).code(299);
    });

    return next();
};

exports.register.attributes = {
    name: "hello-world",
    dependencies: []
};

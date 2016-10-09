var Promise = require("bluebird"); 
//var Seneca = Promise.promisifyAll(require("seneca"));
var Seneca = require("seneca");

var seneca = Seneca();


// var myPlugin = function(options){
//     this.add({foo: "bar"}, function(args, done){
//         done(null, {colorxyz: options.color});
//     });
// };

// load the plugin passing options 
seneca.use("ex2_my_plugin");

// seneca.act({role: "texts", cmd: "read", ids: [{id: 100}, {id: 103}]  }, function(err, result){
//     console.log(result);
// });

// seneca.act({role: "dummy"}, function(err, result){
//     console.log(result);
// });

var actAsync = Promise.promisify(seneca.act, {context: seneca});
actAsync({role: "dummy"})
    .then(function(value){
        console.log("xxxx", value);
    })
    .catch(function(err){
        console.log("err: ", err.message);
    });

// seneca.act({role: "texts", cmd: "read", ids: [{id: 102}, {id: 103}] }, function(err, result){
//     console.log(result);
// });

// seneca.act({role: "texts", cmd: "update", ids: [{id: 102}] }, function(err, result){
//     console.log(result);
// });

//"ids": [{id: 100, id: 102}]
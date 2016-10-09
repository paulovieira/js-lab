// catch handler 

var Promise = require('bluebird');
var taskAsync = require("./async-task").taskAsync;
var taskAsyncWithError = require("./async-task").taskAsyncWithError;


var p = Promise.resolve();

p
.then(function(){
    //JSON.parse(' {"x":"y"  ');
    return taskAsyncWithError(1000, 'dummy');
})
.catch(SyntaxError, function(err){

    console.log("err.message (syntax): ", err.message);
})
.catch(function(err){

    console.log("err.message: ", err.message);
})

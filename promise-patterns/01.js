// dynamic sequence of promises

var Promise = require('bluebird');
var taskAsync = require("./async-task").taskAsync;

var p = Promise.resolve();

var values = ["a", "b", "c"];
var concat_value = "";

values.forEach(function(value){

    p = p.then(function(v){

        if(v){
            concat_value = concat_value + "_" + v;
        }

        return taskAsync(1000, value);
    });
});

p.then(function(v){

    concat_value = concat_value + "_" + v;
    console.log("concat_value: ", concat_value)
});

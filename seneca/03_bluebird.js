var Promise = require("bluebird"); 

var readFile = Promise.promisify(require("fs").readFile);




readFile("package.json", "utf8").then(function(contents) {
    return JSON.parse(contents);
}).then(function(obj) {
    console.log("Parsed JSON: ", obj);
}).catch(SyntaxError, function(e) {
    console.log("error parsing json", e);
//Catch any other error
}).catch(function(e) {
    console.log("Error reading file", e);
});


function asyncTask(foo, bar, cb){
    setTimeout(function(){
        // do async processing
        var err = null;
        if(err){
            cb(err);
        }else{
            var result = foo + " and " + bar + " was processed";
            var result2 = foo + " and " + bar + " was processed again";

            cb(null, result, result2);

        }
        
    }, 500);
}

// asyncTask("xyz", function(err, value){
//     console.log(value);
// });

var asyncTaskPromise = Promise.promisify(asyncTask);

asyncTaskPromise("xyz", "abc")
    // .then(function(value){
    //     console.log(value);
    // })
    .spread(function(value1, value2){
        console.log(value1);
        console.log(value2);
    })
    .catch(function(err){
        console.log(err.message);
    });

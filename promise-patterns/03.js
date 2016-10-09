// explicitely name the promises - this makes it clear the dependencies that each task has
// https://medium.com/@isntitvacant/observations-on-promises-2b08a0d0c27#.oknw4lhzr

var Promise = require('bluebird');

var taskAsync = require("./async-task").taskAsync;
var taskAsyncWithError = require("./async-task").taskAsyncWithError;



var p1 = taskAsync(1000, "a");
var p2 = taskAsync(2000, "b");


// the next task depends on p1 being successfully completed
var p3 = p1.then(function(v){
    //JSON.parse(' {"x":"y"  ');
    return taskAsync(5500, "c");
});

// the next task depends on p2 and p3 (and implicitely on p1, since p3 depended on p1)
// in this case we can use Promise.join along with the handler to be executed when p2
// and p3 have suceeded
// we can look at Promise.join as a general form of ".then"; example
//  (p2,p3).then(function(){ ... })

var p4 = Promise.join(p2, p3, function(v2, v3){

    return taskAsyncWithError(2000, "d");
});

var p5 = p4.catch(function(err){

    console.log("err.message: ", err.message);
});

 // what's the point of creating explicit references to the promises
 // returned by .then ? it allows to explicitely see dependencies that each task has
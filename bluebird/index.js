var Promise = require("bluebird");


function taskA(cb){

    console.log("taskA started...")
    setTimeout(function(){

        var value = Date.now();
        //if(value % 2 !== 0 && false){
        if(true){
            console.log("   taskA failed")
            return cb(new Error("taskA failed with value " + value));
        }

        console.log("   taskA succeeded")
        return cb(undefined, "A");

    }, 1000);
};


function taskB(arg1, cb){

    console.log("taskB started (using " + arg1 + ")...")
    setTimeout(function(){

        var value = Date.now();
        if(value % 2 !== 0 && false){
            console.log("   taskB failed")
            return cb(new Error("taskB failed with value " + value));
        }

        console.log("   taskB succeeded")
        return cb(undefined, arg1 + "B");

    }, 1000);
};


function taskC(arg1, arg2, cb){

    console.log("taskC started (using " + arg1 + ", " + arg2 + ")...")
    setTimeout(function(){

        var value = Date.now();
        if(value % 2 !== 0 && false){
            console.log("   taskC failed")
            return cb(new Error("taskC failed with value " + value));
        }

        console.log("   taskC succeeded")
        return cb(undefined, "" + arg1 + arg2 +  "C");

    }, 3300);
};


function taskD(arg1, cb){

    console.log("taskD started (using " + arg1 + ")...")
    setTimeout(function(){

        var value = Date.now();
        if(value % 2 !== 0 && false){
            console.log("   taskD failed")
            return cb(new Error("taskD failed with value " + value));
        }

        console.log("   taskD succeeded")
        return cb(undefined, arg1 + "D");

    }, 1500);
};

// taskA: no dependencies
var taskAAsync = Promise.join()
    .spread(function(){

        return Promise.promisify(taskA)()
    })
    .catch(function(err){

        console.log("xxx: ", err.message);
        return new Promise(function(resolve, reject){

            setTimeout(function(){
                console.log("task a succeeded in the catch block")
                resolve("uuu ");
            }, 1000)
        });
    });

// taskB: depends on taskA 
// (when taskA is completed we return *a promise for taskB* - it will start taskB, but we don't know when it will be completed; however, when it is completed, that promise will be resolved)
var taskBAsync = Promise.join(taskAAsync)
    .spread(function(valueFromTaskA){

        return Promise.promisify(taskB)(valueFromTaskA);
    });

// taskC: depends on taskA and taskB 
// (when both of those tasks are completed we return a *promise for taskC*, ...)
var taskCAsync = Promise.join(taskAAsync, taskBAsync)
    .spread(function(valueFromTaskA, valueFromTaskB){

        return Promise.promisify(taskC)(valueFromTaskA, valueFromTaskB);
    });


// taskD: depends on taskB 
var taskDAsync = Promise.join(taskBAsync)
    .spread(function(valueFromTaskB){

        return Promise.promisify(taskD)(valueFromTaskB);
    });

var finalPromise = Promise.join(taskCAsync, taskDAsync)
    .spread(function(resultC, resultD){

        console.log("final result: ", resultC, resultD);
    })
    .catch(function(err){

        console.log("ERROR: ", err.message);
    });


// function taskB(arg1, cb){

//     setTimeout(function(){

//         var value = "taskB completed";
//         console.log(value)
//         cb(undefined, value);
//     }, 200);

// }

// function taskC(arg1, cb){

//     setTimeout(function(){

//         var value = "taskC completed";
//         console.log(value)
//         cb(undefined, value);
//     }, 700);

// }

// //Promise.promisify(taskA)

// function getTaskA(){

//     return new Promise(function(resolve, reject){

//         setTimeout(function(){

//             console.log("task a completed")
//             resolve("task a: success");
//         }, 1000);
//     })
// };

// function getTaskB(previousValue){

//     return new Promise(function(resolve, reject){

//         setTimeout(function(){

//             console.log("task b completed; the value of the previous task was: ", previousValue)
//             resolve("task b: success");
//             //reject(new Error("xyz"));
//         }, 200);
//     })
// };

// function getTaskC(previousValue1, previousValue2){

//     return new Promise(function(resolve, reject){

//         setTimeout(function(){

//             console.log("task c completed; the value of the previous task was: ", previousValue1, previousValue2)
//             resolve("task c: success");
//         }, 500);
//     })
// };


// function getTaskZ(previousValue1, previousValue2, previousValue3){

//     return new Promise(function(resolve, reject){

//         setTimeout(function(){

//             console.log("task z completed; the value of the previous task was: ", previousValue1, previousValue2, previousValue3)
//             resolve("task z: success");
//         }, 1000);
//     })
// };




// var pa = getTaskA();

// var pb = pa.then(getTaskB);

// var pc = Promise.join(pa, pb, getTaskC);

// var pz = Promise.join(pa, pb, pc, getTaskZ)


// pz
// .catch(function(err){

//     console.log("ERR: ", err.message);
// });
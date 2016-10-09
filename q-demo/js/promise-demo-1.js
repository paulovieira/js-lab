// NOTE: check the promise-demo-2 example instead, it is more complete

function async1(delay) {

    var deferred = Q.defer();
    setTimeout(function() {
        var value = "async one";
debugger;
        if (Date.now() > 0) {
            deferred.resolve(value);
            return;
        } else {
            deferred.reject(new Error("error at async 1"));
            return;
        }
    }, delay);

	
	var p1 = deferred.promise;
	p1.a_p1 = "p1"; 
    return p1;
}

function async2(delay) {

    var deferred = Q.defer();
    setTimeout(function() {
        var value = "async two";
//debugger;
        if (Date.now() < 0) {
            deferred.resolve(value);
            return;
        } else {
            deferred.reject(new Error("error at async 2"));
            return;
        }
    }, delay);

    return deferred.promise;
}

var p;

p = async1(500)
.then(
    function(value) {
//debugger;
        console.log(value);
        var p2 = async2(800);
        return p2;
    }
)
// .done(
//     function(value){
//         console.log(value);
//         return value;
//     },
//     function(err) {
// //debugger;
//         console.log("catch: ", err);
//         throw err;
//     }
// );
.catch(
    function(err) {
//debugger;
        console.log("catch: ", err);
        throw err;
    }
);


// catch if sugar for .then(undefined, rejectCb); so it will return a promise; this means that the error will never be caught by the program

// on the other hand, .done(undefined, rejectCb) will throw the error received in the rejectCb (if that is the case); done always returns undefined (that why it should be used to terminate the chain)



// setInterval(function(){
//     console.log(p.inspect());
// }, 500)
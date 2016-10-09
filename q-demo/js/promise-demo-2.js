function async1(delay) {

    var deferred = Q.defer();

    console.log("executing async1 (will do something async...)");
    setTimeout(function() {
        console.log("       something async was done in async1");
        var value = "async one";
        if (Date.now() > 0) {
            deferred.resolve(value);
            return;
        } else {
            deferred.reject(new Error("error at async 1"));
            return;
        }
    }, delay);
	
	return deferred.promise;
}

function async2(delay) {

    var deferred = Q.defer();

    console.log("executing async2 (will do something async...)");
    setTimeout(function() {
        console.log("       something async was done in async2");
        var value = "async two";
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
            // this callback will be executed if the promise returned from async1 becomes 
            // resolved successfully
            console.log("@then success handler; value is: ", value);
            var p2 = async2(800);
            return p2;
        }
    )
    .finally(function(){
        // this cb will always be executed, no matter what happens in async1 and async2
        console.log("@finally (will do something async...)");

        var deferred = Q.defer();

        setTimeout(function() {
            console.log("       something async was done in finally");
            var value = "async finally";

            if (Date.now() > 0) {
                deferred.resolve(value);
                return;
            } else {
                deferred.reject(new Error("error at async finally"));
                return;
            }
        }, 2000);


        return deferred.promise;
    })
    .done(
        // this callback will be executed if the promise returned from async2 becomes 
        // resolved successfully
        function(value){
            console.log("@done success handler; value is:", value);
        },

        // this callback will be executed if any of the previous promises (returned frmo async1 or async2)
        // becomes rejected
        function(err) {
            console.log("@done, rejection handler: ", err);
            throw err;
        }
    );


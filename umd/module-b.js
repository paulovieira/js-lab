/*** begin of the user defined cjs module */
console.log("this is module B");

var internals = {};

internals.sum = function(x,y){

    return x + y;
};


module.exports.sum = internals.sum;

/*** end of the cjs module */
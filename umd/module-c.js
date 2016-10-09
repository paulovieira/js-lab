/*** begin of the user defined module (not cjs) */
console.log("this is module B");

var internals = {};

internals.sum = function(x,y){

    return x + y;
};

return internals.sum;

/*** end of the module */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.moduleC = f()}})(function(){var define,module,exports;
/*** begin of the user defined module (not cjs) */
console.log("this is module B");

var internals = {};

internals.sum = function(x,y){

    return x + y;
};

return internals.sum;

/*** end of the module */
});
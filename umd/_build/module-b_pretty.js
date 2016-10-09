(function(f) {
 
    if (typeof exports === "object" && typeof module !== "undefined") { 
        module.exports = f() 
    } 
    else if (typeof define === "function" && define.amd) { 
        define([], f) 
    } 
    else {
        var g;
        if (typeof window !== "undefined") { 
            g = window 
        } 
        else if (typeof global !== "undefined") { 
            g = global 
        } 
        else if (typeof self !== "undefined") { 
            g = self 
        } 
        else { 
            g = this 
        }
        
        g.moduleB = f() 
    } 
})

(


function() {
    var define, module, exports;
    module = { exports: (exports = {}) };


    /*** begin of the user defined cjs module */
    console.log("this is module B");

    var internals = {};

    internals.sum = function(x, y) {

        return x + y;
    };


    module.exports.sum = internals.sum;

    /*** end of the cjs module */


    return module.exports;
});

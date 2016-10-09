var _ = require("underscore");

var internals = {};

internals.getClassesReal = function(options){

    var classes = [];
    var iLen = (options.max - options.min) / options.numClasses;
    var toFixed = options.toFixed;

    var left, right;
    for(var k=0; k<options.numClasses; k++){

        left  = options.min +     k*iLen;
        right = options.min + (k+1)*iLen;
        if(toFixed > 0){
            left  =  left.toFixed(toFixed);
            right = right.toFixed(toFixed);
        }

        classes.push([left, right]);
    }

    return classes;
};

internals.getClassesInt = function(options){

    var classes = [];

    // shift to value to 1 - ... (example: instead of 11 - 18, we work with 1 - 8)
    var max = options.max - (options.min - 1);

    if(options.numClasses > max){
        throw new Error("numClasses must be <= " + max);
    }

    var iLen = Math.floor(max/options.numClasses);
    var remainder = max % options.numClasses;
    var k, j;

    // basic intervals (assume there is no remainder)
    for(k=0; k<options.numClasses; k++){
        classes.push([k*iLen + 1, (k+1)*iLen])
    }

    // correct the intervals according to the remainder
    if(remainder){

        for(j=0; j<options.numClasses; j++){
            if(j<remainder){
                classes[j][1] = classes[j][1] + (j + 1);
            }
            else{
                classes[j][1] = classes[j][0] + (iLen - 1);
             }

            if(j<options.numClasses-1){
                classes[j+1][0] = classes[j][1] + 1;
            }
        }
    }

    // shift back to the original
    for(j=0; j<options.numClasses; j++){
        classes[j][0] = classes[j][0] + options.min - 1;
        classes[j][1] = classes[j][1] + options.min - 1;
    }

    return classes;
};

module.exports = function(options){

    _.defaults(options || (options = {}), {
        mode: "real",
        min: 0,
        max: 100,
        numClasses: 4,
        toFixed: undefined
    });

    if(options.max < options.min){
        throw new Error("max should be >= min");
    }

    if(options.numClasses < 2){
        throw new Error("numClasses should be >= 2");   
    }


    return options.mode === "real" ? internals.getClassesReal(options) : internals.getClassesInt(options);
};

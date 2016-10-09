'use strict';

var LibA = require('lib-a');
var LibB = require('lib-b');

module.exports.getInfo = function(){

    var info = {
        'lib-a': LibA.info(),
        'lib-b': LibB.info()            
    };

    return info;
};

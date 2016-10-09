var Promise = require('bluebird');
var Chalk = require('chalk');

global.id = 0;

function taskAsync(delay, value){

    global.id++;
    var taskId = global.id;

    console.log(`will start task #${ taskId } (will finish in: ${ delay } ms)`)

    return Promise
        .delay(delay)
        .then(function(){

            console.log(Chalk.green(`task #${ taskId } succeeded (return value: ${ value })`))
            return value;
        });
}

function taskAsyncWithError(delay, msg){

    global.id++;
    var taskId = global.id;

    console.log(`will start task #${ taskId } (will finish in: ${ delay } ms)`)

    return Promise
        .delay(delay)
        .then(function(){

            console.log(Chalk.red(`task #${ taskId } failed (error message: ${ msg })`))
            throw new Error(msg);
        });
}

module.exports.taskAsync = taskAsync;
module.exports.taskAsyncWithError = taskAsyncWithError;
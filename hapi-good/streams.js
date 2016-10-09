'use strict';

const Fs = require('fs');
const LogRotate = require('rotating-file-stream');

let input = Fs.createReadStream('...');
//let output = Fs.createWriteStream('xyz');
let output = new LogRotate('xyz', { size: '1000B',  })

input.pipe(output);

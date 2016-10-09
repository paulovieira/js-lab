var Promise = require('bluebird');
var CsvStringify = Promise.promisify(require("csv-stringify"));

var input = [["a", "b"], [1,2]]
input = [
{
    a: "xyz",
    b: 123,
    c: "zzz"
},
{
    a: "zxc",
//    b: 456
    c: {c1: "yyy", c2: "uuu"}
}
]

CsvStringify(input, {header: true})
    .then(function(out){
        console.log(out)
    })
    .catch(function(err){
        console.log(err.message)
    })

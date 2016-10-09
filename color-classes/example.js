var legendClasses = require("./index")

console.log(legendClasses({
    mode: "int",
    min: 1,
    max: 13,
    numClasses: 4
}));

console.log(legendClasses({
    mode: "real",
    min: 11.1234,
    max: 22.9876,
    numClasses: 4,
    toFixed: 3
}));

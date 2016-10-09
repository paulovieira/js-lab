var _ = require("underscore");

debugger;
/*
var t = _.template(`
    <% for(var i=0, l=collection.length; i<l; i++){ 
        <div>hello <%= collection[i].thing %></div>
    <% } 
`)

var data = { collection: [{ thing: "world"}, { thing: "day"}] }
debugger;
var html = t(data)
console.log(html)
*/
// var data = { thing: "day"}
// var html = t(data)
// console.log(html)


var t = _.template("<div>hello <%= xyz %></div> <div>hello2 <%= abcd %></div>")

var data = { xyz: 123 }
debugger;
var html = t(data)
console.log(html)

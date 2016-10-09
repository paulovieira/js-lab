// require hogan
var hogan = require("hogan.js");

// construct template string
var tplString = "Hello {{ subject }}!" + 
"" + 
"{{#texts}}" + 
"    {{ contents }}" + 
"    {{#authors2}}" +
"        {{name}}" +
"    {{/authors2}}" +
"{{/texts}}" + 
"{{#arr}}" +
"   {{author}}" +
"{{/arr}}" +
"";

// compile template
var tplObj = hogan.compile(tplString);

var data = {
  subject: "monde!",
  texts: [
    { id: 1, contents: "1 contents", authors: ["a", "b", "c"], authors2: [{name: "a"}, {name: "b"}] },
    { id: 2, contents: "2 more contents", authors: ["d", "e", "f"] }
  ],
  arr: ["a", "b", "c"]
};

var output = tplObj.render(data);
console.log(output);
// prints "Follow @dhg."
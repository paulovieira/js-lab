var Nunjucks = require('nunjucks');

var s = `
<html>
<div>
hello {{ name }}
</html>
`;

var s2 = `
<span>
{{ g1 }} {{ name2 }}
{{ name2 | shorten(3) }}
{{ 'abcdefg' | shorten(3) }}
</span>
`;

debugger;

//window.nunjucksPrecompiled = {}
// the WebLoader is available if in the browser
var env = new Nunjucks.Environment([], {
});


env.addFilter('shorten', function(str, count) {
    return str.slice(0, count || 3);
});

env.addGlobal('g1', 'hello')

debugger;
var t1 = Nunjucks.compile(s, env, null, true)
var x1 = t1.render({ name: '1xyz' })
var y1 = t1.render({ name: '1abc' })

var t2 = Nunjucks.compile(s2, env, null, true)
var x2 = t2.render({ name2: '2xyz' })
var y2 = t2.render({ name2: '2abc' })


/*
//console.log(Object.keys(t1))
console.log(t1.compiled)
var t2 = Nunjucks.precompileString(s, { name: 'my-template'})
console.log(typeof t2)
console.log(t2)
//require('my-loader?x=aaa!' + __filename)
//require('my-loader?x=aaa!./my-template.html');
*/
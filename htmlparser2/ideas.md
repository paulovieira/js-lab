Template.configure({
    // reference to the incremental dom library
    idom: require("incremental-dom")
})


sweet spot between using the raw js api to create the render function, and using abstractions for adding logic to a new template language (loops, conditionals, etc - might as well use pure js)

delta 


var input = `
<div class={{ status }}>
    hello {{ name }}
</div>


var context = {
    status: "active",
    name: "paulo"
}

with a string based template engine it is usually a 3-step procedure

```js
// 1) compile the input template (written with Handlebars syntax) into a template function:
var t = handlebars.compile(input);

// 2) call the template with some context object to get the output string (the final html string)
var s = t(context)

// 3) update the DOM; the whole innerHtml of the #xyz element will be replaced, even if we are just changing a little part of it;
$("#xyz").html(s);
```

using incremental dom it is a 2-step procedure
```js
// 1) compile the input template (written with Delta syntax) into an idom renderer function
var renderer = delta.compile(input);

// 2) update the DOM using idom's patch function
IncrementalDOM.patch($("#xyz")[0], renderer, context)
```

The fundamental advantage using IncrementalDOM is that it will only change the elements that actually have to be changed

--


send the output to the process.stdout.write stream instead of console.log everything

when there are errors, try to give the line number in the template

remove dependencias (extract methods from underscore string and underscore)

-document: what if we want to ouput the text ":" ?

delta options:
    -escape html
    -user define the delemiters of the regexp
    -name of the function produced 
    -define the symbol that indicates js code (default is ":")


- when used as module:
    + input is given as a string
    + output is given as a string (the definition of the function) or as a function (the function itself, created with "new Function(arg1, ... argN, source);" )
    + 
-can be used as a stand-alone command-line utility or as a module
    -as a command line utility: 
        input is given either by a command-line argument (path to the file with the input); if not given, stdin is used
        output is similar: if the command line argument with the output file is not given, send the output to stdout; 
    -as a module:
        input is given as a string passed as the 1st argument to Delta.compile
        output is a string returned from Delta.compile (equivalent to stdout); if the options object has the "output" key, then it will save to a file

        if input is null and the options object has the "input" key, it will read from file

example usage:


var input = "...";

```js
var renderer = Delta.compile(input)
// returns the renderer function
// if we want the source code, call renderer.toString()
```


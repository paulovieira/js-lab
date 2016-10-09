use Nunjucks.render, so templates are compiled once (the first time they are used) and are cached.



what do we mean by "asyncrounous templates"

there are 2 "phases" when using a template library:

1) the compilation phase 

var myCompiledTemplate = myLib.compile("path/to/file.html", {});


2) the execution phase

var ctx = { "name": "john" };
var output = myCompiledTemplate(ctx, {});


What is asyncrounous? Obviously, the execution phase could be asyncrounous (for instance, make a db call to fetch data that will used in the output). What about the compilation phase?



advantages of using this module instead of the implementation given in the examples of the vision module:
1) garantee against future changes in nunjucks api
2) stack traces show the exact point in the template (example: if an error is thrown in a filter, the stack trace will show the template file, line and number); this is free because we are using Nunjucks.render instead of Nunjucks.compile
3) can add custom filters or extensions using the Env object returned from ".configure"
4) asyncronous api
4) pathnames are relative among includes and macros; example: if use Nunjucks.configure("tpl/xyz"), and we have a directory tpl/xyz/includes, then we should use includes using tpl/xyz as the root dir:

{% include " includes/my-inc.html" %}

We must make sure the option "path" given to server.views is the same as the first argument to Nunjucks.compile


todo: the compilation shold be done with a try catcj block, to throw an error when the template is malformed
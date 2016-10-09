var Delta = require("./index");

/*
var inputTemplate = `
<div class="xxx { foo.bar ? 'yyy' : 'zzz' }" >abc</div>

var x = require("xyz")

{" abc "}
<text>abc</text>
if(condition){ 
    <div id="x">
        <text>hello world</text>
        if(x(somethingElse)){
            <ul><li>abc</li></ul>
        }
        else{
            <ol><li>xyz</li></ol>
        }
    </div>
} 
else{
    <span>olá mundo</span> 
}
`;

var inputTemplate = `
: var x = 1;
: if(ctx.condition){
    xyz
    <div class="xxx" >
        abc
    </div>    
: } 
: // comment
: else {
    zyx
    <span class="yyy">
        xyz
    </span>
: } 
`;
*/
var inputTemplate = `
@param data

<!-- arbitrary javascript to be injected at the beggining of the template -->
<script>
  var _s = require("underscore.string");

  var helpers = {};

  helpers.add = function(a, b){
    return a+b;
  };

</script>


xyz
: collection.forEach(function(obj){

    <div>
:   if(condition){
        aaaaaaaaaaaaaaaaaa
        bbb
  

        <span class="xxx" >
 
 :           // store the spans text in a temporary variable...
:           var message = ctx.xyz && obj.abc ? "hello" : "goodbye";
            abc {{ message }}   pp

:           // or use logic directly inside the interpolation tokens (pure javascript)
            abc {{ ctx.xyz &&           obj.abc ? "hello" : "goodbye" }} {{ ctx.yyy }} ii 






        </span>    
        <div skip>
            <!-- we cannot have children here, but a comment is ok -->






        </div>
:   } 

    </div>    
: })

    <input type="text">


`;

Delta.compile(inputTemplate);

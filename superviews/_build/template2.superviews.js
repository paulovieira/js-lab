(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.template2_superviews_html = f()}})(function(){var define,module,exports;module={exports:(exports={})};

// var IncrementalDOM = require("incremental-dom");
var IncrementalDOM = window.IncrementalDOM;

var elementOpen = IncrementalDOM.elementOpen;
var elementClose = IncrementalDOM.elementClose;
var elementPlaceholder = IncrementalDOM.elementPlaceholder;
var text = IncrementalDOM.text;
var skip = IncrementalDOM.skip;
        
module.exports = /* begin idom template */ (function () {


return function template2_superviews_html (ctx) {
debugger;

ctx.something = true;
elementOpen("div")
  text(" \
      hello world again \
      ")
  elementOpen("span")
    if (ctx.something) {
      skip()
    } else {
    }
  elementClose("span")
elementClose("div")
}
})()
/* end idom template */

return module.exports;});
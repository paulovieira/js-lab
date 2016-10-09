(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.template1_html = f()}})(function(){var define,module,exports;module={exports:(exports={})};

// var IncrementalDOM = require("incremental-dom");
var IncrementalDOM = window.IncrementalDOM;

var elementOpen = IncrementalDOM.elementOpen;
var elementClose = IncrementalDOM.elementClose;
var elementPlaceholder = IncrementalDOM.elementPlaceholder;
var text = IncrementalDOM.text;
var skip = IncrementalDOM.skip;
        
module.exports = /* begin idom template */ (function () {
var hoisted1 = ["style", "border: solid;", "data-id", "1"]

return function template1_html (ctx) {
elementOpen("div", null, hoisted1, "class", "xyz abc " + (ctx.myClass) + "")
  text(" \
      hello world! \
  ")
elementClose("div")
}
})()
/* end idom template */

return module.exports;});
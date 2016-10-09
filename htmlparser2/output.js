;
(function (data\ n\ n) {

  return function (ctx) {


    var _s = require("underscore.string");

    var helpers = {};

    helpers.add = function (a, b) {
      return a + b;
    };



    // end of prologue scripts
    text('\n\n\nxyz')
    collection.forEach(function (obj) {
      text('\n    ')
      elementOpen('div')
      if (condition) {
        text('        aaaaaaaaaaaaaaaaaa\n        bbb\n  \n\n        ')
        elementOpen('span')
        text('\n \n :           // store the spans text in a temporary variable...')
        var message = ctx.xyz && obj.abc ? "hello" : "goodbye";
        text('            abc ' + (message) + '   pp\n')
          // or use logic directly inside the interpolation tokens (pure javascript)
        text('            abc ' + (ctx.xyz && obj.abc ? "hello" : "goodbye") + ' ' + (ctx.yyy) + ' ii \n\n\n\n\n\n\n        ')
        elementClose('span')
        elementOpen('div')
        skip()
        elementClose('div')
      }
      text('\n    ')
      elementClose('div')
    })
    text('\n    ')
    elementOpen('input')
    elementClose('input')

  };
})()

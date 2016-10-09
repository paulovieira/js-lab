var Nunjucks = require("nunjucks");
var _ = require("underscore");

Nunjucks.configure('templates', {
    // lstripBlocks: true,
    // trimBlocks: true
    throwOnUndefined: true
});

var ctx = {
    temp: {
        key1: "abc",
        key2: "xyz"
    },


    users: [{
        name: "paulo",
        page: "x"
    },{
        name: "ana",
        page: "x"
    },{
        name: undefined
    }],

    keys: _.keys,
    findWhere: _.findWhere
}
var output = Nunjucks.render("my-template-1.html", ctx);

console.log(output)

console.log(_.findWhere(ctx.users, {name: "paulo"}))
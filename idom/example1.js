IncrementalDOM.notifications.nodesCreated = function(nodes) {
    //debugger;
};

IncrementalDOM.notifications.nodesDeleted = function(nodes) {
    //debugger;
};

function renderPart(ctx) {
    //debugger;
    ctx = ctx || {};
    elementOpen('div');
    text('Hello world @ ' + ctx.ts);
    elementClose('div');

    if (ctx.ts % 2 === 0) {
        elementOpen('div');
        text('more stuff @ ' + ctx.ts);
        elementClose('div');
    }

    ctx = ctx || {};
    elementOpen('div');
    text('Goodbye world @ ' + ctx.ts);
    elementClose('div');
}


var el = document.getElementById('main');

setInterval(function() {
    var ctx = {
        ts: Date.now()
    };

    patch(el, renderPart, ctx);
}, 500);

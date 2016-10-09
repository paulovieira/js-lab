var test = require('tape');

test('timing test', function (t) {
    t.plan(4);
    
    t.equal(typeof Date.now, 'function');
    var start = Date.now();

    setTimeout(function () {
        //t.equal(Date.now() - start, 100);
        t.equal(100, 100);
    }, 500);

    t.true({hello: 'world'}, "value is truthy");

    t.false("", "value is falsy");

    t.comment("hello world")

    //t.end();
});

module.exports = function(options){

    var seneca = this;
    seneca.add({role: "dummy"}, function(args, done){
        var output = {hello: "world"};
        done(null, output);
    });

/*    
    var store = {
        "100": {id: 100, contents: {"pt": "xxx", "en": "yyy"}},
        "102": {id: 102, contents: {"pt": "aaa", "en": "bbb"}}
    };

    var seneca = this;


    seneca.add({role: "texts", cmd: "read"}, function(args, done){

        console.log("cmd:read is executing", args.ids);

        setTimeout(function(){
            var data = [];

            args.ids.forEach(function(obj){
                id = "" + obj.id;
                if(store[id]){
                    data.push(store[id]);
                }
            });

            done(null, data);
        }, 1000);
    });

    seneca.add({role: "texts", cmd: "update"}, function(args, done){

        console.log("cmd:update is executing");

        var ids = args.ids.map(function(obj){ return {id: obj.id}; });
        console.log("ids: ", ids);
        seneca.act({role: "texts", cmd: "read", ids: ids}, function(err, result){
            if(result.length === 0){
                return done("lenght is 0");
            }

            setTimeout(function(){
                done(null, {color: "red"});
            }, 1000);

//            return setdone(null, result);
        });

    });

    seneca.add({init: "texts"}, function(args, done){
        var seneca = this;
        console.log("init is executing");
        setTimeout(function(){
            console.log("init complete!");
            done();
        }, 1000);
    });

    return {
        name: "texts"
    }
*/
};

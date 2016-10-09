var seneca = require("seneca")();

// add an action
seneca.add({generate: "id"}, function(args, done){

    var randomNumber = "" + Math.random();
    done(null, {
        id: randomNumber
    });
});

seneca.add({generate: "id", type: "prefix"}, function(args, done){

    var randomNumber = "" + args.prefix  + Math.random();
    done(null, {
        id: randomNumber
    });
});

seneca.add({role: "math", cmd: "sum"}, function(args, done){
    var sum = args.left + args.right;
    //return done("xyz");
    done(null, {total: sum});
});

seneca.act({role: "math", cmd: "sum", left: 1, right: 3}, function(err, result){
    if(err){
        console.log("the error is: ", err.msg);
    }
    else{
        console.log(result);
    }
});
//seneca.listen();
var seneca = require("seneca")();
var client = seneca.client();

client.act({generate: "id"}, function(err, result){
    console.log(result);
});

client.act({generate: "id", type: "prefix", prefix: "yyy"}, function(err, result){
    console.log(result);
});


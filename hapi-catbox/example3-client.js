
/* create table partition(id serial) 



When setting a value (in the `set` method), a new timer is created with `setTimeout`. The callback given to the timer simply calls `drop`. But this seems redundant because the `get` method in the Client class takes care of verifying if the expiry time has been reached:

https://github.com/hapijs/catbox/blob/master/lib/client.js#L88-94

I took a look at the implementation of some other clients (redis, mongodb, level) and none call `drop`. 
 
*/

var Catbox = require("catbox");

var Engine = function(opt){
    debugger;
    this._isReady = true;
    this._cache = {};
};

Engine.prototype.start = function(callback){
    //debugger;
    callback(null, 444)
}

Engine.prototype.stop = function(){
    debugger;
}

Engine.prototype.isReady = function(){
    debugger;
    return this._isReady;
}

Engine.prototype.validateSegmentName = function(segment){
    debugger;
    return true;
}

Engine.prototype.get = function(key, callback){
    
    debugger;
    var segment = this._cache[key.segment];
    if(!segment){
        return callback(null, null);
    }

    var data = segment[key.id];
    if(!data){
        callback(null, null);
    }

    callback(null, data);
}

Engine.prototype.set = function(key, value, ttl, callback){
    
    debugger;
    this._cache[key.segment] = this._cache[key.segment] || {}
    this._cache[key.segment][key.id] = { item: value, ttl: ttl, stored: Date.now() };

    return callback(null);
}

Engine.prototype.drop = function(key, callback){
    debugger;
}

var options = {
    partition: "pg-test", // database name
    something: 123
};

var pgClient = new Catbox.Client(Engine, options);

//debugger;
pgClient.start(function(err){
    //debugger;
});

var data = { now: "abc" + Date.now() };
pgClient.set({ id: "1", segment: "my-segment" }, data, 1000, function(err){
    debugger;
    if(err){
        throw err;
    }
});

setInterval(function(){



pgClient.get({ id: "1", segment: "my-segment" }, function(err, cached){
    debugger;
    if(err){
        throw err;
    }

    if(cached){
        console.log(cached)
    }
    else{
        console.log("no data")
    }
})

}, 200)
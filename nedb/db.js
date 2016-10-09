var NeDB = require("nedb");

var internals = {
    datastores: {}
};

internals.isPositiveInt = function(n){
    return (typeof n === "number") && (n % 1 === 0) && n > 0;
};

// when the database is loaded, set the next valid integer for an id (cannot be 0)
internals.setNextId = function(ds){

    ds.find({}, function(err, docs){

        if(err){ throw err; }

        var nextId;

        if(docs.length > 0){

            nextId = internals.isPositiveInt(docs[0]._id) ? docs[0]._id : 0;
            for(var i=1, l=docs.length; i<l; i++){
                if(internals.isPositiveInt(docs[i]._id) && docs[i]._id > nextId){
                    nextId = docs[i]._id;
                }
            }

            nextId = nextId + 1;
        }
        else{
            nextId = 1;
        }

        ds.nextId = nextId;
    });
};

// return the next id and increment (similar to postgres serial)
NeDB.prototype.getNextId = function(){

    return this.nextId++;
};


module.exports.init = function(){

    module.exports.users = new NeDB({
        filename: "rc.json",
        autoload: true,
        onload: function(err){

            if(err){ throw err; }
            internals.setNextId(module.exports.users);
        }
    });

    return this;
};

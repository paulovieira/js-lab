var Db = require("./db").init();

function demo(){

var user1 = {
    firstName: "Paulo",
    lastName: "Vieira",
    x: {
        x1: 123,
        x2: "abc"
    },
    dummy: undefined,
    dummy2: null,
    dummy4: "xxx"
};

var user2 = {
    _id: 2,
    firstName: "Ana",
    lastName: "Poças"
};

// var user3 = {
//     firstName: "João",
//     lastName: "Vieira"
// };

//user3._id = Db.users.getNextId();


// 1 insert docs

// if the doc to be inserted has the _id property, that will be the id in the database;
// if not, a random string will be generated (a 16-characters alphanumerical string); 
// nedb throws an error if the key already exists;

Db.users.insert([user1, user2], function(err, newDoc){
    //Db.users.insert([user3], function(err, newDoc){

    if(err){
        console.log(JSON.stringify(err));
        throw new Error(err.message);
    }
    console.log("inserted: \n", newDoc);
});


// 2. get / find

// Db.users.find({}, function(err, docs){

//     if(err){
//         throw err;
//     }

//     console.log("docs: ", docs);
// });


// 3. update: we use the $set modifier with the data to be merged (equivalent to _.extend)
//  - the keys of object given in $set can be a subset of the keys in the existing document;
// those properties will be merged in the db
//  - if there are new properties, they will be created in the db
//  - to remove a property we can give undefined as the value

// if we give an empty object in the query parameter (first parameter), the update will be applied
// to the first document (this also happens in find and remove)

// if the id doesn't match anything and if the "upsert" option is used, a new document will be created; we can also achieve this by using
// { _id: undefined} (a new id will then be created)


// Db.users.update(
//     {_id: 100},
//     { $set: {dummy3: "hello4"}}, 
//     {}, 
//     function(err, numReplaced){

//         if(err){ throw err; }
//         console.log("numReplaced:\n", numReplaced);
//     }
// );



// 4. remove

// Db.users.remove(
//     { _id: 10 }, 
//     {}, 
//     function(err, numRemoved){

//     if(err){ throw err; }
//     console.log("numRemoved:\n ", numRemoved)
//     }
// );


// NeDB's persistence uses an append-only format: all updates/deletes actually result in lines
// added at the end of the datafile, identifying the update/delete;
// the database is automatically compacted (i.e. put back in the one-line-per-document format) 
// everytime your application restarts; alternatively, use persistence.compactDatafile directly


Db.users.persistence.compactDatafile();


}

setTimeout(demo, 100);

var low = require('lowdb')
var db = low('db.json')

db('posts').push({ title: 'lowdb is awesome'});
db('posts2').push({ title: 'lowdb is awesome'});


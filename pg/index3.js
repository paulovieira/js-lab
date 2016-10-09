var pg = require('pg');

// 5433 is the post where pg 9.5 is running
var conString = "postgres://demo:demo@localhost:5432/150608";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.defaults.poolSize = 2;
pg.defaults.poolIdleTimeout = 5000;

var selectNow = function(){

  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * from users;', undefined, function(err, result) {

      //call `done()` to release the client back to the pool
      //done();
      setTimeout(done, 1000)

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows);

    });
  });

};

selectNow()
pg.end();

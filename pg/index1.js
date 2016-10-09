var pg = require('pg');
var conString = "postgres://demo:demo@localhost:5432/150608";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.defaults.poolSize = 2;
pg.defaults.poolIdleTimeout = 2000;

var selectNow = function(){

  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT version();', undefined, function(err, result) {

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


pg.end();

setTimeout(selectNow, 1000)
setTimeout(selectNow, 3001)
setTimeout(selectNow, 3002)
setTimeout(selectNow, 3003)

setInterval(function(){

  var pool = pg.pools.all[JSON.stringify(conString)];
  if(!pool){
    console.log("pool not found for the given connection string")
    return;
  }

  console.log("getPoolSize: ", pool.getPoolSize());
  console.log("getName: ", pool.getName());
  console.log("availableObjectsCount: ", pool.availableObjectsCount());
  console.log("waitingClientsCount: ", pool.waitingClientsCount());
  //console.log("getMaxPoolSize: ", pool.getMaxPoolSize());
  console.log("---------")

}, 250)
//selectNow();

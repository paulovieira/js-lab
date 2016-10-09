var pg = require('pg');
var conString = "postgres://demo:demo@localhost:5432/150608";

pg.defaults.poolIdleTimeout = 1000;

var showPoolInfo = function(pool){
  console.log('poolSize: %d, availableObjects: %d', pool.getPoolSize(), pool.availableObjectsCount()); 
};

pg.connect(function(err, client, done) {

  var pool = pg.pools.getOrCreate();
  
  // poolSize: 1, availableObjects: 0
  showPoolInfo(pool);

  done();

  // poolSize: 1, availableObjects: 1
  showPoolInfo(pool);

  setTimeout(function(){

    // when this function executes the client in the pool has been destroyed and removed from the pool

    // poolSize: 0, availableObjects: 0
    showPoolInfo(pool);
  }, 2000);

});


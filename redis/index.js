var redisClient = require('redis-connection')();
redisClient.set('hello', 'world');
redisClient.get('hello', function (err, value) {
  console.log('hello', value.toString());
});
# Hapi caching with catbox

https://github.com/hapijs/catbox

http://hapijs.com/tutorials/caching

## Introduction 

catbox is a multi-strategy key-value object store. It comes with extensions supporting caching strategies for:
  - memory cache
  - Redis, 
  - MongoDB, 
  - Memcached, 
  - Riak
  - Amazon S3
  - RethinkDB
    
NOTE: by default catbox does not include any of these external caching strategies. Each service must be manually installed via npm.

Catbox has two interfaces: Client and Policy.

## Client 
  - is a low-level cache abstraction, used to set/get key-value pairs
  - is initialized with one of the available adapters: Memory, Redis, mongoDB, Memcached, or Riak
  - hapi always initialize one default client with the memory adapter

## Client API

The Client object provides the following methods:
     + start(callback)
     + stop()
     + get(key, callback)
     + set(key, value, ttl, callback)
     + drop(key, callback)

The `key` argument in get, set and drop is a "cache key object". The following  properties are required:
    - segment
    - id

## Add a catbox client to the server

When creating the instance of the server, catbox clients can be added using the "cache property":

```javascript
    var myServer = new Hapi.Server({
        cache: [
            {
                name: 'mongoCache',
                engine: require('catbox-mongodb'),
                host: '127.0.0.1',
                partition: 'cache',
            },
            {
                name: 'redisCache',
                engine: require('catbox-redis'),
                host: '127.0.0.1',
                partition: 'cache'
           }
           // NOTE: no need to define a memory cache
        ]
    });
```


## Policy
 
  - is a high-level interface; it defines a global policy which is automatically applied to every storage action (so the interface provided by a policy can be used with any of the above strategies?)
  - we can create a new instance of a policy with the method `server.cache`:

```javascript
    var myCache = server.cache({ 
        // the name of one of the cache strategies configured above; if not given the default cache is used;
        cache: 'mongoCache', 

        // segment name, used to isolate cached items within the cache partition (in mongoDB adapters segment represents a collection, in redis it's an additional prefix along with the partition option)
        segment: 'countries', 

        // milliseconds since the item was saved in the cache
        expiresIn: 60 * 60 * 1000
    });
```

### Policy API

The Policy object provides the following methods:
  - get(id, callback)
  - set(id, value, ttl, callback)
  - drop(id, callback)
  - ttl(created)
  - rules(created)
  
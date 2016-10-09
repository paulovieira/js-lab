# HAPI GOOD - process monitoring for hapi applications

## Introduction

Good is a process monitor that listens for one or more of the below 'event types'. All of the events, except 'ops', map to a hapi event as follows

-------------------------------------------------------
| GOOD EVENT | HAPI EVENT                             |
-------------------------------------------------------
| log      | "log"                                  |
| request  | "request" (emitted via request.log()). |
| error    | "request-error"                        |
| response | "response" or "tail"                   |
| ops      | no event from hapi                     |
-------------------------------------------------------

## Logged Events

The events emmited by an Hapi server are:

  - 'log'x
  - 'start'
  - 'stop'
  - 'request'x
  - 'request-internal'
  - 'request-error'x
  - 'response'x
  - 'tail'x

More details: https://github.com/hapijs/hapi/blob/master/API.md#server-events

So server events not covered by Good are: start, stop and request-internal

## options

  - opsInterval: the interval in milliseconds to sample system and process performance metrics Default: 15 seconds.
  - responseEvent: the event type used to capture completed requests. Default: 'tail'. Options are 'response' or 'tail'
  - extensions:  an array of hapi event names to listen for and report via the good reporting mechanism. Should be events not covered above, that is, anythin except: "log", "request", "request-error", "response", "tail", "ops". NOTE:  This option will allow users to listen to internal events that are not meant for public consumption. These events can change with any changes to the hapi event system.
  - reporters: an array of instantiated objects that implement the good-reporter interface. Default: no reporters
  - filter:  used to remove potentially sensitive information (credit card numbers, social security numbers, etc.) 

## Reporter Interface

A good reporter interface needs:

  1) A constructor function with the  signature `function(events, config)`
  2) An init method with the signature `function init(readstream, emitter, callback)`

Example: 
```javascript
function MyReporter(events, config){
    if (!(this instanceof internals.MyReporter)) {
        return new MyReporter(events, options);
    }
    options = options || {};
}

MyReporter.prototype.init = function(readstream, emitter, callback){
    emitter.on("request", function(request, event){
        console.log("method: ", event.method)    
    })
}

var events = {
    "log": "*",
    "response": ["xyz, abc"]
};

var config = {

}

var myReporter = new MyReporter(events, config)
```

## Available reporters

Officially reporters (under the hapijs umbrella):

  - good-udp (write to remote endpoints, sends a request via Udp broadcasting with a JSON payload to the supplied endpoint)
  - good-file (write to the local file system)
  - good-http (write to remote endpoints, makes a "POST" request with a JSON payload to the supplied endpoint)
  - good-console

Community reporters (available from the hapijs community):

  - good-influxdb
  - good-loggly
  - good-winston
  - hapi-good-logstash


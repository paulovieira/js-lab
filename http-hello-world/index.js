var http = require('http');
var port = 7777;
var delay = 1000;

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    
    setTimeout(function(){
    	res.end('hello world! I am a service running in port ' + port);
    }, delay);

}).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + port);


var Dns = require('dns');

/*
Dns.lookupService('109.200.20.157', 80, function(err, hostname, service) {
	if(err){
		throw err;
	}

    console.log(hostname, service);
});
*/

Dns.lookup('google.com', {family: 4}, function(err, address, family) {
	if(err){
		throw err;
	}

    console.log(address);
});

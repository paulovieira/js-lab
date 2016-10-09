var Wreck = require('wreck');
var fs = require("fs");

Wreck.get("http://localhost:8888/api/Tileset/cirac_risk_algs_structure_3d1a14", function(err, resp, payload){
	if(err){
		throw err;
	}

	//console.log(payload);
	fs.writeFileSync("alges.json", payload);
});

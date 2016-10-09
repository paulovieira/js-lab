var Cp = require("child_process");
var program = require('commander');

program
  .option('--from-srid [from-srid]', 'SRID of the shapefile (default: 4326)', "4326")
  .option('--shape-path [shape-path]', 'path of the shapefile')
  .option('--encoding [encoding]', 'character encoding of the attribute columns (default: "UTF8")', "UTF8")
  .option('--db [db]', 'name of the database')
  .option('--schema [schema]', 'name of the schema (default: "geo")', "geo")
  .option('--table [table]', 'name of the table')
  .parse(process.argv);

//console.log(program)  



validateArgs(program);


var shapePath = "shapePath";
var tableName = "tableName";
var dbName = "dbName"

var shell = {};


if (program.fromSrid === "4326") {
    shell.shp2pgsql = `shp2pgsql -D -I -W "${ program.encoding }" -s 4326                 "${ program.shapePath }" ${ program.schema }.${ program.table }`;
} else {
    // psql --help: "reprojects from given SRID (cannot be used with -D)"
    shell.shp2pgsql = `shp2pgsql    -I -W "${ program.encoding }" -s ${ program.fromSrid }:4326 "${ program.shapePath }" ${ program.schema }.${ program.table }`;
}

shell.psql = `psql --dbname=${ program.db }`;

;

shell.checkIfSridIsAvailable = `psql --dbname=${ program.db } --tuples-only --command="
		
SELECT to_json(array_agg(t)) from (
	select count(*) from SPATIAL_REF_SYS where auth_srid = ${ program.fromSrid }
) t;

		";`;

shell.checkIfSridIsAvailable += 'echo $?;'
		


Cp.exec(shell.checkIfSridIsAvailable, function(err, stdout, stderr){

	if(err){
		throw err;
	}

    stdout = stdout.trim().split("\n").filter(removeEmptyLines);
    var exitStatus = stdout[stdout.length-1];
    //console.log(stdout)
	
    if(exitStatus==='0'){

		var countQuery = JSON.parse(stdout[0]).shift();
		if(countQuery.count>=1){

			Cp.exec("ls", function(err, stdout2, stderr){

				if(err){
					throw err;
				}

				// todo: repeat the logic here				
				console.log(stdout2)
			})
		}
		else{
			throw new Error("The SRID of the shapefile is not available in the database.")
		}
    }
	else{
		stderr = `${ stderr.trim() } (exit status: ${ exitStatus })`;
		throw new Error(stderr);
	}     
     
});

//console.log(shell.checkIfSridIsAvailable)


// Exec(shell.shp2pgsql + " | " + shell.psql, {maxBuffer: 1024 * 1}, function(err, stdout, stderr){

//     if(err){
//     	console.log("err:\n", err);
//         return
//     }

//     if(_s.include(stdout.toLowerCase(), "create index") && 
//         _s.include(stdout.toLowerCase(), "commit")){
//         return deferred.resolve();
//     }
//     else{
//         // TODO: stderr might be big (if the shape if also big)?
//         return deferred.reject(Boom.badImplementation("shp2pgsql error: " + stderr));
//     }

// });


function removeEmptyLines(s){

	return s !== '';
};

function validateArgs(program){

	if(!program.shapePath){
		console.log("shape path is missing"); process.exit(1);
	}
	if(!program.db){
		console.log("name of the database is missing"); process.exit(1);
	}
	if(!program.table){
		console.log("table name is missing"); process.exit(1);
	}
}








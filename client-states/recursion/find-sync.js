
var fs = require("fs");
var path = require("path")

function findSync(dir, pattern){

    var found = [];
    function _find(dir){

        var dirContents = fs.readdirSync(dir);
        var filePath, fileName, stats;
        for(var i=0, l=dirContents.length; i<l; i++){
            fileName = dirContents[i];
            filePath = path.join(dir, fileName);
            stats =  fs.statSync(filePath);

            if(stats.isDirectory()){
                _find(filePath);
            }
            if(pattern.test(fileName)){
                found.push(filePath)
            }
            
        }

        return;
    }

    // start 
    _find(dir);

    return found;
}

var results = findSync("./root", /fif*/);
console.log(results);


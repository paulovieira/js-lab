var ChildProcess = require('child_process');

var command = `sudo sh -c 'echo ${ new Date().toISOString() } >>  /etc/apt/sources.list.d/pgdg.list'\r`
ChildProcess.exec(command, function(err, stdout, stderr){

    if(err){
        throw err;
    }

    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
});

var pty = require('pty.js');

var term = pty.spawn('bash', [], {});

var password = 'password\r';

command = '';
command += `sleep 1\r`;
command += `sudo sh -c 'echo ${ new Date().toISOString() } >>  /etc/apt/sources.list.d/pgdg.list;'\r`;

term.write(command);
term.write(password);


setTimeout(function(){

    process.exit();
}, 2000);

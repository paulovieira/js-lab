var program = require('commander');

program
    .version("0.0.1")
    .option("-i, --input", "input raster file (or directory with raster files)" )
    .option("-o, --output", "output directory (will be created if it doesn't exist)" )
    .option("-r, --round <round_value> ", "round parameter (integer value, default is 3)", 3)
    .option("-p, --precision", "precision (number of decimal places to keep)")

program.on("--help", function(){

    console.log(`
Examples:

  $xyz -r 3
  $xyz -p 4
    `);
});

program.parse(process.argv);

module.exports = program;

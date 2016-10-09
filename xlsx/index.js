var XLSX = require('xlsx');
var workbook = XLSX.readFile('points.xlsx');
//console.log(workbook.SheetNames);





var firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
var cell = firstWorksheet["A2"];
//console.log(cell);





var obj = XLSX.utils.sheet_to_json(firstWorksheet);
console.log(obj);

/*
*/
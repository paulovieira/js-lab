/*
var myCanvas = document.getElementById("my-canvas");
var ctx = myCanvas.getContext("2d");

ctx.fillStyle = "#df2d2d";
ctx.fillRect(50, 50, 400, 250);



ctx.strokeStyle = "blue";
ctx.strokeRect(0, 0, 500, 100);
*/

var myCanvas = document.getElementById("my-canvas");
var ctx = myCanvas.getContext("2d");

for(var x = 0.5; x < 500; x+= 10){
	ctx.moveTo(x, 0);
	ctx.lineTo(x, 375);
}

for(var y = 0.5; y < 375; y+= 10){
	ctx.moveTo(0, y);
	ctx.lineTo(500, y);
}

ctx.strokeStyle = "#eee";
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, 40);
ctx.lineTo(240, 40);
ctx.moveTo(260, 40);
ctx.lineTo(500, 40);

ctx.strokeStyle = "#000";
ctx.stroke();

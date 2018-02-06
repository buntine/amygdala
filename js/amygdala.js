// Painter class
//// Has colors (2)
//// Runs in setInterval
//// Paints randomly on screen (length, width, speed, etc)

// Main
//// Set default colors
//// Setup N painters
//// Listen for keystroke (u and d)
////// Update color in each painter
//
//// After N minutes, fade out canvas
//// Or clear on given keystroke
//
//// If no input after N seconds, randomize colors

var canvas = document.getElementById("amygdala");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.beginPath();
ctx.moveTo(50,20);
ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
ctx.stroke();

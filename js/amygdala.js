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

const MAXIMUM_WAIT_TIME = 500;

var canvas = document.getElementById("amygdala");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Stroke(x, y, length, color) {
  this.x = x;
  this.y = y;
  this.offset = 0;
  this.color = color;
  this.length = length;
}

function Painter(x, y, hiColor, loColor) {
  this.x = x;
  this.y = y;
  this.hiColor = hiColor;
  this.loColor = loColor;
  this.strokes = [];
}

Painter.prototype.reset = () => {
  this.strokes = [];
};

Painter.prototype.scheduleStroke = () => {
  setTimeout(this.createStroke, random(MAX_WAIT_TIME));
};

ctx.beginPath();
ctx.moveTo(50,20);
ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
ctx.stroke();

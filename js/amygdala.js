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

const MAX_WAIT_TIME = 500;
const MAX_HEIGHT = 300;
const MIN_HEIGHT = 70;
const MAX_STROKE_WIDTH = 800;
const MIN_STROKE_WIDTH = 300;
const STROKE_VARIANCE = 40;

var canvas = document.getElementById("amygdala");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function random(max, min = 0) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

function Stroke(x, y, length, color) {
  this.x = x;
  this.y = y;
  this.offset = 0;
  this.length = length;
  this.color = color;
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

Painter.prototype.setHiColor = (color) => {
  this.hiColor = color;
}

Painter.prototype.setLoColor = (color) => {
  this.loColor = color;
}

Painter.prototype.scheduleStroke = () => {
  setTimeout(this.createStroke, random(MAX_WAIT_TIME));
};

Painter.prototype.createStroke = () => {
  const height = random(MAX_HEIGHT, MIN_HEIGHT);
  const length = random(MAX_STROKE_WIDTH, MIN_STROKE_WIDTH);

  for (const i = 0; i < height; i++) {
    const length = random(length, length - STROKE_VARIANCE);

    this.strokes.push(new Stroke(this.x, this.y + i, length, "lerpColor between hiColor and loColor"));
  }
};


ctx.beginPath();
ctx.moveTo(50,20);
ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
ctx.stroke();

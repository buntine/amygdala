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
const LENGTH_PER_STROKE = 5;

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

Stroke.prototype.update() {
  const nextOffset = this.offset + LENGTH_PER_FRAME;

  ctx.beginPath();
  ctx.moveTo(this.x + this.offset, this.y);
  ctx.lineTo(this.x + nextOffset, this.y);
  ctx.stroke();

  this.offset = nextOffset;

  return this.isFinished();
}

Stroke.prototype.isFinished() {
  return this.offset > this.length;
}

function Painter(hiColor, loColor) {
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
  const x = random(window.innerWidth - length)
  const y = random(window.innerHeight - height)

  for (const i = 0; i < height; i++) {
    const strokeLength = random(length, length - STROKE_VARIANCE);

    this.strokes.push(new Stroke(x, y + i, strokeLength, "lerpColor between hiColor and loColor"));
  }
};

Painter.prototype.update = () => {
  if (this.strokes.length > 0) {
    const remaining = this.strokes.map(s => s.update());

    if (remaining.every(r => !!r)) {
      this.reset();
      this.scheduleStroke();
    }
  }
}

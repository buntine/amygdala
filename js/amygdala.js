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
const MIN_SPEED = 3;
const MAX_SPEED = 8;

const canvas = document.getElementById("amygdala");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const random = function(max, min = 0) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

class Stroke {
  constructor(x, y, length, color) {
    this.x = x;
    this.y = y;
    this.offset = 0;
    this.length = length;
    this.color = color;
  }

  update() {
    const nextOffset = this.offset + random(MAX_SPEED, MIN_SPEED);

    ctx.beginPath();
    ctx.moveTo(this.x + this.offset, this.y);
    ctx.lineTo(this.x + nextOffset, this.y);
    ctx.stroke();

    this.offset = nextOffset;

    return this.isFinished();
  }

  isFinished() {
    return this.offset > this.length;
  }
}

class Painter {
  constructor(hiColor, loColor) {
    this.hiColor = hiColor;
    this.loColor = loColor;
    this.strokes = [];
  }

  reset() {
    this.strokes = [];
  }

  setHiColor(color) {
    this.hiColor = color;
  }

  setLoColor(color) {
    this.loColor = color;
  }

  scheduleStroke() {
    //    setTimeout(() => this.createStroke(), random(MAX_WAIT_TIME));
    this.createStroke();
  }

  createStroke() {
    const height = random(MAX_HEIGHT, MIN_HEIGHT);
    const length = random(MAX_STROKE_WIDTH, MIN_STROKE_WIDTH);
    const x = random(window.innerWidth - length)
    const y = random(window.innerHeight - height)

    for (let i = 0; i < height; i++) {
      const strokeLength = random(length, length - STROKE_VARIANCE);

      this.strokes.push(new Stroke(x, y + i, strokeLength, "lerpColor between hiColor and loColor"));
    }
  }

  update() {
    if (this.strokes.length > 0) {
      const remaining = this.strokes.map(s => s.update());

      if (remaining.every(r => !!r)) {
        this.reset();
        this.scheduleStroke();
      }
    } else {
      console.log("stroke");
      this.scheduleStroke();
    }
  }
}

const p = new Painter("111111", "ffbb93");

function main() {
  p.update();
  
  requestAnimationFrame(main);
}

main();

const MAX_WAIT_TIME = 500;
const MAX_HEIGHT = 300;
const MIN_HEIGHT = 70;
const MAX_STROKE_WIDTH = 800;
const MIN_STROKE_WIDTH = 300;
const STROKE_VARIANCE = 40;
const MIN_SPEED = 7;
const MAX_SPEED = 12;

const canvas = document.getElementById("amygdala");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const random = function(max, min = 0) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

class Stroke {
  constructor(x, y, length, tilt, color) {
    this.x = x;
    this.y = y;
    this.xOffset = 0;
    this.yOffset = 0;
    this.length = length;
    this.tilt = tilt;
    this.color = color;
  }

  update() {
    const nextXOffset = this.xOffset + random(MAX_SPEED, MIN_SPEED);
    const nextYOffset = this.yOffset + this.tilt;

    ctx.beginPath();
    ctx.moveTo(this.x + this.xOffset, this.y + this.yOffset);
    ctx.lineTo(this.x + nextXOffset, this.y + nextYOffset);
    ctx.stroke();

    this.xOffset = nextXOffset;
    this.yOffset = nextYOffset;

    return this.isFinished();
  }

  isFinished() {
    return this.xOffset > this.length;
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

  createStroke() {
    const height = random(MAX_HEIGHT, MIN_HEIGHT);
    const length = random(MAX_STROKE_WIDTH, MIN_STROKE_WIDTH);
    const tilt = Math.random() / 4;
    const x = random(window.innerWidth - length)
    const y = random(window.innerHeight - height)

    for (let i = 0; i < height; i++) {
      const strokeLength = random(length, length - STROKE_VARIANCE);

      this.strokes.push(new Stroke(x + random(STROKE_VARIANCE), y + i, strokeLength, tilt, "lerpColor between hiColor and loColor"));
    }
  }

  update() {
    if (this.strokes.length > 0) {
      const remaining = this.strokes.map(s => s.update());

      if (remaining.every(r => !!r)) {
        this.reset();
        this.createStroke();
      }
    } else {
      this.createStroke();
    }
  }
}

const p = new Painter("111111", "ffbb93");

function main() {
  p.update();
  
  requestAnimationFrame(main);
}

main();

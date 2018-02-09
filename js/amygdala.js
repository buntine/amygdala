const MAX_WAIT_TIME = 500;
const MAX_HEIGHT = 300;
const MIN_HEIGHT = 70;
const MAX_STROKE_WIDTH = 800;
const MIN_STROKE_WIDTH = 300;
const MAX_STROKE_HEIGHT = 4;
const STROKE_VARIANCE = 50;
const MIN_SPEED = 7;
const MAX_SPEED = 12;
const HORIZ_PROBABILITY = 0.8;
const TILT_FACTOR = 3;
const BLUR_SIZE = 10;

const canvas = document.getElementById("amygdala");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.shadowBlur = BLUR_SIZE;

const random = function(max, min = 0) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

class VerticalStroke {
  constructor(x, y, offset, length, tilt, color) {
    this.x = x + offset;
    this.y = y + random(STROKE_VARIANCE);
    this.xOffset = 0;
    this.yOffset = 0;
    this.length = length;
    this.tilt = tilt;
    this.color = color;
    this.lineWidth = random(MAX_STROKE_HEIGHT, 1);
  }

  update() {
    const nextYOffset = this.yOffset + random(MAX_SPEED, MIN_SPEED);
    const nextXOffset = this.xOffset + this.tilt;

    ctx.beginPath();
    ctx.moveTo(this.x + this.xOffset, this.y + this.yOffset);
    ctx.lineTo(this.x + nextXOffset, this.y + nextYOffset);
    ctx.strokeStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();

    this.xOffset = nextXOffset;
    this.yOffset = nextYOffset;

    return this.isFinished();
  }

  isFinished() {
    return this.yOffset > this.length;
  }
}


class HorizontalStroke {
  constructor(x, y, offset, length, tilt, color) {
    this.x = x + random(STROKE_VARIANCE);
    this.y = y + offset;
    this.xOffset = 0;
    this.yOffset = 0;
    this.length = length;
    this.tilt = tilt;
    this.color = color;
    this.lineWidth = random(MAX_STROKE_HEIGHT, 1);
  }

  update() {
    const nextXOffset = this.xOffset + random(MAX_SPEED, MIN_SPEED);
    const nextYOffset = this.yOffset + this.tilt;

    ctx.beginPath();
    ctx.moveTo(this.x + this.xOffset, this.y + this.yOffset);
    ctx.lineTo(this.x + nextXOffset, this.y + nextYOffset);
    ctx.strokeStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.lineWidth = this.lineWidth;
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

  lerpColor(amount) {
    let ah = parseInt(this.hiColor.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(this.loColor.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
  }

  createStrokes() {
    const height = random(MAX_HEIGHT, MIN_HEIGHT);
    const length = random(MAX_STROKE_WIDTH, MIN_STROKE_WIDTH);
    const tilt = random(TILT_FACTOR, -TILT_FACTOR);
    const x = random(window.innerWidth - length);
    const y = random(window.innerHeight - height);
    const kind = Math.random() > HORIZ_PROBABILITY ? VerticalStroke : HorizontalStroke;

    for (let i = 0; i < height; i++) {
      const strokeLength = random(length, length - STROKE_VARIANCE);

      this.strokes.push(
        new kind(x, y, i, strokeLength, tilt, this.lerpColor(Math.random())));
    }
  }

  update() {
    if (this.strokes.length > 0) {
      const remaining = this.strokes.map(s => s.update());

      if (remaining.every(r => !!r)) {
        this.reset();
        this.createStrokes();
      }
    } else {
      this.createStrokes();
    }
  }
}

const painters = [
  new Painter("#FFB6C1", "#551A8B"),
  new Painter("#98FB98", "#FFFFE0"),
];

function main() {
  painters.forEach(p => p.update());

  requestAnimationFrame(main);
}

main();

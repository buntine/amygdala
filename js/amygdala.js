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
    const hi = this.hiColor;
    const lo = this.loColor;
    const rr = hi.r + amount * (lo.r - hi.r);
    const rg = hi.g + amount * (lo.g - hi.g);
    const rb = hi.b + amount * (lo.b - hi.b);

    return `rgb(${rr.toFixed()}, ${rg.toFixed()}, ${rb.toFixed()})`;
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

class Color {
  constructor(r, g, b) {
    this.r = r[0];
    this.g = g[0];
    this.b = b[0];

    window.addEventListener("keydown", e => {
      switch (e.key) {
        case r[1]:
          this.r = this.r + 1;
          break;
        case g[1]:
          this.g = this.g + 1;
          break;
        case b[1]:
          this.b = this.b + 1;
        default:
      }
    });
  }
}

const painters = [
  new Painter(
    new Color([255, 'a'], [67, 'b'], [102, 'c']),
    new Color([205, 'd'], [17, 'e'], [52, 'f']),
  ),
  new Painter(
    new Color([255, 'g'], [67, 'h'], [102, 'i']),
    new Color([205, 'j'], [17, 'k'], [52, 'l']),
  ),
];

function main() {
  painters.forEach(p => p.update());

  requestAnimationFrame(main);
}

main();

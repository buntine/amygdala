import * as c from "./constants";

const canvas = <HTMLCanvasElement>document.getElementById("amygdala");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.shadowBlur = c.BLUR_SIZE;

const random = function(max, min = 0) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

interface Stroke {
  x : number;
  y : number;
  xOffset : number;
  yOffset : number;
  length : number;
  tilt : number;
  color : string;
  lineWidth : number;

  update() : void;
  isFinished() : boolean;
}

interface RGB {
  r : number;
  g : number;
  b : number;
}

class VerticalStroke {
  x : number;
  y : number;
  xOffset : number;
  yOffset : number;
  length : number;
  tilt : number;
  color : string;
  lineWidth : number;

  constructor(x : number, y : number, offset : number, length : number, tilt : number, color : string) {
    this.x = x + offset;
    this.y = y + random(c.STROKE_VARIANCE);
    this.xOffset = 0;
    this.yOffset = 0;
    this.length = length;
    this.tilt = tilt;
    this.color = color;
    this.lineWidth = random(c.MAX_STROKE_HEIGHT, 1);
  }

  update() {
    const nextYOffset = this.yOffset + random(c.MAX_SPEED, c.MIN_SPEED);
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
  x : number;
  y : number;
  xOffset : number;
  yOffset : number;
  length : number;
  tilt : number;
  color : string;
  lineWidth : number;

  constructor(x : number, y : number, offset : number, length : number, tilt : number, color : string) {
    this.x = x + random(c.STROKE_VARIANCE);
    this.y = y + offset;
    this.xOffset = 0;
    this.yOffset = 0;
    this.length = length;
    this.tilt = tilt;
    this.color = color;
    this.lineWidth = random(c.MAX_STROKE_HEIGHT, 1);
  }

  update() {
    const nextXOffset = this.xOffset + random(c.MAX_SPEED, c.MIN_SPEED);
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
  color : Color;
  strokes : Stroke[];

  constructor(nextColorKey : string, prevColorKey : string) {
    this.color = new Color(nextColorKey, prevColorKey);
    this.strokes = [];
  }

  reset() {
    this.strokes = [];
  }

  createStrokes() {
    const height = random(c.MAX_HEIGHT, c.MIN_HEIGHT);
    const length = random(c.MAX_STROKE_WIDTH, c.MIN_STROKE_WIDTH);
    const tilt = random(c.TILT_FACTOR, -c.TILT_FACTOR);
    const x = random(window.innerWidth - length);
    const y = random(window.innerHeight - height);
    const kind = Math.random() > c.HORIZ_PROBABILITY ? VerticalStroke : HorizontalStroke;

    for (let i = 0; i < height; i++) {
      const strokeLength = random(length, length - c.STROKE_VARIANCE);

      this.strokes.push(
        new kind(x, y, i, strokeLength, tilt, this.color.lerpColor(Math.random())));
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
  high : RGB;
  low : RGB;
  i : number;
  pendingChange : number;

  constructor(nextColorKey : string, prevColorKey : string) {
    this.high = {r: 200, g: 89, b: 126};
    this.low = {r: 140, g: 59, b: 88};
    this.i = 0;
    this.scheduleChange();

    window.addEventListener("keydown", (e) => {
      if (e.key === nextColorKey) {
        this.nextColor();
      } else if (e.key === prevColorKey) {
        this.prevColor();
      }
    });
  }

  lerpColor(amount) {
    const color = c.COLORS[this.i];
    const hi = color[0];
    const lo = color[1];
    const rr = hi[0] + amount * (lo[0] - hi[0]);
    const rg = hi[1] + amount * (lo[1] - hi[1]);
    const rb = hi[2] + amount * (lo[2] - hi[2]);

    return `rgb(${rr.toFixed()}, ${rg.toFixed()}, ${rb.toFixed()})`;
  }

  nextColor() {
    this.i = (this.i + 1) % c.COLORS.length;
    this.scheduleChange();
  }

  prevColor() {
    const nextI = this.i - 1;
    this.i = nextI < 0 ? c.COLORS.length - 1 : nextI;
    this.scheduleChange();
  }

  scheduleChange() {
    if (this.pendingChange) {
      clearTimeout(this.pendingChange);
    }

    this.pendingChange = setTimeout(() => this.nextColor(), c.NO_INPUT_WAIT_TIME);
  }
}

const painters = [
  new Painter('a', 'b'),
  new Painter('c', 'd'),
  new Painter('e', 'f'),
];

function main() {
  painters.forEach(p => p.update());

  requestAnimationFrame(main);
}

main();

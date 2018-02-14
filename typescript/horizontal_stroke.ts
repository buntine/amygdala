import * as c from "./constants";
import * as h from "./helpers";

export default class HorizontalStroke {
  ctx : CanvasRenderingContext2D;
  x : number;
  y : number;
  xOffset : number;
  yOffset : number;
  length : number;
  tilt : number;
  color : string;
  lineWidth : number;

  constructor(ctx : CanvasRenderingContext2D, x : number, y : number, offset : number, length : number, tilt : number, color : string) {
    this.ctx = ctx;
    this.x = x + h.random(c.STROKE_VARIANCE);
    this.y = y + offset;
    this.xOffset = 0;
    this.yOffset = 0;
    this.length = length;
    this.tilt = tilt;
    this.color = color;
    this.lineWidth = h.random(c.MAX_STROKE_HEIGHT, 1);
  }

  update() {
    const nextXOffset = this.xOffset + h.random(c.MAX_SPEED, c.MIN_SPEED);
    const nextYOffset = this.yOffset + this.tilt;
    const ctx = this.ctx;

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

import * as c from "./constants";
import * as h from "./helpers";
import Color from "./color";
import VerticalStroke from "./vertical_stroke";
import HorizontalStroke from "./horizontal_stroke";

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

export default class Painter {
  ctx : CanvasRenderingContext2D;
  color : Color;
  strokes : Stroke[];

  constructor(ctx : CanvasRenderingContext2D, nextColorKey : string, prevColorKey : string) {
    this.ctx = ctx;
    this.color = new Color(nextColorKey, prevColorKey, "painter1");
    this.strokes = [];
  }

  reset() {
    this.strokes = [];
  }

  createStrokes() {
    const height = h.random(c.MAX_HEIGHT, c.MIN_HEIGHT);
    const length = h.random(c.MAX_STROKE_WIDTH, c.MIN_STROKE_WIDTH);
    const tilt = h.random(c.TILT_FACTOR, -c.TILT_FACTOR);
    const x = h.random(window.innerWidth - length);
    const y = h.random(window.innerHeight - height);
    const kind = Math.random() > c.HORIZ_PROBABILITY ? VerticalStroke : HorizontalStroke;

    for (let i = 0; i < height; i++) {
      const strokeLength = h.random(length, length - c.STROKE_VARIANCE);

      this.strokes.push(
        new kind(this.ctx, x, y, i, strokeLength, tilt, this.color.lerpColor(Math.random())));
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

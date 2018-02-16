import * as c from "./constants";
import Painter from "./painter";

const canvas = <HTMLCanvasElement>document.getElementById("amygdala");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.shadowBlur = c.BLUR_SIZE;

const painters = [
  new Painter(ctx, "painter1", "a", "b"),
  new Painter(ctx, "painter2", "c", "d"),
  new Painter(ctx, "painter3", "e", "f"),
];

function main() {
  painters.forEach(p => p.update());

  requestAnimationFrame(main);
}

main();

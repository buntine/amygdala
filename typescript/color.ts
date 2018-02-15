import * as h from "./helpers";
import * as c from "./constants";

interface RGB {
  r : number;
  g : number;
  b : number;
}

export default class Color {
  i : number;
  preview : HTMLElement;
  pendingChange : number;

  constructor(nextColorKey : string, prevColorKey : string, div : string) {
    this.i = h.random(c.COLORS.length - 1);
    this.preview = document.getElementById(div);
    this.nextColor();

    window.addEventListener("keydown", (e) => {
      if (e.key === nextColorKey) {
        this.nextColor();
      } else if (e.key === prevColorKey) {
        this.prevColor();
      }
    });
  }

  lerpColor(amount: number) : string {
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
    this.updatePreview();
    this.scheduleChange();
  }

  prevColor() {
    const nextI = this.i - 1;
    this.i = nextI < 0 ? c.COLORS.length - 1 : nextI;
    this.updatePreview();
    this.scheduleChange();
  }

  updatePreview() {
    const color = c.COLORS[this.i];
    this.preview.style.background = `linear-gradient(to right, rgb(${color[0].join(",")}), rgb(${color[1].join(",")}))`;
  }

  scheduleChange() {
    if (this.pendingChange) {
      clearTimeout(this.pendingChange);
    }

    this.pendingChange = setTimeout(() => this.nextColor(), c.NO_INPUT_WAIT_TIME);
  }
}

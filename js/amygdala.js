(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var c = require("./constants");
var painter_1 = require("./painter");
var canvas = document.getElementById("amygdala");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.shadowBlur = c.BLUR_SIZE;
var painters = [
    new painter_1["default"](ctx, "painter1", "a", "b"),
    new painter_1["default"](ctx, "painter2", "c", "d"),
    new painter_1["default"](ctx, "painter3", "e", "f"),
];
function main() {
    painters.forEach(function (p) { return p.update(); });
    requestAnimationFrame(main);
}
main();

},{"./constants":3,"./painter":6}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var h = require("./helpers");
var c = require("./constants");
var Color = (function () {
    function Color(nextColorKey, prevColorKey, div) {
        var _this = this;
        this.i = h.random(c.COLORS.length - 1);
        this.preview = document.getElementById(div);
        this.nextColor();
        window.addEventListener("keydown", function (e) {
            if (e.key === nextColorKey) {
                _this.nextColor();
            }
            else if (e.key === prevColorKey) {
                _this.prevColor();
            }
        });
    }
    Color.prototype.lerpColor = function (amount) {
        var color = c.COLORS[this.i];
        var hi = color[0];
        var lo = color[1];
        var rr = hi[0] + amount * (lo[0] - hi[0]);
        var rg = hi[1] + amount * (lo[1] - hi[1]);
        var rb = hi[2] + amount * (lo[2] - hi[2]);
        return "rgb(" + rr.toFixed() + ", " + rg.toFixed() + ", " + rb.toFixed() + ")";
    };
    Color.prototype.nextColor = function () {
        this.i = (this.i + 1) % c.COLORS.length;
        this.updatePreview();
        this.scheduleChange();
    };
    Color.prototype.prevColor = function () {
        var nextI = this.i - 1;
        this.i = nextI < 0 ? c.COLORS.length - 1 : nextI;
        this.updatePreview();
        this.scheduleChange();
    };
    Color.prototype.updatePreview = function () {
        var color = c.COLORS[this.i];
        this.preview.style.background = "linear-gradient(to right, rgb(" + color[0].join(",") + "), rgb(" + color[1].join(",") + "))";
    };
    Color.prototype.scheduleChange = function () {
        var _this = this;
        if (this.pendingChange) {
            clearTimeout(this.pendingChange);
        }
        this.pendingChange = setTimeout(function () { return _this.nextColor(); }, c.NO_INPUT_WAIT_TIME);
    };
    return Color;
}());
exports["default"] = Color;

},{"./constants":3,"./helpers":4}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.MAX_WAIT_TIME = 500;
exports.MAX_HEIGHT = 300;
exports.MIN_HEIGHT = 70;
exports.MAX_STROKE_WIDTH = 800;
exports.MIN_STROKE_WIDTH = 300;
exports.MAX_STROKE_HEIGHT = 4;
exports.STROKE_VARIANCE = 50;
exports.MIN_SPEED = 7;
exports.MAX_SPEED = 12;
exports.HORIZ_PROBABILITY = 0.7;
exports.TILT_FACTOR = 3;
exports.BLUR_SIZE = 10;
exports.NO_INPUT_WAIT_TIME = 60000;
exports.OFFSCREEN_ALLOWANCE = -60;
exports.MAX_CURVE = 0.4;
exports.MIN_CURVE = 0.8;
exports.COLORS = [
    [[218, 68, 83], [137, 33, 107]],
    [[225, 238, 195], [240, 80, 83]],
    [[255, 175, 189], [255, 195, 160]],
    [[203, 45, 62], [239, 71, 58]],
    [[255, 75, 31], [255, 144, 104]],
    [[255, 95, 109], [255, 195, 113]],
    [[229, 57, 53], [227, 93, 91]],
    [[248, 87, 166], [255, 88, 88]],
    [[255, 81, 47], [221, 36, 118]],
    [[221, 94, 137], [247, 187, 151]],
    [[255, 110, 127], [191, 233, 255]],
    [[252, 74, 26], [247, 183, 51]],
    [[247, 151, 30], [255, 210, 0]],
    [[252, 234, 187], [248, 181, 0]],
    [[86, 20, 176], [219, 214, 92]],
    [[0, 79, 249], [255, 249, 76]],
    [[112, 225, 245], [255, 209, 148]],
    [[100, 145, 115], [219, 213, 164]],
    [[67, 198, 172], [248, 255, 174]],
    [[86, 171, 47], [168, 224, 99]],
    [[220, 227, 91], [69, 182, 73]],
    [[241, 242, 181], [19, 80, 88]],
    [[65, 77, 11], [114, 122, 23]],
    [[255, 252, 0], [255, 255, 255]],
    [[0, 242, 96], [5, 117, 230]],
    [[0, 201, 255], [146, 254, 157]],
    [[218, 210, 153], [176, 218, 185]],
    [[18, 216, 250], [166, 255, 203]],
    [[52, 143, 80], [86, 180, 211]],
    [[29, 151, 108], [147, 249, 185]],
    [[116, 235, 213], [172, 182, 229]],
    [[0, 130, 200], [102, 125, 182]],
    [[0, 0, 70], [28, 181, 224]],
    [[68, 160, 141], [9, 54, 55]],
    [[239, 50, 217], [137, 255, 253]],
    [[52, 148, 230], [236, 110, 173]],
    [[44, 62, 80], [76, 161, 175]],
    [[194, 229, 156], [100, 179, 244]],
    [[44, 62, 80], [52, 152, 219]],
    [[230, 218, 218], [39, 64, 70]],
    [[93, 65, 87], [168, 202, 186]],
    [[97, 97, 97], [155, 197, 195]],
    [[116, 116, 191], [52, 138, 199]],
    [[43, 192, 228], [234, 236, 198]],
    [[19, 78, 94], [113, 178, 128]],
    [[20, 136, 204], [43, 50, 178]],
    [[43, 88, 118], [78, 67, 118]],
    [[173, 169, 150], [242, 242, 242]],
    [[62, 81, 81], [222, 203, 164]],
    [[64, 58, 62], [190, 88, 105]],
    [[171, 186, 171], [255, 255, 255]],
    [[115, 200, 169], [55, 59, 68]],
    [[183, 152, 145], [148, 113, 107]],
    [[72, 85, 99], [41, 50, 60]],
    [[0, 0, 0], [67, 67, 67]],
    [[76, 0, 1], [7, 0, 0]],
    [[189, 195, 199], [44, 62, 80]],
    [[255, 154, 158], [250, 208, 196]],
    [[255, 236, 210], [252, 182, 159]],
    [[161, 196, 253], [194, 233, 251]],
    [[207, 217, 223], [226, 235, 240]],
    [[253, 252, 251], [226, 209, 195]],
    [[254, 173, 166], [245, 239, 239]],
    [[147, 165, 207], [228, 239, 233]],
    [[199, 144, 129], [223, 165, 121]]
];

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.random = function (max, min) {
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
};

},{}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var c = require("./constants");
var h = require("./helpers");
var HorizontalStroke = (function () {
    function HorizontalStroke(ctx, x, y, offset, length, tilt, color) {
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
    HorizontalStroke.prototype.update = function () {
        var remaining = Math.min(c.MIN_CURVE, 1 - (this.xOffset / this.length));
        var movement = Math.max((remaining * (2 - remaining)), c.MAX_CURVE) * h.random(c.MAX_SPEED, c.MIN_SPEED);
        var nextXOffset = this.xOffset + movement;
        var nextYOffset = this.yOffset + this.tilt;
        var ctx = this.ctx;
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
    };
    HorizontalStroke.prototype.isFinished = function () {
        return this.xOffset > this.length;
    };
    return HorizontalStroke;
}());
exports["default"] = HorizontalStroke;

},{"./constants":3,"./helpers":4}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var c = require("./constants");
var h = require("./helpers");
var color_1 = require("./color");
var vertical_stroke_1 = require("./vertical_stroke");
var horizontal_stroke_1 = require("./horizontal_stroke");
var Painter = (function () {
    function Painter(ctx, preview, nextColorKey, prevColorKey) {
        this.ctx = ctx;
        this.color = new color_1["default"](nextColorKey, prevColorKey, preview);
        this.strokes = [];
    }
    Painter.prototype.reset = function () {
        this.strokes = [];
    };
    Painter.prototype.createStrokes = function () {
        var height = h.random(c.MAX_HEIGHT, c.MIN_HEIGHT);
        var length = h.random(c.MAX_STROKE_WIDTH, c.MIN_STROKE_WIDTH);
        var tilt = h.random(c.TILT_FACTOR, -c.TILT_FACTOR);
        var x = h.random(window.innerWidth - length, c.OFFSCREEN_ALLOWANCE);
        var y = h.random(window.innerHeight - height, c.OFFSCREEN_ALLOWANCE);
        var kind = Math.random() > c.HORIZ_PROBABILITY ? vertical_stroke_1["default"] : horizontal_stroke_1["default"];
        for (var i = 0; i < height; i++) {
            var strokeLength = h.random(length, length - c.STROKE_VARIANCE);
            this.strokes.push(new kind(this.ctx, x, y, i, strokeLength, tilt, this.color.lerpColor(Math.random())));
        }
    };
    Painter.prototype.update = function () {
        if (this.strokes.length > 0) {
            var remaining = this.strokes.map(function (s) { return s.update(); });
            if (remaining.every(function (r) { return !!r; })) {
                this.reset();
                this.createStrokes();
            }
        }
        else {
            this.createStrokes();
        }
    };
    return Painter;
}());
exports["default"] = Painter;

},{"./color":2,"./constants":3,"./helpers":4,"./horizontal_stroke":5,"./vertical_stroke":7}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var c = require("./constants");
var h = require("./helpers");
var VerticalStroke = (function () {
    function VerticalStroke(ctx, x, y, offset, length, tilt, color) {
        this.ctx = ctx;
        this.x = x + offset;
        this.y = y + h.random(c.STROKE_VARIANCE);
        this.xOffset = 0;
        this.yOffset = 0;
        this.length = length;
        this.tilt = tilt;
        this.color = color;
        this.lineWidth = h.random(c.MAX_STROKE_HEIGHT, 1);
    }
    VerticalStroke.prototype.update = function () {
        var remaining = Math.min(c.MIN_CURVE, 1 - (this.yOffset / this.length));
        var movement = Math.max((remaining * (2 - remaining)), c.MAX_CURVE) * h.random(c.MAX_SPEED, c.MIN_SPEED);
        var nextYOffset = this.yOffset + movement;
        var nextXOffset = this.xOffset + this.tilt;
        var ctx = this.ctx;
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
    };
    VerticalStroke.prototype.isFinished = function () {
        return this.yOffset > this.length;
    };
    return VerticalStroke;
}());
exports["default"] = VerticalStroke;

},{"./constants":3,"./helpers":4}]},{},[1]);

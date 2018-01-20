(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.substrate = {})));
}(this, (function (exports) { 'use strict';

function toInt(value) {
  return value | 0;
}

function randomNum(min, max) {
  if (max) {
    return Math.random() * (max - min) + min;
  }
  return Math.random() * min;
}

function randomInt(min, max) {
  return toInt(randomNum(min, max));
}

const colors = [[255, 240, 208], [255, 200, 40], [255, 232, 152], [240, 200, 152], [255, 255, 208], [160, 120, 0], [232, 200, 152], [248, 224, 112], [255, 240, 200], [208, 176, 128], [255, 248, 208], [248, 232, 224], [255, 216, 176], [208, 176, 120], [240, 216, 192], [240, 216, 208], [255, 255, 216], [200, 192, 152], [208, 192, 88], [224, 200, 168], [216, 208, 176], [248, 248, 208], [176, 160, 152], [255, 240, 192], [240, 232, 184], [152, 104, 112], [255, 248, 216], [255, 232, 200], [240, 232, 192], [240, 232, 216], [224, 216, 184], [224, 208, 160], [224, 208, 176], [208, 200, 160], [232, 232, 216], [240, 216, 152], [248, 240, 216], [255, 240, 160], [248, 232, 120], [255, 232, 120], [232, 200, 72], [232, 184, 120], [248, 224, 80], [88, 80, 72], [255, 255, 200], [168, 160, 120], [232, 224, 152], [248, 240, 200], [232, 216, 168], [255, 248, 200], [240, 248, 168], [240, 240, 192], [255, 224, 120], [240, 232, 200], [232, 224, 128], [255, 232, 104], [208, 192, 160], [240, 224, 128], [255, 232, 144], [224, 200, 88], [248, 224, 184], [240, 224, 184], [216, 200, 152], [255, 240, 184], [200, 176, 120], [248, 232, 184], [232, 216, 200], [240, 200, 104], [160, 144, 120], [255, 248, 192], [240, 240, 200], [255, 232, 176], [232, 224, 176], [255, 208, 40], [176, 144, 48], [240, 240, 208], [192, 192, 144], [248, 224, 192], [208, 184, 144], [192, 176, 120], [176, 176, 152], [168, 168, 128], [240, 224, 192], [224, 224, 184], [88, 88, 56], [208, 208, 192], [56, 40, 16], [56, 56, 40], [184, 184, 176], [192, 176, 144], [152, 160, 184], [224, 176, 128], [200, 200, 184], [248, 224, 176], [216, 192, 112], [248, 232, 192], [224, 208, 152], [224, 216, 176], [88, 104, 104], [232, 240, 192], [144, 104, 72], [176, 136, 104], [232, 184, 40], [255, 232, 192], [176, 176, 120], [224, 224, 176], [104, 104, 112], [224, 216, 160], [160, 160, 168], [224, 160, 96], [104, 88, 88], [255, 152, 40], [192, 160, 96], [144, 88, 24], [248, 240, 184], [168, 152, 104], [168, 144, 112], [176, 168, 112], [240, 240, 224], [168, 152, 72], [88, 104, 88], [224, 184, 80], [200, 176, 96], [176, 144, 32], [216, 192, 136], [255, 208, 112], [255, 232, 184], [240, 216, 144], [224, 200, 160], [248, 240, 208], [160, 120, 72], [248, 224, 160], [248, 232, 208], [248, 224, 168], [16, 0, 0], [232, 192, 136], [232, 240, 216], [176, 192, 184], [255, 216, 168], [240, 232, 208], [232, 208, 120], [200, 160, 120], [168, 176, 160], [232, 216, 192], [176, 168, 144], [0, 16, 0], [160, 56, 16], [160, 128, 120], [216, 192, 168], [208, 176, 176], [224, 224, 192], [144, 96, 112], [160, 112, 120], [184, 136, 104], [248, 224, 216], [192, 152, 136], [255, 232, 208], [216, 192, 160], [192, 192, 176], [232, 200, 128], [200, 184, 160], [208, 200, 176], [255, 240, 232], [232, 240, 224], [248, 184, 40], [56, 64, 48], [48, 32, 8], [80, 88, 96], [216, 192, 176], [240, 224, 176], [255, 208, 184], [160, 88, 16], [80, 16, 0], [232, 192, 120], [248, 184, 136], [232, 208, 80], [255, 240, 216], [240, 216, 112], [152, 64, 8], [128, 88, 0], [232, 224, 200], [184, 184, 168], [240, 232, 160], [16, 32, 40], [112, 128, 128], [216, 200, 160], [176, 184, 176], [255, 216, 160], [88, 40, 0], [216, 200, 176], [255, 240, 152], [208, 200, 168], [255, 248, 176], [104, 112, 120], [240, 208, 152], [96, 112, 112], [72, 72, 88], [120, 120, 128], [152, 48, 16], [255, 248, 224], [144, 80, 72], [168, 40, 24], [96, 56, 16], [248, 248, 248], [255, 240, 248]];

class SandPainter {
  constructor(context, color) {
    this.context = context;
    this.color = color;
    this.maxGain = 1;
    this.gain = randomNum(0.01, 0.1);
  }

  paint(x, y, originX, originY) {
    const grains = 64;
    this.gain = this.getRandomizedGain();
    const w = this.gain / (grains - 1);

    for (let i = 0; i < grains; i++) {
      const alpha = (0.1 - i / (grains * 10)) * 1;
      this.context.fillStyle = this.getFillStyle(alpha);
      this.context.fillRect(originX + (x - originX) * Math.sin(Math.sin(i * w)), originY + (y - originY) * Math.sin(Math.sin(i * w)), 1, 1);
    }
  }

  getFillStyle(alpha) {
    const [r, g, b] = this.color;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  getRandomizedGain() {
    const gain = this.gain + randomNum(-0.05, 0.05);
    if (gain < 0) {
      return 0;
    } else if (gain > this.maxGain) {
      return this.maxGain;
    }
    return gain;
  }
}

class Crack {

  constructor(context, grid, dimx, dimy, enableSandPainter = true) {
    this.context = context;
    this.grid = grid;

    this.dimx = dimx, this.dimy = dimy;

    this.findStart();

    if (enableSandPainter) {
      const color = this.getRandomColor();
      this.sp = new SandPainter(this.context, color);
    }
  }

  findStart() {
    // TODO: try 10000 times/timeout
    while (true) {
      const px = randomInt(this.dimx);
      const py = randomInt(this.dimy);

      if (this.grid[py * this.dimx + px] < 10000) {
        let a = this.grid[py * this.dimx + px];

        if (randomNum(-1, 1)) {
          a -= 90 + randomInt(-2, 2);
        } else {
          a += 90 + randomInt(-2, 2);
        }

        this.x = px + 0.61 * Math.cos(a * Math.PI / 180);
        this.y = py + 0.61 * Math.sin(a * Math.PI / 180);
        this.t = a;

        break;
      }
    }
  }

  move() {
    this.x += 0.42 * Math.cos(this.t * Math.PI / 180);
    this.y += 0.42 * Math.sin(this.t * Math.PI / 180);

    // bound check
    var z = 0.33;
    var cx = this.x + randomNum(-z, z) | 0; // add fuzz
    var cy = this.y + randomNum(-z, z) | 0;

    // draw sand painter
    this.regionColor();

    this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.context.fillRect(this.x + randomNum(-z, z), this.y + randomNum(-z, z), 1, 1, 1, 1);

    if (cx >= 0 && cx < this.dimx && cy >= 0 && cy < this.dimy) {
      // safe to check
      if (this.grid[cy * this.dimx + cx] > 10000 || Math.abs(this.grid[cy * this.dimx + cx] - this.t) < 5) {
        // continue cracking
        this.grid[cy * this.dimx + cx] = this.t | 0;
        return true;
      } else if (Math.abs(this.grid[cy * this.dimx + cx] - this.t) > 2) {
        // crack encountered (not self), stop cracking
        this.findStart();
        return false;
      }
    } else {
      // out of bounds, stop cracking
      this.findStart();
      return false;
    }
  }

  regionColor() {
    // start checking one step away
    var rx = this.x;
    var ry = this.y;
    var openspace = true;

    // find extents of open space
    while (openspace) {
      // move perpendicular to crack
      rx += 0.81 * Math.sin(this.t * Math.PI / 180);
      ry -= 0.81 * Math.cos(this.t * Math.PI / 180);
      var cx = rx | 0;
      var cy = ry | 0;
      if (cx >= 0 && cx < this.dimx && cy >= 0 && cy < this.dimy) {
        // safe to check
        if (this.grid[cy * this.dimx + cx] > 10000) {
          // space is open
        } else {
          openspace = false;
        }
      } else {
        openspace = false;
      }
    }
    // draw sand painter
    this.sp && this.sp.paint(rx, ry, this.x, this.y);
  }

  getRandomColor() {
    const randomIndex = randomInt(colors.length);
    return colors[randomIndex];
  }

}

class Substrate {

  constructor(settings) {
    this.settings = settings;
    this.context = settings.canvas.getContext('2d');

    this.dim = {
      x: settings.canvas.width,
      y: settings.canvas.height
    };

    this.grid = new Array(this.dim.x * this.dim.y).fill(10001);
    this.cracks = [];

    for (var k = 0; k < 16; k++) {
      const randomIndex = randomInt(this.dim.x * this.dim.y - 1);
      this.grid[randomIndex] = randomInt(360);
    }

    for (var k = 0; k < 3; k++) {
      this.makeCrack();
    }
  }

  start() {
    const draw = () => {
      this.cracks.forEach(crack => {
        const hasMoved = crack.move();
        if (!hasMoved) this.makeCrack();
      });
      requestAnimationFrame(draw);
    };

    draw();
  }

  makeCrack() {
    if (this.cracks.length < this.settings.maxCracks) {
      const crack = new Crack(this.context, this.grid, this.dim.x, this.dim.y, this.settings.enableSandPainter);
      this.cracks.push(crack);
    }
  }

}

exports.Substrate = Substrate;

Object.defineProperty(exports, '__esModule', { value: true });

})));

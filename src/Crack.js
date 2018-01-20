import SandPainter from './SandPainter.js';
import { colors, randomInt, randomNum } from './helpers.js';

export default class Crack {

  constructor(context, grid, dimx, dimy, enableSandPainter = true) {
    this.context = context;
    this.grid = grid;

    this.dimx = dimx,
    this.dimy = dimy;

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
    var cx = (this.x + randomNum(-z, z)) | 0;  // add fuzz
    var cy = (this.y + randomNum(-z, z)) | 0;

    // draw sand painter
    this.regionColor();

    this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.context.fillRect(this.x + randomNum(-z, z), this.y + randomNum(-z, z), 1, 1, 1, 1);

    if ((cx >= 0) && (cx < this.dimx) && (cy >= 0) && (cy < this.dimy)) {
      // safe to check
      if ((this.grid[cy * this.dimx + cx] > 10000) || (Math.abs(this.grid[cy * this.dimx + cx] - this.t) < 5)) {
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
      if ((cx >= 0) && (cx < this.dimx) && (cy >= 0) && (cy < this.dimy)) {
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

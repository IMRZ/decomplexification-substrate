
import Crack from './Crack.js';
import SandPainer from './SandPainter.js';
import { randomInt } from './helpers.js';

export class Substrate {

  constructor(settings) {
    this.settings = settings;
    this.context = settings.canvas.getContext('2d');

    this.dim = {
      x: settings.canvas.width,
      y: settings.canvas.height
    }


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
      this.cracks.forEach((crack) => {
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

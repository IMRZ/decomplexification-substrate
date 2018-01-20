import { randomNum } from './helpers.js';

export default class SandPainter {
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

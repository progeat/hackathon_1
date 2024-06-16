import { Module } from '../core/module';
import { random, randomColor } from '../utils';

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.canvas = null;
    this.canvasCTX = null;
  }

  trigger() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvasCTX = this.canvas.getContext('2d');
      this.canvas.width = window.innerWidth - 100;
      this.canvas.height = window.innerHeight - 100;
      document.body.appendChild(this.canvas);
    }
    const createRandomShape = () => {
      const shapeType = random(0, 4);
      const x = random(0, this.canvas.width);
      const y = random(0, this.canvas.height);
      const size = random(20, 100);
      const color = randomColor();

      this.canvasCTX.fillStyle = color;

      switch (shapeType) {
        case 0:
          this.canvasCTX.fillRect(x, y, size, size);
          break;
        case 1:
          // Circle
          this.canvasCTX.beginPath();
          this.canvasCTX.arc(x, y, size / 2, 0, Math.PI * 2);
          this.canvasCTX.fill();
          break;
        case 2:
          this.canvasCTX.beginPath();
          this.canvasCTX.moveTo(x, y);
          this.canvasCTX.lineTo(x + size, y);
          this.canvasCTX.lineTo(x + size / 2, y - size);
          this.canvasCTX.closePath();
          this.canvasCTX.fill();
          break;
        case 3:
          this.canvasCTX.beginPath();
          this.canvasCTX.ellipse(x, y, size, size / 2, 0, 0, Math.PI * 2);
          this.canvasCTX.fill();
          break;
        case 4:
          this.canvasCTX.beginPath();
          this.canvasCTX.moveTo(x, y);
          this.canvasCTX.lineTo(x + size / 2, y + size / 2);
          this.canvasCTX.lineTo(x, y + size);
          this.canvasCTX.lineTo(x - size / 2, y + size / 2);
          this.canvasCTX.closePath();
          this.canvasCTX.fill();
          break;
      }
    };
    this.intervalId = setInterval(createRandomShape, 1000);
    createRandomShape();

    this.timeoutId = setTimeout(() => {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }, 10000);
  }
  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

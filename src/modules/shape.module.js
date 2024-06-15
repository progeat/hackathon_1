import { Module } from '../core/module';
import { random, randomColor } from '../utils';

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    const addCanvasHTML = document.createElement('canvas');
    const canvasCTX = addCanvasHTML.getContext('2d');
    addCanvasHTML.width = window.innerWidth - 100;
    addCanvasHTML.height = window.innerHeight - 100;
    document.body.appendChild(addCanvasHTML);

    function createRandomShape() {
      const shapeType = random(0, 4);
      const x = random(0, addCanvasHTML.width);
      const y = random(0, addCanvasHTML.height);
      const size = random(20, 100);
      const color = randomColor();

      canvasCTX.fillStyle = color;

      switch (shapeType) {
        case 0:
          canvasCTX.fillRect(x, y, size, size);
          break;
        case 1:
          // Circle
          canvasCTX.beginPath();
          canvasCTX.arc(x, y, size / 2, 0, Math.PI * 2);
          canvasCTX.fill();
          break;
        case 2:
          canvasCTX.beginPath();
          canvasCTX.moveTo(x, y);
          canvasCTX.lineTo(x + size, y);
          canvasCTX.lineTo(x + size / 2, y - size);
          canvasCTX.closePath();
          canvasCTX.fill();
          break;
        case 3:
          canvasCTX.beginPath();
          canvasCTX.ellipse(x, y, size, size / 2, 0, 0, Math.PI * 2);
          canvasCTX.fill();
          break;
        case 4:
          canvasCTX.beginPath();
          canvasCTX.moveTo(x, y);
          canvasCTX.lineTo(x + size / 2, y + size / 2);
          canvasCTX.lineTo(x, y + size);
          canvasCTX.lineTo(x - size / 2, y + size / 2);
          canvasCTX.closePath();
          canvasCTX.fill();
          break;
      }
    }
    setInterval(createRandomShape, 1000);
  }
  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

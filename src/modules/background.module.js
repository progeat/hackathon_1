import { Module } from '../core/module';
import { randomColor } from '../utils';

export class BackgroundModule extends Module {
  trigger() {
    const color = randomColor();
    document.body.style.backgroundColor = color;
  }

  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

import { Module } from '../core/module';

export class TestModule extends Module {
  trigger() {
    console.log(this.type, this.text);
  }

  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

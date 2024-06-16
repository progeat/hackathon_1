import { Module } from '../core/module';

export class ClicksModule extends Module {
  #clicks = 0;
  trigger() {
    setTimeout(
      () => alert(`За 3 секунды вы сделали ${this.#clicks} кликов`),
      3000
    );
    window.addEventListener('click', () => this.#clicks++);
  }

  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

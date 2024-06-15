import { Menu } from './core/menu';

export class ContextMenu extends Menu {
  open() {
    this.el.classList.add('open');
  }

  close() {
    console.log('Клик вне меню');
  }

  add(module) {
    this.el.append(module.toHTML());
  }
}

import { Menu } from './core/menu';

export class ContextMenu extends Menu {
  open(event) {
    if (!this.el.querySelector('.menu-item')) return;
    event.preventDefault();

    this.el.style.left = `${event.pageX}px`;
    this.el.style.top = `${event.pageY}px`;

    this.el.classList.add('open');
  }

  close() {
    this.el.classList.remove('open');
  }

  add(module) {
    const item = module.toHTML();
    this.el.append(item);

    item.addEventListener('click', () => {
      module.trigger.call(module);
      this.close();
    });
  }
}

import './styles.css';
import { ContextMenu } from './menu.js';
import { ClicksModule } from './modules/clicks.module.js';
import { ShapeModule } from './modules/shape.module.js';
import { SoundModule } from './modules/sound.module.js';
import { TestModule } from './modules/test.module.js'; // Подключаем свой модуль вместо этого

const modules = [
  new ClicksModule('clicks', 'Считать клики (за 3 секунды)'),
  new ShapeModule('shape', 'Случайная фигура'),
  new SoundModule('sound', 'Случайный звук'),
  new TestModule('test', 'Тест'),
];

const menu = new ContextMenu('#menu');

modules.forEach((module) => menu.add(module));

document.addEventListener('contextmenu', menu.open.bind(menu));

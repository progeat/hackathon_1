import './styles.css';
import './timer-styles.css';
import { ContextMenu } from './menu.js';
import { ClicksModule } from './modules/clicks.module.js';
import { BackgroundModule } from './modules/background.module.js';
import { TimerModule } from './modules/timer.module';
import { ShapeModule } from './modules/shape.module.js';
import { SoundModule } from './modules/sound.module.js';
import { RandomMessageModule } from './modules/message.module.js';

const modules = [
  new ClicksModule('clicks', 'Считать клики (за 3 секунды)'),
  new BackgroundModule('color', 'Случайный цвет'),
  new TimerModule('timer', 'Таймер'),
  new ShapeModule('shape', 'Случайная фигура'),
  new SoundModule('sound', 'Случайный звук'),
  new RandomMessageModule('message', 'Случайное сообщение'),
];

const menu = new ContextMenu('#menu');

modules.forEach((module) => menu.add(module));

document.addEventListener('contextmenu', menu.open.bind(menu));

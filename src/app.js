import './styles.css';
import { ContextMenu } from './menu.js';
import { TestModule } from './modules/test.module.js'; // Подключаем свой модуль вместо этого

const menu = new ContextMenu('#menu');
const test = new TestModule('test', 'Тест'); // создаем свой экземпляр класса. Первый параметр оставляем test. Имя переменной оставляем test.

menu.add(test);

document.addEventListener('contextmenu', menu.open.bind(menu));

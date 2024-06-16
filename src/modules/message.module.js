import { Module } from '../core/module';
import { random } from '../utils';

export class RandomMessageModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.messages = [
      'Слабый мужчина ищет оправдания, а настоящий мужик подготовил их заранее (с)Джейсон Стетхем',
      'Не понимаю, почему на олимпиаду не отправят цыган, они же там всё золото возьмут. (с)Джейсон Стетхем',
      'Запомни, одна ошибка и ты ошибся (с)Джейсон Стетхем',
      'Жизнь хотела преподать мне урок, но я прогулял (с)Джейсон Стетхем',
      'Если вы в чем-то не разбираетесь Начните разбираться! И вы разберитесь (с)Джейсон Стетхем',
      'Одна полоска это значит подлежащее, а две, пора идти за хлебом (с)Джейсон Стетхем',
      'Если ты упал, вставай. Если ты вставай, тогда упай (с)Джейсон Стетхем',
      'Если пьянка неизбежна, пей первым (с)Джейсон Стетхем',
    ];
  }

  trigger() {
    const message = this.getRandomMessage();
    const messageBlock = this.createMessageBlock(message);
    document.body.appendChild(messageBlock);

    setTimeout(() => {
      messageBlock.remove();
    }, 5000);
  }

  getRandomMessage() {
    const index = random(0, this.messages.length - 1);
    return this.messages[index];
  }

  createMessageBlock(message) {
    const messageBlock = document.createElement('div');
    messageBlock.textContent = message;
    messageBlock.style.position = 'fixed';
    messageBlock.style.backgroundColor = '#4d4d4d';
    messageBlock.style.color = 'white';
    messageBlock.style.padding = '15px';
    messageBlock.style.borderRadius = '5px';
    return messageBlock;
  }

  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

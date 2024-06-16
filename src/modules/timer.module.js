import { Module } from '../core/module';

export class TimerModule extends Module {
  trigger() {
    document.addEventListener('keydown', function (event) {
      const { key } = event;
      if (
        key === '+' ||
        key === '-' ||
        key === '.' ||
        key === ',' ||
        key === 'e' ||
        key === 'E'
      )
        event.preventDefault();
    });

    let time = 0,
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    const $timer = this.createElement('section', 'timer');
    const $timerlabel = this.createElement(
      'label',
      'timer-label',
      'Введите данные:'
    );
    const $timerForm = this.createElement('form', 'timer-form');
    const $daysInput = this.createInput(
      'input',
      'timer-input',
      'number',
      'days',
      '0',
      '999',
      'Количество дней'
    );
    const $hoursInput = this.createInput(
      'input',
      'timer-input',
      'number',
      'hours',
      '0',
      '24',
      'Количество часов'
    );
    const $minutesInput = this.createInput(
      'input',
      'timer-input',
      'number',
      'minutes',
      '0',
      '60',
      'Количество минут'
    );
    const $secondsInput = this.createInput(
      'input',
      'timer-input',
      'number',
      'seconds',
      '0',
      '60',
      'Количество секунд'
    );

    const $timerButton = this.createElement('button', 'timer-button', 'Старт');

    $timerForm.append(
      $daysInput,
      $hoursInput,
      $minutesInput,
      $secondsInput,
      $timerButton
    );
    $timerlabel.append($timerForm);
    $timer.append($timerlabel);

    document.body.appendChild($timer);

    $timerForm.addEventListener('input', (event) => {
      const { target } = event;
      let { value } = target;

      switch (target.name) {
        case 'days':
          days = value;
          localStorage.setItem('days', value);
          break;
        case 'hours':
          hours = value;
          break;
        case 'minutes':
          minutes = value;
          break;
        case 'seconds':
          seconds = value;
          break;
      }
    });

    $timerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      time +=
        days * 24 * 60 * 60 * 1000 +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000;

      if (time === 0) this.showInfoBlock($timer);

      $timerlabel.remove();
      this.startTimer(time, $timer);
    });
  }

  startTimer(time, mainBlock) {
    const $days = this.createElement('div', 'timer-block');
    const $hours = this.createElement('div', 'timer-block');
    const $minutes = this.createElement('div', 'timer-block');
    const $seconds = this.createElement('div', 'timer-block');

    const $daysBlock = this.createElement('ul');
    const $hoursBlock = this.createElement('ul');
    const $minutesBlock = this.createElement('ul');
    const $secondsBlock = this.createElement('ul');
    this.insertElement(
      [$days, $hours, $minutes, $seconds],
      [$daysBlock, $hoursBlock, $minutesBlock, $secondsBlock]
    );

    const $daysFigures = this.createElement('li', 'timer-figures', '00');
    const $hoursFigures = this.createElement('li', 'timer-figures', '00');
    const $minutesFigures = this.createElement('li', 'timer-figures', '00');
    const $secondsFigures = this.createElement('li', 'timer-figures', '00');
    this.insertElement(
      [$daysBlock, $hoursBlock, $minutesBlock, $secondsBlock],
      [$daysFigures, $hoursFigures, $minutesFigures, $secondsFigures]
    );

    const $daysText = this.createElement('li', 'timer-text', 'Дни');
    const $hoursText = this.createElement('li', 'timer-text', 'Часы');
    const $minutesText = this.createElement('li', 'timer-text', 'Минуты');
    const $secondsText = this.createElement('li', 'timer-text', 'Секунды');
    this.insertElement(
      [$daysBlock, $hoursBlock, $minutesBlock, $secondsBlock],
      [$daysText, $hoursText, $minutesText, $secondsText]
    );

    const $resetButton = this.createElement(
      'button',
      'timer-button',
      'Остановить'
    );

    $resetButton.addEventListener('click', () => {
      this.showInfoBlock(mainBlock);
    });

    this.updateTimer(
      {
        $daysFigures,
        $hoursFigures,
        $minutesFigures,
        $secondsFigures,
        $days,
        $hours,
        $minutes,
        $seconds,
      },
      time
    );

    const updater = () => {
      if (time > 0) time -= 1000;
      this.updateTimer(
        {
          $daysFigures,
          $hoursFigures,
          $minutesFigures,
          $secondsFigures,
          $days,
          $hours,
          $minutes,
          $seconds,
        },
        time,
        interval,
        mainBlock
      );
    };

    const interval = setInterval(updater, 1000);

    mainBlock.append($days, $hours, $minutes, $seconds, $resetButton);
  }

  createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  createInput(tagName, className, type, name, min, max, placeholder) {
    const element = this.createElement(tagName, className);
    if (type) element.setAttribute('type', type);
    if (name) element.setAttribute('name', name);
    if (min) element.setAttribute('min', min);
    if (max) element.setAttribute('max', max);
    if (placeholder) element.setAttribute('placeholder', placeholder);

    return element;
  }

  insertElement(parrents, childrens) {
    parrents.forEach((parrent, i) => {
      if (childrens[i]) parrent.append(childrens[i]);
    });
  }

  getTimeRemining(time) {
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((time / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((time / (60 * 1000)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  updateTimer(
    {
      $daysFigures,
      $hoursFigures,
      $minutesFigures,
      $secondsFigures,
      $days,
      $hours,
      $minutes,
      $seconds,
    },
    time,
    interval,
    mainBlock
  ) {
    if (time === 0) {
      clearInterval(interval);
      this.showInfoBlock(mainBlock);
    }

    const { days, hours, minutes, seconds } = this.getTimeRemining(time);
    $daysFigures.textContent = this.getZero(days);
    $hoursFigures.textContent = this.getZero(hours);
    $minutesFigures.textContent = this.getZero(minutes);
    $secondsFigures.textContent = this.getZero(seconds);

    let curcleDays = localStorage.getItem('days') || days;

    const daysCirclePercent =
      curcleDays === 0 ? 100 : 100 - days * (100 / curcleDays);
    const hoursCirclePercent = hours === 0 ? 100 : 100 - (100 / 24) * hours;
    const minutesCirclePercent =
      minutes === 0 ? 100 : 100 - (100 / 60) * minutes;
    const secondsCirclePercent =
      seconds === 0 ? 100 : 100 - (100 / 60) * seconds;

    $days.style.background = `conic-gradient(#151515  ${daysCirclePercent}% 0%, #00a6c3 0% 0%)`;
    $hours.style.background = `conic-gradient(#151515 ${hoursCirclePercent}% 0%, #00a6c3 0% 0%)`;
    $minutes.style.background = `conic-gradient(#151515 ${minutesCirclePercent}% 0%, #00a6c3 0% 0%)`;
    $seconds.style.background = `conic-gradient(#151515 ${secondsCirclePercent}% 0%, #00a6c3 0% 0%)`;
  }

  showInfoBlock(mainBlock) {
    if (mainBlock) mainBlock.remove();
    const $infoBlock = this.createElement('div', 'info-block', 'Время вышло!');
    document.body.append($infoBlock);

    setTimeout(() => {
      $infoBlock.remove();
    }, 1200);
  }

  getZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

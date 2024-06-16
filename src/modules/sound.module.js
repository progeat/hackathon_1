import { Module } from '../core/module';
import { random } from '../utils';
import audio1 from '../assets/archivo_1.mp3';
import audio2 from '../assets/archivo_2.mp3';
import audio3 from '../assets/archivo_3.mp3';

export class SoundModule extends Module {
  trigger() {
    const audios = [audio1, audio2, audio3];
    const number = random(0, audios.length - 1);

    const sound = new Audio(audios[number]);

    sound.play();
  }

  toHTML() {
    const item = document.createElement('li');
    item.className = 'menu-item';
    item.dataset.type = this.type;
    item.textContent = this.text;
    return item;
  }
}

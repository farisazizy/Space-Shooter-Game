import 'phaser';
import config from '../Config/config';

const SubmitScore = require('../modules/submitScore');
const Storage = require('../modules/storage');

const zero = 0;

export default class SceneScores extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneScores',
    });
  }

  create() {

    this.load.image('deepspace', 'assets/bg.png');

    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.W);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.S);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.A);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.D);

    const div = document.createElement('div');
    div.innerHTML = `
    <button type='submit' id='button'
    style='background-color: transparent;
    border: 2px solid white;
    border-radius: 5px;
    color: white;
    padding: 0.5rem;
    margin-left: 3.5rem;
    text-transform: uppercase;
    font-weight: bold;'>
    Main Menu</button>`;
    this.add.dom(this.game.config.width * 0.5, this.game.config.height * 0.6, div, 'background-color: transparent; width: 220px; height: 0; font: 48px Arial');

    const btn = document.getElementById('button');
    btn.onclick = () => window.location.reload();;

    const currentScore = Storage.getCurrentScore();
    const lasthigh = Storage.getHighScore();

    this.score = this.add.text(this.game.config.width * 0.5, 128, ' ', {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.score.setOrigin(0.5, -1);
    this.score.setText(`SCORE: ${currentScore}`);

    this.high = this.add.text(this.game.config.width * 0.15, this.game.config.height * 0.4, ' ', {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.high.setText(`HIGHEST: ${lasthigh}`);
  }

  update() {
    this.sound.stopAll();

    const leftAmmo = Storage.currentAmmo();
    if (leftAmmo <= zero) {
      this.title = this.add.text(this.game.config.width * 0.5, 128, 'NO AMMO LEFT', {
        fontFamily: 'ethnocentric',
        fontSize: 32,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
      this.title.setOrigin(0.5);
    } else {
      this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
        fontFamily: 'ethnocentric',
        fontSize: 32,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
      this.title.setOrigin(0.5);
    }

  }
}

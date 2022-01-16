let ammunition = 100;
const Storage = require('./modules/storage');
import { Entity } from "./entities";

export class Player extends Entity {
    constructor(scene, x, y, key) {
      super(scene, x, y, key, 'Player');
      this.setData('speed', 200);
      this.setData('isShooting', false);
      this.setData('timerShootDelay', 10);
      this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    }
  
    moveUp() {
      this.body.velocity.y = -this.getData('speed');
    }
  
    moveDown() {
      this.body.velocity.y = this.getData('speed');
    }
  
    moveLeft() {
      this.body.velocity.x = -this.getData('speed');
    }
  
    moveRight() {
      this.body.velocity.x = this.getData('speed');
    }
  
    onDestroy() {
      this.scene.time.addEvent({ // go to game over scene
        delay: 1000,
        callback() {
          this.scene.scene.start('SceneScores');
        },
        callbackScope: this,
        loop: false,
      });
    }

    update() {
      this.body.setVelocity(0, 0);
      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

      // console.log(this);

      if (this.getData('isShooting')) {
        if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
          this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
        } else { // when the "manual timer" is triggered:
          const angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.activePointer.x + this.scene.cameras.main.scrollX, this.scene.input.activePointer.y + this.scene.cameras.main.scrollY);
          const laser = new PlayerLaser(this.scene, this.x, this.y, angle);
          this.scene.playerLasers.add(laser);
  
          this.scene.sfx.laser.play(); // play the laser sound effect
          this.setData('timerShootTick', 0);
          ammunition--;
          Storage.setAmmo(ammunition);
        }
      }

      const angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.activePointer.x + this.scene.cameras.main.scrollX, this.scene.input.activePointer.y + this.scene.cameras.main.scrollY);

      this.setRotation(angle + (2 * Math.PI * 90) / 360);
    }
  }
  
export class PlayerLaser extends Entity {
    constructor(scene, x, y, angle) {
      super(scene, x, y, 'sprLaserPlayer');

      const vec = this.scene.physics.velocityFromRotation(angle + (2 * Math.PI * 180) / 360, -200);
      
      this.body.velocity.x = vec.x;
      this.body.velocity.y = vec.y;

      this.setRotation(angle + (2 * Math.PI * 90) / 360);
    }
}
import { Entity } from "./entities";

export class EnemiesShooter extends Entity {
    constructor(scene, x, y, radian) {
      super(scene, x, y, 'sprEnemy0', 'GunShip');
      this.play('sprEnemy0');

      this.setRotation(radian + (2 * Math.PI * -90) / 360);

      const vec = this.scene.physics.velocityFromRotation(radian + (2 * Math.PI * 180) / 360, -200);
      
      this.body.velocity.x = vec.x;
      this.body.velocity.y = vec.y;
  
      this.shootTimer = this.scene.time.addEvent({
        delay: 1000,
        callback() {
          const laser = new EnemyLaser(
            this.scene,
            this.x,
            this.y,
          );
          laser.setScale(this.scaleX);
          this.scene.enemyLasers.add(laser);
        },
        callbackScope: this,
        loop: true,
      });
    }
  
    onDestroy() {
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
    }
  }

export class EnemyLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, 'sprLaserEnemy0');
      this.body.velocity.y = 200;
    }
  }
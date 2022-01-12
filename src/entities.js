let ammunition = 100;
const Storage = require('./modules/storage');

export class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      // Set the texture to the explosion image, then play the animation
      this.setTexture('sprExplosion'); // this refers to the same animation key we used when we added this.anims.create previously
      this.play('sprExplosion'); // play the animation
      // pick a random explosion sound within the array we defined in this.sfx in SceneMain
      this.scene.sfx.explosions[Phaser.Math.Between(0,
        this.scene.sfx.explosions.length - 1)].play();
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.on('animationcomplete', function x() {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);
      this.setData('isDead', true);
    }
  }
}

export class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserEnemy0');
    this.body.velocity.y = 200;
  }
}

export class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'ChaserShip');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData('isDead') && this.scene.player) {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y,
      ) < 320) {
        this.state = this.states.CHASE;
      }

      if (this.state === this.states.CHASE) {
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        const angle = Math.atan2(dy, dx);

        const speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
        );

        if (this.x < this.scene.player.x) {
          this.angle -= 5;
        } else {
          this.angle += 5;
        }
      }
    }
  }
}

export class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy0', 'GunShip');
    this.play('sprEnemy0');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

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

export class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy2', 'CarrierShip');
    this.play('sprEnemy2');

    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}

export class ScrollingBackground {
  constructor(scene, key, velocityY) {
    this.scene = scene;
    this.key = key;
    this.velocityY = velocityY;

    this.layers = this.scene.add.group();

    this.createLayers();
  }

  createLayers() {
    for (let i = 0; i < 2; i++) {
      const layer = this.scene.add.sprite(0, 0, this.key);
      layer.y = (layer.displayHeight * i);
      const flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      const flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      layer.setScale(flipX * 2, flipY * 2);
      layer.setDepth(-5 - (i - 1));
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.y = this.velocityY;

      this.layers.add(layer);
    }
  }

  update() {
    if (this.layers.getChildren()[0].y > 0) {
      for (let i = 0; i < this.layers.getChildren().length; i++) {
        const layer = this.layers.getChildren()[i];
        layer.y = (-layer.displayHeight) + (layer.displayHeight * i);
      }
    }
  }
}

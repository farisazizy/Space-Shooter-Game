import 'phaser';

import { Player } from '../Player';
import { Asteroid1 } from '../Asteroid1';
import { Asteroid2 } from '../Asteroid2';
import { PlayerLaser } from '../Player';

import { EnemiesCarrier } from '../EnemiesCarrier';
import { EnemiesChaser } from '../EnemiesChaser';
import { EnemiesShooter } from '../EnemiesShooter';
import { EnemyLaser } from '../EnemiesShooter';

const Storage = require('../modules/storage');

let timer;
let score = 0;
let scoreText;
let highText;
let uraniumText;
let chondriteText;
let timerText;
let stageText;
let ammoText;
const zero = 0;
let sec = 0;
const ammunition = 100;
const maxAsteroids = 5;

const highestScore = Storage.getHighScore();

if (highestScore === null) {
  Storage.highScore(zero);
}

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMain',
    });
  }

  preload() {

    this.load.image('asteroid', 'assets/asteroid.png');
    this.load.image('asteroid2', 'assets/asteroid2.png');
    this.load.image('material2', 'assets/material2.png');
    this.load.image('material1', 'assets/material1.png');
    this.load.image('deepspace', 'assets/bg.png');
    this.load.audio('jojo', 'assets/jojo_bizzare.mp3')

    this.load.spritesheet('sprExplosion', 'assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('sprEnemy0', 'assets/sprEnemy0.png', {
      frameWidth: 32,
      frameHeight: 34,
    });

    this.load.image('sprEnemy1', 'assets/sprEnemy1.png');
    this.load.spritesheet('sprEnemy2', 'assets/sprEnemy2.png', {
      frameWidth: 32,
      frameHeight: 35,
    });

    this.load.image('sprLaserEnemy0', 'assets/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'assets/sprLaserPlayer.png');
    this.load.spritesheet('sprPlayer', 'assets/sprPlayer.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.audio('sndExplode0', 'assets/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/sndLaser.wav');
  }

  create() {
    Storage.currentScore(zero);
    Storage.setAmmo(ammunition);

    this.sound.play('jojo');
    this.bg = this.add.image(240, 320, 'deepspace');

    highText = this.add.text(16, 60, ' ', {
      fontSize: '16px',
      fill: '#fff',      
    });
    highText.setScrollFactor(0);

    scoreText = this.add.text(16, 16, ' ', {
      fontSize: '32px',
      fill: '#fff',
    });
    scoreText.setScrollFactor(0);

    uraniumText = this.add.text(16, 16, 'Uranium: ', {
      fontSize: '16px',
      fill: '#fff'
    })
    uraniumText.setOrigin(0, -35);

    chondriteText = this.add.text(16, 0, 'Chondrite: ', {
      fontSize: '16px',
      fill: '#fff'
    })
    chondriteText.setOrigin(0, -35);

    // timerText = this.add.text(350, 60, ' ', {
    //   fontSize: '16px',
    //   fill: '#fff',
    // });

    // ammoText = this.add.text(330, 90, ' ', {
    //   fontSize: '16px',
    //   fill: '#fff',
    // });

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0', {
          volume: 0.1,
        }),
        this.sound.add('sndExplode1', {
          volume: 0.1,
        }),
      ],
      laser: this.sound.add('sndLaser', {
        volume: 0.1,
      }),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.dropItems = this.add.group();
    this.enemies = this.add.group();
    this.asteroids = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();    
 
    for(let i = 0; i < 10; i++)
    {
      this.asteroids.add(new Asteroid1(this, Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height)));
    } 

    function spawnAsteroids()
    {
      console.log('aster');
      console.log(this.asteroids.getChildren().length);

      for(let i = 0; i < maxAsteroids - this.asteroids.getChildren().length; i++)
      {
        const fixXOrY = Math.floor(Math.random() * 2);
        const zeroOrMax = Math.floor(Math.random() * 2);

        const x = fixXOrY == 0 ? (zeroOrMax == 0 ? -300 : this.game.config.width + 300) : Phaser.Math.Between(0, this.game.config.width);
        const y = fixXOrY == 1 ? (zeroOrMax == 0 ? -300 : this.game.config.height + 300) : Phaser.Math.Between(0, this.game.config.height);      
        
        // random asteroid
        const randomAsteroid = Math.floor(Math.random() * 2);

        if(randomAsteroid == 0)
          this.asteroids.add(new Asteroid1(this, Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height)));
        else
          this.asteroids.add(new Asteroid2(this, Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height)));
      }  
    }

    this.time.addEvent({
      delay: 5000,
      callback: spawnAsteroids.bind(this),
      loop: true
    });

    this.time.addEvent({
      delay: 750,
      callback() {
        let enemy = null;
      if (Phaser.Math.Between(0, 10) >= 3) {
        const fixXOrY = Math.floor(Math.random() * 2);
        const zeroOrMax = Math.floor(Math.random() * 2);

        const x = fixXOrY == 0 ? (zeroOrMax == 0 ? 0 : this.game.config.width + 100) : Phaser.Math.Between(0, this.game.config.width);
        const y = fixXOrY == 1 ? (zeroOrMax == 0 ? 0 : this.game.config.height + 100) : Phaser.Math.Between(0, this.game.config.height);

        const angle = Phaser.Math.Angle.Between(x, y, this.player.x, this.player.y);

        enemy = new EnemiesShooter(
          this, 
          x,
          y,
          angle
        );

      } else if (Phaser.Math.Between(0, 10) >= 5) {
        if (this.getEnemiesByType('EnemiesChaser').length < 5) {
          enemy = new EnemiesChaser(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }
      } else {
          enemy = new EnemiesChaser(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
        score += 1;
        Storage.currentScore(score);
        if (score > parseInt(highestScore, 10)) {
          Storage.highScore(score);
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
        && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
        // stopTimer();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
        && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
        // stopTimer();
      }
    });

    this.physics.add.overlap(this.playerLasers, this.asteroids, (playerLaser, asteroid) =>
    {
      asteroid.explode(true);
      this.asteroids.remove(asteroid);
      console.log(this.asteroids.getChildren().length);
    })

    this.physics.add.collider(this.dropItems, this.player, (dropItem, player) =>
    {
      console.log('COLLIDE ON MAIN');
      dropItem.onCollideWithPlayer();
      dropItem.destroy();
      this.dropItems.remove(dropItem);
    })

    const nextScene = () => this.scene.start('SceneScores');
    const secondStage = () => this.scene.start('SecondStage');

    sec = 60;
    // Add timer
    // timer = setInterval(() => {
    //   timerText.setText(`Time Left: ${sec}`);
    //   sec--;
    //   if (sec < 0) {
    //     secondStage();
    //     stopTimer();
    //   }
    // }, 1000);

    // function stopTimer() {
    //   clearInterval(timer);
    // }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }


  update() {
    const lasthigh = Storage.getHighScore();
    const currentAmmo = Storage.currentAmmo();

    highText.setText(`Highest: ${lasthigh}`);
    scoreText.setText(`Score: ${score}`);
    uraniumText.setText(`Uranium: ${this.player.getData('uraniumCount')}`)
    chondriteText.setText(`Chondrite: ${this.player.getData('chondriteCount')}`)
    // ammoText.setText(`Ammunition: ${currentAmmo}`);

    if (currentAmmo < zero) {
      this.player.onDestroy();
      // clearInterval(timer);
    }

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.input.mousePointer.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    } 

    for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}

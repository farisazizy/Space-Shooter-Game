import Phaser from 'phaser';
import Ship from './classes/Ship';
import Asteroid from './classes/Asteroid';

class MyGame extends Phaser.Scene
{
    // etst test test
    constructor ()
    {
        super();

        this.gameObjects = {};

        for(var i=0; i < 5; i++){
            const initX = Math.random() * 1000
            const initY = Math.random() * 1000
            const asteroid = new Asteroid(this, initX, initY);
            this.gameObjects[asteroid.uid] = asteroid;
        }
        this.gameObjects.ship = new Ship(this);
    }

    preload ()
    {
        Object.values(this.gameObjects).forEach(gameObject =>
        {
            if(gameObject.preload)
                gameObject.preload();
        })
    }
      
    create ()
    {
        Object.values(this.gameObjects).forEach(gameObject =>
        {
            if(gameObject.create)
                gameObject.create();
        })    
    }

    update(time, delta)
    {
        Object.values(this.gameObjects).forEach(gameObject =>
        {
            if(gameObject.update)
                gameObject.update(time, delta);
        })
    }
}

const game = new Phaser.Game({
    type: Phaser.Physics,
    parent: 'phaser-example',
    width: 1000,
    height: 800,
    scene: MyGame,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    }
});

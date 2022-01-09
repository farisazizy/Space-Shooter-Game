import Phaser from 'phaser';
import Ship from './classes/Ship';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();

        this.gameObjects = {};

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

    update()
    {
        Object.values(this.gameObjects).forEach(gameObject =>
        {
            if(gameObject.update)
                gameObject.update();
        })
    }
}

const game = new Phaser.Game({
    type: Phaser.Physics,
    parent: 'phaser-example',
    width: 1000,
    height: 800,
    scene: MyGame,
    backgroundColor: '#ffffaa',  
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    }
});

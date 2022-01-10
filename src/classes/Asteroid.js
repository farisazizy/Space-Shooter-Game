const GameObject = require('./GameObject');
const image = require('../assets/meteor7.png');
const Phaser = require('phaser');

class Asteroid extends GameObject
{
    constructor(context, initX, initY)
    {
        super(context);

        this.image = image;

        this.name;
        this.maxHealth;
        this.currentHealth;

        this.initX = initX;
        this.initY = initY;
    }

    preload()
    {
        this.context.load.image('Asteroid', this.image);
    }

    create()
    {
        this.context['Asteroid' + this.uid] = this.context.physics.add.image(this.initX, this.initY, 'Asteroid');
        this.context['Asteroid' + this.uid].setScale(0.5);
    }

    update()
    {
        const angle = Phaser.Math.FloatBetween(-1, 1)
        this.context['Asteroid' + this.uid].setRotation(angle * 0.5);
    }
}

module.exports = Asteroid;
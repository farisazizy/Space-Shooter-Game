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

    update(time, delta)
    {
        this.context['Asteroid' + this.uid].angle = this.context['Asteroid' + this.uid].angle + (0.01 * delta);}
    }

module.exports = Asteroid;
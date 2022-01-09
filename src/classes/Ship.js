const GameObject = require('./GameObject');
const ship = require('../assets/ship.png');
const Phaser = require('phaser');

class Ship extends GameObject
{
    constructor(context)
    {
        super(context);

        this.image = ship;
        this.movementSpeed = 5;

        this.name;
        this.maxHealth;
        this.currentHealth;
        this.armor;
        this.evasion;
        this.weapons;
    }

    preload()
    {
        this.context.load.image('shipSprite', this.image);
    }

    create()
    {
        this.context.ship = this.context.physics.add.image(100, 100, 'shipSprite');
        this.context.ship2 = this.context.physics.add.image(100, 100, 'shipSprite');

        this.context.keyW = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.context.keyA = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.context.keyS = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.context.keyD = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.context.cameras.main.startFollow(this.context.ship);
    }

    update()
    {
        if(this.context.keyW.isDown)
            this.context.ship.body.y -= this.movementSpeed;
        if(this.context.keyA.isDown)
            this.context.ship.body.x -= this.movementSpeed;
        if(this.context.keyS.isDown)
            this.context.ship.body.y += this.movementSpeed;
        if(this.context.keyD.isDown)
            this.context.ship.body.x += this.movementSpeed;

        // this.context.cameras.main.centerX = this.context.ship.body.x;
        // this.context.cameras.main.centerY = this.context.ship.body.y;

        const angle = Phaser.Math.Angle.Between(this.context.ship.x, this.context.ship.y, this.context.input.activePointer.x + this.context.cameras.main.scrollX, this.context.input.activePointer.y + this.context.cameras.main.scrollY);

        this.context.ship.setRotation(angle + (2 * Math.PI * 90) / 360);
    }
}

module.exports = Ship;
import { DropItem } from "./DropItem";
import { Entity } from "./entities";

export class Asteroid extends Entity 
{
    dropItem = null;
    chanceToDrop = 0;

    constructor(scene, x, y, key, type) 
    {
      super(scene, x, y, key, type);        
        this.scene = scene;        

      this.setAngle(Phaser.Math.Between(0, 360));
      this.scale = Phaser.Math.FloatBetween(0.05, 0.1);
      this.body.angularVelocity = 25;
      this.setScale(this.scale, this.scale);
    } 

    onDestroy()
    { 
        console.log('on destroyy');

        const possibility = Phaser.Math.Between(0, 100);

        if(possibility <= this.chanceToDrop)
        {
            console.log(this);
            this.scene.dropItems.add(new DropItem(this.scene, this.x, this.y, this.dropItem));
        }
    }
  }
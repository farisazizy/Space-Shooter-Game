import { Entity } from "./entities";

export class DropItem extends Entity 
{
    constructor(scene, x, y, item) 
    {
      super(scene, x, y, item.key, item.type);        

      this.item = item;
      this.scene = scene;

      this.setAngle(Phaser.Math.Between(0, 360));
      this.scale = Phaser.Math.FloatBetween(0.03, 0.05);
      this.body.angularVelocity = 25;
      this.setScale(this.scale, this.scale);
    }
    
    onDestroy()
    {
        this.destroy();
    }

    onCollideWithPlayer()
    {
        console.log('COLLIDEEE');
        if(this.item.onTakenByPlayer)
            this.item.onTakenByPlayer(this.scene);
    }
  }
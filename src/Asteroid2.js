import { Asteroid } from "./Asteroid";
import { DropItem } from "./DropItem";
import { Material2 } from "./Material2";

export class Asteroid2 extends Asteroid 
{
    chanceToDrop = 30;

    constructor(scene, x, y) 
    {
      super(scene, x, y, 'asteroid2', 'asteroid');      
      
      this.dropItem = Material2;
      
      this.setAngle(Phaser.Math.Between(0, 360));
      this.scale = Phaser.Math.FloatBetween(0.05, 0.1);
      this.body.angularVelocity = 25;
      this.setScale(this.scale, this.scale);
    }     
  }
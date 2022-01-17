import { Asteroid } from "./Asteroid";
import { DropItem } from "./DropItem";
import { Material1 } from "./Material1";

export class Asteroid1 extends Asteroid 
{
    chanceToDrop = 50;

    constructor(scene, x, y) 
    {
      super(scene, x, y, 'asteroid', 'asteroid');      
      
      this.dropItem = Material1;
      
      this.setAngle(Phaser.Math.Between(0, 360));
      this.scale = Phaser.Math.FloatBetween(0.05, 0.1);
      this.body.angularVelocity = 25;
      this.setScale(this.scale, this.scale);
    }     
  }
import { Entity } from "./entities";

export class Material extends Entity 
{
    name = '';

    constructor(scene, x, y, key, type) 
    {
      super(scene, x, y, key, type);        

      this.scale = Phaser.Math.FloatBetween(0.05, 0.1);
      this.setScale(this.scale, this.scale);
    } 
  }
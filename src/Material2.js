import { Material } from "./Material";

export class Material2 extends Material 
{
    name = 'Chondrite';
    static key = 'material2';
    static type = 'material';

    constructor(scene, x, y) 
    {
      super(scene, x, y, 'material2', 'material');      

      this.scale = Phaser.Math.FloatBetween(0.05, 0.1);
      this.setScale(this.scale, this.scale);
    } 

    static onTakenByPlayer(scene)
    {                
        console.log('TAKENNNNN');
        scene.player.setData('chondriteCount', scene.player.getData('chondriteCount') + 1);
    }
  }
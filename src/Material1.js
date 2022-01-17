import { Material } from "./Material";

export class Material1 extends Material 
{
    name = 'Uranium';
    static key = 'material1';
    static type = 'material';

    constructor(scene, x, y) 
    {
      super(scene, x, y, 'material1', 'material');      

      this.scene = scene;
      this.scale = Phaser.Math.FloatBetween(0.05, 0.1);
      this.setScale(this.scale, this.scale);
    } 

    static onTakenByPlayer(scene)
    {                
        console.log('TAKENNNNN');  
        scene.player.setData('uraniumCount', scene.player.getData('uraniumCount') + 1);
    }
  }
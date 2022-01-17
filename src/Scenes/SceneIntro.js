/* eslint-disable no-undef */

import 'phaser';

export default class SceneIntro extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneIntro',
    });
  }

  create() {
    const div = document.createElement('div');
    div.innerHTML = `<p
    style=" color: white;
    font-size: 15px;
    text-align:center;
    width: 420px;
    line-height: 1.25rem;
    font-weight: bold;
    margin: 15px 0 0px 0;"
    />
    Semangat Pagi!, Komandan Unit 331.
    <br/>
    Unit 331, Kami telah mendapatkan sinyal penyelamatan. Kami membutuhkan waktu untuk melakukan evakuasi. Bertahanlah hingga unit penyelamat sampai pada kalian.
    <br/>
    <br/>
    Unit penyelamatan tersebut akan berjalan dari sistem Oevasy SG-Y d0 pada jarak 65.647,34 LYs dari tata surya. 
    <br/>
    <br/>
    Bertahanlah dengan persediaan amunisi yang tersedia.
    <br/>
    <br/>
    Anda harus bijaksana ketika akan menembak target Anda, dan setelah Anda memutuskan, tembak dengan meriam laser Anda. 
    <br/>
    <br/>
    Ingat Komandan bahwa kapal Anda akan terbang dengan kecepatan supercruise, jadi tidak ada alasan untuk melenyapkan semua target di luar angkasa, Anda tetap mengendalikan pesawat ruang angkasa Anda untuk melakukan pitch dan yaw selama supercruise. 
    <br/>
    <br/>
    Saya berharap Anda selamat, dan Tuhan memberkati Unit dengan kesuksesan Anda. 
    <br/>
    John Cruze,
    <br/>
    Jendral Agung Federasi
    <br/>
    <br/>
    Pitch/Yaw: [W] [S] [A] [D] - Angle: Mouse - Laser: Left click Mouse
    </p>

    <button type='submit' id='button'
    style='background-color: transparent;
    border: 2px solid white;
    border-radius: 5px;
    color: white;
    padding: 0 7rem;
    margin-left: 3.5rem;
    text-transform: uppercase;
    font-weight: bold;'>
    Start Mission</button>`;
    this.add.dom(this.game.config.width * 0.3, this.game.config.height * 0, div, 'background-color: transparent; width: 220px; height: 0; font: 48px Arial');

    const btn = document.getElementById('button');
    btn.onclick = () => this.scene.start('SceneMain');
  }

  update(){
    this.sound.stopAll();
  }
}

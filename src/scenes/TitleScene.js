import { Scene } from "phaser";

class TitleScene extends Scene {
  constructor() {
    super('scene-title');
  }

  create() {
    this.bg3 = this.add.tileSprite(0, window.innerHeight - 750, window.innerWidth, 750, 'bg3');
    this.bg3.setOrigin(0, 0);
    this.bg3.setScrollFactor(0);

    this.bg2 = this.add.tileSprite(0, window.innerHeight - 600, window.innerWidth, 600, 'bg2');
    this.bg2.setOrigin(0, 0);
    this.bg2.setScrollFactor(0);

    this.bg1 = this.add.tileSprite(0, window.innerHeight - 300, window.innerWidth, 300, 'bg1');
    this.bg1.setOrigin(0, 0);
    this.bg1.setScrollFactor(0);

    this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 150, 'logo');

    this.playBtn = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 50, 'Play Game!', {
      fontFamily: 'sans-serif',
      color: '#000',
      backgroundColor: '#FFF',
      padding: {
        x: 25,
        y: 15
      },
      fontSize: 20,
      fontStyle: 'bold'
    });
    this.playBtn.setOrigin(0.5);
    this.playBtn.setInteractive();

    this.playBtn.on('pointerdown', () => {
      this.scene.start('scene-game');
    });

    this.cameras.main.setBackgroundColor(0x74DBFC);
  }
}

export default TitleScene;
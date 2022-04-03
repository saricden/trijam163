import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }
  
  preload() {
    // Sprites
    this.load.aseprite('broker1', 'assets/broker1.png', 'assets/broker1.json');
    this.load.aseprite('broker2', 'assets/broker2.png', 'assets/broker2.json');

    // Backgrounds
    this.load.image('bg1', 'assets/bg-layer1.png');
    this.load.image('bg2', 'assets/bg-layer2.png');
    this.load.image('bg3', 'assets/bg-layer3.png');

    // UI
    this.load.image('logo', 'assets/logo.png');

    // Audio
    this.load.audio('crowd-hype', 'assets/audio/applause-clapping-church-crowd-immersive.wav');
    this.load.audio('crowd-sad', 'assets/audio/crowd_shouting.wav');
  }

  create() {
    this.anims.createFromAseprite('broker1');
    this.anims.createFromAseprite('broker2');
    this.scene.start('scene-title');
  }
}

export default BootScene;
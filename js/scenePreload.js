class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('field', '/assets/images/field.png');
    this.load.image('information', '/assets/images/information.png');
    this.load.image('progress', '/assets/images/progress.png');
    this.load.image('pause', '/assets/images/pause.png');
    this.load.image('button_little', '/assets/images/buttom-little.png');
    this.load.image('button', '/assets/images/buttom.png');

    this.load.image('block_red', '/assets/images/block-red.png');
    this.load.image('block_blue', '/assets/images/block-blue.png');
    this.load.image('block_yellow', '/assets/images/block-yellow.png');
    this.load.image('block_purple', '/assets/images/block-purple.png');
    this.load.image('block_green', '/assets/images/block-green.png');
  }

  create() {
    // console.log("Ok")
    this.scene.start('SceneMain');
  }
  update() {
  }
}

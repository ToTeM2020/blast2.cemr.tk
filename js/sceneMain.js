class SceneMain extends Phaser.Scene {
// export default class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    

    preload() {
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // game.stage.backgroundColor = '#e0e4f1';

        this.load.image('block_red','/assets/images/red.png');
    }

    create() {
        var block;
        block = this.add.sprite(50,50, 'block_red');
        block.setInteractive();
        block.setScale(0.2);
    }

    update() {}
}
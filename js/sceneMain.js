class SceneMain extends Phaser.Scene {
// export default class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
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
        var gameField, gameInformation, gameProgress, gamePause, gameButton_little, gameButton;
        var block_red, block_blue;

        gameField = this.add.sprite(0, 0, 'field');
        gameInformation = this.add.sprite(0, 0, 'information');
        gameProgress = this.add.sprite(0, 0, 'progress');
        gamePause = this.add.sprite(0, 0, 'pause');
        gameButton = this.add.sprite(0, 0, 'button');

        block_red = this.add.sprite(0, 0, 'block_red');
        block_blue = this.add.sprite(0, 0, 'block_blue');
        // block3 = this.add.sprite(0,0, 'block_yellow');

        this.aGrid = new AlignGrid({scene: this, rows: 12, cols: 16});
        // this.aGrid.showNumbers();

        gameField.displayWidth = this.aGrid.cw * 7 + 25;
        gameField.displayHeight = this.aGrid.ch * 8 + 25;
        this.aGrid.placeAtIndexCenteY(100, gameField);

        gameInformation.displayWidth = this.aGrid.cw * 5;
        gameInformation.displayHeight = this.aGrid.ch * 5.01;
        this.aGrid.placeAtIndex(92, gameInformation);

        gameProgress.displayWidth = this.aGrid.cw * 8;
        gameProgress.displayHeight = this.aGrid.ch * 2;
        this.aGrid.placeAtIndex(7, gameProgress);

        gamePause.displayWidth = this.aGrid.cw + 25;
        gamePause.displayHeight = this.aGrid.ch + 25;
        this.aGrid.placeAtIndexCenteY(14, gamePause);

        gameButton.displayWidth = this.aGrid.cw * 5;
        gameButton.displayHeight = this.aGrid.ch * 1.5;
        this.aGrid.placeAtIndex(172, gameButton);


        console.log(this.aGrid.cw);


        block_red.displayWidth = game.config.width / this.aGrid.config.cols;
        block_red.scaleY = block_red.scaleX;
        this.aGrid.placeAtIndex(162, block_red);

        block_blue.displayWidth = game.config.width / this.aGrid.config.cols;
        block_blue.scaleY = block_blue.scaleX;
        this.aGrid.placeAtIndex(163, block_blue);

    }

    update() {
    }
}
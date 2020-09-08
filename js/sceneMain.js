// import {addGameField} from "/blast-gameField";

class SceneMain extends Phaser.Scene {
// export default class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        // this.load.image('field', '/assets/images/field.png');
        // this.load.image('information', '/assets/images/information.png');
        // this.load.image('progress', '/assets/images/progress.png');
        // this.load.image('pause', '/assets/images/pause.png');
        // this.load.image('button_little', '/assets/images/buttom-little.png');
        // this.load.image('button', '/assets/images/buttom.png');
        //
        // this.load.image('block_red', '/assets/images/block-red.png');
        // this.load.image('block_blue', '/assets/images/block-blue.png');
        // this.load.image('block_yellow', '/assets/images/block-yellow.png');
        // this.load.image('block_purple', '/assets/images/block-purple.png');
        // this.load.image('block_green', '/assets/images/block-green.png');
    }

    create() {
        var gameField, gameInformation, gameProgress, gamePause, gameButton_little, gameButton;
        var gameFieldRows = 8,
            gameFieldCols = 7;
        var block_red, block_blue;

        gameField = this.add.sprite(0, 0, 'field');
        gameInformation = this.add.sprite(0, 0, 'information');
        gameProgress = this.add.sprite(0, 0, 'progress');
        gamePause = this.add.sprite(0, 0, 'pause');
        gameButton = this.add.sprite(0, 0, 'button');


        this.frames = ['block_red', 'block_blue', 'block_yellow', 'block_purple', 'block_green'];


        this.aGrid = new AlignGrid({scene: this, rows: 12, cols: 16});
        // this.aGrid.showNumbers();

        gameField.displayWidth = this.aGrid.cw * gameFieldCols + 25;
        gameField.displayHeight = this.aGrid.ch * gameFieldRows + 25;
        this.aGrid.placeAtIndexCenteY(100, gameField);
        gameField.setDepth(-100);

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


        this.fieldGrid = new AlignGrid({
            scene: this,
            rows: gameFieldRows,
            cols: gameFieldCols,
            width: gameField.displayWidth - 25,
            height: gameField.displayHeight - 25,
            startX: this.aGrid.cw * 1,
            startY: this.aGrid.ch * 3
        });
        this.fieldGrid.showСoordinate();

        // var count = this.fieldGrid.config.rows * this.fieldGrid.config.cols - 1;
        var count = 0;

        this.blockField = [];
        for (var i = 0; i < this.fieldGrid.config.rows; i++) {
            this.blockField[i] = [];
            for (var j = 0; j < this.fieldGrid.config.cols; j++) {
                var color = Phaser.Math.Between(0, 4);
                this.blockField[i][j] = this.add.image(0, 0, this.frames[color]).setInteractive();
                this.blockField[i][j].displayWidth = this.fieldGrid.cw * 1;
                this.blockField[i][j].displayHeight = this.fieldGrid.ch * 1.1;
                this.blockField[i][j].name = "freeBlock";
                this.fieldGrid.placeAt(j, i, this.blockField[i][j]);
                this.blockField[i][j].setDepth(-count);

                count++;
            }
        }
        // console.log(this.blockField[0][0].texture.key);
        console.log(this.blockField)
        this.input.on("pointerdown", this.clickBlock, this);

    }

    update() {
    }

    clickBlock(pointer) {
        // console.log(this.game.getFrame(), 'pd', pointer.x, pointer.y);
        var row = Math.floor((pointer.y - this.fieldGrid.config.startY) / this.fieldGrid.ch),
            col = Math.floor((pointer.x - this.fieldGrid.config.startX) / this.fieldGrid.cw);

        this.newBlockField = this.blockField;

        console.log("New",this.newBlockField);
        console.log("Нажата: ", row, col);

        if (row >= 0 && row < this.fieldGrid.config.rows && col >= 0 && col < this.fieldGrid.config.cols) {
            var color = this.blockField[row][col].texture.key;

            this.searchBlock(row, col, color);

            // this.blockField[row][col].destroy();
        }

        this.add.rectangle(pointer.x, pointer.y, 8, 8, 0xff00ff);
        console.log(this.blockField);
    }

    searchBlock(row, col, color) {
        var nameBlock = "sameBlock";
        var nameBlock2 = "freeBlock";
        if (row >= 0 && row < this.fieldGrid.config.rows && col >= 0 && col < this.fieldGrid.config.cols) {
            if (this.blockField[row][col].name == nameBlock2) {
                if (this.blockField[row][col].texture.key == color) {
                    this.blockField[row][col].name = nameBlock;

                    this.searchBlock(row, col - 1, color);
                    this.searchBlock(row, col + 1, color);
                    this.searchBlock(row - 1, col, color);
                    this.searchBlock(row + 1, col, color);
                    this.blockField[row][col].name = nameBlock;
                    console.log("Совпала: ", row, col);
                    this.blockField[row][col].destroy();
                }
            }
        }
    }

    searchBlock2(row, col, color) {
        // console.log("Передал: ", row, col, color);
        var nameBlock = "sameBlock";
        var nameBlock2 = "freeBlock";

        if (this.blockField[row][col].name == nameBlock2) {
            this.blockField[row][col].name = nameBlock;
            if (col - 1 >= 0) {
                if (this.blockField[row][col - 1].texture.key == color) {
                    // this.blockField[row][col - 1].name = nameBlock;
                    this.searchBlock2(row,col - 1, color);
                    // console.log("Левый: ", row, col - 1);
                    // console.log(this.blockField[row][col - 1].name);
                }
            }
            if (col + 1 < this.fieldGrid.config.cols) {
                if (this.blockField[row][col + 1].texture.key == color) {
                    // this.blockField[row][col + 1].name = nameBlock;
                    this.searchBlock2(row,col + 1, color);
                    // console.log("Правый: ", row, col + 1);
                }
            }
            if (row - 1 >= 0) {
                if (this.blockField[row - 1][col].texture.key == color) {
                    // this.blockField[row - 1][col].name = nameBlock;
                    this.searchBlock2(row - 1,col, color);
                    // console.log("Верхний: ", row - 1, col);
                }
            }
            if (row + 1 < this.fieldGrid.config.rows) {
                if (this.blockField[row + 1][col].texture.key == color) {
                    // this.blockField[row + 1][col].name = nameBlock;
                    this.searchBlock2(row + 1,col, color);
                    // console.log("Нижний: ", row + 1, col);
                }
            }
            console.log("Совпала: ", row, col);
        }
    }
}
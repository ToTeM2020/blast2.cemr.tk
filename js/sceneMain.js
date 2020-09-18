// import {addGameField} from "/blast-gameField";

class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
        this.score = 0;
        this.scoreWin = 600;
        this.moves = 50;
    }

    preload() {
        let gameInformation, gameProgress, gamePause, gameButton_little, gameButton;
        let gameFieldRows = 8,
            gameFieldCols = 7;
        let progressBox;

        this.gameField = this.add.sprite(0, 0, 'field');
        gameInformation = this.add.sprite(0, 0, 'information');
        gameProgress = this.add.sprite(0, 0, 'progress');
        // this.gamePause = this.add.sprite(0, 0, 'pause');
        // gameButton = this.add.sprite(0, 0, 'button');
        progressBox = this.add.sprite(0, 0, 'progressBox');

        this.frames = ['block_red', 'block_blue', 'block_yellow', 'block_purple', 'block_green'];

        this.aGrid = new AlignGrid({scene: this, rows: 12, cols: 16});
        // this.aGrid.showNumbers();

        this.gameField.displayWidth = this.aGrid.cw * gameFieldCols + 25;
        this.gameField.displayHeight = this.aGrid.ch * gameFieldRows + 25;
        this.aGrid.placeAtIndexCenteY(100, this.gameField);
        this.gameField.setDepth(-100);

        gameInformation.displayWidth = this.aGrid.cw * 5;
        gameInformation.displayHeight = this.aGrid.ch * 5.01;
        this.aGrid.placeAtIndex(92, gameInformation);

        gameProgress.displayWidth = this.aGrid.cw * 8;
        gameProgress.displayHeight = this.aGrid.ch * 2;
        this.aGrid.placeAtIndex(7, gameProgress);

        // this.gamePause.displayWidth = this.aGrid.cw + 25;
        // this.gamePause.displayHeight = this.aGrid.ch + 25;
        // this.aGrid.placeAtIndexCenteY(14, this.gamePause);

        // gameButton.displayWidth = this.aGrid.cw * 5;
        // gameButton.displayHeight = this.aGrid.ch * 1.5;
        // this.aGrid.placeAtIndex(172, gameButton);

        let textSizePoints = this.aGrid.ch / 2;
        let textSizeMoves = this.aGrid.ch;

        this.gamePoints = this.add.text(0, 0, '' + this.score + '', {
            fontSize: '' + textSizePoints + 'px',
            fontFamily: 'Aria',
            align: 'center',
        }).setOrigin(0.5);
        this.aGrid.placeAtIndexCenteY(108, this.gamePoints);

        this.gameMoves = this.add.text(0, 0, '' + this.moves + '', {
            fontSize: '' + textSizeMoves + 'px',
            fontFamily: 'Aria',
            align: 'center',
        }).setOrigin(0.5);
        this.aGrid.placeAtIndexCenteY(76, this.gameMoves);

        progressBox.displayWidth = this.aGrid.cw * 5;
        progressBox.displayHeight = this.aGrid.ch / 2;
        this.aGrid.placeAtIndexCenteY(7, progressBox);
        progressBox.setDepth(5);

        let sizeText = this.aGrid.ch / 3;
        this.gameCombo = this.add.text(0, 0, '', {
            fontSize: '' + sizeText + 'px',
            fontFamily: 'Aria',
            color: '#20539a',
            align: 'center',
        }).setOrigin(0.5);
        this.aGrid.placeAtIndex(1, this.gameCombo);

        this.progressBar3 = this.add.graphics();
        // console.log(this.gameField);
    }

    create() {
        this.fieldGrid = new AlignGrid({
            scene: this,
            rows: 8,
            cols: 7,
            width: this.gameField.displayWidth - 25,
            height: this.gameField.displayHeight - 25,
            startX: this.aGrid.cw * 1,
            startY: this.aGrid.ch * 3
        });
        //this.fieldGrid.showСoordinate();

        let count = 0;

        this.blockField = [];
        for (let i = 0; i < this.fieldGrid.config.rows; i++) {
            this.blockField[i] = [];
            for (let j = 0; j < this.fieldGrid.config.cols; j++) {
                let color = Phaser.Math.Between(0, 4);
                this.blockField[i][j] = this.add.sprite(0, 0, this.frames[color]).setInteractive();
                this.blockField[i][j].displayWidth = this.fieldGrid.cw * 1;
                this.blockField[i][j].displayHeight = this.fieldGrid.ch * 1.1;
                this.blockField[i][j].name = "freeBlock";
                this.fieldGrid.placeAt(j, i, this.blockField[i][j]);
                this.blockField[i][j].setDepth(-count);

                count++;
            }
        }
        this.newBlockField = this.blockField;

        this.countComboBlocks();

        console.log(this.blockField)
        this.lock = false;
        this.input.on("pointerdown", this.clickBlock, this);
    }

    update() {
    }

    clickBlock(pointer) {
        // console.log(this.game.getFrame(), 'pd', pointer.x, pointer.y);

        let row = Math.floor((pointer.y - this.fieldGrid.config.startY) / this.fieldGrid.ch),
            col = Math.floor((pointer.x - this.fieldGrid.config.startX) / this.fieldGrid.cw);

        if (row >= 0 && row < this.fieldGrid.config.rows && col >= 0 && col < this.fieldGrid.config.cols && this.lock == false) {
            let color = this.blockField[row][col].texture.key;

            this.searchBlock(row, col, color);

            let nameBlock = "sameBlock";
            let nameBlock2 = "freeBlock";
            let count = 0;
            let tt = this.checkСountBlocks(nameBlock, count);

            if (tt > 1) {
                this.blockField = this.newBlockField;
                this.deleteBlocks(nameBlock);
                this.fallBlocks(nameBlock, nameBlock2);
                this.countPoints(tt);
                this.countMoves();
                this.countProgress();
            } else {
                this.animationErrorBlocks(this.blockField[row][col]);
                this.returnBlocks(nameBlock2)
            }

            if (this.moves == 0) {
                let textGame = false;
                this.endGame(textGame);
            }
            if (this.score >= this.scoreWin) {
                let textGame = true;
                this.endGame(textGame);
            }
        }
        console.log(this.blockField);
        // console.log(this.lock);
    }

    searchBlock(row, col, color) {
        let nameBlock = "sameBlock";
        let nameBlock2 = "freeBlock";

        if (row >= 0 && row < this.fieldGrid.config.rows && col >= 0 && col < this.fieldGrid.config.cols) {
            if (this.newBlockField[row][col].name == nameBlock2) {
                if (this.newBlockField[row][col].texture.key == color) {
                    this.newBlockField[row][col].name = nameBlock;

                    this.searchBlock(row, col - 1, color);
                    this.searchBlock(row, col + 1, color);
                    this.searchBlock(row - 1, col, color);
                    this.searchBlock(row + 1, col, color);
                }
            }
        }
    }

    countComboBlocks() {
        let arrayBlocksField = [];
        let nameBlock = "sameBlock";
        let nameBlock2 = "freeBlock";

        for (let i = 0; i < this.fieldGrid.config.rows; i++) {
            for (let j = 0; j < this.fieldGrid.config.cols; j++) {
                let newColor = this.newBlockField[i][j].texture.key;
                this.searchBlock(i, j, newColor);

                let tt = this.comboBlocks(nameBlock, 0);
                if (tt > 1) {
                    arrayBlocksField.push(tt);
                }
            }
        }
        this.returnBlocks(nameBlock2);
        this.gameCombo.setText('Всего совпадений: \n' + arrayBlocksField.length + '');

        // console.log("Всего совпадений: ", arrayBlocksField.length);

        return arrayBlocksField.length;
    }

    comboBlocks(nameBlock, count) {
        for (let i = 0; i < this.fieldGrid.config.rows; i++) {
            for (let j = 0; j < this.fieldGrid.config.cols; j++) {
                if (this.newBlockField[i][j].name == nameBlock) {
                    this.newBlockField[i][j].name = null;
                    count++;
                }
            }
        }
        return count;
    }

    checkСountBlocks(nameBlock, count) {
        for (let i = 0; i < this.fieldGrid.config.rows; i++) {
            for (let j = 0; j < this.fieldGrid.config.cols; j++) {
                if (this.newBlockField[i][j].name == nameBlock) {
                    count++;
                }
            }
        }
        return count;
    }

    deleteBlocks(nameBlock) {
        for (let i = 0; i < this.fieldGrid.config.rows; i++) {
            for (let j = 0; j < this.fieldGrid.config.cols; j++) {
                if (this.blockField[i][j].name == nameBlock) {
                    this.animationDeleteBlocks(this.blockField[i][j]);
                }
            }
        }
    }

    returnBlocks(nameBlock2) {
        for (let i = 0; i < this.fieldGrid.config.rows; i++) {
            for (let j = 0; j < this.fieldGrid.config.cols; j++) {
                this.blockField[i][j].name = nameBlock2;
            }
        }
    }

    fallBlocks(nameBlock, nameBlock2) {
        this.lock = true;
        this.destroyed = 0;

        let count = this.checkСountBlocks(nameBlock, 0);
        if (count == 0) {
            this.lock = false;
            this.countComboBlocks();
        }

        for (let i = this.fieldGrid.config.rows - 1; i >= 0; i--) {
            for (let j = 0; j < this.fieldGrid.config.cols; j++) {
                if (this.blockField[i][j].name == nameBlock) {
                    this.destroyed++;
                    if (i == 0) {
                        let color = Phaser.Math.Between(0, 4);
                        this.blockField[i][j] = this.add.sprite(0, 0, this.frames[color]);
                        this.blockField[i][j].y = this.blockField[i][j].y - this.fieldGrid.ch;
                        this.blockField[i][j].displayWidth = this.fieldGrid.cw * 1;
                        this.blockField[i][j].displayHeight = this.fieldGrid.ch * 1.1;
                        this.fieldGrid.placeAt(j, i, this.blockField[i][j]);
                        this.animationFallBlocks2(this.blockField[i][j]);
                        this.blockField[i][j].name = nameBlock2;
                    } else {
                        this.blockField[i][j] = this.add.sprite(0, 0, this.blockField[i - 1][j].texture.key);
                        this.blockField[i][j].displayWidth = this.fieldGrid.cw * 1;
                        this.blockField[i][j].displayHeight = this.fieldGrid.ch * 1.1;
                        this.fieldGrid.placeAt(j, i, this.blockField[i][j]);
                        this.animationFallBlocks2(this.blockField[i - 1][j], this.blockField[i][j]);
                        if (this.blockField[i - 1][j].name == nameBlock2) {
                            this.blockField[i][j].name = nameBlock2;
                        } else {
                            this.blockField[i][j].name = nameBlock;
                        }
                    }
                }
            }
        }
    }

    animationFallBlocks2(oldBlock, nextBlock) {
        let nameBlock = "sameBlock";
        let nameBlock2 = "freeBlock";

        if (!nextBlock) {
            let nextBlock;
            oldBlock.y = oldBlock.y - this.fieldGrid.ch;
        } else if (oldBlock.name == nameBlock2) {
            oldBlock.alpha = 1;
            nextBlock.alpha = 0;
        } else {
            nextBlock.alpha = 0;
        }

        this.tweens.add({
            targets: oldBlock,
            y: '+=' + this.fieldGrid.ch + '',
            duration: 150,
            callbackScope: this,
            onComplete: function () {
                if (!nextBlock) {
                    oldBlock.alpha = 1;
                } else if (oldBlock.name == nameBlock2) {
                    oldBlock.name = nameBlock;
                    nextBlock.name = nameBlock2;
                    nextBlock.alpha = 1;
                    oldBlock.destroy();
                } else {
                }
                this.destroyed--;
                if (this.destroyed == 0) {
                    this.fallBlocks(nameBlock, nameBlock2);
                }
            }
        });
    }

    animationDeleteBlocks(block) {
        let scaleBlock = block.scale;

        this.tweens.add({
            targets: block,
            alpha: 0,
            scale: scaleBlock / 2,
            duration: 200,
            completeDelay: 0,
            onComplete: function () {
            },
        });
    }

    animationErrorBlocks(block) {
        let scaleBlock = block.scale;

        this.tweens.add({
            targets: block,
            scale: scaleBlock / 1.1,
            duration: 100,
            callbackScope: this,
            onComplete: function () {
                block.scale = scaleBlock;
            }
        });
    }

    animationCountPoints(points) {
        let sizeText = this.aGrid.ch / 2;
        let textCountPoints = this.add.text(0, 0, '', {
            fontSize: '' + sizeText + 'px',
            fontFamily: 'Aria',
            color: '#20539a',
            align: 'center',
        }).setOrigin(0.5);
        this.aGrid.placeAtIndex(156, textCountPoints);

        textCountPoints.setText('+ ' + points * points + '');

        this.tweens.add({
            targets: textCountPoints,
            alpha: {
                getStart: () => 1,
                getEnd: () => 0
            },
            y: '-=' + this.fieldGrid.ch * 1.5 + '',
            duration: 1100,
            callbackScope: this
        });
    }

    countPoints(points) {
        this.score += points * points;
        this.gamePoints.setText(this.score);
        this.animationCountPoints(points);
    }

    countMoves() {
        this.moves--;
        this.gameMoves.setText(this.moves);
    }

    countProgress() {
        let progressPercent = Math.floor(this.score * 100 / this.scoreWin);
        let progressBarX = this.aGrid.cw * 5 + this.aGrid.cw / 8,
            progressBarY = this.aGrid.ch / 1.25,
            progressBarMaxX = Math.floor((this.aGrid.cw * 4.8) * (progressPercent / 100)),
            progressBarMaxY = this.aGrid.ch / 2.65,
            progressBarRadios = this.aGrid.cw / 6;

        if (progressBarMaxX >= this.aGrid.cw * 4.8) {
            progressBarMaxX = this.aGrid.cw * 4.8;
        }
        if (progressPercent < 8) {
            progressBarY = this.aGrid.ch / 1.2,
                progressBarMaxY = this.aGrid.ch / 3,
                progressBarRadios = progressPercent;
        }

        this.progressBar3.clear();
        this.progressBar3.fillStyle(0x19ff19, 1);
        this.progressBar3.fillRoundedRect(progressBarX, progressBarY, progressBarMaxX, progressBarMaxY, progressBarRadios);
        this.progressBar3.setDepth(10);
    }

    endGame(textGame) {
        let gamePole = this.add.sprite(0, 0, 'button');

        gamePole.displayWidth = this.aGrid.cw * 9;
        gamePole.displayHeight = this.aGrid.ch * 5;
        this.aGrid.placeAtIndex(104, gamePole);
        gamePole.setDepth(10);

        let textEndGame;
        if (textGame == false) {
            textEndGame = 'Проигрыш!';
        } else {
            textEndGame = 'Победа!';
        }

        let sizeEndGame = this.aGrid.ch * 1.5;
        let showEndGame = this.add.text(0, 0, '' + textEndGame + '', {
            fontSize: '' + sizeEndGame + 'px',
            fontFamily: 'Aria',
            align: 'center',
        }).setOrigin(0.5);
        this.aGrid.placeAtIndex(104, showEndGame);
        showEndGame.setDepth(11);
        this.restartGame();
    }

    restartGame() {
        this.input.on("pointerdown", function () {
            // this.scene.stop().start('Preloader');
            this.registry.destroy();
            this.events.off();
            this.scene.restart(this.score = 0, this.moves = 50);
        }, this);
    }

}
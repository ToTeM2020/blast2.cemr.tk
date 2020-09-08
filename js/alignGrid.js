class AlignGrid {
    constructor(config) {
        this.config = config;
        if (!config.scene) {
            console.log("missing scene");
            return;
        }
        if (!config.rows) {
            config.rows = 5;
        }
        if (!config.cols) {
            config.cols = 5;
        }
        if (!config.height) {
            config.height = game.config.height;
        }
        if (!config.width) {
            config.width = game.config.width;
        }
        if (!config.startX) {
            config.startX = 0;
        }
        if (!config.startY) {
            config.startY = 0;
        }

        this.scene = config.scene;

        //cell width
        this.cw = config.width / config.cols;
        //cell height
        this.ch = config.height / config.rows;
    }

    show() {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);

        for (var i = this.config.startX; i < this.config.width + this.config.startX; i += this.cw) {
            this.graphics.moveTo(i, this.config.startY);
            this.graphics.lineTo(i, this.config.height + this.config.startY);
        }

        for (var i = this.config.startY; i < this.config.height + this.config.startY; i += this.ch) {
            this.graphics.moveTo(this.config.startX, i);
            this.graphics.lineTo(this.config.width + this.config.startX, i);
        }


        this.graphics.strokePath();
    }

    placeAt(xx, yy, obj) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2 + this.config.startX;
        var y2 = this.ch * yy + this.ch / 2 + this.config.startY;

        obj.x = x2;
        obj.y = y2;
    }

    placeAtIndex(index, obj) {
        var yy = Math.floor(index / this.config.cols);
        var xx = index - (yy * this.config.cols);

        this.placeAt(xx, yy, obj);

    }

    placeAtCenteX(xx, yy, obj) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw + this.config.startX;
        var y2 = this.ch * yy + this.ch / 2 + this.config.startY;

        obj.x = x2;
        obj.y = y2;
    }

    placeAtIndexCenteX(index, obj) {
        var yy = Math.floor(index / this.config.cols);
        var xx = index - (yy * this.config.cols);

        this.placeAtCenteX(xx, yy, obj);

    }

    placeAtCenteY(xx, yy, obj) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2 + this.config.startX;
        var y2 = this.ch * yy + this.ch + this.config.startY;

        obj.x = x2;
        obj.y = y2;
    }

    placeAtIndexCenteY(index, obj) {
        var yy = Math.floor(index / this.config.cols);
        var xx = index - (yy * this.config.cols);

        this.placeAtCenteY(xx, yy, obj);

    }

    // placeAt(xx, yy, obj) {
    //     //calc position based upon the cellwidth and cellheight
    //     var x2 = this.cw * xx + this.cw / 2 + this.config.startX;
    //     var y2 = this.ch * yy + this.ch / 2 + this.config.startY;
    //
    //     obj.x = x2;
    //     obj.y = y2;
    // }
    //
    // placeAtСoordinate(index, obj) {
    //     var yy = Math.floor(index / this.config.cols);
    //     var xx = index - (yy * this.config.cols);
    //
    //     this.placeAt(xx, yy, obj);
    //
    // }

    showNumbers() {
        this.show();
        var count = 0;
        for (var i = 0; i < this.config.rows; i++) {
            for (var j = 0; j < this.config.cols; j++) {

                var numText = this.scene.add.text(0, 0, count, {color: '#ff0000'});
                numText.setOrigin(0.5, 0.5);
                this.placeAtIndex(count, numText);

                count++;
            }
        }
    }

    showСoordinate() {
        this.show();
        var count = 0;
        for (var i = 0; i < this.config.cols; i++) {
            for (var j = 0; j < this.config.rows; j++) {

                var numText1 = this.scene.add.text(0, 0, i, {backgroundColor: '#ffffff', color: '#000000'});
                numText1.setOrigin(0, 0.5);
                // this.placeAtIndex(count, numText1);
                this.placeAt(i, j, numText1);
                var numText2 = this.scene.add.text(0, 0, j, {backgroundColor: '#000000', color: '#ffffff'});
                numText2.setOrigin(1, 0.5);
                this.placeAt(i, j, numText2);

                count++;

            }
        }
    }
}
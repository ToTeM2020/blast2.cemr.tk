// import {Preloader} from "./preload";

var game;
window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: 800,
        height: 600,
        backgroundColor: '#eee',
        scene: [
            Preloader,
            SceneMain
        ]
    };

    game = new Phaser.Game(config);
};

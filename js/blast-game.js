let game;
window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: 800,
        height: 600,
        scale: {
            // mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        backgroundColor: '#eee',
        scene: [
            Preloader,
            SceneMain
        ]
    };

    game = new Phaser.Game(config);
};

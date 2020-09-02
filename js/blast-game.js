var game;
window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: 800,
        height: 600,
        backgroundColor: '#eee',
        scene: [SceneMain]
    };

    game = new Phaser.Game(config);
};

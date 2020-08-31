window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: 800,
        heigth: 566,
        backgroundColor: '#eee',
        scene: [SceneMain]
    };

    var game = new Phaser.Game(config);
    
};

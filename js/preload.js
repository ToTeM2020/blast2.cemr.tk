Game.Preload = function(game){};
Game.Preload.prototype.preload = function(){
  this.load.image('block_red','assets/image/red');
  game.stage.backgroundColor = '#e0e4f1';
};

Game.Preload.prototype.create = function(){
  this.game.state.start("Main");
};

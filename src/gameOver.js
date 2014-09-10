Lizzard.GameOver = function (game) {
	this.music = null;
    this.logo = null;
	this.playButton = null;

};

Lizzard.GameOver.prototype.create = function () {
	this.game.add.sprite(this.game.world.centerX-250, this.game.world.centerY -100, 'gameOver');
	this.game.add.button(this.game.world.centerX-250, this.game.world.centerY -100, 'tryAgain', this.onTryAgain, this, 2, 1, 0);
	//this.game.add.sprite(0, 0, 'bg');
};

Lizzard.GameOver.prototype.update = function () {

};

Lizzard.GameOver.prototype.onTryAgain = function () {
	this.game.state.start('GameStageOne');
};
Lizzard.Winner = function (game) {
	this.music = null;
};

Lizzard.Winner.prototype.create = function () {
	this.game.add.sprite(this.game.world.centerX-250, this.game.world.centerY -100, 'winner');
	game.add.button(this.game.world.centerX-250, this.game.world.centerY -100, 'returnMenu', this.onReturnClick, this, 2, 1, 0);
};
Lizzard.Winner.prototype.update = function () {

};

Lizzard.Winner.prototype.onReturnClick = function () {
	this.game.state.start('MainMenu');
};
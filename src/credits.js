Lizzard.Credits = function (game) {
	this.music = null;
	this.logoCredits;
};

Lizzard.Credits.prototype.create = function () {

	this.logoCredits = this.add.sprite(0, 0, 'creditsPage');
	this.game.add.button(this.game.world.centerX +270, 20, 'returnMainMenu', this.onReturnHandler, this, 2, 1, 0);
};

Lizzard.Credits.prototype.update = function () {

};

Lizzard.Credits.prototype.onReturnHandler = function () {
	this.game.state.start('MainMenu');
};
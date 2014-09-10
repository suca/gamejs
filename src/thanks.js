Lizzard.Thanks = function (game) {
	this.music = null;
	this.logoThanks;

};

Lizzard.Thanks.prototype.create = function () {
	this.logoThanks = this.add.sprite(0, 0, 'thanksPage');
	
	this.game.add.button(this.game.world.centerX +270, 20, 'returnMainMenu', this.onReturnHandler, this, 2, 1, 0);
};

Lizzard.Thanks.prototype.update = function () {

};

Lizzard.Thanks.prototype.onReturnHandler = function () {
	this.game.state.start('MainMenu');
};
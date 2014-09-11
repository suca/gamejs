Lizzard.InstructionOne = function (game) {
	this.music = null;
	this.backgroundInstruction = null;
};

Lizzard.InstructionOne.prototype.create = function () {

	this.logoCredit = this.add.sprite(0, 0, 'instruction1');
    this.game.add.button(this.game.world.centerX +200, this.game.world.centerY+70, 'startGame', this.onPlayHandler, this, 2, 1, 0);
};

Lizzard.InstructionOne.prototype.update = function () {

};

Lizzard.InstructionOne.prototype.onPlayHandler = function () {
	this.game.state.start('GameStageOne');
};
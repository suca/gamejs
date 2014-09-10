Lizzard.MainMenu = function (game) {
	this.music = null;
    this.logo = null;
	this.playButton = null;

};

Lizzard.MainMenu.prototype.create = function () {
	this.game.add.sprite(0, 0, 'splash');
    
    //Add logo
	//this.logoPlay = this.add.sprite(this.game.world.centerX-250, this.game.world.centerY -100, 'play');
    //this.logoThanks = this.add.sprite(this.game.world.centerX-250, this.game.world.centerY+70, 'thanks');
    //this.logoCredit = this.add.sprite(this.game.world.centerX-250, this.game.world.centerY +200, 'credits');
    
    //this.logoPlay = this.add.button(this.game.world.centerX-250, this.game.world.centerY -100, 'play');
    //this.logoThanks = this.add.button(this.game.world.centerX-250, this.game.world.centerY+70, 'thanks');
    //this.logoCredit = this.add.button(this.game.world.centerX-250, this.game.world.centerY +200, 'credits');
    
    this.game.add.button(this.game.world.centerX-250, this.game.world.centerY -100, 'play', this.onPlayHandler, this, 2, 1, 0);
    this.game.add.button(this.game.world.centerX-250, this.game.world.centerY+70, 'thanks', this.onThanksHandler, this, 2, 1, 0);
    this.game.add.button(this.game.world.centerX-250, this.game.world.centerY +200, 'credits', this.onCreditsHandler, this, 2, 1, 0);
    //Presentation
    //game.add.button(this.game.world.centerX-150, this.game.world.centerY+200, 'thanks', this.onThanksHandler, this, 2, 1, 0);
};

Lizzard.MainMenu.prototype.update = function () {

};

Lizzard.MainMenu.prototype.startGame = function () {

};

Lizzard.MainMenu.prototype.onPlayHandler = function () {
	this.game.state.start('InstructionOne');
};
Lizzard.MainMenu.prototype.onThanksHandler = function () {
    
    this.game.state.start('Thanks');
};
Lizzard.MainMenu.prototype.onCreditsHandler = function () {

    this.game.state.start('Credits');
};



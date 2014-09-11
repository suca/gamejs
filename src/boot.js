Lizzard = {};
Lizzard.Boot = function (game) {

};

Lizzard.Boot.prototype.preload = function () {
	this.load.image('preloaderBackground', 'assets/img/preloader_background.jpg');
	this.load.image('preloaderBar', 'assets/img/preloader_bar.png');
	
	/*this.load.image('initBackground', 'assets/img/background.jpg');
	this.load.image('platform', 'assets/img/platform.png');
	this.load.spritesheet('zebra', 'assets/img/zebra.png', 144, 230);*/
};

Lizzard.Boot.prototype.create = function () {
	this.game.input.maxPointers = 1;

	//this.game.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
	    this.game.stage.scale.pageAlignHorizontally = true;
    }

	this.game.state.start('Preloader');
};


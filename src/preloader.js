Lizzard.Preloader = function (game) {
	this.background = null;
	this.person = null;
	this.preloadBar = null;
	
	this.ready = false;

};

Lizzard.Preloader.prototype.preload = function () {
	this.game.stage.backgroundColor = '#000000';
	//this.background = this.add.sprite(0,0, 'initBackground');
	//this.person = this.add.sprite(0,0, 'zebra');
	this.background = this.add.sprite(0, 0, 'preloaderBackground');
	this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

	this.load.setPreloadSprite(this.preloadBar);
	this.load.image('background1', 'assets/img/background.png');
	//Main Menu
	this.load.image('splash', 'assets/img/splash.png');
	this.load.spritesheet('play', 'assets/img/play.png');
	this.load.spritesheet('thanks', 'assets/img/thanks.png');
	this.load.spritesheet('credits', 'assets/img/credits.png');

	//Instruction
	this.load.image('instruction1', 'assets/img/instructions.png');
	this.load.image('startGame', 'assets/img/start.png');

	//thanks
	this.load.image('thanksPage', 'assets/img/thanksPage.png');
	this.load.image('returnMainMenu', 'assets/img/back.png');

	//Credits	
	this.load.image('creditsPage', 'assets/img/creditsPage.png');

	//Winner
	this.load.image('winner', 'assets/img/winner.png');
	this.load.image('returnMenu', 'assets/img/returnMenu.png');

	this.load.image('pixel', 'assets/img/pixel.png');
	this.load.image('block', 'assets/img/block.png');
	this.load.image('floor', 'assets/img/suelo.png');
	this.load.image('rio', 'assets/img/rio.png');
	this.load.image('indicador', 'assets/img/triangulo.png');
	this.load.atlas('frosto', 'assets/img/frosto.png', "assets/json/frosto.json");
	this.load.atlas('dojo', 'assets/img/dojo.png', "assets/json/dojo.json");

    game.load.image('ground', 'assets/img/ledge2.png');
    game.load.image('boton', 'assets/img/boton.png');
	game.load.image('clock', 'assets/img/reloj.png');
	game.load.image("dojo_cadaver", 'assets/img/dojo_dead.png');
	game.load.image("frosto_cadaver", 'assets/img/frosto_dead.png');

	//Jaula
	game.load.image('cage', 'assets/img/jaula.png');

	//GameOver
	game.load.image('gameOver', 'assets/img/gameover.png');
	game.load.image('tryAgain', 'assets/img/tryAgain.png');

	//skip
	game.load.image('skip', 'assets/img/skip.png');
	
	//Stage Two
	this.load.image('background2', 'assets/img/background.png');

	//Presentation
	this.load.image('presentation1', 'assets/img/intro1.jpg');
	this.load.image('presentation2', 'assets/img/intro2.jpg');
	this.load.image('presentation3', 'assets/img/intro3.jpg');
	this.load.image('presentation4', 'assets/img/intro4.jpg');	


	//Audio
    game.load.audio("dojo", 'assets/audio/dojo.mp3');
    this.game.load.audio("dojo_death", 'assets/audio/dojo2.mp3');
    this.game.load.audio("frosto_death", 'assets/audio/frosto2.mp3');
    game.load.audio("frosto", 'assets/audio/frosto.mp3');
	game.load.audio("jump", 'assets/audio/jump.mp3');
	game.load.audio("jump2", 'assets/audio/frosto_jump.mp3');

	game.load.image("life", 'assets/img/antorcha.png');

};


Lizzard.Preloader.prototype.create = function () {
	this.game.state.start('Presentation');
	//this.game.state.start('GameStageOne');
};

Lizzard.Preloader.prototype.update = function () {

};

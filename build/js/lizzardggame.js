// la tea que dejo encendida nadie la apagara

var game;
window.onload = function() {
	//var game = new Phaser.Game(screen.width, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
    //var game = new Phaser.Game(screen.width, screen.height, Phaser.AUTO, document.body);
    game = new Phaser.Game(934, 600 , Phaser.AUTO, 'gameContainer');

	game.state.add('Boot', Lizzard.Boot);
	game.state.add('Preloader', Lizzard.Preloader);
	game.state.add('MainMenu', Lizzard.MainMenu);
	game.state.add('InstructionOne', Lizzard.InstructionOne);
	game.state.add('InstructionTwo', Lizzard.InstructionTwo);

	game.state.add('Thanks', Lizzard.Thanks);
	game.state.add('Credits', Lizzard.Credits);
	game.state.add('Presentation', Lizzard.Presentation);
	game.state.add('Winner', Lizzard.Winner);

    game.state.add('GameOver', Lizzard.GameOver);
	game.state.add('GameStageOne', Lizzard.GameStageOne);

	game.state.add('GameStageTwo', Lizzard.GameStageTwo);

	game.state.start('Boot');
	
};

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


Lizzard.Presentation = function (game) {
	this.music = null;
    this.logo = null;
	this.playButton = null;
	this.pictureA;
	this.pictureB;
	this.timer;
	this.current = 3;
};

Lizzard.Presentation.prototype.create = function () {

	//this.game.add.button(this.game.world.centerX-250, this.game.world.centerY -100, 'returnMainMenu', this.onReturn, this, 2, 1, 0);
	//this.game.add.sprite(0, 0, 'bg');
	//this.game.add.button(this.game.world.centerX-250, this.game.world.centerY -100, 'skip', this.onSkipHandler, this, 2, 1, 0);

	this.game.stage.backgroundColor = '#000';
	//this.game.add.sprite(0, 0, 'splash');
    this.pictureA = this.game.add.sprite(0, 0, 'presentation1');
    //this.pictureA.anchor.setTo(1, 1);
    this.pictureA.scale.setTo(0.3, 0.3);
    this.pictureB = this.game.add.sprite(0, 0, 'presentation2');
    //this.pictureB.anchor.setTo(1, 1);
    this.pictureB.scale.setTo(0.3, 0.3);
    this.pictureB.alpha = 0;

    this.timer = this.game.time.create(false);

    this.timer.add(4000, this.fadePictures, this);

    this.timer.start();

};
Lizzard.Presentation.prototype.onSkipeHandler = function () {
	onSkipHandler
};

Lizzard.Presentation.prototype.fadePictures = function() {

    //  Cross-fade the two pictures
    var tween;

    if (this.pictureA.alpha === 1)
    {
        tween = this.game.add.tween(this.pictureA).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.pictureB).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    }
    else
    {
        this.game.add.tween(this.pictureA).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        tween = this.game.add.tween(this.pictureB).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }

    //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    tween.onComplete.add(this.changePicture, this);

}

Lizzard.Presentation.prototype.changePicture = function () {

    if (this.pictureA.alpha === 0) {
        this.pictureA.loadTexture('presentation' + this.current);
    }
    else {
        this.pictureB.loadTexture('presentation' + this.current);
    }

    this.current++;

    /*if (this.current > 4) {
        this.current = 1;
    }*/

    //  And set a new TimerEvent to occur after 3 seconds
    this.timer.add(4000, this.fadePictures, this);

}
Lizzard.Presentation.prototype.update = function () {

};
Lizzard.Presentation.prototype.render = function () {
	//this.game.debug.text("Time until event: " + this.timer.duration.toFixed(0), 10, 20);
	if (this.current > 6) {
		this.game.state.start('MainMenu');
	}
	
};

Lizzard.Presentation.prototype.onReturn = function () {
	
};
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
Lizzard.InstructionTwo = function (game) {
	this.music = null;

};

Lizzard.InstructionTwo.prototype.create = function () {

};

Lizzard.InstructionTwo.prototype.update = function () {

};

Lizzard.InstructionTwo.prototype.onClick = function () {

};
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
Lizzard.GameStageOne = function (game) {
        //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game = game;       //  a reference to the currently running game
    this.add;       //  used to add sprites, text, groups, etc
    this.camera;    //  a reference to the game camera
    this.cache;     //  the game cache
    this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;      //  for preloading assets
    this.math;      //  lots of useful common math operations
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage;     //  the game stage
    this.time;      //  the clock
    this.player;
    this.player2;
    this.flag;    
    this.cursors;
    this.direction = 'right'; 
    this.switchButton;
    this.activePlayer = 1;
    this.indicador;
 
    this.platformGroup;
    this.riosGroup;
    this.ledgePlatforms;
    this.ledgeMovible;
    this.boxImage;
    this.bg;
    this.clockImage;
    //Mode Ninja
    this.box;
    this.cursors;
    this.ledges;
    this.blocks;
    this.boton;

    this.ledgePositions = [
        {
            x: 330,
            y: 230
        },
        {
            x: 970,
            y: 240
        },
        {
            x: 1450,
            y: 350
        },
        {
            x: 610,
            y: 370
        },
        {
            x: 3000,
            y: 300
        },
        {
            x: 2500,
            y: 270
        },
        {
            x: 3500,
            y: 170
        }
    ];


    this.textCounterPlayerOne;
    this.timerPlayer1;

    this.startCounter1=false;

    this.blocksMoved = {};
    this.textCounterPlayerTwo;
    this.timerPlayer2;
    this.allBlocks = [];
    this.textGameOver;


    this.timeGamePlayer1 = 120;
    this.timeGamePlayer2 = 120;

    this.counterPlayerOne = 120;
    this.counterPlayerTwo = 120;

    this.startCounter2=false;

    this.livesPlayer1 = 3;
    this.livesPlayer2 = 3;

    this.startCounter2=false;

    //If the player was killed or not
    this.playerIsDead = false;
    this.player2IsDead = false;

    this.player1Life1;
    this.player1Life2;
    this.player1Life3;
    this.player2Life1;
    this.player2Life2;
    this.player2Life3;
    this.counterPlayerOne = this.timeGamePlayer1;
    this.counterPlayerTwo = this.timeGamePlayer2;

};

Lizzard.GameStageOne.prototype.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //this.game.physics.startSystem(Phaser.Physics.NINJA);

    this.createScene();
    this.createCage();
    this.createBlocks();
    this.createPlayer1();
    this.createPlayer2();
    //this.randomBlocks();
    
    //Ninja mode
    //this.initializeMoveBlocks();
    this.cursors = this.game.input.keyboard.createCursorKeys(); 
    this.switchButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.initCounterPlayerOne();
    this.initCounterPlayerTwo();


    this.game.add.tween(this.ledgeMovible).to({ x: 1800 }, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
};

Lizzard.GameStageOne.prototype.update = function () {
    //var i;

    
    this.switchPlayers();
    this.setIndicador();

    this.collideElements();
    this.moveBlocks();
    this.verifyIfPlayersIsOnWater();
    this.centerClock();

    if (this.player.x > this.game.world.width - 300 && this.player2.x > this.game.world.width - 300) {
        this.youWin();
    }

    this.reviewLifes();
};
Lizzard.GameStageOne.prototype.centerClock = function () {
    this.clockImage.x = this.game.camera.x +450;
    this.clockImage.y = this.game.camera.y +10;
    this.textCounterPlayerOne.x = this.game.camera.x +425;
    this.textCounterPlayerOne.y = this.game.camera.y +7;
    this.textCounterPlayerTwo.x = this.game.camera.x +507;
    this.textCounterPlayerTwo.y = this.game.camera.y +7;

    this.player1Life1.x = this.game.camera.x + 300;
    this.player1Life2.x = this.game.camera.x + 330;
    this.player1Life3.x = this.game.camera.x + 360;
    this.player2Life1.x = this.game.camera.x + 530;
    this.player2Life2.x = this.game.camera.x + 560;
    this.player2Life3.x = this.game.camera.x + 580;
};

Lizzard.GameStageOne.prototype.initializeMoveBlocks = function () {
    var k;
    
    this.box = this.game.add.sprite(600, 450, 'block');
    this.box.name = 'blockB';
    //this.box.tint = Math.random() * 0xffffff;
    
    this.game.physics.ninja.enableAABB([this.player, this.box]);
    this.game.physics.ninja.enableAABB([this.player2, this.box]);
    //game.physics.ninja.enableAABB([sprite1, this.box]);
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
};

Lizzard.GameStageOne.prototype.createBlocks = function () {
    var block;
    this.blocks = game.add.group();
    
    this.blocks.enableBody = true;
    for (j=0; j<this.ledgePositions.length; j+=1) {
        block = this.blocks.create(this.ledgePositions[j].x + 40, this.game.world.height -this.ledgePositions[j].y-100, 'block');
        block.scale.setTo(1, 0.5);
        block.name = "block_"+j;

        block.body.gravity.y = 500;
        block.body.collideWorldBounds = true;
        block.body.maxVelocity.x = 0.1;
        block.body.bounce.y = 0.4 ;
        block.body.immovable = false;
        this.allBlocks.push(block);

    }

    this.game.physics.arcade.collide(block);
};

Lizzard.GameStageOne.prototype.keepBlocks = function () {
    var i;
    var block;
    var blocks = game.add.group();
    blocks.enableBody = true;

     for (var prop in this.blocksMoved) {
        if( this.blocksMoved.hasOwnProperty( prop ) ) {
            block = this.blocksMoved[prop];
            //block.body.collideWorldBounds = true;
            block.body.maxVelocity.x = 0;
            block.body.bounce.y = 0.4 ;
            block.body.immovable = false;
            block.tint = Math.random() * 0xffffff;
          //this.blocksMoved[prop].body.bounce.y = 0.8 + Math.random() * 0.2;
        } 
    }
    this.game.physics.arcade.collide(block, this.platformGroup);
    /*for (i = 0; i < this.blocksMoved.length; i++) {
        this.blocksMoved[j].body.immovable = true;
        this.blocksMoved[j].body.bounce.y = 0.8 + Math.random() * 0.2;
    }*/
    
};

Lizzard.GameStageOne.prototype.randomBlocks = function () {
    var block = this.game.add.group();
        block.enableBody = true;
    var allBlocks = this.allBlocks;
    this.randomBlockInterval = setInterval(function(){
        
        block = block.create(Math.random() * document.body.clientWidth, 0, 'block');
        block.name = "block_" + allBlocks.length;
        block.scale.setTo(1, 0.5);
        block.body.gravity.y = 500;
        block.body.collideWorldBounds = true;
        block.body.maxVelocity.x = 0.1;
        block.body.bounce.y = 0.4 ;
        block.body.immovable = false;

 
        allBlocks.push(block);
    }, 10000);
};

Lizzard.GameStageOne.prototype.collideElements = function () {
    var that = this;
    this.game.physics.arcade.collide(this.player, this.platformGroup);
    this.game.physics.arcade.collide(this.player2, this.platformGroup);
    this.game.physics.arcade.collide(this.player, this.ledgeMovible);
    this.game.physics.arcade.collide(this.player2, this.ledgeMovible);
    this.game.physics.arcade.collide(this.player, this.blocks, function (a, b, c) {
        that.onMoveBlock(that, a, b);
    });
    this.game.physics.arcade.collide(this.player2, this.blocks, function (a, b, c) {
        that.onMoveBlock(that, a, b);
    });
    this.game.physics.arcade.collide(this.player, this.platformGroup);
    this.game.physics.arcade.collide(this.blocks, this.platformGroup);
    this.game.physics.arcade.collide(this.blocks, this.blocks);
    this.game.physics.arcade.overlap(this.player1, this.riosGroup, function() {
        console.log(argument);
    });
};
Lizzard.GameStageOne.prototype.onMoveBlock = function (a, b, c, d) {
    console.log("log", a,b,c,d);
    for (j=0; j<this.allBlocks.length; j+=1){
        if (this.allBlocks[j].name === c.name) {
            this.blocksMoved[b.name] = this.allBlocks[j];
        }
    }
    console.log(" Lizzard ",a, b);
};

Lizzard.GameStageOne.prototype.moveBlocks = function () {


    if (this.cursors.left.isDown) {
        //this.player.body.moveLeft(20);
        //sprite1.body.moveLeft(20);
    }
    else if (this.cursors.right.isDown) {
        //this.player.body.moveRight(20);
        //sprite1.body.moveRight(20);
    }

    if (this.cursors.up.isDown) {
        //this.player.body.moveUp(30);
        //sprite1.body.moveUp(30);
    }
};


Lizzard.GameStageOne.prototype.render = function () {
    this.animarPlayer1();
    this.animarPlayer2();
};
Lizzard.GameStageOne.prototype.click = function () {

};


//COUNTER time

Lizzard.GameStageOne.prototype.initCounterPlayerOne =  function(){
    //this.counterPlayerOne = 50;
    //this.textCounterPlayerOne = this.game.add.text(90 ,120, 'Frosto'  + ' \n50', { font: "32px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerOne = this.game.add.text(90 ,120, 'Frosto'  + ' \n'+this.counterPlayerOne, { font: "16px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerOne.anchor.setTo(0.5,0);
    this.timerPlayer1 = game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter1, this);
};

Lizzard.GameStageOne.prototype.startCounterPlayerOne = function (){
    this.startCounter1 = true;
};

Lizzard.GameStageOne.prototype.updateCounter1 = function() {

    if(this.counterPlayerOne > 0 && this.startCounter1){
        this.counterPlayerOne--;
        this.textCounterPlayerOne.setText('');
        this.textCounterPlayerOne.setText('Frosto \n' + this.counterPlayerOne);        
    }else{
        this.textCounterPlayerOne.setText('');
        this.textCounterPlayerOne.setText('Frosto \n' + this.counterPlayerOne); 
    }
    if(this.counterPlayerOne == 0 && this.player.alive){
        this.killPlayer1()
    }
};


Lizzard.GameStageOne.prototype.stopCounterPlayerOne = function (){
    this.startCounter2 = true;
    this.startCounter1 = false;
};

Lizzard.GameStageOne.prototype.initCounterPlayerTwo =  function(){
    //this.counterPlayerTwo = 50;

    //this.textCounterPlayerTwo = this.game.add.text(220 ,120 , 'Dojo '  + '\n50', { font: "32px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerTwo = this.game.add.text(220 ,120 , 'Dojo '  + '\n'+this.counterPlayerTwo, { font: "16px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerTwo.anchor.setTo(0.5,0);
    this.timerPlayer2 = game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter2, this);
    
};

Lizzard.GameStageOne.prototype.startCounterPlayerTwo = function (){
    this.startCounter2 = true;
};

Lizzard.GameStageOne.prototype.updateCounter2 = function() {
    if(this.counterPlayerTwo > 0 && this.startCounter2){
        this.counterPlayerTwo--;
        this.textCounterPlayerTwo.setText('');
        this.textCounterPlayerTwo.setText('Dojo \n' + this.counterPlayerTwo);        
    }else{
        this.textCounterPlayerTwo.setText('');
        this.textCounterPlayerTwo.setText('Dojo \n' + this.counterPlayerTwo); 
    }
    if(this.counterPlayerTwo  == 0 && this.player2.alive){

        this.killPlayer2();
    }

}
Lizzard.GameStageOne.prototype.stopCounterPlayerTwo = function (){
    this.startCounter2 = false;
    this.startCounter1 = true;
};

Lizzard.GameStageOne.prototype.verifyIfPlayersIsOnWater = function() {
    var y  = this.riosGroup.children[0].y,
        y2 = this.player2.y + this.player2.height,
        y1 = this.player.y + this.player.height,
        cadaver;
    if(y2 - 20 > y && !this.player2IsDead) {
        this.killPlayer2();
    }
    if(y1 - 20 > y && !this.playerIsDead) {
        this.killPlayer1();
    }
};

Lizzard.GameStageOne.prototype.killPlayer2 = function() {
    var cadaver = this.game.add.sprite(this.player2.x, this.player2.y, 'dojo_cadaver');
    this.game.physics.enable(cadaver, Phaser.Physics.ARCADE);
    this.game.add.tween(cadaver).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, false);
    this.player2.kill();
    switch (this.livesPlayer2){
        case 3:
            this.player2Life3.destroy();
        break;
        case 2:
            this.player2Life2.destroy();
        break;
        case 1:
            this.player2Life1.destroy();
        break;
    }
    this.player2IsDead = true;

    this.audio = this.game.add.audio("dojo_death");
    this.audio.play();
    this.livesPlayer2 -= 1;
    this.switchPlayer();
    if(this.livesPlayer2 > 0) {
        this.counterPlayerTwo = this.timeGamePlayer2;
        this.createPlayer2();
    }
};

Lizzard.GameStageOne.prototype.killPlayer1 = function() {
    var cadaver = this.game.add.sprite(this.player.x, this.player.y, 'frosto_cadaver');
    this.game.physics.enable(cadaver, Phaser.Physics.ARCADE);
    this.game.add.tween(cadaver).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, false);
    this.player.kill();
    switch (this.livesPlayer1){
        case 3:
            this.player1Life1.destroy();
        break;
        case 2:
            this.player1Life2.destroy();
        break;
        case 1:
            this.player1Life3.destroy();
        break;
    }
    this.playerIsDead = true;
    this.audio.play();
    this.livesPlayer1 -= 1;
    this.switchPlayer();
    if(this.livesPlayer1 > 0) {

        this.createPlayer1();
        this.counterPlayerOne = this.timeGamePlayer1;
    }
};
Lizzard.GameStageOne.prototype.reviewLifes = function () {
    if (this.livesPlayer1 <= 0 && this.livesPlayer2 <=0) {
        this.keepBlocks();
        this.gameOver();
    }
};
/**
 * You Win
 */
Lizzard.GameStageOne.prototype.youWin = function () {
    
    this.game.add.sprite(0, 0, 'background1');
    //this.game.state.start('Winner');
    this.logo = this.add.sprite(this.game.world.centerX, 140, 'dojo');
    this.logo.anchor.setTo(0.5, 0.5);

    this.gameMessageText = this.add.text(this.game.world.centerX, 280, 'YOU ARE THE WINNER!', { font: "20px Arial", fill: "#000000", align: "center" });
    this.gameMessageText.anchor.setTo(0.5, 0);
};
Lizzard.GameStageOne.prototype.gameOver = function () {
    this.game.add.sprite(0, 0, 'background1');
    //this.game.state.start('Winner');
    this.logo = this.add.sprite(this.game.world.centerX, 140, 'dojo');
    this.logo.anchor.setTo(0.5, 0.5);

    this.gameMessageText = this.add.text(this.game.world.centerX, 280, 'GAME OVER!', { font: "20px Arial", fill: "#000000", align: "center" });
    this.gameMessageText.anchor.setTo(0.5, 0);
};

Lizzard.GameStageOne.prototype.createPlayer1 = function () {
    this.playerIsDead = false;
	this.player = this.game.add.sprite(0, 140, 'frosto');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    //this.game.physics.ninja.enableCircle(this.player, this.player.width / 2);

    this.indicador = this.game.add.sprite(0, 140, 'indicador');
    
    //physics
    this.player.body.bounce.y = 0.1;
    this.player.body.gravity.y = 550;
    this.player.body.collideWorldBounds = true;

    //this.player.scale.setTo(0.8,0.8);
    this.game.camera.follow(this.player);
    
    //2 this.player.scale.setTo(0.8,0.8);
    
    //animations
    this.player.animations.add('right', [0, 1, 2, 6, 5, 4, 5, 6, 2, 1], 15, true);
    this.player.animations.add('left', [7, 8, 9, 13, 12, 11, 12, 13, 9, 8], 15, true);
};

Lizzard.GameStageOne.prototype.animarPlayer1  = function() {
    if (this.player.alive){
        if(this.activePlayer == 1) {
            this.stopCounterPlayerTwo();
            if(this.player2.alive){
                this.startCounterPlayerOne();
            }
            this.player.body.velocity.x = 0;
                if(this.cursors.left.isDown) {
                this.direction = 'left';
                this.player.body.velocity.x = -200;
                if(this.player.body.touching.down) {
                    this.player.animations.play('left');
                }
            } else if(this.cursors.right.isDown) {
                this.direction = 'right';
                this.player.body.velocity.x = 200;
                if(this.player.body.touching.down) {
                    this.player.animations.play('right');
                }
            } else {
                this.player.animations.stop();
                if (this.player.body.touching.down) {
                    if(this.direction === 'right') {
                        this.player.frame = 3;
                    } else {
                        this.player.frame = 10;
                    }
                }
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.audio = game.add.audio("jump2");
                this.audio.play();
                this.player.body.velocity.y = -450;
                this.player.animations.stop();
                if(this.direction === 'right') {
                    this.player.frame = 4;   
                } else {
                    this.player.frame = 11;
                }
                
            }
        } else {
        this.player.body.velocity.x = 0;
        this.player.animations.stop();
        }
    }
};
Lizzard.GameStageOne.prototype.createPlayer2 = function () {
    this.audio = this.game.add.audio("dojo");
    this.audio.play();
    this.player2IsDead =     false;
    this.player2 = this.game.add.sprite(100, 140, 'dojo');
    this.game.physics.enable(this.player2, Phaser.Physics.ARCADE);
    //this.game.physics.ninja.enableCircle(this.player, this.player.width / 2);
    //physics
    this.player2.body.bounce.y = 0.1;
    this.player2.body.gravity.y = 550;
    this.player2.body.collideWorldBounds = true;
    //animations
    this.player2.animations.add('right', [3, 1, 2, 1, 3, 4, 5, 6, 4], 15, true);
    this.player2.animations.add('left', [10, 8, 9, 8, 10, 11, 13, 12, 13, 11], 15, true);
};


Lizzard.GameStageOne.prototype.switchPlayers = function () {    
    if(this.game.input.keyboard.justPressed(32)) {
        if(!this.flag) {
            this.switchPlayer();
            this.flag = true;
        }
    } else {
        this.flag = false;
    }
};
Lizzard.GameStageOne.prototype.switchPlayer = function () {

    if (this.activePlayer == 1) {
        this.activePlayer = 2;
        this.audio = this.game.add.audio("dojo");
    } else {
        this.activePlayer = 1;
        this.audio = this.game.add.audio("frosto");
    }
    this.audio.play();
};

Lizzard.GameStageOne.prototype.animarPlayer2  = function() {
    //movimientoss
    if(this.player2.alive){
        if(this.activePlayer == 2) {
            if(this.player.alive){
                this.stopCounterPlayerOne();
            }
            this.startCounterPlayerTwo();
            this.player2.body.velocity.x = 0;
            if(this.cursors.left.isDown) {
                this.direction = 'left';
                this.player2.body.velocity.x = -350;
                if(this.player2.body.touching.down) {
                    this.player2.animations.play('left');
                }
            } else if(this.cursors.right.isDown) {
                this.direction = 'right';
                this.player2.body.velocity.x = 350;
                if(this.player2.body.touching.down) {
                    this.player2.animations.play('right');
                }
            } else {
                this.player2.animations.stop();
                if (this.player2.body.touching.down) {
                    if(this.direction === 'right') {
                        this.player2.frame = 0;
                    } else {
                        this.player2.frame = 11;
                    }
                }
            }
            if (this.cursors.up.isDown && this.player2.body.touching.down) {
                this.audio = game.add.audio("jump");
                this.audio.play();
                this.player2.body.velocity.y = -300;
                this.player2.animations.stop();
                if(this.direction === 'right') {
                    this.player2.frame = 2;   
                } else {
                    this.player2.frame = 13;
                }
                
            }
        } else {
            this.player2.body.velocity.x = 0;
            this.player2.animations.stop();
        }
        //if (this.cursors.up.isDown && this.player2.body.touching.down) {
    }
}

Lizzard.GameStageOne.prototype.setIndicador = function () {
    if (this.activePlayer == 1) {    
        this.game.camera.follow(this.player);        
        this.indicador.x = this.player.x+42; 
        this.indicador.y = this.player.y - 47;
    } else {        
        this.game.camera.follow(this.player2);
        this.indicador.x = this.player2.x + 27; 
        this.indicador.y = this.player2.y - 40;
    }
};

Lizzard.GameStageOne.prototype.createScene = function () {
    var mainPlatforms, ledge, j, bg, clockImage;

    this.game.stage.backgroundColor = '#FFF';
	bg = this.game.add.tileSprite(0, 0, 5000, this.game.world.height, 'background1');

    //bg.fixedToCamera = true;
    this.game.world.setBounds(0, 0, 5000, 600);

    this.platformGroup = this.game.add.group();
	this.platformGroup.enableBody = true;

	mainPlatforms = this.platformGroup.create(0, this.game.world.height - 64, 'floor');
	mainPlatforms.scale.setTo(0.4, 0.8);
	mainPlatforms.body.immovable = true;

    mainPlatforms = this.platformGroup.create(1025, this.game.world.height - 64, 'floor');
    mainPlatforms.scale.setTo(1, 0.8);
    mainPlatforms.body.immovable = true;

    mainPlatforms = this.platformGroup.create(3173, this.game.world.height - 64, 'floor');
    mainPlatforms.scale.setTo(0.2, 0.8);
    mainPlatforms.body.immovable = true;
    mainPlatforms = this.platformGroup.create(4108, this.game.world.height - 64, 'floor');
    mainPlatforms.scale.setTo(0.7, 0.8);
    mainPlatforms.body.immovable = true;
    //RIOS
    this.riosGroup = this.game.add.group();
    this.riosGroup.enableBody = true;

    var rio = this.riosGroup.create(660, this.game.world.height - 64, 'rio');
    rio.scale.setTo(1.5, 0.8);
    rio.body.immovable = true;
    rio = this.riosGroup.create(2686, this.game.world.height - 64, 'rio');
    rio.scale.setTo(2, 0.8);
    rio.body.immovable = true;
    rio = this.riosGroup.create(3500, this.game.world.height - 64, 'rio');
    rio.scale.setTo(2.5, 0.8);
    rio.body.immovable = true;
    for (j=0; j<this.ledgePositions.length; j+=1){
        ledge = this.platformGroup.create(this.ledgePositions[j].x, this.game.world.height -this.ledgePositions[j].y, 'ground');
        ledge.scale.setTo(1, 0.5);
        ledge.body.immovable = true;
    }

    
    this.clockImage  = this.game.add.sprite( this.game.camera.x+450, this.game.camera.y+10,'clock');  
    this.clockImage.scale.setTo(0.3, 0.3);
    //ledge.body.immovable = true;
    this.ledgeMovible = this.riosGroup.create(2100, 280, 'ground');
    this.ledgeMovible.scale.setTo(1, 0.5);
    this.ledgeMovible.body.immovable = true;

    this.player1Life1 = this.riosGroup.create(350, 0, 'life');
    this.player1Life1.scale.setTo(0.1, 0.1);
    this.player1Life1.body.immovable = true;

    this.player1Life2 = this.riosGroup.create(380, 0, 'life');
    this.player1Life2.body.immovable = true;
    this.player1Life2.scale.setTo(0.1, 0.1);

    this.player1Life3 = this.riosGroup.create(410, 0, 'life');
    this.player1Life3.body.immovable = true;
    this.player1Life3.scale.setTo(0.1, 0.1);

    this.player2Life1 = this.riosGroup.create(500, 0, 'life');
    this.player2Life1.body.immovable = true;
    this.player2Life1.scale.setTo(0.1, 0.1);

    this.player2Life2 = this.riosGroup.create(530, 0, 'life');
    this.player2Life2.body.immovable = true;
    this.player2Life2.scale.setTo(0.1, 0.1);

    this.player2Life3 = this.riosGroup.create(560, 0, 'life');
    this.player2Life3.body.immovable = true;
    this.player2Life3.scale.setTo(0.1, 0.1);

};

Lizzard.GameStageOne.prototype.createCage = function () {
    /*var platformCage;
    this.platformCage = this.game.add.group();
    this.platformCage.enableBody = true;

    mainPlatforms = this.platformCage.create(0, this.game.world.height - 250, 'floor');
    mainPlatforms.scale.setTo(0.5, 0.5);
    mainPlatforms.body.immovable = true;

    

    platformCage = this.platformCage.create(100, 195, 'cage');
    platformCage.scale.setTo(0.5, 0.5);
    platformCage.body.immovable = true;
*/

    cage  = this.game.add.sprite( this.game.world.width - 140, 340,'cage');  
    cage.scale.setTo(0.1, 0.1);
    //x: 4100,
    //y: 300
};


Lizzard.GameStageOne.prototype.animatePeopleInCage = function () {
	
};
Lizzard.GameStageTwo = function (game) {


    this.game = game;       //  a reference to the currently running game
    this.add;       //  used to add sprites, text, groups, etc
    this.camera;    //  a reference to the game camera
    this.cache;     //  the game cache
    this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;      //  for preloading assets
    this.math;      //  lots of useful common math operations
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage;     //  the game stage
    this.time;      //  the clock
    this.player;
    this.player2;
    this.flag;    
    this.cursors;
    this.direction = 'right'; 
    this.switchButton;
    this.activePlayer = 1;
    this.indicador;
 
    this.platformGroup;
    this.riosGroup;
    this.ledgePlatforms;
    this.ledgeMovible;
    this.boxImage;
    this.bg;

    //Mode Ninja
    this.box;
    this.cursors;
    this.ledges;
    this.blocks;
    this.boton;

    this.ledgePositions = [
        {
            x: 330,
            y: 220
        },
        {
            x: 970,
            y: 230
        },
        {
            x: 1450,
            y: 350
        },
        {
            x: 610,
            y: 370
        },
        {
            x: 3100,
            y: 300
        }
    ];


    this.textCounterPlayerOne;
    this.timerPlayer1;

    this.startCounter1=false;

    this.counterPlayerOne = 20;
 
    this.blocksMoved = {};
    this.textCounterPlayerTwo;
    this.timerPlayer2;
    this.allBlocks = [];
    this.textGameOver;

    this.counterPlayerTwo = 20;
    this.startCounter2=false;

    this.livesPlayer1 = 3;
    this.livesPlayer2 = 3;

    this.startCounter2=false;

    //If the player was killed or not
    this.playerIsDead = false;
    this.player2IsDead = false;

};

Lizzard.GameStageTwo.prototype.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //this.game.physics.startSystem(Phaser.Physics.NINJA);

    this.createScene();
    this.createCage();
    this.createBlocks();
    this.createPlayer1();
    this.createPlayer2();
    
    //Ninja mode
    //this.initializeMoveBlocks();
    this.cursors = this.game.input.keyboard.createCursorKeys(); 
    this.switchButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.initCounterPlayerOne();
    this.initCounterPlayerTwo();
};

Lizzard.GameStageTwo.prototype.update = function () {
    //var i;

    
    this.switchPlayers();
    this.setIndicador();

    this.collideElements();
    this.moveBlocks();
    this.vefiryIfPlayersIsOnWater();
};


Lizzard.GameStageTwo.prototype.initializeMoveBlocks = function () {
    var k;
    
    this.box = this.game.add.sprite(600, 450, 'block');
    this.box.name = 'blockB';
    //this.box.tint = Math.random() * 0xffffff;
    
    this.game.physics.ninja.enableAABB([this.player, this.box]);
    this.game.physics.ninja.enableAABB([this.player2, this.box]);
    //game.physics.ninja.enableAABB([sprite1, this.box]);
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
};

Lizzard.GameStageTwo.prototype.createBlocks = function () {
    var block;
    this.blocks = game.add.group();
    
    this.blocks.enableBody = true;
    for (j=0; j<this.ledgePositions.length; j+=1) {
        block = this.blocks.create(this.ledgePositions[j].x, this.game.world.height -this.ledgePositions[j].y-100, 'block');
        block.scale.setTo(1, 0.5);
        block.name = "block_"+j;

        block.body.gravity.y = 500;
        block.body.collideWorldBounds = true;
        block.body.maxVelocity.x = 0.1;
        block.body.bounce.y = 0.4 ;
        block.body.immovable = false;
        this.allBlocks.push(block);

    }

    this.game.physics.arcade.collide(block);
};

Lizzard.GameStageTwo.prototype.keepBlocks = function () {
    var i;
    var block;
    var blocks = game.add.group();
    blocks.enableBody = true;

     for (var prop in this.blocksMoved) {
        if( this.blocksMoved.hasOwnProperty( prop ) ) {
            block = this.blocksMoved[prop];
            block.body.collideWorldBounds = true;
            block.body.maxVelocity.x = 0.1;
            block.body.bounce.y = 0.4 ;
            block.body.immovable = true;
            block.tint = Math.random() * 0xffffff;
          //this.blocksMoved[prop].body.bounce.y = 0.8 + Math.random() * 0.2;
        } 
    }
    //this.game.physics.arcade.collide(block, this.platformGroup);

    
};

Lizzard.GameStageTwo.prototype.randomBlocks = function () {
    var block = game.add.group();
    block.enableBody = true;

    this.randomBlockInterval = setInterval(function(){
        var block = block.create(Math.random() * document.body.clientWidth, 0, 'block');
        block.body.gravity.y = 300;
        block.body.bounce.y = 0.7 + Math.random() * 0.2;
    }, 10000);
};

Lizzard.GameStageTwo.prototype.collideElements = function () {
    var that = this;
    this.game.physics.arcade.collide(this.player, this.platformGroup);
    this.game.physics.arcade.collide(this.player2, this.platformGroup);
    this.game.physics.arcade.collide(this.player, this.blocks, function (a, b, c) {
        that.onMoveBlock(that, a, b);
    });
    this.game.physics.arcade.collide(this.player2, this.blocks, function (a, b, c) {
        that.onMoveBlock(that, a, b);
    });
    this.game.physics.arcade.collide(this.player, this.platformGroup);
    this.game.physics.arcade.collide(this.blocks, this.platformGroup);
    this.game.physics.arcade.collide(this.blocks, this.blocks);
    this.game.physics.arcade.overlap(this.player1, this.riosGroup, function() {
        console.log(argument);
    });
};
Lizzard.GameStageTwo.prototype.onMoveBlock = function (a, b, c, d) {
    console.log("log", a,b,c,d);
    for (j=0; j<this.allBlocks.length; j+=1){
        if (this.allBlocks[j].name === c.name) {
            this.blocksMoved[b.name] = this.allBlocks[j];
        }
    }
    console.log(" Lizzard ",a, b);
};

Lizzard.GameStageTwo.prototype.moveBlocks = function () {

};


Lizzard.GameStageTwo.prototype.render = function () {
    this.animarPlayer1();
    this.animarPlayer2();
};
Lizzard.GameStageTwo.prototype.click = function () {

};


//COUNTER time

Lizzard.GameStageTwo.prototype.initCounterPlayerOne =  function(){
    //this.counterPlayerOne = 50;
    //this.textCounterPlayerOne = this.game.add.text(90 ,120, 'Frosto'  + ' \n50', { font: "32px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerOne = this.game.add.text(90 ,120, 'Frosto'  + ' \n'+this.counterPlayerOne, { font: "32px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerOne.anchor.setTo(0.5,0);
    this.timerPlayer1 = game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter1, this);
};

Lizzard.GameStageTwo.prototype.startCounterPlayerOne = function (){
    this.startCounter1 = true;
};

Lizzard.GameStageTwo.prototype.updateCounter1 = function() {

    if(this.counterPlayerOne > 0 && this.startCounter1){
        this.counterPlayerOne--;
        this.textCounterPlayerOne.setText('');
        this.textCounterPlayerOne.setText('Frosto \n' + this.counterPlayerOne);        
    }else{
        this.textCounterPlayerOne.setText('');
        this.textCounterPlayerOne.setText('Frosto \n' + this.counterPlayerOne); 
    }
    if(this.counterPlayerOne == 0 && this.player.alive){
        this.player.kill();
        this.livesPlayer-=1;
        this.switchPlayer(); 
        if(this.livesPlayer1 > 0){
            //this.startCounterPlayerOne();        this.keepBlocks();
            this.createPlayer1();  
            this.counterPlayerOne = 10;           
        }else{
            //this.textGameOver = this.game.add.text(300,100, "GAME OVER",{ font: "32px Arial", fill: "#ffffff", align: "center" });
            this.gameOver();
        }
    }
};
Lizzard.GameStageTwo.prototype.gameOver = function () {
    this.game.state.start('GameStageTwo');
};

Lizzard.GameStageTwo.prototype.stopCounterPlayerOne = function (){
    this.startCounter2 = true;
    this.startCounter1 = false;
};

Lizzard.GameStageTwo.prototype.initCounterPlayerTwo =  function(){
    //this.counterPlayerTwo = 50;

    //this.textCounterPlayerTwo = this.game.add.text(220 ,120 , 'Dojo '  + '\n50', { font: "32px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerTwo = this.game.add.text(220 ,120 , 'Dojo '  + '\n'+this.counterPlayerTwo, { font: "32px Arial", fill: "#ffffff", align: "center" });

    this.textCounterPlayerTwo.anchor.setTo(0.5,0);
    this.timerPlayer2 = game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter2, this);
    
};

Lizzard.GameStageTwo.prototype.startCounterPlayerTwo = function (){
    this.startCounter2 = true;
};

Lizzard.GameStageTwo.prototype.updateCounter2 = function() {
    if(this.counterPlayerTwo > 0 && this.startCounter2){
        this.counterPlayerTwo--;
        this.textCounterPlayerTwo.setText('');
        this.textCounterPlayerTwo.setText('Dojo \n' + this.counterPlayerTwo);        
    }else{
        this.textCounterPlayerTwo.setText('');
        this.textCounterPlayerTwo.setText('Dojo \n' + this.counterPlayerTwo); 
    }
    if(this.counterPlayerTwo  == 0 && this.player2.alive){

        this.player2.kill();

        this.livesPlayer2-=1;

        //this.startCounterPlayerOne();        
        this.keepBlocks();
        
        this.switchPlayer(); 
        if(this.livesPlayer2 > 0){
            //this.startCounterPlayerOne();        this.keepBlocks();
            this.createPlayer2(); 
            this.counterPlayerTwo = 10;           
        }else{
            //this.textGameOver = this.game.add.text(300,100, "GAME OVER",{ font: "32px Arial", fill: "#ffffff", align: "center" });
            this.gameOver();
        }
    }

}
Lizzard.GameStageTwo.prototype.stopCounterPlayerTwo = function (){
    this.startCounter2 = false;
    this.startCounter1 = true;
};

Lizzard.GameStageTwo.prototype.vefiryIfPlayersIsOnWater = function() {
    var y  = this.riosGroup.children[0].y,
        y2 = this.player2.y + this.player2.height,
        cadaver;
    if(y2 > y && !this.player2IsDead) {
        this.killPlayer2();
    }
};

Lizzard.GameStageTwo.prototype.killPlayer2 = function() {
    cadaver = this.game.add.sprite(this.player2.x, this.player2.y, 'dojo_cadaver');
    this.game.physics.enable(cadaver, Phaser.Physics.ARCADE);
    this.game.add.tween(cadaver).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, false);
    this.player2.kill();
    this.player2IsDead = true;
    this.audio = this.game.add.audio("dojo_death");
    this.audio.play();
};


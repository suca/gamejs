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

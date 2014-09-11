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

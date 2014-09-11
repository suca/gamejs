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

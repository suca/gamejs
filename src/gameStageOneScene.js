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


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
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

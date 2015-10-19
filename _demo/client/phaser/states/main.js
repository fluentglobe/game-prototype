var LabelButton = require('../../../../common-game-control/components/LabelButton');

module.exports = MainMenu;

function MainMenu(game) {

    game.add.buttonLabel = function(game, x, y, key, label, callback,
                       callbackContext, overFrame, outFrame, downFrame, upFrame) {
        var button = new LabelButton(game, x, y, key, label, callback,
                       callbackContext, overFrame, outFrame, downFrame, upFrame);
    }
}

MainMenu.prototype = {
    create: function() {
        this.load.spritesheet('5050', 'assets/sprites/50x50.png', 50, 50);
        this.add.sprite(0,0,'5050')
        // this.add.sprite(0, 0, 'background');
        // this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
        // this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
        this.add.buttonLabel(0, 0,
            'button-start', 'Connect the Dots', this.startGame, this, 1, 0, 2);
    },
    startGame: function() {
        this.state.start('Game');
    }
};
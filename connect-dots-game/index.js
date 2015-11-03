'use strict';

import {Boot} from './states/boot';
import {PreloadState} from './states/preload';

var options = { preload: preload
    //, create: create
};

var width      = 320
  , height     = 480
  , renderMode = Phaser.AUTO,
  , gameName = 'connect-dots';
var game = new Phaser.Game(width, height, renderMode, gameName, options);

game.state.add('boot',    BootState);
game.state.add('preload', PreloadState);
// game.state.add('game', ConnectDotsState);

game.state.start('boot');

function preload() {
    game.forceSingleUpdate = true;
    game.load.image('preloadSprite','images/preloadSprite.png');
}

var manager = null, emitter = null, well = null;

function create() {

}

export { game as default };

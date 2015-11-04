'use strict';

import {BootState} from './states/boot';
import {PreloadState} from './states/preload';

var options = { preload: preload
    //, create: create
};

var width      = 320
  , height     = 480
  , renderMode = Phaser.AUTO
  , gameName = 'connect-dots';

export var phaser = new Phaser.Game(width, height, renderMode, gameName, options);

phaser.state.add('boot',    BootState);
phaser.state.add('preload', PreloadState);
// game.state.add('game', ConnectDotsState);

phaser.state.start('boot');

function preload() {
    phaser.forceSingleUpdate = true;
    phaser.load.image('preloadSprite','images/preloadSprite.png');
}

var manager = null, emitter = null, well = null;

function create() {

}

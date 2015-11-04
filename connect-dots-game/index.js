'use strict';

import {Boot} from './states/boot';
import {Preload} from './states/preload';

var options = {
  init: init,
  preload: preload
    //, create: create
};

var width      = 320
  , height     = 480
  , renderMode = Phaser.AUTO
  , gameName = 'connect-dots';

export var phaser = new Phaser.Game(width, height, renderMode, gameName, options);

phaser.state.add('boot',    Boot);
phaser.state.add('preload', Preload);
// game.state.add('game', ConnectDotsState);

phaser.state.start('boot');

function init() {
    phaser.init();
}

function preload() {
    phaser.forceSingleUpdate = true;
    phaser.load.image('preloadSprite','images/preloadSprite.png');
}

var manager = null, emitter = null, well = null;

function create() {

}

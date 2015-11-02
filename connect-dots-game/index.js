'use strict';

var BootState    = require('./states/boot')
  , PreloadState = require('./states/preload')

  , width      = 320
  , height     = 480
  , renderMode = Phaser.AUTO;

game = new Phaser.Game(width, height, renderMode, '');
game.state.add('boot',    BootState);
game.state.add('preload', PreloadState);
// game.state.add('game', ConnectDotsState);

game.state.start('boot');

exports 'connect dots game';

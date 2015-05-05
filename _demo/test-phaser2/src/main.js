'use strict';

var BootState    = require('./states/Boot')
  , PreloadState = require('./states/Preload')
  , MainMenu     = require('./states/main')
  , TitleState   = require('./states/Title')
  , ConnectDotsState = require('../../../labyrinth/lib/ConnectDotsState.js')
  // <% STATE_REQUIRE_TOKEN %>
  // Leave the above token in place to enable automatic
  // injection of new states by the generator.
  ;

var game
  , width      = 320
  , height     = 480
  , renderMode = Phaser.AUTO;

game = new Phaser.Game(width, height, renderMode, '');
game.state.add('boot',    BootState);
game.state.add('preload', PreloadState);
game.state.add('menu', MainMenu);
game.state.add('game', ConnectDotsState);
// game.state.add('title',   ConnectDotsState);
// <% STATE_ADD_TOKEN %>
// Leave the above token in place to enable automatic
// injection of new states by the generator.

game.state.start('boot');

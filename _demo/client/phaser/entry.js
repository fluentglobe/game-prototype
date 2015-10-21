'use strict';

Array.prototype.forEach.call(document.querySelectorAll('a[rel="game"]'), function(el) {
  var url = el.getAttribute('href').replace("javascript:page('",'').replace("')",'');
  page(url, function(context) {
  });
  console.log(url);
  System.import('.'+url).then(function(data) {
    alert('data');
  });
});

//System.load( html for each game in plan)

/*
var BootState    = require('./states/boot')
  , PreloadState = require('./states/preload')
  , MainMenu     = require('./states/main')
  , TitleState   = require('./states/title')
  // , ConnectDotsState = require('../../../labyrinth/lib/ConnectDotsState.js')
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
*/

'use strict';

exports.fetch = function(load, fetch) {
    return new Promise(function(resolve, reject) {
      var cssFile = load.address;

      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssFile;
      link.onload = resolve;

      document.head.appendChild(link);
    });
  }

Array.prototype.forEach.call(document.querySelectorAll('a[rel="game"]'), function(el) {
  var name = el.getAttribute('name'),
      url = '/types/student/buckets/'+name+'/keys/index.js';
      console.log(name);
  page('/'+name, function(context) {
      System.import(url).then(function(x) {
          console.log(x);
      });
  });
  // console.log(url);
});

window.planTheDay = function(day, plan) {
  alert(day);
};

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

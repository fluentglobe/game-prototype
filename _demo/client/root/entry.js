'use strict';

//sample API function
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

var gameName;

Array.prototype.forEach.call(document.querySelectorAll('a[rel="game"]'), function(el) {
  var name = el.getAttribute('name'),
      url = '/v1/student/plan/'+name+'/index.js';

  page('/plan/'+name, function(context) {
      gameName = name;
      System.import(url);
  });
});

// if not root exec the page path
if (location.pathname !== '/') {
  gameName = location.pathname;
  var url = '/v1/student'+gameName+'/index.js';
  System.import(url);
}

var Fluent = window.Fluent = {};

Fluent.planTheDay = function(day, plan, options) {
  return new Promise(function(resolve,reject) {
      var api = plan;
      api.day = day;

      var gamePromises = plan.forEach(function(game) {
        var url = '/v1/student/app/'+game.game+'/index.js';
        return System.import(url).then(function(app) {

          // phaser support
          if (app.state && app.state.game === app) {
            adjustPhaserGame(app, game.game, '/v1/student/app/'+game.game);
          }

          console.log('loaded game part',app);
        });
      });


      api.start = function(index) {
        alert('starting '+index);
      };

      Promise.all(gamePromises).then(function() {
        console.log('all games in plan loaded.');
        resolve(plan);
      });
      //TODO when gamePromises resolved resolve promise
  });
};

function adjustPhaserGame(game,name,url) {
  game.init = function() {
    //TODO override width, height, renderMode and target element
    game.load.baseURL = url;
  };
}
    // var game = new Phaser.Game(width, height, renderMode, gameName, options);
    // game.load.baseURL = '/v1/student/plan/'+gameName+'/';

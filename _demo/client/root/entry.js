
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
            // could also have a set of Game Apps
            if (!app.loaded) {
                // phaser support
                if (app.phaser) {
                    adjustPhaserGame(app.phaser, game.game, '/v1/student/app/'+game.game+'/');
                }

                console.log('loaded game part',app);
                app.loaded = true;
            }
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

function adjustPhaserGame(states, name, url) {

    //TODO override width, height, renderMode and target element

    var game = new Phaser.Game(512, 384, Phaser.CANVAS, states.name || 'game');

    function wrapped_init() {
      game.load.baseURL = url;
      if (this.old_init) {
          this.old_init.apply(this,arguments);
      }
    }

    for(var n in states) {
        var state = states[n];
        var old_init;

        if (typeof state === 'function' && !state.prototype.old_init) {
            state.prototype.old_init = state.prototype.init;
            state.prototype.init = wrapped_init;
            game.state.add(n, state);
        }
    }

    //TODO do in api.start
    if (states.start) {
        console.info('Phaser game:', name, states.name);
        game.state.start(states.start);
    }

}

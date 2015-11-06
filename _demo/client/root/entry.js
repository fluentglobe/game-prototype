
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

var windows = document.querySelector('.game-windows');

var Fluent = window.Fluent = {};

Fluent.planTheDay = function(day, plan, options) {
    var games = {};
    return new Promise(function(resolve,reject) {
        var api = plan;
        api.day = day;

        var gamePromises = plan.map(function(game) {
            if (games[game.game]) {
                game.phaser = games[game.game].phaser;

            } else {
                var url = '/v1/student/app/'+game.game+'/index.js';
                games[game.game] = true; // to avoid multiple imports
                return System.import(url).then(function(module) {
                    module.url = url;
                    games[game.game] = module; // allows lookup

                    var wrapper = document.createElement('div');
                    wrapper.id = game.game;
                    wrapper.className = 'game-window';
                    windows.appendChild(wrapper);

                    // phaser support
                    if (module.phaser) {
                        game.phaser = module.phaser;
                        game.phaserGame = adjustPhaserGame(module.phaser, game.game, '/v1/student/app/'+game.game+'/');
                    }

                    console.log('loaded game part',module);
                });
            }
      });

      console.log(gamePromises);

      api.start = function(index) {
          var entry = plan[index];

          //module.phaser.options.main is name of main to switch to when running
          if (entry.phaser) {
              var mainStateName = entry.phaser.options.main,
                  clearGame = true, clearCache = false,
                  config = {};
              console.info('starting game',entry);
              entry.phaserGame.start(mainStateName, clearGame, clearCache, config)
          }

        alert('starting '+index);
      };

      Promise.all(gamePromises).then(function() {
        console.log('all games in plan loaded.');
        resolve(plan);
    },function(err) {
        console.error('Rejected:', err);
    });
      //TODO when gamePromises resolved resolve promise
  });
};

function adjustPhaserGame(states, name, url) {

    //TODO override width, height, renderMode and target element

    var game = new Phaser.Game(400, 960, Phaser.CANVAS, name);

    function wrapped_init() {
        // console.log('init',name,url);
        game.load.baseURL = url;
        if (typeof this.old_init === 'function') {
            this.old_init.apply(this,arguments);
        }
    }

    function wrapped_create() {
        states.options.created = true;
        if (typeof this.old_create === 'function') {
            this.old_create.apply(this,arguments);
        }
    }

    for(var n in states) {
        var state = states[n];

        if (typeof state === 'function') {
            if (!state.prototype.old_init) {
                state.prototype.old_init = state.prototype.init || true;
                state.prototype.init = wrapped_init;
            }
            if (!state.prototype.old_create) {
                state.prototype.old_create = state.prototype.create || true;
                state.prototype.create = wrapped_create;
            }
            var n0 = n.charAt(0);
            if (n0.toUpperCase() === n0 && n0.toLowerCase() !== n0) {
                game.state.add(n, state);
            }
        }
    }

    if (states.options && states.options.boot) {
        game.state.start(states.options.boot);
        console.log(game.load)
        // game.load.onLoadComplete.addOnce(on_booted);
    }

    return game;
}

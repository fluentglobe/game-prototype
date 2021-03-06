
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

page('/', function() {
    document.body.classList.remove('with-game-controls');
    document.body.classList.add('with-overview');
});

var gameName;

Array.prototype.forEach.call(document.querySelectorAll('a[rel="game"]'), function(el) {
  var name = el.getAttribute('name'),
      url = '/v1/student/plan/'+name+'/index.js';

  page('/plan/'+name, function(context) {
      document.body.classList.add('with-game-controls');
      document.body.classList.remove('with-overview');
      gameName = name;
      System.import(url);
  });
});

// if not root exec the page path
if (location.pathname !== '/') {
    document.body.classList.add('with-game-controls');
    document.body.classList.remove('with-overview');
  gameName = location.pathname;
  var url = '/v1/student'+gameName+'/index.js';
  System.import(url);
} else {
    document.body.classList.remove('with-game-controls');
    document.body.classList.add('with-overview');
}

var windows = document.querySelector('.game-windows');

var Fluent = window.Fluent = {};

var currentPlan,
    currentIndex,
    currentGame;

Fluent.startGame = function() {
    //TODO disabled play button
  if (currentGame) {
      document.body.classList.remove('game-ready');

    //module.phaser.options.main is name of main to switch to when running
    if (currentGame.phaser) {
        var mainStateName = currentGame.phaser.options.main || 'Main',
            clearGame = true, clearCache = false;
        currentGame.phaserGame.state.start(mainStateName, clearGame, clearCache, currentGame.config)
    } else {
      console.info("No game to start. The type isn't Phaser")
    }
  }
};

//TODO when game is completed go to Done/Ready state

Fluent.pauseGame = function() {
    if (currentGame) {
      if (currentGame.paused) {
          document.body.classList.remove('game-paused');
      } else {
          document.body.classList.add('game-paused');
      }
      currentGame.paused = !currentGame.paused;
    }
};

Fluent.planTheDay = function(day, plan, options) {
    var games = {};
    plan.day = day;
    var gamePromises = [];

    function importGames(config,index) {
        var entry = plan[index] = { config:config };

        if (games[config.game]) {
            //TODO assign when import resolved, undefined at this point
            entry.phaser = games[config.game].phaser;

        } else {
            var url = '/v1/student/app/'+config.game+'/index.js';
            games[config.game] = true; // to avoid multiple imports
            var loadPromise = System.import(url).then(function(module) {
                module.url = url;
                games[config.game] = module; // allows lookup

                var wrapper = document.createElement('div');
                wrapper.id = config.game;
                wrapper.className = 'game-window game-size';
                wrapper.innerHTML = '<button class="btn btn-pause ion-more" href="javascript:Fluent.pauseGame();"></button>';
                windows.appendChild(wrapper);

                // phaser support (plan.booted is a promise for phaser game booted)
                if (module.phaser) {
                    entry.phaser = module.phaser;
                    plan.booted = makePhaserGame(module.phaser, config.game, '/v1/student/app/'+config.game+'/',plan).then(function(phaserGame) {
                        entry.phaserGame = phaserGame;
                        document.body.classList.add('game-ready');
                    });
                    //gamePromises.push(plan.booted); // not sure if this will come in time, might need second level
                    return plan.booted; // should chain promise
                }

                console.log('Unknow type of game (not Phaser)',module);
            });
            gamePromises.push(loadPromise);
        }
    }

    plan.forEach(importGames);

    plan.queue = function(index) {
        //TODO enable play button
        if (index === undefined) {
            index = currentIndex+1;
        }
        currentPlan = plan;
        currentIndex = index;
        currentGame = plan[index];
    };

    return Promise.all(gamePromises).then(function() {
        console.info('all games in plan loaded.');
        return plan;
    },function(err) {
        console.error('Rejected:', err);
    });
};

/**
@returns Promise of a Phaser Game that has been booted
*/
function makePhaserGame(states, name, url, plan) {
    states.options = states.options || {};
    return new Promise(function(resolve,reject) {
        //TODO override width, height, renderMode

        var game = new Phaser.Game(400, 960, Phaser.AUTO, name);

        game.state.onStateChange.add(function(stateName) {
            console.info('on state change: %s',stateName);
            switch(stateName) {
                case "Ready":
                    document.body.classList.add('game-ready');
                    console.log('Game %s is paused, ready to continue',name);
                    break;
                case "Done":
                    document.body.classList.add('game-ready');
                    console.log('Game %s is done, ready for next',name);
                    plan.queue();
                    break;
                case "Boot":
                    game.load.baseURL = url;
                    break;
                default:
                    console.log('state changed to %s for',stateName,arguments,game);
                    break;
            }
        },game);

        game.state.postCreateCallback = function() {
            switch(game.state.current) {
                case "Boot":
                    resolve(game);
                    game.state.start('Ready');
                    break;
            }
        };

        for(var n in states) {
            var state = states[n];

            if (typeof state === 'function') {
                var n0 = n.charAt(0);
                if (n0.toUpperCase() === n0 && n0.toLowerCase() !== n0) {
                    game.state.add(n, state);
                }
            }
        }

        if (!states.Ready) {
            game.state.add('Ready',{});
        }
        if (!states.Done) {
            game.state.add('Done',{});
        }
        game.state.start(states.options.boot || 'Boot');
    });
}

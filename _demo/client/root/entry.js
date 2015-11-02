'use strict';

//TODO if not root exec the page path

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

Array.prototype.forEach.call(document.querySelectorAll('a[rel="game"]'), function(el) {
  var name = el.getAttribute('name'),
      url = '/v1/student/plan/'+name+'/index.js';

  page('/plan/'+name, function(context) {
      System.import(url);
  });
});

window.Fluent = {};
window.Fluent.planTheDay = function(day, plan, options) {
  return new Promise(function(resolve,reject) {
      var api = plan;
      api.day = day;

      var gamePromises = plan.forEach(function(game) {
        var url = '/v1/student/app/'+game.game+'/index.js';
        return System.import(url).then(function(app) {
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

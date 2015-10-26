
var settings = require('./settings'),
  conventions = require('conventions'),
  path = require('path'),
  express = require('express'),
  ss = require('socketstream');

// conventions can be set up in settings
conventions.config(settings);
ss.set('*',settings);

ss.client.define('demo', {
  view: './root/view.jade',
  locals: settings.vars,

  css:  ['./styles/styles.scss', './root/entry.scss'],
  code: ['../node_modules/page/page','./root'],
  libs: ['../node_modules/page/page','../node_modules/phaser/dist/phaser']
});

ss.client.define('phaser', {
  view: './phaser/view.jade',
  locals: settings.vars,
  code: ['./phaser']
});

/*
ss.client.define('demo','jspm-bundler', {
  view: './root/view.jade',
  locals: settings.vars,
  systemjs: '../jspm_packages/system',
  configjs: '../config.js',
  code: ['../node_modules/page/page','./root']
});
*/

// Code Formatters
ss.client.formatters.add('sass');

// HTML template formatters
ss.client.formatters.add('jade');

ss.ws.transport.use('sockjs');

ss.task('start-server', function(done) {
  var app = ss.app = express();

  //express settings
  app.disable('x-powered-by');
  app.set('port', settings.server.port);
  app.set('views', path.join(__dirname, './client', 'views'));
  app.locals.basedir = path.join(__dirname, './client', 'views');
  app.locals.plans = settings.plans;
  app.set('view engine', 'jade');

	// require routers
  conventions.routers('server', function(router,name) {
    var defaultBase = path.dirname(name).substring(1);
    app.use(router.baseRoute || defaultBase,router);
  });

  // Serve this client on the root URL
  // ss.http.route('/phaser', function(req, res){
  //   res.serveClient('phaser-demo');
  // });

  app.get('/', function(req,res) {
      res.serveClient('demo');
  });
  settings.vars.plans.forEach(function(plan) {
      app.get('/plan/'+plan.key, function(req,res) {
          res.serveClient('demo');
      });
  });

  app.use('/jspm_packages', require('./jspm_packages/index.router'));
  app.use(ss.http.session.middleware);
  app.use(ss.http.cached.middleware);

  // Start SocketStream
  var httpServer = app.listen(settings.server.port, function() {
    ss.stream(httpServer);
    done();
  });

  ss.api.log.info('Routers:'.grey, conventions.routers().join(' ').replace(/\.\//g,'').replace(/\.router\.js/g,'') || 'None.');
});

// direct call just starts the server (unless running with gulp)
ss.start();

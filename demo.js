
var settings = require('./settings'),
  conventions = require('conventions'),
  path = require('path'),
  express = require('express'),
  ss = require('socketstream');

// conventions can be set up in settings
conventions.config(settings);
ss.set('*',settings);

ss.client.define('phaser-demo', {
  view: './phaser/view.jade',
  locals: settings.vars,

  css:  ['./styles/styles.scss', './phaser/entry.scss'],
  code: ['../node_modules/page/page','./phaser'],
  libs: ['../node_modules/page/page','../node_modules/phaser/dist/phaser']
});

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
  app.set('view engine', 'jade');

	// require routers
  conventions.routers(__dirname+'/_demo/server', function(router,name) {
    var defaultBase = path.dirname(name.replace('/_demo/server','')).substring(1);
    app.use(router.baseRoute || defaultBase,router);
  });

  // Serve this client on the root URL
  // ss.http.route('/phaser', function(req, res){
  //   res.serveClient('phaser-demo');
  // });

  app.get('/', function(req,res) {
      res.serveClient('phaser-demo');
  });

  app.use('/',ss.http.middleware);
  // app.use(ss.http.session.middleware);
  // app.use(ss.http.cached.middleware);

  // Start SocketStream
  var httpServer = app.listen(settings.server.port, function() {
    ss.stream(httpServer);
    done();
  });

  ss.api.log.info('Routers:'.grey, conventions.routers().join(' ').replace(/\.\//g,'').replace(/\.router\.js/g,'') || 'None.');
});

// direct call just starts the server (unless running with gulp)
ss.start();

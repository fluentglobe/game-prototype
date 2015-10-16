
var settings = require('../settings'),
  conventions = require('conventions'),
  path = require('path'),
  express = require('express'),
  ss = require('socketstream');

// conventions can be set up in settings
conventions.config(settings);

ss.client.set({
  dirs: {
    'client': '/_demo/client',
    'static': '/_demo/public',
    'assets': '/_demo/client/assets'
  },
  'maxAge': 2.6*Math.pow(10,9)
});

ss.client.define('phaser-demo', {
  view: './phaser/view.jade',
  locals: settings.vars,

  css:  ['./styles/styles.scss', './phaser/entry.scss'],
  code: ['./phaser']
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('phaser-demo');
});


// Code Formatters
ss.client.formatters.add('sass');

// HTML template formatters
ss.client.formatters.add('jade',{
    basedir: path.join(ss.root,'_demo','client','page')
});

ss.ws.transport.use('sockjs');

exports.settings = settings;

ss.task('start-server', function(done) {
  var app = ss.app = express();

  //express settings
  app.disable('x-powered-by');
  app.set('port', settings.port);
  app.set('views', path.join(__dirname, '../client', 'views'));
  app.locals.basedir = path.join(__dirname, '../client', 'views');
  app.set('view engine', 'jade');

	// require routers
  conventions.routers(__dirname, function(router,name) {
    var defaultBase = path.dirname(name).substring(1);
    app.use(router.baseRoute || defaultBase,router);
  });

  app.use('/',ss.http.middleware);
  // app.use(ss.http.session.middleware);
  // app.use(ss.http.cached.middleware);

  // Start SocketStream
  var httpServer = app.listen(settings.port, function() {
    ss.stream(httpServer);
    done();
  });

  console.info('Routers:'.grey, conventions.routers().join(' ').replace(/\.\//g,'').replace(/\.router\.js/g,'') || 'None.');
});

// direct call just starts the server (unless running with gulp)
ss.start();

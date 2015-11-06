
var settings = require('./settings'),
  conventions = require('conventions'),
  path = require('path'),
  express = require('socketstream/express'),
  app = express(),
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

//express settings
app.locals.basedir = path.join(__dirname, './client', 'views');
app.locals.plans = settings.plans;
app.set('view engine', 'jade');

// require routers
conventions.routers('server', function(router,name) {
  var defaultBase = path.dirname(name).substring(1);
  app.use(router.baseRoute || defaultBase,router || '/');
});

settings.vars.plans.forEach(function(plan) {
    app.get('/plan/'+plan.key, function(req,res) {
        res.serveClient('demo');
    });
});

app.use(ss.http.session.middleware);
app.use(ss.http.cached.middleware);

ss.api.log.info('Routers:'.grey, conventions.routers().join(' ').replace(/\.\//g,'').replace(/\.router\.js/g,'') || 'None.');

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

// direct call just starts the server (unless running with gulp)
ss.start();

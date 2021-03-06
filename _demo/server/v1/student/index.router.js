var express = require('express'),
    conventions = require('conventions'),
    settings = require('../../../../settings'),
    debug = require('debug')('game'),
    swig = require('swig'),
    send = require('send'),
    path = require('path');

var router = module.exports = express.Router(),
    planTemplate = swig.compileFile(conventions.absolutePath('client/views/plan.js')),
    today = new Date(),
    day = '' + today.getFullYear() + (today.getMonth()+1) + today.getDate();

settings.vars.plans.forEach(function(plan) {
  router.get('/plan/'+plan.key+'/plan.json', function(req,res) {
    res.status(200).type('json').send(plan);
  });
  // console.log('plan:',plan.key+'/keys/plan.json',plan);
  router.get('/plan/'+plan.key+'/plan.html', function(req,res) {
    res.render('plan', function(err,html) {
      res.status(200).type('html').send(html);
    });
  });

  router.get('/plan/'+plan.key+'/index.js', function(req,res) {
    res.status(200).type('text/javascript').send(planTemplate({
        day: day,
        plan: plan.plan,
        options: { title: plan.title }
    }));
  });
  // router.get('/'+plan.key+'/index.js', function(req,res) {
  //   res.status(200).type('text/javascript').sendFile(path.join(plan.gameRoot,'index.js'));
  // });
});

//TODO pipe code/css/worker/view resource to cache, edge server, or assets destintation

settings.games.forEach(function(app) {
    var options = {};
    router.get('/app/'+app.key+'/index.js', function(req,res) {
        send(req, conventions.absolutePath('..',app.key,'index.js'),options).pipe(res);
    });

    // other files at dev-time
    router.use('/app/'+app.key+'/', function(req,res) {
        send(req, conventions.absolutePath('..',app.key,req.url.replace('/app/','')),options).pipe(res);
    });
});

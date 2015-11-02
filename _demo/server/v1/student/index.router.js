var express = require('express'),
    ss = require('socketstream'),
    settings = require('../../../../settings'),
    swig = require('swig'),
    send = require('send'),
    path = require('path');

var router = module.exports = express.Router(),
    planTemplate = swig.compileFile(path.join(ss.root,'client/views/plan.js')),
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
      // console.log(req.url, path.join(ss.root,app.key,'index.js'));
        send(req, path.join(ss.root,'..',app.key,'index.js'),options).pipe(res);
    });

    // other files at dev-time
    router.get('/app/'+app.key, function(req,res) {
      //TODO hmm
        console.log(req.url);
        send(req, path.join(ss.root,'..',app.key,req.url),options).pipe(res);
    });
});

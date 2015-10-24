var express = require('express'),
    ss = require('socketstream'),
    settings = require('../../../../../settings'),
    swig = require('swig'),
    send = require('send'),
    path = require('path');

var router = module.exports = express.Router(),
    planTemplate = swig.compileFile(path.join(ss.root,'client/views/plan.js')),
    today = new Date(),
    day = '' + today.getFullYear() + (today.getMonth()+1) + today.getDate();

settings.vars.plans.forEach(function(plan) {
  router.get('/'+plan.key+'/keys/plan.json', function(req,res) {
    res.status(200).type('json').send(plan);
  });
  // console.log('plan:',plan.key+'/keys/plan.json',plan);
  router.get('/'+plan.key+'/keys/plan.html', function(req,res) {
    res.render('plan', function(err,html) {
      res.status(200).type('html').send(html);
    });
  });

  router.get('/'+plan.key+'/keys/index.js', function(req,res) {
    res.status(200).type('text/javascript').send(planTemplate({
        day: day,
        plan:plan
    }));
  });
  // router.get('/'+plan.key+'/index.js', function(req,res) {
  //   res.status(200).type('text/javascript').sendFile(path.join(plan.gameRoot,'index.js'));
  // });
});

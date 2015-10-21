var express = require('express'),
    settings = require('../../../../../settings'),
    send = require('send'),
    path = require('path');

var router = module.exports = express.Router();

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
});

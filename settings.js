// variables passed to browser
exports.vars = {
    plans: []
};

exports.root = '_demo';

exports.client = {
  dirs: {
    'client': '/client',
    'static': '/public',
    'assets': '/client/assets'
  },
  'maxAge': 2.6*Math.pow(10,9)
};

exports.server = {
    port: 3000
};

exports.secret = 'this is not that secret';

exports.sessionSecret = 'not a secret either';

exports.pkg = require('./package.json');

var fs = require('fs'),
    path = require('path'),
    YAML = require('yamljs');

var plans = exports.vars.plans = fs.readdirSync(path.join(__dirname,'_demo/plans')).map(function(name) {
    return YAML.load(path.join(__dirname,'_demo/plans',name));
});

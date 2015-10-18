// variables passed to browser
exports.vars = {};

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

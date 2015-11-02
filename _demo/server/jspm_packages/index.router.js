var express = require('express'),
    send = require('send'),
    path = require('path');

var router = module.exports = express.Router();

router.use(function(req,res) {
    send(req, req.url, {
        root: path.join(__dirname,'../../../jspm_packages')
    }).pipe(res);
});

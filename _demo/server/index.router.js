var express = require('express'),
    send = require('send'),
    path = require('path');

var router = module.exports = express.Router();

router.get('/', function(req,res) {
    res.serveClient('demo');
});

router.get('/config.js',function(req,res) {
    send(req, req.url, {
        root: path.join(path.join(__dirname,'../..'))
    }).pipe(res);
});

// router.get('/v1/swagger.json',function(req,res) {
//     send(req, req.url, {
//         root: path.join(__dirname)
//     }).pipe(res);
// });
// router.use(function(req,res) {
//     // console.warn('req',req.url);
//     send(req, req.url, {
//         root: path.join(__dirname,'../../..','node_modules/swagger-ui/dist')
//     }).pipe(res);
// });

var express = require('express'),
    send = require('send'),
    path = require('path');

var router = module.exports = express.Router();

//var staticFiles = require('serve-static')('node_modules/swagger-ui/dist');

//app.use(staticFiles);
router.get('/swagger.json',function(req,res) {
    // console.warn('req',req.url);
    send(req, req.url, {
        root: path.join(__dirname)
    }).pipe(res);
});
// router.use(function(req,res) {
//     // console.warn('req',req.url);
//     send(req, req.url, {
//         root: path.join(__dirname,'../../..','node_modules/swagger-ui/dist')
//     }).pipe(res);
// });

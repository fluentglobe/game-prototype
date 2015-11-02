var gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha'),
    jade = require('gulp-jade'),
  	uglify = require('gulp-uglify'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten');

var ss = require('socketstream/gulp');
require('./demo');

ss.client.set({
  serveDebugInfo: true
});


gulp.task('default', ['pack-all']);
gulp.task('live', ['live-assets','live-reload','serve','serve-debug']);

gulp.task('serve-debug', function() {
  var ss = require('socketstream'),
      app = ss.http.middleware;

  // Showing stack errors
  app.set('showStackError', true);

  // Environment dependent middleware
  if (ss.env === 'development') {
    require('express-debug')(app, {/* settings */});
    // Disable views cache
    app.set('view cache', false);
  } else if (ss.env === 'production') {
    //TODO should this be realised in server script running in production?
    app.locals.cache = 'memory';
  }

});

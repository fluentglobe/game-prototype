var gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha'),
    riot = require('gulp-riot'),
    // jade = require('gulp-jade'),
 //  	uglify = require('gulp-uglify'),
    // cached = require('gulp-cached'),
    // remember = require('gulp-remember'),
    // concat = require('gulp-concat'),
    flatten = require('gulp-flatten');

var ss = require('socketstream/gulp');
require('./demo');

ss.client.set({
  serveDebugInfo: true
});

gulp.task('riot', function() {
    gulp.src('_demo/client/tagsx/*.tag')
        .pipe(riot({compact:true}))
        .pipe(gulp.dest('_demo/client/assets/tags.js'));
});

gulp.task('default', ['pack-all']);
gulp.task('live', ['live-assets','live-reload','serve','watch']);

gulp.task('watch', function() {
    gulp.watch('_demo/client/tags/*.tag', ['riot']);
});

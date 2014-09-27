'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});
var config = require('./gulp/config');

gulp.task('clean', function (cb) {
    var rimraf = require('rimraf');
    rimraf(config.destRoot, cb);
});

gulp.task('build', ['app', 'public', 'vendor'], function(cb) {

});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
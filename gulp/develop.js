'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});
var config = require('./config');

var browserSync = require('browser-sync');
var httpProxy = require('http-proxy');
var url = require('url');
var proxy = require('proxy-middleware');
/* This configuration allow you to configure browser sync to proxy your backend */
var proxyTarget = 'http://server/context/'; // The location of your backend
var proxyApiPrefix = 'api'; // The element in the URL which differentiate between API request and static file request

var path = require('path');

var reload = require('browser-sync').reload;

function browserSyncInit(baseDir, files, browser) {

  $.nodemon({
    script: path.join(__dirname, '..', 'app', 'app.js'),
    ext: 'js html react',
    watch: [
      path.join(__dirname, '..', 'app')
    ],
    env: {
      'NODE_ENV': 'development'
    },
    ignore: ['./build/**'],
  }).on('restart', function () {
    reload();
  });
  var browser = browser === undefined ? 'default' : browser;

  var proxyOptions = url.parse('http://localhost:5000/');
  proxyOptions.route = '/';

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    //server: {
    //      baseDir: baseDir,
    // middleware: [proxy(proxyOptions)]
    //  },
    browser: browser,
    injectChanges: false,
    proxy: "localhost:5000"
  });

}

gulp.task('dev', function () {
  config.watch = true;
  gulp.start('app:watch');
  gulp.start('public:watch');
  gulp.start('vendor:watch');
  browserSyncInit([
    config.destRoot
  ], []);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('serve:e2e', function () {
  browserSyncInit(['app', '.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['watch'], function () {
  browserSyncInit('dist', null, []);
});
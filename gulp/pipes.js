var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});
var config = require('./config');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var lazypipe = require('lazypipe');
var path = require('path');
var randomstring = require("randomstring");



function onError(err) {
    $.util.beep();
    console.log(err);
}

function onErrorNoop(err) {
    $.util.beep();
}

var plumberPipe = (function () {
    return lazypipe().pipe($.plumber, {
        errorHandler: onError
    });
}());

var replacementView = require('./templateview');
var templatePath = path.join(__dirname, "templateview.js");

if (config.watch) {
    $.watch(path.join(__dirname, "templateview.js"), {
        name: "MustacheTemplate"
    }, function () {
        delete require.cache[templatePath];
        replacementView = require('./templateview');
        gulp.start('public');
        gulp.start('app');
    });
}

var replacePipe = (function () {
    var Mustache = require('mustache');
    return lazypipe().pipe($.tap, function (file, t) {
        if (!file.contents) {
            return;
        }
        var contents = file.contents.toString();
        var mustached = Mustache.render(contents,
            replacementView);
        file.contents = new Buffer(mustached);
    });
}());


var preprocessPipe = function (name) {
    return lazypipe().pipe(plumberPipe).pipe(replacePipe.pipe(gulp.dest,
        config.tmp(
            name)));
};

var noopPlumberPipe = (function () {
    return lazypipe().pipe($.plumber, {
        errorHandler: onErrorNoop
    });
}());




module.exports = {
    plumber: plumberPipe,
    noopPlumber: noopPlumberPipe,
    replace: replacePipe,
    preprocess: preprocessPipe
};
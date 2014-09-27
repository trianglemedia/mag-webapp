var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});
var config = require('./config');
var pipes = require('./pipes');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var lazypipe = require('lazypipe');
var path = require('path');

gulp.task('vendor', ['vendor:scripts', 'vendor:styles'], function () {

});

var flatDest = function (file) {
    return path.join(config.dest("vendor"), path.relative(
        "./patterns", path.dirname(file.path)));
};

gulp.task('vendor:scripts', function () {
    gulp.src($.mainBowerFiles({
        filter: function (vendorPath) {
            var ext = path.extname(vendorPath);
            return ext === ".js";
        }
    })).pipe(gulp.dest(flatDest))
});

gulp.task('vendor:styles', function () {
    gulp.src($.mainBowerFiles({
        filter: function (vendorPath) {
            var ext = path.extname(vendorPath);
            return ext === ".css";
        }
    })).pipe(gulp.dest(flatDest));
});


gulp.task('vendor:watch', ['vendor'], function () {
    gulp.watch("bower.json", ["vendor", "app:index"]);
});
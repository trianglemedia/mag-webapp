var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});
var config = require('./config');
var pipes = require('./pipes');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var lazypipe = require('lazypipe');
var path = require('path');
var wiredep = require('wiredep').stream;
var reload = require('browser-sync').reload;

gulp.task('app', ['app:scripts', 'app:index'], function () {});

var createBundle = function () {

    var bundle = browserify({
        entries: path.join(config.tmp("app"), "app.js"),
        basedir: config.tmp("app"),
        transform: ['reactify', 'es6ify'],
        insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    return bundle;
};

gulp.task('app:scripts', ['app:scripts:preprocess'], function () {
    return createBundle().bundle().pipe(source("app.js"))
        .pipe(gulp.dest(config.dest("app")));
});

gulp.task('app:scripts:preprocess', function () {
    return gulp.src("app/**/*.js").pipe(pipes.preprocess("app")());
});

gulp.task('app:index', function () {
    var pipe = gulp.src("./app/index.html");

    if (config.watch) {
        $.util.log("Watching index.html");
        pipe = pipe.pipe($.watch("app/index.html", function (files) {
            // console.log(";)");
        }));
    }

    return pipe.pipe(pipes.replace())
        .pipe(wiredep({
            ignorePath: /../,
            overrides: {
                foundation: {
                    main: [
                        "js/foundation.js"
                    ]
                }
            }
        }))
        .pipe($.inject(gulp.src("app/*.js", {
            cwd: config.dest("")
        }), {
            read: false,
            starttag: '<!-- inject:' + "app:js" +
                ' -->',
            addRootSlash: true
        }))
        .pipe($.inject(gulp.src("styles/*.css", {
            cwd: config.dest("")
        }), {
            read: false,
            starttag: '<!-- inject:' + "app:css" +
                ' -->',
            addRootSlash: true
        }))
        .pipe(gulp.dest(config.dest("")))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('app:watch', function () {
    config.watch = true;
    gulp.start("app:index");
    gulp.start("app:scripts:watch");
});

gulp.task('app:scripts:watch', function () {
    var bundler = watchify(createBundle());

    bundler.on('update', rebundle);

    function rebundle() {
        $.util.log("Rebundling");
        return bundler.bundle()
            .on('error', $.util.log.bind($.util,
                'Browserify Error'))
            .pipe(source('app.js'))
            .pipe(gulp.dest(config.dest("app")))
            .pipe(reload({
                stream: true
            }));
    }

    $.watch("app/**/*.js", {
        name: "App"
    }, function (files) {
        files.pipe(pipes.preprocess("app")());
    });

    return rebundle();
});
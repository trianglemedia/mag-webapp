var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});
var config = require('./config');
var pipes = require('./pipes');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var lazypipe = require('lazypipe');
var reload = require('browser-sync').reload;
var path = require('path');


gulp.task('public', ['vendor', 'public:images', 'public:styles'], function () {

});

var imagepipe = lazypipe()
    .pipe(pipes.plumber)
    .pipe(gulp.dest, config.dest("images"))
    .pipe(reload, {
        stream: true
    });

var stylepipe = lazypipe()
    .pipe(pipes.plumber)
    .pipe($.sass, {
        includePaths: [config.tmp("styles"), "vendor/foundation/scss/",
            "vendor/"
        ]
    })
    .pipe($.autoprefixer, {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: true
    })
    .pipe($.rename, "main.css")
    .pipe(gulp.dest, config.dest("styles"))
    .pipe(reload, {
        stream: true
    });

gulp.task('public:images', function () {
    var pipe = gulp.src("public/images/**.{png,gif,jpg,jpeg}");

    if (config.watch) {
        $.util.log("Watching images");
        pipe = pipe.pipe($.watch("public/images/**/*.{png,gif.jpg,jpeg}", {
            name: "Images"
        }, function (files) {
            $.util.log("Processing images");
            return files.pipe(pipes.noopPlumber()).pipe(imagepipe());
        }));
    }
    return pipe.pipe(imagepipe());
});

gulp.task('public:styles', /* ['public:styles:preprocess'],*/ function () {
    var pre = gulp.src("public/styles/**/*.scss").pipe(pipes.preprocess(
        "styles")());
    pre.on('end', function () {
        var prePath = path.join(config.tmp("styles"), "dev.scss");
        var src = gulp.src(prePath);
        var pipe = src;
        if (config.watch) {
            $.util.log("Watching styles");
            return pipe.pipe($.watch("public/styles/**/*.scss", {
                name: "Styles"
            }, function (files) {
                $.util.log("Preprocessing");
                files.pipe(pipes.preprocess("styles")())
                    .on('end', function () {
                        $.util.log("Compiling");
                        return gulp.src(prePath).pipe(
                                pipes
                                .noopPlumber())
                            .pipe(stylepipe());
                    });
            }));
        } else {
            return pipe.pipe(stylepipe());
        }
    });
});

gulp.task('public:watch', function () {
    config.watch = true;
    gulp.start("public");
});
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});
var path = require('path');


var destRoot = ".build";


module.exports = {
    watch: false,
    destRoot: destRoot,
    dest: function (append) {
        return path.resolve(path.join(destRoot, append));
    },
    tmp: function (append) {
        return path.resolve(path.join(destRoot, ".tmp", append));
    }
};
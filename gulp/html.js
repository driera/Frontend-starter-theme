var gulp = require('gulp');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var config = require('./config.json');

module.exports = function() {
    gulp.src(config.tasks.html.src + config.tasks.html.entry)
    .pipe(gulp.dest(config.tasks.html.dest))
    .pipe(browserSync.stream());
}

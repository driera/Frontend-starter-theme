var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var config = require('./config.json');

var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssimport = require('postcss-import'),
    customproperties = require('postcss-custom-properties'),
    apply = require('postcss-apply'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    customMedia = require('postcss-custom-media'),
    minmax = require('postcss-media-minmax'),
    cssFor = require('postcss-for'),
    color = require('postcss-color-function'),
    nano = require('cssnano');

var processors = [
    cssimport,
    customproperties,
    apply,
    mixins,
    nested,
    customMedia,
    minmax,
    cssFor,
    color,
    autoprefixer(config.plugins.autoprefixer),
    nano(config.plugins.nano)
];

module.exports = function() {
    return gulp.src(config.tasks.css.src + config.tasks.css.entry)
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: 'Gulp',
                    subtitle: '☠ CSS error ☠',
                    message: '<%= error.message %>',
                    sound: 'Funk'
                })(err);
                this.emit('end');
            }
        }))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.tasks.css.dest))
        .pipe(browserSync.stream());
};

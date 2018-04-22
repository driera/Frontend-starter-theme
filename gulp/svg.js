var gulp = require('gulp');
var cheerio = require('gulp-cheerio');
var svgSymbols = require('gulp-svg-symbols');
var notify = require('gulp-notify');
var config = require('./config.json');

module.exports = function() {
    return gulp.src(config.tasks.svg.src + config.tasks.svg.pattern)
    .pipe(svgSymbols(config.plugins.svgSymbols))
    .pipe(cheerio({
        parserOptions: {
            xmlMode: true,
            normalizeWhitespace: true
        }
    }))
    .pipe(gulp.dest(config.tasks.svg.dest));
}

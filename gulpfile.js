var gulp = require('gulp');
var config = require('./gulp/config.json');
var tasks = require('require-dir')('./gulp');
delete tasks.config;

var watchTasks = [];
var defaultTasks = ['server', 'watch'];
var buildTasks = [];

/*
 * 1. Recorre las tareas y asigna cada una a los arrays "watchTasks", "defaultTasks" y "buildTasks" según corresponda.
 * 2. Además por cada tarea define una "gulp.task".
 */
Object.keys(tasks).filter(function(task) {
    config.tasks[task].categories.map(function(category) {
        eval(category + 'Tasks').push(task);
    });

    gulp.task(task, config.tasks[task].dependencies, tasks[task]);
});

gulp.task('watch', function() {
    watchTasks.forEach(function(value) {
        gulp.watch(config.tasks[value].src + config.tasks[value].pattern, [value]);
    });
});

gulp.task('default', defaultTasks);
gulp.task('build', buildTasks);

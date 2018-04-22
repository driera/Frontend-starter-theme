var browserSync = require('browser-sync').create();
var config = require('./config.json');

module.exports = function() {
    browserSync.init({
        server: {
            baseDir: config.tasks.server.src
        },
        open: config.plugins.browserSync.open,
        port: config.plugins.browserSync.port || 3000
    });
}

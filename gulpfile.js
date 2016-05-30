/**
 * Integration file to Gulp
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @license MIT
 */
 
'use strict';
 
var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    browserSync = require("browser-sync");
    
gulp.task("default", ["browser-sync", "nodemon"], function(){
    gulp.start("watch:html");
    gulp.start("watch:js");
});
 
gulp.task("browser-sync", function(){
    browserSync({
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        port: 7000
    });
});
 
gulp.task("nodemon", function(){
    nodemon({script: 'app.js'}).on("start");
});
 
gulp.task("watch:html", function () {
    browserSync.watch("./public/*.html").on("change", function () {
        browserSync.reload();
    });
});
 
gulp.task("watch:js", function () {
    browserSync.watch("./public/js/**/*.js").on("change", function () {
        browserSync.reload("*.js");
    });
});

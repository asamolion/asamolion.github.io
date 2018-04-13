var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var htmlmin = require('gulp-htmlmin');
var browserSync = require("browser-sync").create();
var babel = require("gulp-babel");
var plumber = require("gulp-plumber");
var inlinesource = require("gulp-inline-source");

gulp.task("html", function() {
    return gulp
        .src("src/**/*.pug")
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("build"))
});


gulp.task("css", function() {
    return gulp
        .src("src/**/*.scss") // Gets all files ending with .scss in app/scss and children dirs
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("build"))
});

gulp.task("js", function() {
    return gulp
        .src("src/**/*.js")
        .pipe(plumber())
        .pipe(
            babel({
                presets: ["env"]
            })
        )
        .pipe(gulp.dest("build"));
});

gulp.task("browserSync", function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});

gulp.task("minify", function() {
    return gulp
        .src("./build/*.html")
        .pipe(inlinesource({ compress: false, pretty: true }))
        .pipe(gulp.dest("./"))
});

gulp.task("watch", ["browserSync", "html", "css", "js"], function() {
    gulp.watch("src/**/*.pug", ["html", browserSync.reload]);
    gulp.watch("src/**/*.scss", ["css", browserSync.reload]);
    gulp.watch("src/**/*.js", ["js", browserSync.reload]);
});

gulp.task("default", ["html", "css", "js", "minify"]);

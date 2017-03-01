var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});
gulp.task('copy', function() {
    gulp.src('./src/data/**/*')
        .pipe(gulp.dest('./dist/data'));
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('webpack', function() {
    return gulp.src('src/js/app.jsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});
gulp.task('sass', function() {
    return gulp.src('src/sass/app.scss')
        .pipe(sass.sync()
            .on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});
gulp.task('watch-files', function() {
    livereload.listen();
    gulp.watch('src/js/**/*.js', ['webpack']);
    gulp.watch('src/js/**/*.jsx', ['webpack']);
    gulp.watch('src/js/**/*.json', ['webpack']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/lib/*.js', ['scripts']);
    gulp.watch('src/data/**/*', ['copy']);
    gulp.watch('src/fonts/**/*', ['copy']);
});
gulp.task('scripts', function() {
    return gulp.src(['src/js/lib/leaflet.js', 'src/js/lib/L.Control.MousePosition.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('compress', ['scripts'], function(cb) {
    pump([
        gulp.src('./dist/lib.js'),
        uglify(),
        gulp.dest('dist')
    ]);
});
gulp.task('default', ['html', 'copy', 'sass', 'scripts', 'webpack', 'compress']);
gulp.task('watch', ['default', 'watch-files']);

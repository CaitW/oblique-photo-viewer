var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var del = require('del');
var fs = require('fs');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var soften = require('gulp-soften');
gulp.task('clean', function () {
  return del([
    'dist/*'
  ]);
});
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
    gulp.src('./src/favicons/**/*')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
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
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['src/js/**/*.js','!node_modules/**','!src/js/lib/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});
gulp.task('soften', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['src/js/**/*.js','src/js/**/*.jsx','!node_modules/**','!src/js/lib/**'])
        .pipe(soften(4))
        .pipe(gulp.dest('./src/js/'));
});
// default task, no cleaning
gulp.task('default', ['html', 'copy', 'sass', 'scripts', 'webpack', 'compress']);
// this task runs the "clean" mechanism prior to rebuilding the files
gulp.task('build', function(callback) {
  runSequence('clean',
              ['default'],
              callback);
});
gulp.task('deploy', function(callback) {
  runSequence('lint',
              ['build'],
              callback);
});
gulp.task('watch', ['default', 'watch-files']);

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('html', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('webpack', function() {
	return gulp.src('src/js/app.jsx')
	  .pipe(webpack( require('./webpack.config.js') ))
	  .pipe(gulp.dest('dist/'))
	  .pipe(livereload());
});

gulp.task('sass', function () {
  return gulp.src('src/sass/app.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
    gulp.watch('src/js/**/*.jsx', ['webpack']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/lib/*.js', ['scripts']);
});

gulp.task('scripts', function() {
  return gulp.src('src/js/lib/*.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['html', 'sass', 'scripts', 'webpack']);

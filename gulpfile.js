var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

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

gulp.task('watch', function() {
	livereload.listen();
    gulp.watch('src/js/**/*.jsx', ['webpack']);
    gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['html', 'webpack']);

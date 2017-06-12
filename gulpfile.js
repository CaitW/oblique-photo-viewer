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
var gulpStylelint = require('gulp-stylelint');
var util = require('gulp-util');

/**
 * Clean up dist/ directory
 */
gulp.task('clean', function () {
  return del([
    'dist/*'
  ]);
});

/**
 * Copy Files
 */
gulp.task('copy-html', function() {
    return gulp.src(['src/index.html','src/about.html'])
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});
gulp.task('copy-data', function() {
    gulp.src('./src/data/**/*')
        .pipe(gulp.dest('./dist/data'));
});
gulp.task('copy-content', function() {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./src/favicons/**/*')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
});

/**
 * Build Stylesheets, copy
 */
gulp.task('sass', function() {
    return gulp.src('src/sass/app.scss')
        .pipe(sass.sync()
            .on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('sass-about', function() {
    return gulp.src('src/sass/about.scss')
        .pipe(sass.sync()
            .on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

/*
 * Process libraries
 */
gulp.task('scripts', function() {
    return gulp.src(['src/js/lib/leaflet.js', 'src/js/lib/L.Control.MousePosition.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('compress-libraries', ['scripts'], function(cb) {
    pump([
        gulp.src('./dist/lib.js'),
        uglify(),
        gulp.dest('dist')
    ]);
});

/*
 * Build Javascript
 */
gulp.task('webpack-dev', function() {
    return gulp.src('src/js/app.jsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});
gulp.task('webpack-prod', function() {
    return gulp.src('src/js/app.jsx')
        .pipe(webpack(require('./webpack.config.prod.js')))
        .pipe(gulp.dest('dist/'));
});

/*
 * Watch Files
 */
gulp.task('watch-files', function() {
    livereload.listen();
    gulp.watch('src/js/**/*.js', ['webpack-dev']);
    gulp.watch('src/js/**/*.jsx', ['webpack-dev']);
    gulp.watch('src/js/**/*.json', ['webpack-dev']);
    gulp.watch('src/sass/**/*.scss', ['sass', 'sass-about']);
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/js/lib/*.js', ['scripts']);
    gulp.watch('src/data/**/*', ['copy-data']);
    gulp.watch('src/fonts/**/*', ['copy-content']);
});


/*
 * Linting
 */
gulp.task('lint-js', () => {
    // Via CLI:
    // eslint --ext .js,.jsx src/js/** --ignore-pattern '/lib/' --ignore-pattern '*.json'
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([
        'src/js/**/*.js',
        'src/js/**/*.jsx',
        '!node_modules/**',
        '!src/js/lib/**',
        '!*.json'
        ])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
            fix: true
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});
gulp.task('lint-css', function () {
    // Command line command to lint:
    // stylefmt -r "src/sass/*.scss"
  return gulp
    .src(['src/sass/*.scss','!src/sass/lib/**'])
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

/*
 * Tasks
 */
// default task
gulp.task('default', ['copy-html', 'copy-data', 'copy-content', 'sass', 'sass-about', 'scripts', 'webpack-dev']);
// for active development
gulp.task('watch', ['default', 'watch-files']);
// pre-deploy tasks (for releases)
gulp.task('pre-deploy', ['clean','lint-js','lint-css']);

// production
gulp.task('build', ['copy-html', 'copy-content', 'sass', 'scripts', 'webpack-prod', 'compress-libraries', 'copy-data']);


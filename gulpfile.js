var gulp = require('gulp');
var webpack = require('webpack');
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
var jsonMinify = require('gulp-jsonminify');
var debug = require('gulp-debug');
var zip = require('gulp-zip');
var ogr2ogr = require('ogr2ogr');
var gulpUtil = require('gulp-util');

// webpack configurations
var webpack_dev = require('./webpack.config.js');
var webpack_prod = require('./webpack.config.prod.js');

var CONFIG;
try {
    CONFIG = fs.readFileSync('./server_config.json');
    CONFIG = JSON.parse(CONFIG);
} catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "No server_config.json found. Copy and rename server_config.example.json or create your own. See github for more info.");
    throw "Error";
}

// List all files in a directory in Node.js recursively in a synchronous fashion
function walkSync (dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file))
            .isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

function returnGeoJsonFiles (fileList) {
    let geoJsonFiles = [];
    for (let file of fileList) {
        if(file.split('.')[1] === 'json') {
            geoJsonFiles.push(file);
        }
    }
    return geoJsonFiles;
}

/**
 * Clean up dist/ directory
 */
gulp.task('clean', function () {
  return del([
    'dist/*'
  ]);
});

/**
 * Make Data Downloads
 */
gulp.task('delete-temp-downloads', function () {
    return del(['./temp/']);
})
gulp.task('zip-geojson-layers', function() {
    return gulp.src(['./src/data/layers/*.json'])
        .pipe(debug({title: 'zipping:'}))
        .pipe(zip('layers-geojson.zip'))
        .pipe(gulp.dest('./dist/downloads'));
});
gulp.task('zip-json-profiles', function() {
    return gulp.src(['./src/data/profiles/**/*.json'])
        .pipe(debug({title: 'zipping:'}))
        .pipe(zip('profiles-json.zip'))
        .pipe(gulp.dest('./dist/downloads'));
});
gulp.task('convert-and-zip-layer-shapefiles', function(done) {
    let geojsons = returnGeoJsonFiles(walkSync('./src/data/layers/'));

    function convertToShapefile(index, fileList) {
        if (index < fileList.length) {
            let file = fileList[index];
            let fileName = file.split(".")[0].replace('src/data/layers/', '') + ".zip";
            console.log("starting " + fileName);
            let ogr = ogr2ogr("./" + file)
                .format('ESRI Shapefile')
                .skipfailures();
            ogr.exec(function(er, data) {
                if (er) {
                    console.error(er)
                } else {
                    if (!fs.existsSync('./temp/layer-shapefiles/')){
                        if(!fs.existsSync('./temp')) {
                            fs.mkdirSync('./temp');
                        }
                        fs.mkdirSync('./temp/layer-shapefiles/');
                    }
                    fs.writeFileSync('./temp/layer-shapefiles/' + fileName, data);
                }
                return convertToShapefile(index + 1, fileList);
            });
        } else {
            gulp.src(['./temp/layer-shapefiles/**/*.zip'])
                .pipe(debug({ title: 'zipping:' }))
                .pipe(zip('layers-shp.zip'))
                .pipe(gulp.dest('./dist/downloads'))
                .on('end', function() {
                    done();
                    return;
                });
        }
    }
    return convertToShapefile(0, geojsons);
});


/**
 * Copy Files
 */
gulp.task('copy-html', function() {
    return gulp.src(['src/index.html','src/about.html'])
        .pipe(debug({title: 'copying:'}))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});
gulp.task('copy-data', function() {
    return gulp.src('./src/data/**/*')
        .pipe(debug({title: 'copying:'}))
        .pipe(gulp.dest('./dist/data'));
});
gulp.task('copy-downloads', function () {
    return gulp.src('./src/downloads/**/*')
        .pipe(debug({title: 'copying:'}))
        .pipe(gulp.dest('./dist/downloads/'));
})
gulp.task('copy-fonts', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(debug({title: 'copying:'}))
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('copy-favicons', function () {
    return gulp.src('./src/favicons/**/*')
        .pipe(debug({title: 'copying:'}))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('copy-img', function () {
    return gulp.src('./src/img/**/*')
        .pipe(debug({title: 'copying:'}))
        .pipe(gulp.dest('./dist/img/'));
})
gulp.task('copy', gulp.parallel('copy-html', 'copy-data', 'copy-downloads', 'copy-fonts', 'copy-favicons', 'copy-img'));

/**
 * Build Stylesheets, copy
 */
gulp.task('sass-app', function() {
    return gulp.src('src/sass/app.scss')
        .pipe(debug({title: 'processing stylesheet:'}))
        .pipe(sass.sync()
            .on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('sass-about', function() {
    return gulp.src('src/sass/about.scss')
        .pipe(debug({title: 'processing stylesheet:'}))
        .pipe(sass.sync()
            .on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('sass', gulp.parallel('sass-app', 'sass-about'));

/*
 * Build Javascript
 */
gulp.task('webpack-dev', function(done) {
    return webpack(webpack_dev, function(error) {
        var pluginError;
        if (error) {
            pluginError = new gulpUtil.PluginError('webpack', error);
            if (done) {
                done(pluginError);
            } else {
                gulpUtil.log('[webpack]', pluginError);
            }
            return;
        }
        if (done) {
            livereload.reload('./dist/app.bundle.js');
            done();
        }
    });
});
gulp.task('webpack-prod', function(done) {
    return webpack(webpack_prod, function(error) {
        var pluginError;
        if (error) {
            pluginError = new gulpUtil.PluginError('webpack', error);
            if (done) {
                done(pluginError);
            } else {
                gulpUtil.log('[webpack]', pluginError);
            }
            return;
        }
        if (done) {
            done();
        }
    });
});

/*
 * Watch Files
 */

gulp.task('watch-files', function() {
    livereload.listen();
    gulp.watch('src/js/**/*.js', gulp.parallel('webpack-dev'));
    gulp.watch('src/js/**/*.jsx', gulp.parallel('webpack-dev'));
    gulp.watch('src/js/**/*.json', gulp.parallel('webpack-dev'));
    gulp.watch('src/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('src/*.html', gulp.parallel('copy-html'));
    gulp.watch('src/data/**/*', gulp.parallel('copy-data'));
    gulp.watch('src/fonts/**/*', gulp.parallel('copy-fonts'));
    gulp.watch('src/downloads/**/*', gulp.parallel('copy-downloads'));
    gulp.watch('src/favicons/**/*', gulp.parallel('copy-favicons'));
    gulp.watch('src/img/**/*', gulp.parallel('copy-img'));
});


/*
 * Linting
 */
gulp.task('lint-js', (done) => {
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
        .pipe(debug({title: 'linting js :'}))
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
        .pipe(eslint.failAfterError())
        .on('end', function () {
            done();
        })
});
gulp.task('lint-css', function () {
    // Command line command to lint:
    // stylefmt -r "src/sass/*.scss"
  return gulp
    .src(['src/sass/*.scss','!src/sass/lib/**'])
    .pipe(debug({title: 'linting css :'}))
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// copy ./dist directory to the web server for hosting
gulp.task('copy-to-server', function() {
    return gulp.src(['./dist/**/*'])
        .pipe(debug({ title: 'deploying:' }))
        .pipe(gulp.dest(CONFIG.SERVER_DIR));
});


/*
 * Development Tasks
 */

 // make data downloads
gulp.task('make-downloads', gulp.series('zip-geojson-layers', 'zip-json-profiles', 'convert-and-zip-layer-shapefiles', 'delete-temp-downloads'));
// build for development (skips some steps, like 'clean', 'make-downloads')
gulp.task('dev-build', gulp.series('sass', 'webpack-dev', 'copy'));
// alias
gulp.task('default', gulp.parallel('dev-build'));
// for active development
gulp.task('watch', gulp.parallel('default', 'watch-files'));

/**
 * Testing
 */

// lint code
gulp.task('lint', gulp.parallel('lint-js','lint-css'));

/**
 * Production Tasks
 */
 // makes clean, minified production build in /dist
gulp.task('build', gulp.series('clean','make-downloads', 'sass', 'webpack-prod', 'copy'));
gulp.task('deploy', gulp.parallel('copy-to-server'));


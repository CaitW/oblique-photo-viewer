const gulp = require("gulp")
const livereload = require("gulp-livereload")
const sass = require("gulp-sass")
const del = require("del")
const fs = require("fs")
const eslint = require("gulp-eslint")
const gulpStylelint = require("gulp-stylelint")
const debug = require("gulp-debug")
const zip = require("gulp-zip")
const ogr2ogr = require("ogr2ogr")
const gulpUtil = require("gulp-util")
const shell = require("gulp-shell")
const uglifycss = require("gulp-uglifycss")
const path = require("path")
const webpackStream = require("webpack-stream")

/**
 * Webpack Configurations
 *
 * Dev
 *  - Doesn't minify output
 *  - Sets node environment variable to development
 *
 * Prod
 *  - Minifies output
 *  - Sets node environment variable to production
 */
const webpack_dev = require("./webpack.config.js")
const webpack_prod = require("./webpack.config.prod.js")

/**
 * Server Config
 *
 * - Tries to get server_config.json. If it can't be found, throw an error.
 * - server_config.json holds the location of the directory where the app should be deployed
 */
let CONFIG

try {
  CONFIG = fs.readFileSync("./server_config.json")
  CONFIG = JSON.parse(CONFIG)
} catch (err) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "No server_config.json found. Copy and rename server_config.example.json or create your own. See github for more info."
  )
  throw new Error("Error")
}

/**
 * Util Functions
 */

// List all files in a directory in Node.js recursively in a synchronous fashion
function walkSync(dir, filelist) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist)
    } else {
      filelist.push(path.join(dir, file))
    }
  })
  return filelist
}

// Returns files that have a .json extension
function returnGeoJsonFiles(fileList) {
  const geoJsonFiles = []
  for (const file of fileList) {
    if (file.split(".")[1] === "json") {
      geoJsonFiles.push(file)
    }
  }
  return geoJsonFiles
}

/**
 * Tasks
 */

/**
 * Clean up dist/ directory
 *
 * Parent tasks:
 * - build
 */
gulp.task("clean", () => del(["dist/*"]))

/**
 * Make Data Downloads
 *
 * Parent tasks: (none) - MUST BE RUN MANUALLY
 */
// zip up geojson layer files
gulp.task("zip-geojson-layers", () =>
  gulp
    .src(["./src/data/layers/*.json"])
    .pipe(debug({ title: "zipping:" }))
    .pipe(zip("layers-geojson.zip"))
    .pipe(gulp.dest("./src/downloads"))
)
// zip up JSON profiles
gulp.task("zip-json-profiles", () =>
  gulp
    .src(["./src/data/profiles/**/*.json"])
    .pipe(debug({ title: "zipping:" }))
    .pipe(zip("profiles-json.zip"))
    .pipe(gulp.dest("./src/downloads"))
)
// zip up XLS profiles
gulp.task("zip-xlsx-profiles", () =>
  gulp
    .src(["./src/data/profiles/**/*.xlsx"])
    .pipe(debug({ title: "zipping:" }))
    .pipe(zip("profiles-xlsx.zip"))
    .pipe(gulp.dest("./src/downloads"))
)
// convert JSON layers to shapefiles, zip
gulp.task("convert-and-zip-layer-shapefiles", done => {
  const geojsons = returnGeoJsonFiles(walkSync("./src/data/layers/", []))

  function convertToShapefile(index, fileList) {
    if (index < fileList.length) {
      const file = fileList[index]
      const fileName =
        `${file.split(".")[0].replace("src/data/layers/", "")  }.zip`
      console.log(`starting ${  fileName}`)
      const ogr = ogr2ogr(`./${  file}`)
        .format("ESRI Shapefile")
        .skipfailures()
      ogr.exec((er, data) => {
        if (er) {
          console.error(er)
        } else {
          if (!fs.existsSync("./temp/layer-shapefiles/")) {
            if (!fs.existsSync("./temp")) {
              fs.mkdirSync("./temp")
            }
            fs.mkdirSync("./temp/layer-shapefiles/")
          }
          fs.writeFileSync(`./temp/layer-shapefiles/${  fileName}`, data)
        }
        return convertToShapefile(index + 1, fileList)
      })
    } else {
      gulp
        .src(["./temp/layer-shapefiles/**/*.zip"])
        .pipe(debug({ title: "zipping:" }))
        .pipe(zip("layers-shp.zip"))
        .pipe(gulp.dest("./src/downloads"))
        .on("end", () => {
          done()
        })
    }
  }
  return convertToShapefile(0, geojsons)
})
// delete temporary downloads folder
gulp.task("delete-temp-downloads", () => del(["./temp/"]))

gulp.task(
  "make-downloads",
  gulp.series(
    "zip-geojson-layers",
    "zip-json-profiles",
    "zip-xlsx-profiles",
    "convert-and-zip-layer-shapefiles",
    "delete-temp-downloads"
  )
)

/**
 * Copy Files
 *
 * Parent Tasks:
 *  - dev-build
 *  - Build
 */
// copy index, about html files
gulp.task("copy-html", () =>
  gulp
    .src(["src/index.html", "src/about.html"])
    .pipe(debug({ title: "copying:" }))
    .pipe(gulp.dest("dist/"))
    .pipe(livereload())
)
// copy data folder
gulp.task("copy-data", () =>
  gulp
    .src("./src/data/**/*")
    .pipe(debug({ title: "copying:" }))
    .pipe(gulp.dest("./dist/data"))
)
// copy downloads folder
gulp.task("copy-downloads", () =>
  gulp
    .src("./src/downloads/**/*")
    .pipe(debug({ title: "copying:" }))
    .pipe(gulp.dest("./dist/downloads/"))
)
// copy fonts
gulp.task("copy-fonts", () =>
  gulp
    .src("./src/fonts/**/*")
    .pipe(debug({ title: "copying:" }))
    .pipe(gulp.dest("./dist/fonts"))
)
// copy favicons
gulp.task("copy-favicons", () =>
  gulp
    .src("./src/favicons/**/*")
    .pipe(debug({ title: "copying:" }))
    .pipe(gulp.dest("./dist/"))
)
// copy images
gulp.task("copy-img", () =>
  gulp
    .src("./src/img/**/*")
    .pipe(debug({ title: "copying:" }))
    .pipe(gulp.dest("./dist/img/"))
)

gulp.task(
  "copy",
  gulp.parallel(
    "copy-html",
    "copy-data",
    "copy-downloads",
    "copy-fonts",
    "copy-favicons",
    "copy-img"
  )
)

/**
 * Build Stylesheets, copy
 *
 * Parent Tasks:
 *  - dev-build
 *  - build
 */
gulp.task("sass-app", () =>
  gulp
    .src("src/sass/app.scss")
    .pipe(debug({ title: "processing stylesheet:" }))
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(uglifycss())
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload())
)

gulp.task("sass-about", () =>
  gulp
    .src("src/sass/about.scss")
    .pipe(debug({ title: "processing stylesheet:" }))
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(uglifycss())
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload())
)

gulp.task("sass", gulp.parallel("sass-app", "sass-about"))

/*
 * Build Javascript (dev)
 *
 * Parent Tasks:
 *  - dev-build
 */
gulp.task("webpack-dev", () =>
  gulp
    .src("src/js/app.jsx")
    .pipe(
      webpackStream(webpack_dev, null, err => {
        if (err) {
          const error = new gulpUtil.PluginError("webpack", err)
          gulpUtil.log("[webpack]", error)
        }
      })
    )
    .pipe(gulp.dest("./dist/"))
)

/*
 * Build Javascript (production)
 *
 * Parent Tasks:
 *  - build
 */
gulp.task("webpack-prod", () =>
  gulp
    .src("src/js/app.jsx")
    .pipe(
      webpackStream(webpack_prod, null, err => {
        if (err) {
          const error = new gulpUtil.PluginError("webpack", err)
          gulpUtil.log("[webpack]", error)
        }
      })
    )
    .pipe(gulp.dest("./dist/"))
)

/*
 * Watch Files
 *
 * Parent tasks:
 * - watch
 */
gulp.task("watch-files", () => {
  livereload.listen()
  gulp.watch("src/js/**/*.js", gulp.parallel("webpack-dev"))
  gulp.watch("src/js/**/*.jsx", gulp.parallel("webpack-dev"))
  gulp.watch("src/js/**/*.json", gulp.parallel("webpack-dev"))
  gulp.watch("src/sass/**/*.scss", gulp.parallel("sass"))
  gulp.watch("src/*.html", gulp.parallel("copy-html"))
  gulp.watch("src/data/**/*", gulp.parallel("copy-data"))
  gulp.watch("src/fonts/**/*", gulp.parallel("copy-fonts"))
  gulp.watch("src/downloads/**/*", gulp.parallel("copy-downloads"))
  gulp.watch("src/favicons/**/*", gulp.parallel("copy-favicons"))
  gulp.watch("src/img/**/*", gulp.parallel("copy-img"))
})

/*
 * Linting
 *
 * - Must be run manually
 */
gulp.task("lint-js", done =>
  // Via CLI:
  // eslint --ext .js,.jsx src/js/** --ignore-pattern '/lib/' --ignore-pattern '*.json'
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  gulp
    .src([
      "src/js/**/*.js",
      "src/js/**/*.jsx",
      "!node_modules/**",
      "!src/js/lib/**",
      "!*.json"
    ])
    .pipe(debug({ title: "linting js :" }))
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(
      eslint({
        fix: true
      })
    )
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
    .on("end", () => {
      done()
    })
)
gulp.task("lint-css", () =>
  // Command line to lint:
  // stylelint "src/sass/*.scss"
  // Command line command to format:
  // stylefmt -r "src/sass/*.scss"
  gulp
    .src(["src/sass/*.scss", "!src/sass/lib/**"])
    .pipe(debug({ title: "linting css :" }))
    .pipe(
      gulpStylelint({
        reporters: [{ formatter: "string", console: true }]
      })
    )
)

// lint code
gulp.task("lint", gulp.parallel("lint-js", "lint-css"))

/**
 * Copy ./dist directory to the web server for hosting
 *  - For ASFPM, this will be a directory on the same machine
 *
 * Parent Tasks:
 *  - deploy
 */
gulp.task("copy-to-server", () =>
  gulp
    .src(["./dist/**/*"])
    .pipe(debug({ title: "deploying:" }))
    .pipe(gulp.dest(CONFIG.SERVER_DIR))
)

/**
 * Build documentation
 *
 * Parent Tasks:
 *  - build
 */
gulp.task("make-docs", () =>
  gulp
    .src("src/")
    .pipe(shell("npm run make-docs"))
    .pipe(gulp.dest("./dist"))
)

/*
 * Development Tasks
 */
// build for development (skips some steps, like 'clean', 'make-downloads')
gulp.task("dev-build", gulp.series("sass", "webpack-dev", "copy"))
// alias
gulp.task("default", gulp.parallel("dev-build"))

/**
 * Utilities
 */
// for active development
gulp.task("watch", gulp.parallel("default", "watch-files"))

/**
 * Production Tasks
 */
// makes clean, minified production build in /dist
gulp.task(
  "build",
  gulp.series("clean", "sass", "webpack-prod", "copy", "make-docs")
)
gulp.task("deploy", gulp.series("copy-to-server"))

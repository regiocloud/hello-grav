var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// configure the paths
var watch_dir_scss = './scss/**/*.scss';
var watch_dir_twig = './templates/**/*.html.twig';
var watch_dir_js = './js/**/*.js';
var src_dir = './scss/*.scss';
var dest_dir = './css/css-compiled';

var paths = {
    source: src_dir
};

function watch() {
    browserSync.init({
        proxy: "localhost:8080"
    });
    gulp.watch(watch_dir_twig).on("change", reload);
    gulp.watch(watch_dir_js).on("change", reload);
  return gulp.watch(watch_dir_scss, build);
}

function build() {
  return gulp.src(paths.source)
      .pipe(sourcemaps.init())
      .pipe(sass({
            outputStyle: 'compact',
            precision: 10
          }).on('error', sass.logError)
      )
      .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest(dest_dir))
      .pipe(csscomb())
      .pipe(cleancss())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(dest_dir))
      .pipe(browserSync.stream());
}

exports.watch = watch;
exports.build = build;
exports.default = build;

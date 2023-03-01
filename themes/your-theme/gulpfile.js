const gulp = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const webp = require('gulp-webp');

// configure the paths

const watch_dir_scss = './src/scss/**/*.scss';
const watch_dir_twig = './templates/**/*.html.twig';
const watch_dir_js = './src/js/**/*.js';
const watch_dir_img = './src/images/**/*.{png,jpg,jpeg}';
const src_dir_scss = './src/scss/*.scss';
const src_dir_images = './src/images/**/*.{png,jpg,jpeg}';
const dest_dir_images = './dist/images-compiled';
const dest_dir_scss = './dist/css-compiled';

function build() {
  return gulp.src(src_dir_scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact',
      precision: 10
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dest_dir_scss))
    .pipe(browserSync.stream());
}

gulp.task('images', () => {
  return gulp.src(src_dir_images)
  .pipe(webp())
  .pipe(gulp.dest('./dist/images-compiled'));
});

function watch() {
    browserSync.init({
        proxy: "localhost:8080"
    });
    gulp.watch(watch_dir_twig).on("change", reload);
    gulp.watch(watch_dir_js).on("change", reload);
  return gulp.watch(watch_dir_scss, build);
}

exports.watch = watch;
exports.build = build;

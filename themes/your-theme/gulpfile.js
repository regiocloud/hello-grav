const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const webp = require('gulp-webp');
const del  = require('del')

const paths = {
  src: {
    scss: './src/scss/*.scss',
    images: './src/images/**/*.{png,jpg,jpeg}'
  },
  watch: {
    scss: './src/scss/**/*.scss',
    images: './src/images/**/*.{png,jpg,jpeg}',
    twig: './templates/**/*.html.twig',
    js: './src/js/**/*.js'
  },
  dest: {
    css: './dist/css-compiled',
    images: './dist/images-compiled'
  }
};

function compileSass() {
  return gulp
    .src(paths.src.scss)
    .pipe(
      sass({
        outputStyle: 'expanded',
        precision: 10,
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
}

gulp.task('convertImages', () => {
  return gulp.src(paths.src.images).pipe(webp()).pipe(gulp.dest(paths.dest.images));
});

gulp.task('clean', () => {
  return del(['dist/**/*']);
});

function watch() {
  browserSync.init({
    proxy: 'localhost:8080'
  });
  gulp.watch(paths.watch.scss, gulp.series('clean', compileSass));
  gulp.watch(paths.watch.images, gulp.series('clean', 'convertImages'));
  gulp.watch(paths.watch.twig).on('change', browserSync.reload);
  gulp.watch(paths.watch.js).on('change', browserSync.reload);
}

exports.watch = watch;
exports.build = gulp.series('clean', compileSass, 'convertImages');
exports.default = watch;

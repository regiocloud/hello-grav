const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const webp = require('gulp-webp');
const del  = require('del');

const paths = {
  src: {
    scss: './src/scss/*.scss',
    js: './src/js/**/*',
    images: './src/images/**/*.{png,PNG,jpg,JPG,jpeg,JPEG}',
    fonts: './src/fonts/**/*.{woff,WOFF,ttf,TTF}'
  },
  watch: {
    scss: './src/scss/**/*.scss',
    images: './src/images/**/*.{png,PNG,jpg,JPG,jpeg,JPEG',
    fonts: './src/fonts/**/*.{woff,WOFF,ttf,TTF}',
    js: './src/js/**/*.js',
    twig: './templates/**/*.html.twig'
  },
  dest: {
    css: './dist/css-compiled',
    js: './dist/js',
    images: './dist/images-compiled',
    fonts: './dist/fonts'
  }
};

gulp.task ('compile-sass', () => {
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
});

gulp.task('compile-images', () => {
  return gulp
  .src(paths.src.images)
  .pipe(webp())
  .pipe(gulp.dest(paths.dest.images))
  .pipe(browserSync.stream());
});

gulp.task('compile-fonts', () =>{
  return gulp
  .src(paths.src.fonts)
  .pipe(gulp.dest(paths.dest.fonts))
  .pipe(browserSync.stream());
});

gulp.task('compile-js', () =>{
  return gulp
  .src(paths.src.js)
  .pipe(gulp.dest(paths.dest.js))
  .pipe(browserSync.stream());
});

gulp.task('clean-all', () => {
  return del(['dist/**/*']);
});

gulp.task('clean-images', () => {
  return del(['dist/images-compiled/**/*']);
});

gulp.task('clean-fonts', () => {
  return del(['dist/fonts/**/*']);
});

gulp.task('clean-css', () => {
  return del(['dist/css-compiled/**/*']);
});

gulp.task('clean-js', () => {
  return del(['dist/js/**/*']);
});

function watch() {
  browserSync.init({
    proxy: 'localhost:8080'
  });
  gulp.watch(paths.watch.scss, gulp.series('clean-css', 'compile-sass'));
  gulp.watch(paths.watch.images, gulp.series('clean-images', 'compile-images'));
  gulp.watch(paths.watch.fonts, gulp.series('clean-fonts', 'compile-fonts'));
  gulp.watch(paths.watch.js, gulp.series('clean-js', 'compile-js'));
  gulp.watch(paths.watch.twig).on('change', browserSync.reload);
}

exports.watch = watch;
exports.build = gulp.series('clean-all', 'compile-sass', 'compile-js', 'compile-fonts', 'compile-images');
exports.default = watch;
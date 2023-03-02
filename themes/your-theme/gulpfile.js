const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const webp = require('gulp-webp');
const del  = require('del');

const paths = {
  src: {
    scss: './src/scss/*.scss',
    images: './src/images/**/*.{png,jpg,jpeg}',
    fonts: './src/fonts/**/*.{woff,ttf}'
  },
  watch: {
    scss: './src/scss/**/*.scss',
    images: './src/images/**/*.{png,jpg,jpeg}',
    fonts: './src/fonts/**/*.{woff,ttf}',
    twig: './templates/**/*.html.twig',
    js: './src/js/**/*.js'
  },
  dest: {
    css: './dist/css-compiled',
    images: './dist/images-compiled',
    fonts: './dist/fonts'
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

gulp.task('convert-images', () => {
  return gulp.src(paths.src.images).pipe(webp()).pipe(gulp.dest(paths.dest.images));
});

gulp.task('stream-fonts', () =>{
  return gulp.src(paths.src.fonts).pipe(gulp.dest(paths.dest.fonts));
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



function watch() {
  browserSync.init({
    proxy: 'localhost:8080'
  });
  gulp.watch(paths.watch.scss, gulp.series('clean-css', compileSass));
  gulp.watch(paths.watch.images, gulp.series('clean-images', 'convert-images'));
  gulp.watch(paths.watch.fonts, gulp.series('clean-fonts', 'stream-fonts'));
  gulp.watch(paths.watch.twig).on('change', browserSync.reload);
  gulp.watch(paths.watch.js).on('change', browserSync.reload);
}

exports.watch = watch;
exports.build = gulp.series('clean-all', compileSass, 'stream-fonts', 'convert-images');
exports.default = watch;

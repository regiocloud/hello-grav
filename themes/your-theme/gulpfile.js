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
    images: './src/images/**/*.{png,jpg,jpeg}',
    fonts: './src/fonts/**/*.{woff,ttf}',
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
  return gulp
  .src(paths.src.images)
  .pipe(webp())
  .pipe(gulp.dest(paths.dest.images))
  .pipe(browserSync.stream());
});

gulp.task('stream-fonts', () =>{
  return gulp
  .src(paths.src.fonts)
  .pipe(gulp.dest(paths.dest.fonts))
  .pipe(browserSync.stream());
});

gulp.task('stream-js', () =>{
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
  gulp.watch(paths.watch.scss, gulp.series('clean-css', compileSass));
  gulp.watch(paths.watch.images, gulp.series('clean-images', 'convert-images'));
  gulp.watch(paths.watch.fonts, gulp.series('clean-fonts', 'stream-fonts'));
  gulp.watch(paths.watch.js, gulp.series('clean-js', 'stream-js'));
  gulp.watch(paths.watch.twig).on('change', browserSync.reload);
}

exports.watch = watch;
exports.build = gulp.series('clean-all', compileSass, 'stream-js', 'stream-fonts', 'convert-images');
exports.default = watch;

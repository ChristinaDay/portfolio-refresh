var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var jade = require('gulp-jade');
var jadelint = require('gulp-jadelint');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var neat = require('node-neat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths = {
  assets: './app/assets/**/*',
  build: './build',
  styles: './app/styles/**/*.scss',
  templates: './app/templates/**/'
};

gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(scsslint())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
        includePaths: neat.includePaths
      }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
});

gulp.task('templates', function() {
  gulp.src(paths.templates + '!(_)*.jade')
    .pipe(plumber())
    .pipe(jadelint())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(paths.build));
});

gulp.task('images', function() {
  gulp.src(paths.assets)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.build + '/assets'));
});

gulp.task('serve', ['watch'], function () {
  browserSync.init({
      server: {
          baseDir: paths.build
      }
  });
});

gulp.task('clean', function () {
  del(paths.build + '/**');
});

gulp.task('watch', ['styles', 'templates', 'images'], function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.assets, ['images']);
  gulp.watch(paths.templates + '*.jade', ['templates']);
  gulp.watch(paths.build + '/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);



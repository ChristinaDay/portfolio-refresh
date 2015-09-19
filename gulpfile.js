var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var scsslint = require('gulp-scss-lint');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var jadelint = require('gulp-jadelint');
var plumber = require('gulp-plumber');

gulp.task('sass', ['scss-lint'], function () {
  gulp.src('./app/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(prefix())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('scss-lint', function() {
  gulp.src('./app/styles/**/*.scss')
    .pipe(scsslint());
});

gulp.task('jade', ['jade-lint'], function() {
  gulp.src('./app/templates/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
})

gulp.task('jade-lint', function() {
  gulp.src('./app/templates/**/*.jade')
    .pipe(jadelint());
});

gulp.task('browser-sync', function() {

});

gulp.task('serve', function () {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });

  gulp.watch('./app/styles/**/*.scss', ['sass']);
  gulp.watch('./app/templates/**/*.jade', ['jade'])
  gulp.watch('./build/*.html').on("change", browserSync.reload);
});

gulp.task('default', ['serve']);



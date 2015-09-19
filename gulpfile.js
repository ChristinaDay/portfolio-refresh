var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var jade = require('gulp-jade');
var jadelint = require('gulp-jadelint');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

var paths = {
  styles: './app/styles/**/*.scss',
  topLevelTemplates: './app/templates/*.jade',
  templates: './app/templates/**/*.jade',
  build: './build',
  buildTemplates: './build/*.html'
};

gulp.task('sass', function () {
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(scsslint())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(prefix())
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  gulp.src(paths.topLevelTemplates)
    .pipe(plumber())
    .pipe(jadelint())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./build'));
});

gulp.task('serve', function () {
  browserSync.init({
      server: {
          baseDir: paths.build
      }
  });

  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.templates, ['jade']);
  gulp.watch(paths.buildTemplates).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);



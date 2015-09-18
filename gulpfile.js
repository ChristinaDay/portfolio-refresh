var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var scsslint = require('gulp-scss-lint');
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
  gulp.src('./app/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(prefix())
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('scss-lint', function() {
  gulp.src('./app/styles/**/*.scss')
    .pipe(scsslint());
});

gulp.task('watch', ['scss-lint'], function () {
  livereload.listen();  
  gulp.watch('./app/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);



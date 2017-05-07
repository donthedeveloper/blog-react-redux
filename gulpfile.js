'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./browser/src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./browser/public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./browser/src/sass/**/*.scss', ['sass']);
});

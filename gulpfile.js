'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer'); 

gulp.task('production', function() {
  return gulp.src('./browser/src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./browser/public/css'));
});

gulp.task('sass', function () {
  return gulp.src('./browser/src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./browser/public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./browser/src/sass/**/*.scss', ['sass']);
});

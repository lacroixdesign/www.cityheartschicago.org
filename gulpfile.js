/**
 * Modules
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify   = require('gulp-browserify');
var livereload   = require('gulp-livereload');
var boardingPass = require('boarding-pass').includePaths;

/**
 * Utils
 */
var srcPath = function(path) {
  path = (path && ('/' + path.replace(/^\//, ''))) || '';
  return roots.src + path;
};
var destPath = function(path) {
  path = (path && ('/' + path.replace(/^\//, ''))) || '';
  return roots.dist + path;
};

/**
 * Settings
 */
var roots = {
  src:  'assets',
  dist: 'public/assets'
};

var paths = {
  css:    srcPath('stylesheets/!(_).scss'),
  js:     srcPath('javascripts/!(_).js'),
  images: srcPath('images/**/*'),
  fonts:  srcPath('fonts/**/*'),
  static: srcPath('static/**/*')
};

/**
 * Tasks
 */
gulp.task('sass', function () {
  gulp.src(paths.css)
    .pipe(sass({
      includePaths: boardingPass,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(destPath('stylesheets')))
    .pipe(livereload());
});

gulp.task('browserify', function () {
  gulp.src(paths.js)
    .pipe(browserify({
      debug: false
    }))
    .pipe(gulp.dest(destPath('javascripts')));
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest(destPath('images')));
});

gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest(destPath('fonts')));
});

gulp.task('static', function() {
  gulp.src(paths.static)
    .pipe(gulp.dest(destPath('static')));
});

gulp.task('watch', function () {
  gulp.watch(srcPath('stylesheets/**/*'), ['sass']);
  gulp.watch(srcPath('javascripts/**/*'), ['browserify']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.fonts,  ['fonts']);
  gulp.watch(paths.static, ['static']);
});

gulp.task('build', [
  'sass',
  'browserify',
  'images',
  'fonts',
  'static'
]);

gulp.task('default', ['build', 'watch']);

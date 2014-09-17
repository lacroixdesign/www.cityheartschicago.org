var gulp = require('gulp');
var path = require('../util/paths');
var sass = require('gulp-sass');
var livereload   = require('gulp-livereload');
var boardingPass = require('boarding-pass').includePaths;

gulp.task('sass', function () {
  gulp.src( path.src('css/!(_).scss') )
    .pipe(sass({
      includePaths: boardingPass,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest( path.dist('css') ))
    .pipe(livereload());
});

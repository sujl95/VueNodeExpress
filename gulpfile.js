var gulp = require('gulp');
var babel = require('gulp-babel');
var vueify = require('gulp-vueify');
 
gulp.task('vueify', function () {
  return gulp.src('src/components/**/*.vue')
    .pipe(vueify())
    // .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./dist'));
});
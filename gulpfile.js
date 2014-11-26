var gulp = require('gulp');
var harp = require('harp');

var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var transform = require('vinyl-transform');

gulp.task('serve', ['dist-fonts'], function () {
  harp.server(__dirname, {
    port: 9000
  });
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src('app/assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile less task
gulp.task('less', function() {
  return gulp.src('app/assets/styles/*.less')
    .pipe(less())
  . pipe(gulp.dest('public/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('app/assets/js/*.js', ['lint', 'browserify']);
  gulp.watch('app/assets/styles/*.less', ['less']);
});

gulp.task('build', function (done) {
  cp.exec('harp compile . dist', {stdio: 'inherit'})
    .on('close', done)
});

// Copies fonts
gulp.task('dist-fonts', function() {
  return gulp.src('node_modules/bootstrap/fonts/*')
    .pipe(gulp.dest('public/fonts'))
})

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  return gulp.src(['./app/assets/js/*.js'])
  .pipe(browserified)
  //.pipe(uglify())
  .pipe(gulp.dest('./public/js'));
});

// Default Task
gulp.task('default', ['lint', 'less', 'browserify', 'watch', 'serve']);



var gulp = require('gulp');
var harp = require('harp');
var cp = require('child_process');

var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var transform = require('vinyl-transform');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile less task
gulp.task('less', function() {
  return gulp.src('app/styles/main.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('app/js/*.js', ['lint', 'browserify']);
  gulp.watch('app/styles/*.less', ['less']);
});


// Copies assets
gulp.task('copy-assets', function() {
  gulp.src('node_modules/bootstrap/fonts/*')
    .pipe(gulp.dest('public/fonts'))
  gulp.src('node_modules/zeroclipboard/dist/ZeroClipboard.swf')
    .pipe(gulp.dest('public/js'))
})

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  return gulp.src(['./app/js/index.js'])
  .pipe(browserified)
  //.pipe(uglify())
  .pipe(gulp.dest('./public/js'));
});

gulp.task('build', ['copy-assets', 'lint', 'less', 'browserify']);

gulp.task('serve', ['build', 'watch'], function () {
  harp.server(__dirname, {
    port: 9000
  });
});

gulp.task('dist', ['build'], function (done) {
  cp.exec('harp compile . dist', {stdio: 'inherit'})
    .on('close', done)
});

// Default Task
gulp.task('default', ['serve']);

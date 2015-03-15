// The default gulp task provides a good workflow.
var gulp, clean, uglify, paths, jshint, stylish, react, karma;

gulp = require('gulp');
clean = require('gulp-clean');

karma = require('gulp-karma');

jshint = require('gulp-jshint');
stylish = require('jshint-stylish');

react = require('gulp-react');

concat = require('gulp-concat');
uglify = require('gulp-uglify');

jade = require('gulp-jade');

paths = {
	react: ['src/javascript/views/**/*.jsx'],
	javascripts: ['src/javascript/app.js', 'src/javascript/lib/**/*.js', 'src/**/*.js'],
	spec: ['spec/**/*.js'],
	css : ['src/**/*.css'],
	jade : ['src/**/*.jade']
};

gulp.task('clean', function () {  
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('lint', function() {
  return gulp.src(paths.javascripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function() {
  // Be sure to return the stream 
  return gulp.src(paths.spec)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      throw err;
    });
});

gulp.task('react', function () {
    return gulp.src(paths.react)
        .pipe(react())
        .pipe(gulp.dest('dist'));
});

gulp.task('javascripts', function() {
	// Minify and copy all JavaScript (except vendor scripts)
	return gulp.src(paths.javascripts)
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('templates', function() {
  var locals = {}
  gulp.src('./src/*.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest('dist/'))
});

// Copy all html
gulp.task('copy', function() {
 return gulp.src(paths.css)
		// Pass in options to the task
		.pipe(gulp.dest('dist/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.javascripts, ['build']);
	gulp.watch(paths.jade, ['build']);
	gulp.watch(paths.css, ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['lint', 'test','react', 'javascripts', 'copy', 'templates']);
gulp.task('default', ['build', 'watch']);
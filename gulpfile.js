var gulp, clean, uglify, paths, jshint, stylish, react, karma, jade, concat;

var require = require || function() {};

gulp = require('gulp');
clean = require('gulp-clean');
karma = require('karma').server;
jshint = require('gulp-jshint');
stylish = require('jshint-stylish');
react = require('gulp-react');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
jade = require('gulp-jade');

paths = {
	react: ['src/javascript/views/**/*.jsx'],
	javascripts: ['./src/**/*.js'],
	spec: ['spec/**/*.js'],
	css: ['src/**/*.css'],
	jade: ['src/**/*.jade']
};

gulp.task('clean', function() {
	'use strict';
	return gulp.src('dist/', {
			read: false
		})
		.pipe(clean());
});

gulp.task('lint', function() {
	'use strict';
	return gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.on('error', function(err) {
			throw err;
		});
});

gulp.task('test', function(done) {
	'use strict';
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
});

gulp.task('react', function() {
	'use strict';
	return gulp.src(paths.react)
        .pipe(concat('views.min.js'))
		.pipe(react())
		.pipe(gulp.dest('dist/views'));
});

gulp.task('javascripts', function() {
	'use strict';
	// Minify and copy all JavaScript (except vendor scripts)
	return gulp.src(paths.javascripts)
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('templates', function() {
	'use strict';
	var locals = {};
	gulp.src('./src/*.jade')
		.pipe(jade({
			locals: locals
		}))
		.pipe(gulp.dest('dist/'));
});

// Copy all html
gulp.task('copy', function() {
	'use strict';
	return gulp.src(paths.css)
		// Pass in options to the task
		.pipe(gulp.dest('dist/'));
});

// Copy all html
gulp.task('libs', function() {
    'use strict';
    return gulp.src('./bower_components/react/react.js')
        // Pass in options to the task
        .pipe(gulp.dest('dist/js'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
	'use strict';
	gulp.watch(paths.javascripts, ['build']);
	gulp.watch(paths.jade, ['build']);
	gulp.watch(paths.css, ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['lint', 'test', 'react', 'javascripts', 'copy', 'libs','templates']);
gulp.task('default', ['build', 'watch']);
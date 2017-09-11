var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('run-sequence');
var build = require('./build');
var func = require('./helpers');

// merge with default parameters
var args = Object.assign({'prod': false}, gutil.env);

if (args['prod'] !== false) {
	// force disable debug for production
	build.config.debug = false;
}

// task to bundle js/css
gulp.task('build-bundle', function (cb) {
	// build by demo, leave demo empty to generate all demos
	if (build.config.demo !== '') {
		for (var demo in build.dist.demo) {
			if (!build.dist.demo.hasOwnProperty(demo)) continue;
			if (build.config.demo !== demo) {
				delete build.dist.demo[demo];
			}
		}
	}
	func.objectWalkRecursive(build.build, function (val, key) {
		if (typeof val.src !== 'undefined') {
			if (typeof val.bundle !== 'undefined') {
				func.bundle(val);
			}
			if (typeof val.output !== 'undefined') {
				func.output(val);
			}
		}
	});
	cb();
});

// entry point
gulp.task('default', ['clean'], function (cb) {
	var tasks = ['build-bundle'];
	// clean first and then start bundling
	return sequence.apply(cb, tasks);
});
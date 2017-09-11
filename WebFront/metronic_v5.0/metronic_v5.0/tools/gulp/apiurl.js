var gulp = require('gulp');
var build = require('./build');
var replace = require('gulp-replace');
var func = require('./helpers');

const PREG_APIURL = new RegExp('(["|\'])(?:inc\\/api\\/.*)["|\']', 'g');

var apiUrlCallback = function (match) {
	match = match.substring(1);
	return '\'' + build.config.path.demoApiUrl + match;
};

// Gulp task to find api path and convert to absolute url
gulp.task('apiurl', function () {
	for (var app in build.config.dist) {
		if (!build.config.dist.hasOwnProperty(app)) continue;
		if (app === 'preview') continue;
		var output = '';

		if (build.config.dist[app].path.indexOf('**') !== -1) {
			func.getDemos().forEach(function (demo) {
				output = build.config.dist[app].path;
				output = output.replace('**', demo);
				gulp.src(output + '/**/*js')
					.pipe(replace(PREG_APIURL, apiUrlCallback))
					.pipe(gulp.dest(output));
			})
		} else {
			output = build.config.dist[app].path;
			gulp.src(output + '/**/*js')
				.pipe(replace(PREG_APIURL, apiUrlCallback))
				.pipe(gulp.dest(output));
		}
	}
});
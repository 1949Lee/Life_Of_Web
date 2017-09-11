var gulp = require('gulp');
var sass = require('gulp-sass');
var build = require('./build');

gulp.task('watch:scss', function () {
	gulp.watch(build.config.path.src + '/sass/**/*.scss', ['default']);
});

gulp.task('watch:js', function () {
	gulp.watch(build.config.path.src + '/js/**/*.js', ['default']);
});
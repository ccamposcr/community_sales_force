/*jshint node:true, nonew:true, jquery:true, curly:true, noarg:true, forin:true, noempty:true, eqeqeq:true, strict:true, undef:true, bitwise:true, browser:true */
/*global console */
"use strict";
var autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	gulp = require('gulp'),
    gutil = require('gulp-util'),
	gulpif = require('gulp-if'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	merge = require('merge-stream'),
	minifyCss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
    Rsync = require('rsync'),
	run = require('run-sequence'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	useref = require('gulp-useref');

var options = {
	lessSrc: ["./src/less/styles.less"],
    environment: process.env.environment || 'DEV',
    destinations: {
        DEV: {
            path: '/mnt/webfiles01/DEV/shared/www/dev-amexgcp.moxhost.com/public_html'
        }
    }
};

// ********************************************************************
// Reusable Functions
// ********************************************************************
function compileLess(throwErr, compress) {
	compress = !!compress;
	return gulp.src(options.lessSrc)
		.pipe(less({
			compress: compress
		}).on('error', function (err) {
			if (throwErr) {
				throw err;
			} else {
				console.log(err.message);
			}
		}))
		.pipe(autoprefixer({
			browsers: ["last 4 versions"],
			cascade : true
		}))
		.pipe(rename(function (path) {
			path.basename += compress ? '.min' : '';
		}))
		.pipe(gulp.dest('./src/styles/'))
		.pipe(gulp.dest('../template/template_files/'));
}

// ********************************************************************
// Gulp Tasks
// ********************************************************************
gulp.task('less', function () {
	return compileLess(true);
});

gulp.task('less-watch', function () {
	// not returning to allow for watch to continue after an error
	compileLess();
});

gulp.task('less-compress', function () {
	return compileLess(true, true);
});

gulp.task('jshint', function () {
	return gulp.src([
		'src/scripts/**/*.js',
		'!src/scripts/vendor/**/*'
	])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('sprites', function(){
	return gulp.src('./src/img/sprites/*.png')
	.pipe(sprite({
		name: 'sprite',
		style: '_sprite.less',
		cssPath: '../img/global/file',
		processor: 'less',
		background: 'transparent',
		prefix: 'icn-sprite'
	}))
	.pipe(gulpif('*.png', gulp.dest('./src/img/global/'), gulp.dest('./src/less/')))

});

gulp.task('watch', ['less'], function () {
	gulp.watch(['**/*.less'], ['less-watch']);
	gulp.watch(['scripts/**/*.js'], ['jshint']);
});


gulp.task('clean', function (callback) {
	del([
		'dist',
		'src/css/styles.css',
		'src/css/styles.min.css',
		'src/js/scripts.min.js'
	], callback);
});

gulp.task('package', function () {
	var main = gulp.src([
		'src/**/*',
		'!src/css/**/*.css',
		'!src/js/**/*',
		'!src/less/',
		'!src/less/**/*'
	])
		.pipe(gulp.dest('dist'));

	var js = gulp.src([
		'ignore/me'
	])
		.pipe(gulp.dest('dist/js'));

	var jsVendor = gulp.src([
		'src/js/vendor/**/*.js'
	])
		.pipe(gulp.dest('dist/js/vendor'));

    var htaccess = gulp.src('src/.htaccess.'+options.environment.toLowerCase())
        .pipe(rename('.htaccess'))
        .pipe(gulp.dest('dist'));

	return merge(main, js, jsVendor, htaccess);
});

gulp.task('inject', function () {
	var assets = useref.assets();

	return gulp.src('src/**/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

gulp.task('dist', function (callback) {
	run('clean', 'less', 'package', 'inject', callback);
});

gulp.task('deploy:rsync', function (callback) {
//	rsync -vzrO --delete --exclude ./database/ -e ssh . root@10.187.25.31:/home/jenkins/sites/com.moxhost.innosource-dev/test
    var rsync = new Rsync()
        //.shell('ssh')
        .flags('zrO')
        .delete()
        //.exclude('content/uploads/')
        //.exclude('STAGE/')
        //.exclude('php.ini')
        //.set('chmod', 'Du=rwx,Dg=rx,Do=rx,Fu=rw,Fg=r,Fo=r')
        //.set('filter', 'protect content/uploads/**/*')
        //.set('protocol', 30)
        .source('./dist/')
        .destination(options.destinations[options.environment].path);

    var sendToOut = function (data) {
        gutil.log(data.toString());
    };

    var sendToErr = function (data) {
        gutil.log(gutil.colors.red('Error'), data.toString());
    };

// Execute the command
    rsync.execute(function (error, code, cmd) {
        if (error) {
			gutil.log(gutil.colors.red('Error: Code - '), code);
			gutil.log(gutil.colors.red('Error: Command - '), cmd);
            process.exit(code);
		}

		callback(error);
    }, sendToOut, sendToErr);
});

gulp.task('release:dev', function (callback) {
    options.environment = 'DEV';
    run('dist', 'deploy:rsync', callback);
});

gulp.task('default', function (callback) {
	run(['less'], callback);
});


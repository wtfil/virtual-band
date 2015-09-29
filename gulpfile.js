var browserify = require('browserify');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var gutil = require('gulp-util');
var fs = require('fs');
var watchify = require('watchify');
var server = require('http-server');
var nodemon = require('gulp-nodemon');
var less = require('gulp-less');

var files = {
    js: {
        src: 'public/src/index.js',
        dest: 'public/build/index.js'
    },
    css: {
    	src: 'public/index.less',
    	dest: 'public/build'
    }
};

gulp.task('js', function () {
    return browserify(files.js.src)
        .transform('babelify')
        .bundle()
        .pipe(fs.createWriteStream(files.js.dest))
});

gulp.task('css', function () {
	return gulp.src(files.css.src)
		.pipe(less())
		.on('error', function (e) {
			gutil.log(gutil.colors.red(e.message));
			this.emit('end');
		})
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('css-watch', function () {
	gulp.watch(files.css.src, ['css']);
});

gulp.task('js-watch', function () {
    var args = watchify.args;
    args.debug = true;
    var bundler = watchify(browserify(files.js.src, args));

    bundler.transform('babelify');
    bundler.on('update', rebundle);

    function onError(e) {
        gutil.log(gutil.colors.red(e.message));
    }

    function rebundle() {
        var start = Date.now();

        return bundler.bundle()
          .on('error', onError)
          .on('end', function () {
              var time = Date.now() - start;
              gutil.log('Building \'' + gutil.colors.green(files.js.src) + '\' in ' + gutil.colors.magenta(time + ' ms'));
          })
          .pipe(fs.createWriteStream(files.js.dest));
    }
    rebundle();
});

gulp.task('deploy', ['css', 'js'], function () {
	return gulp.src('./public/**/*').pipe(ghPages());
});

gulp.task('server', function () {
	nodemon({
		script: './server.js',
		exec: 'node',
		ext: 'js',
		watch: ['server.js']
	});
});

gulp.task('dev', ['server', 'css', 'js-watch', 'server', 'css-watch']);

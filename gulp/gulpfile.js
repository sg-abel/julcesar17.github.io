var gulp = require('gulp');
var sass = require('gulp-sass');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
const minify = require('gulp-minify');

function swallowError(error){
	console.log(error.toString())
	this.emit('end')
}

gulp.task('styles', function() {
	gulp.src('css/index.scss')
	.pipe(sass({outputStyle: 'compressed'})
	.on('error', sass.logError))
	.pipe(concat('index.css'))
	.pipe(gulp.dest('../assets/css/'));
});

gulp.task('uglify', function(){
	gulp.src([
		'js/vars.js',
		'js/actions.js',
		'js/functions.js',
		'js/helpers.js',
		'js/listeners.js',
		'js/initializers.js',
	])
	.on('error', swallowError)
	.pipe(concat('index.js'))
	.on('error', swallowError)
	.pipe(minify({
		ext:{
			src:'-debug.js',
			min:'.js'
		}
	}))
	.on('error', swallowError)
	.pipe(
		gulp.dest('../assets/js')
	);
});

gulp.task('pluginsg', function(){
	gulp.src([
		'js/plugins.js',
	])
	.on('error', swallowError)
	.pipe(concat('plugins.js'))
	.on('error', swallowError)
	.pipe(
		uglify(),
		gulp.dest('../assets/js')
	);
});

gulp.task('watch', function() {
	gulp.watch('css/**/*.scss', ['styles']);
	gulp.watch('js/*.js', ['uglify']);
});

gulp.task('clearCache', function() {
  cache.clearAll();
});

gulp.task('default',['styles','uglify','pluginsg']);

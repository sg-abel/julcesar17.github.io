const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

function swallowError(error){
	console.log(error.toString())
	this.emit('end')
}

function css() {
    return src('css/index.scss')
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .pipe(concat('index.css'))
        .pipe(dest('../assets/css/'));
}

function js() {
    return src([
            'js/vars.js',
            'js/actions.js',
            'js/ajax.js',
            'js/functions.js',
            'js/helpers.js',
            'js/listeners.js',
            'js/initializers.js'
        ], {
            sourcemaps: false
        })
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
        .pipe(dest('../assets/js', { sourcemaps: false }));
}

function plugins() {
    return src([
            'js/plugins.js',
        ], {
            sourcemaps: false
        })
        .on('error', swallowError)
        .pipe(concat('plugins.js'))
        .on('error', swallowError)
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .on('error', swallowError)
        .pipe(dest('../assets/js', { sourcemaps: false }));
}

function real() {
    watch(['css/**/*.scss', 'js/*.js'], parallel(css, js));
}

exports.js = js;
exports.css = css;
exports.plugins = plugins;
exports.watch = real;
exports.default = parallel(css, js, plugins);
/**
 * Dependencys
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    copy = require('gulp-contrib-copy'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint');
    stylish = require('jshint-stylish'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    htmlreplace = require('gulp-html-replace'),
    runSequence = require('run-sequence'),
    color = require('gulp-color'),
    path = {
      src: './src',
    	dist: './dist',
      scss: './src/scss',
      js: './src/js'
    };

/**
 * Tasks
 */

// Generates and merges CSS files from SASS
gulp.task('sass', function () {
    return gulp.src(path.scss + '/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.dist + '/css'))
    .pipe(connect.reload());
});

// Copy HTML Files
gulp.task('copyHtml', function() {
  gulp.src(path.src + '/**/*.html')
    .pipe(copy())
    .pipe(gulp.dest(path.dist));
});

// Copy JS Files
gulp.task('copyJs', function() {
  gulp.src(path.js + '/**/*.js')
    .pipe(copy())
    .pipe(gulp.dest(path.dist + '/js'));
});

// Watches for SCSS, HTML, JS Files
gulp.task('watch', function () {
    gulp.watch(path.scss + '/**/*.scss', ['sass']);
    gulp.watch(path.src + '/**/*.html', ['copyHtml']);
    gulp.watch(path.src + '/**/*.js', ['hintJs', 'copyJs']);
});


// JS HINT
gulp.task('hintJs', function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Concat JS
gulp.task('concatJs', function (cb) {
  pump([
        gulp.src(path.js + '/**/*.js'),
        concat('app.js'),
        gulp.dest(path.dist + '/js')
    ],
    cb);
});

// Uglify JS
gulp.task('uglifyJs', function (cb) {
  pump([
        gulp.src(path.dist + '/js/*.js'),
        uglify(),
        gulp.dest(path.dist + '/js')
    ],
    cb);
});

// Merge Script tags
gulp.task('mergeScript', function () {
    gulp.src(path.src + '/**/*.html')
        .pipe(htmlreplace({
            'js': 'app.js'
        }))
        .pipe(gulp.dest(path.dist));
});

// Remove files
gulp.task('clean', function () {
  return gulp.src(path.dist + '/*', {read: false})
    .pipe(clean());
});

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});



gulp.task('dist', function() {
  runSequence('clean', 'sass', 'hintJs', 'copyJs', 'copyHtml', function() {
    console.log(color('SUCCESSFULLY DIST!', 'YELLOW'));
  });
});

gulp.task('dev', function(callback) {
  runSequence('clean', 'sass', 'hintJs', 'copyJs', 'copyHtml', 'watch', 'connect', function() {
    console.log(color('HAPPY DEV!', 'BLUE'));
  });
});

gulp.task('build', function(callback) {
  runSequence('clean', 'sass', 'hintJs', 'concatJs', 'uglifyJs', 'mergeScript', function() {
    console.log(color('SUCCESSFULLY BUILD!', 'YELLOW'));
  });
});
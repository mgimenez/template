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
gulp.task('copy', function() {
  gulp.src(path.src + '/**/*.html')
    .pipe(copy())
    .pipe(gulp.dest(path.dist));

  gulp.src(path.js + '/**/*.js')
    .pipe(copy())
    .pipe(gulp.dest(path.dist + '/js'));
});

// Watches for SCSS, HTML, JS Files
gulp.task('watch', function () {
    gulp.watch(path.scss + '/**/*.scss', ['sass']);
    gulp.watch([path.src + '/**/*.html', path.src + '/**/*.js'], ['copy']);
    gulp.watch(path.js + '/**/*.js', ['hint']);
});


// JS HINT
gulp.task('hint', function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
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

gulp.task('build', ['clean', 'sass', 'copy']);
gulp.task('dev', ['build', 'watch', 'connect']);
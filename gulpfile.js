// load the require modules
let gulp = require('gulp');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let browserSync = require('browser-sync').create();
let imagemin = require('gulp-imagemin');
let deploy = require('gulp-gh-pages');
// À compléter
// let babel = require("gulp-babel");

// File paths
let SCRIPTS_PATH = 'src/js/**/*.js';
let CSS_PATH = 'src/scss/**/*.scss';

// Translate SASS to CSS
gulp.task('sass', function(){
  return gulp.src(CSS_PATH)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Javascript
gulp.task('scripts', function(){
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

/* Image minification
**************************/
gulp.task('imagemin', function(){
  var img_src = 'src/images/*';
  var img_dest = 'app/images';
  gulp.src(img_src)
  // .pipe(changed(img_dest))
  .pipe(imagemin())
  .pipe(gulp.dest(img_dest));
});

/** Watcher to rerun gulp on save
**************************/
gulp.task('default', ['browserSync', 'scripts', 'sass', 'imagemin'], function(){
  gulp.watch(CSS_PATH, ['sass']);
  // Other watchers
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch(SCRIPTS_PATH, ['scripts'], browserSync.reload);
})

/** Watcher to rerun gulp on save
**************************/
gulp.task('watch', ['browserSync', 'sass', 'imagemin'], function(){
  gulp.watch(CSS_PATH, ['sass']);
  // Other watchers
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch(SCRIPTS_PATH, ['scripts'], browserSync.reload);
})

/** Setting up a web server for auto browser reload
**************************/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

/** Push build to gh-pages
**************************/
gulp.task('deploy', function () {
  return gulp.src("./src/**/*")
    .pipe(deploy())
});

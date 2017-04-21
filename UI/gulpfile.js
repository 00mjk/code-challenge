var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var DEST = 'dist/';
var SOURCE = 'app/';

var errorHandler = function(error) {
  return console.log(error);
};

gulp.task('vendor', function() {
     gulp.src(SOURCE + 'vendor.js')
        .pipe(plugins.browserify())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(DEST))
});

gulp.task('scripts', function() {
    gulp.src(SOURCE + 'js/*.js')
        .pipe(plugins.concat('scripts.js'))
        .pipe(plugins.browserify())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.jshint())
        // .pipe(plugins.uglify())
        .pipe(gulp.dest(DEST))
});

gulp.task('styles', function() {
    gulp.src(SOURCE + 'scss/base.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('styles.css'))
        // .pipe(plugins.cleanCss())
        .pipe(gulp.dest(DEST))
});

gulp.task('images', function() {
    gulp.src(SOURCE + 'images/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(DEST+'images/'))
});

gulp.task('templates', function() {
    gulp.src(SOURCE + '**/*.jade')
        .pipe(plugins.jade({
            pretty: true
        }))
        .pipe(gulp.dest(DEST))
});

gulp.task('watch', function() {
  gulp.watch(SOURCE+'js/*.js', ['scripts']);
  gulp.watch(SOURCE+'scss/*.scss', ['styles']);
  gulp.watch(SOURCE+'images/*', ['images']);
  gulp.watch(SOURCE+'**/*.jade', ['templates']);

  return gulp.src(DEST).pipe(plugins.webserver({
    fallback: 'index.html',
    livereload: false
  }));
});

gulp.task('build', ['vendor', 'scripts', 'styles', 'images', 'templates']);

gulp.task('default', ['vendor', 'scripts', 'styles', 'images', 'templates', 'watch']);
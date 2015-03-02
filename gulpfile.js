var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var run = require('run-sequence');

var webpackConfig = require('./webpack.config.js');

var dist = './dist/';
var distHtml = './dist/html/';

gulp.task('client-scripts', function() {
  return gulp.src(webpackConfig.client.entry)
    .pipe($.webpack(webpackConfig.client))
    .pipe(gulp.dest(distHtml + 'js/'))
    .pipe($.connect.reload());
});

gulp.task('server-scripts', function() {
  return gulp.src([
      './src/server/**/*.js'
  ])
    .pipe($.babel())
    .pipe(gulp.dest(dist + 'server/'))
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest(distHtml));
});

gulp.task('reload', function () {
    return gulp.src('./')
        .pipe($.connect.reload());
});

gulp.task('serve', function() {
  $.connect.server({
    root: distHtml,
    port: 8080,
    livereload: {
      port: 35729
    }
  });
});

gulp.task('default', function () {
    return run(['client-scripts', 'server-scripts', 'html'], ['socket-server', 'serve'], 'watch');
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.jsx', ['client-scripts']);
  gulp.watch('./src/server.js', ['server-scripts']);
  gulp.watch('./src/server/**/*.js', ['server-scripts']);
  gulp.watch('./src/index.html', ['html']);
});

gulp.task('socket-server', function() {
    $.nodemon({
        script: './dist/server/server.js'
    })
    .on('restart', 'reload');
});

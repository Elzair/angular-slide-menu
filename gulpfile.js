var fs      = require('fs')
    gulp    = require('gulp')
  , gutil   = require('gulp-util')
  , webpack = require('webpack')
  ;

gulp.task('default', ['webpack:build']);

gulp.task('build', ['webpack:build'], function() {
  gulp.watch(['src/*'], ['webpack:build']);
});

gulp.task('webpack:build', function(cb) {
  var config = require('./webpack.config');
  webpack(config, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({}));
    cb();
  });
});

gulp.task('build-dev', ['webpack:build-dev'], function() {
  gulp.watch(['src/*'], ['webpack:build-dev']);
});

gulp.task('webpack:build-dev', function(cb) {
  var config = require('./webpack.dev.config');
  webpack(config, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', stats.toString({}));
    cb();
  });
});

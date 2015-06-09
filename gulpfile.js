var gulp = require('gulp')
,   gutil = require('gulp-util')
,   webpack = require('webpack')
,   tinylr = require('tiny-lr')
,   webpackConfig = require("./webpack.config.js")
;

var devConfig = Object.create(webpackConfig);
devConfig.watch = true;
// devConfig.plugins.push( new webpack.optimize.UglifyJsPlugin() );
// devConfig.plugins.push( new webpack.optimize.OccurenceOrderPlugin() );

var execWebpack = function (config) {
  webpack(config, function (err, stats) {
    if (err)
      throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({colors: true}));
  });
};

var lrServer = function(lrport) {
  var lr = tinylr();
  lr.listen(lrport, function() {
    gutil.log("LiveReload listening on", lrport);
  });
  return lr;
};

gulp.task('webpack', function (callback) {
  execWebpack(devConfig);
  callback();
});

gulp.task('watch', function() {
  var lr = lrServer(35729);
  gulp.watch(['./public/assets/**/*.css'], function (evt) {
    gutil.log(gutil.colors.cyan(evt.path), 'changed');
    lr.changed({
      body: {
        files: [ evt.path ]
      }
    });
  });
});

gulp.task('default', ['webpack', 'watch']);

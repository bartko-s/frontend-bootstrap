'use strict';

var path = require('path');
var gulpUtil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function(webpackConfig) {
  return function(callback) {
    var compiler = webpack(webpackConfig);

    var server = new WebpackDevServer(compiler, {
      contentBase: 'http://127.0.0.1:5000',
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      stats: {
        colors: true
      }
    });

    server.listen(8080, 'localhost', function(err) {
      if(err) {
        throw new gulpUtil.PluginError('webpack-dev-server', err);
      }

      gulpUtil.log('[webpack-dev-server]', 'http://localhost:8080/');

      callback();
    });
  }
};
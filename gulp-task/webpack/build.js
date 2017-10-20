'use strict';

const gulpUtil = require('gulp-util');
const webpack = require('webpack');

module.exports = function(webpackConfig) {
  return function(callback) {
    webpack(webpackConfig, function(err, stats) {
      if(err) {
        throw new gulpUtil.PluginError('webpack', err);
      }
      gulpUtil.log('[webpack]', stats.toString({
        colors: true
      }));

      callback();
    })
  }
};
'use strict';

var gulp = require('gulp');
var webpackMakeConfig = require('./gulp-task/webpack/make-config');
var webpackDevServer = require('./gulp-task/webpack/dev-server');
var webpackBuild = require('./gulp-task/webpack/build');


gulp.task('build-webpack-development', webpackDevServer(webpackMakeConfig(true)));

gulp.task('build-webpack-production', webpackBuild(webpackMakeConfig(false)));
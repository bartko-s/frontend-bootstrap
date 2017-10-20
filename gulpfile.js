'use strict';

const gulp = require('gulp');
const webpackMakeConfig = require('./gulp-task/webpack/make-config');
const webpackDevServer = require('./gulp-task/webpack/dev-server');
const webpackBuild = require('./gulp-task/webpack/build');


gulp.task('build-webpack-development', webpackDevServer(webpackMakeConfig(true)));

gulp.task('build-webpack-production', webpackBuild(webpackMakeConfig(false)));
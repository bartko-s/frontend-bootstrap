'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');


module.exports = function (isDevelopment) {
    return {
        cache: isDevelopment,
        debug: isDevelopment,
        devtool: isDevelopment ? 'eval-source-map' : '',
        entry: {
            index: isDevelopment ?
                [
                    'webpack-dev-server/client?http://localhost:8080',
                    'webpack/hot/dev-server',
                    path.join(__dirname, '../../src/front/app.js')
                ] : [
                path.join(__dirname, '../../src/front/app.js')
            ]
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: path.join(__dirname, '../../node_modules/'),
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    loader: isDevelopment ?
                        'style!css!postcss-loader?sourceMap'
                        : ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
                },
                {
                    test: /\.scss$/,
                    loader: isDevelopment ?
                        'style!css!sass!postcss-loader?sourceMap'
                        : ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader')
                },
                {
                    test: /\.(gif|jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                }
            ]
        },
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, '../../../../build/'),
            publicPath: isDevelopment ? 'http://localhost:8080/build/' : '/build/'
        },
        plugins: isDevelopment ?
            [
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoErrorsPlugin()
            ] : [
            new ExtractTextPlugin("[name].styles.css"),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
        ],
        postcss: [
            autoprefixer({browsers: ['last 3 versions']})
        ]
    };
};
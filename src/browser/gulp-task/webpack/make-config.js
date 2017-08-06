'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


function postcss_loader(isDevelopment) {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevelopment,
            plugins: function () {
                return [
                    autoprefixer({
                        browsers: ['last 3 versions']
                    })
                ]
            }
        }
    }
}

module.exports = function (isDevelopment) {
    return {
        cache: isDevelopment,
        devtool: isDevelopment ? 'eval-source-map' : false,
        entry: {
            index: isDevelopment ?
                [
                    'webpack-dev-server/client?http://localhost:8080',
                    'webpack/hot/dev-server',
                    path.join(__dirname, '../../src/front/app.js')
                ] : [
                    path.join(__dirname, '../../src/front/app.js')
                ],
            vendor: ['jquery']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(css|scss)$/,
                    use: isDevelopment ?
                        [
                            'style-loader',
                            {loader: 'css-loader', options: {sourceMap: true}},
                            postcss_loader(isDevelopment),
                            {loader: 'sass-loader', options: {sourceMap: true}}]
                        : ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {loader: 'css-loader', options: {minimize: true,}},
                                postcss_loader(isDevelopment),
                                {loader: 'sass-loader'}
                            ]
                        })
                },
                {
                    test: /\.(gif|jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                    use: ['url-loader?limit=100000']
                }
            ],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, '../../../../build/'),
            publicPath: isDevelopment ? 'http://localhost:8080/build/' : '/build/'
        },
        plugins: isDevelopment ?
            [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                }),
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.LoaderOptionsPlugin({
                    debug: true
                }),
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin()
            ] : [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                }),
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                }),
                new ExtractTextPlugin({
                    filename: "[name].styles.css"
                }),
                new UglifyJSPlugin()
            ],
    };
};
'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


function postCssLoader(isDevelopment) {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevelopment,
            plugins: function () {
                return [
                    autoprefixer()
                ]
            }
        }
    }
}

function buildConfig(isDevelopment) {
    return {
        cache: isDevelopment,
        devtool: isDevelopment ? 'eval-source-map' : false,
        entry: {
            index: ['react-hot-loader/patch', path.join(__dirname, 'src/app.js')],
            vendor: ['jquery', 'react', 'react-dom']
        },
        resolve: {
            extensions: ['*', '.js', '.json', '.jsx']
        },
        module: {
            rules: [
                {
                    test : /\.jsx$/,
                    exclude: /node_modules/,
                    use : ['babel-loader']
                },
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
                            postCssLoader(isDevelopment),
                            {loader: 'sass-loader', options: {sourceMap: true}}]
                        : ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {loader: 'css-loader', options: {minimize: true,}},
                                postCssLoader(isDevelopment),
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
            path: path.join(__dirname, 'build/'),
            publicPath: isDevelopment ? 'http://localhost:8080/build/' : '/build/'
        },
        plugins: isDevelopment ?
            [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                }),
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin()
            ] : [
                new CleanWebpackPlugin(['build']),
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
        devServer: isDevelopment ? {
            proxy: {
                '*': 'http://127.0.0.1:8000'
            },
            overlay: true,
            publicPath: 'http://localhost:8080/build/',
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        } : {}
    };
}

module.exports = buildConfig(process.env.NODE_ENV === 'development');

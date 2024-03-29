import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'
import autoprefixer from 'autoprefixer'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import cssnano from 'cssnano'
import {WebpackManifestPlugin} from 'webpack-manifest-plugin'
import * as fs from "fs"
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


const serverUrl: string = '0.0.0.0';
const port: number = 8080;
const publicPath: string = "/static/build/";
const buildPath: string = path.join(__dirname, 'static/build');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function postCssLoader(isDevelopment: boolean): webpack.RuleSetUseItem {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevelopment,
            postcssOptions: {
                plugins: isDevelopment ? [
                    autoprefixer()
                ] : [
                    autoprefixer(),
                    cssnano()
                ]
            }
        }
    }
}

function buildConfig(isDevelopment: boolean): webpack.Configuration & webpackDevServer.Configuration {
    return {
        mode: isDevelopment ? 'development' : 'production',
        cache: isDevelopment,
        devtool: false,
        entry: {
            index: [
                path.join(__dirname, 'static/app.js')
            ],
            'css-vendor': path.join(__dirname, 'static/css-vendor/main.scss')
        },
        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx'],
        },
        ignoreWarnings: [
            /node_modules\/bootstrap\/scss/i
        ],
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            "@babel/preset-env",
                            [
                                "@babel/preset-react",
                                {
                                    development: isDevelopment,
                                },
                            ],
                            "@babel/preset-typescript",
                        ],
                        "plugins": isDevelopment ? [
                            "@babel/plugin-transform-runtime",
                            "transform-class-properties",
                            [
                                "babel-plugin-styled-components",
                                {
                                    "displayName": isDevelopment,
                                }
                            ],
                            "react-refresh/babel"
                        ] : [
                            "@babel/plugin-transform-runtime",
                            "transform-class-properties",
                            [
                                "babel-plugin-styled-components",
                                {
                                    "displayName": isDevelopment,
                                }
                            ],
                        ]
                    }
                },
                {
                    test: /\.(t|j)sx?$/,
                    loader: 'source-map-loader',
                    enforce: 'pre'
                },
                {
                    test: /\.(css|scss|sass)$/,
                    exclude: /node_modules/,
                    use: isDevelopment ?
                        [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: publicPath,
                                }
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            postCssLoader(isDevelopment),
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    sassOptions: {
                                        outputStyle: 'compressed',
                                    },
                                }
                            }
                        ] : [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: publicPath,
                                }
                            },
                            {
                                loader: 'css-loader'
                            },
                            postCssLoader(isDevelopment),
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        outputStyle: 'compressed',
                                    },
                                }
                            }
                        ]
                },
                {
                    test: /\.(gif|jpg|jpeg|png|svg)$/,
                    type: 'asset',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset',
                }
            ],
        },
        optimization: {
            runtimeChunk: "single"
        },
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[id].bundle.[chunkhash].js',
            path: buildPath,
            publicPath: publicPath,
        },
        plugins: isDevelopment ? [
            new ReactRefreshWebpackPlugin(),
            new CleanWebpackPlugin(),
            new WebpackManifestPlugin({}),
            new MiniCssExtractPlugin({
                filename: "[name].styles.css",
                chunkFilename: '[id].styles-chunk.css',
            }),
            new webpack.SourceMapDevToolPlugin({}),
        ] : [
            new CleanWebpackPlugin(),
            new WebpackManifestPlugin({}),
            new MiniCssExtractPlugin({
                filename: "[name].styles.css",
                chunkFilename: '[id].styles-chunk.css',
            }),
        ],
        devServer: isDevelopment ? {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            allowedHosts: 'all',
            host: serverUrl,
            hot: true,
            port: port,
            server: {
                type: 'https',
                options: {
                    key: fs.readFileSync('../docker/cert/dockerDomain.key'),
                    cert: fs.readFileSync('../docker/cert/dockerDomain.crt'),
                }
            },
            client: {
                overlay: true,
            },
            devMiddleware: {
                writeToDisk: true,
            }
        } : {}
    };
}

export default function(env: undefined, argv: webpack.Configuration) {
    const config = buildConfig(argv.mode === 'development');
    // console.log(config);
    return config
}

import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as autoprefixer from 'autoprefixer'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as cssnano from 'cssnano'

function postCssLoader(isDevelopment: boolean): webpack.Loader {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevelopment,
            plugins: function () {
                return [
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
        devtool: isDevelopment ? 'eval-source-map' : false,
        entry: {
            index: [path.join(__dirname, 'src/app.js')],
        },
        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    exclude: /node_modules/,
                    use : ['awesome-typescript-loader?module=es6']
                },
                {
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    enforce: 'pre'
                },
                {
                    test: /\.(css|scss)$/,
                    use: isDevelopment ?
                        [
                            'style-loader',
                            {loader: 'css-loader', options: {sourceMap: true}},
                            postCssLoader(isDevelopment),
                            {loader: 'sass-loader', options: {sourceMap: true}}]
                        : [
                            MiniCssExtractPlugin.loader,
                            {loader: 'css-loader', options: {minimize: true,}},
                            postCssLoader(isDevelopment),
                            {loader: 'sass-loader'}
                        ]
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
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "all"
                    }
                }
            }
        },
        plugins: isDevelopment ?
            [
                new CleanWebpackPlugin(['build']),
                new webpack.HotModuleReplacementPlugin(),
            ] : [
                new CleanWebpackPlugin(['build']),
                new MiniCssExtractPlugin({
                    filename: "[name].styles.css"
                }),
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

export default function(env: undefined, argv: webpack.Configuration) {
    const config = buildConfig(argv.mode === 'development');
    // console.log(config);
    return config
}

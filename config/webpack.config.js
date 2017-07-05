const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/main.js',
        './src/assets/style.scss'
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/bundle.min.js',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] },
                }],
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract([
                    'css-loader?url=false',
                    'sass-loader',
                    { loader: 'postcss-loader', options: { config: { path: './config/postcss.config.js' } } }
                ])
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/styles.bundle.min.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            cache: true
        }),
        new CopyWebpackPlugin([
          { from: 'src/static', to: 'static' }
        ])
    ],
    devServer: {
        inline: true,
        port: 8004
    }
};

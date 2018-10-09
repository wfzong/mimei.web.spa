const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css', '.scss'],
        modules: [path.join(__dirname, '../src'), 'node_modules'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                    /* loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' 
                        })
                    } */
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ]
}
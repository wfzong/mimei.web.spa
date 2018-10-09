const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
			vue: 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',//需安装 babel-plugin-syntax-dynamic-import 插件用于支持 ()=>import('xxx')
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: process.env.NODE_ENV === 'production',
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[hash].[ext]'
				}
			}
		]
	},
	//devtool:'inline-source-map',//会一直生成map
	devtool: '#cheap-module-source-map',//当 NODE_ENV=production 时，只会map文件框架~
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		// 主要是为了把robots.txt 拷到根目录下
	    new CopyWebpackPlugin([
	      {
	        from: path.join(__dirname, '../src/static/forRoot'),
	        to: path.join(__dirname, '../dist'),
	        ignore: ['.*']
	      }
	    ]),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
}